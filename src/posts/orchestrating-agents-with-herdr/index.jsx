import React from 'react';
import {
  Article,
  Lead,
  H2,
  H3,
  P,
  Ul,
  Li,
  Table,
  Callout,
  Strong,
  Pre,
  InlineCode,
} from '../../blog-components';

const OrchestratingAgentsWithHerdr = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('用 Claude 做 orchestrator、herdr 做调度基座、codex 做执行体，搭了一个本地多引擎流式聊天应用。真正的收获不是那个应用，而是这套「Claude 编排、herdr 分发、codex 执行」的构建方式，以及核心后端可以有多小。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('一个「Claude Agent SDK 风格」的多引擎聊天应用，核心后端只有约 600 行，最小骨架（app + db + sessions + routes）约 370 行。复杂度不在业务逻辑，而在两个边界：把 codex / droid / claude-sdk 三种 CLI 的流归一成同一套 event schema，以及把并行 agent 的产物安全地合到一起。herdr 恰好把后一件事的调度、等待、通知都变成了一行 CLI。')}
        </P>
      </Callout>

      <H2>{label('背景：这次到底建了什么')}</H2>
      <P>
        {label('目标是一个本地跑的聊天应用：assistant 正文流进主对话区，thinking / tool_call / tool_result 这类「内部步骤」折叠进右侧 sidebar。三种引擎按 session 切换 —— OpenAI Codex 订阅（gpt-5.6-sol，xhigh）、factory.ai Droid（做 VLM），以及 Claude Agent SDK。会话可创建、恢复、切换，凭据全部从本机读取。')}
      </P>
      <P>
        {label('但构建方式才是重点：我（Claude）不写业务代码，只做 orchestrator —— 先写一份 SPEC.md 契约，再用 herdr 把任务分发给多个 codex agent 并行执行，每个 agent 一个 pane，每轮一个 tab，收集结果、验证、必要时再 fanout。下面按「核心有多简单」和「herdr / claudeSDK 的学习」两条线记录。')}
      </P>

      <H2>{label('一、核心后端有多简单')}</H2>
      <P>{label('按代码行（去掉空行与注释）分组：')}</P>
      <Table
        headers={[label('分组'), label('代码行'), label('说明')]}
        rows={[
          [label('最小骨架 main+db+sessions+routes'), '~370', label('FastAPI + sqlite + SSE，全部业务在这里')],
          [label('核心后端（含 events + settings）'), '~600', label('再加事件助手与凭据探测')],
          [label('引擎适配层（3 个 + dispatch）'), '~617', label('把 CLI 的 JSONL 流解析成统一事件，复杂度主要在这')],
          [label('前端（vanilla JS/HTML/CSS）'), '~1835', label('无框架、无构建步骤')],
        ]}
      />
      <P>
        {label('整个流式契约其实就一个 endpoint。它做三件事：落库 user 消息、把引擎事件逐帧转发成 SSE、done 时落库 assistant 消息（正文 + sidebar 事件 + 引擎自己的 session id 以便恢复）。')}
      </P>
      <Pre lang="python" filename="server/routes.py（核心，伪代码）">{`@router.post("/api/sessions/{sid}/chat")
async def chat(sid, text: Form, images: list[UploadFile] = []):
    session = get_session(sid)
    add_message(sid, "user", text)
    history = get_history(sid)                 # [{role, text}]

    async def sse():
        assistant, sidebar, engine_sid = [], [], None
        # run_engine 把 codex / droid / claude-sdk 归一成同一套事件流
        async for ev in run_engine(session.engine, session.model,
                                   history, text, images, WORKDIR):
            yield f"data: {json.dumps(ev)}\\n\\n"          # 原样转发给浏览器
            if   ev["type"] == "text":     assistant.append(ev["delta"])
            elif ev["type"] in SIDEBAR:    sidebar.append(ev)   # thinking / tool_*
            elif ev["type"] == "done":     engine_sid = ev.get("engine_session_id")
        add_message(sid, "assistant", "".join(assistant),
                    events=sidebar, engine_session_id=engine_sid)

    return StreamingResponse(sse(), media_type="text/event-stream")`}</Pre>
      <P>
        {label('主对话 / sidebar 的分流，在前端也只是一次读流 + 一个 if。EventSource 不支持 POST/multipart，所以用 fetch + getReader 自己切 SSE 帧：')}
      </P>
      <Pre lang="javascript" filename="web/app.js（核心，伪代码）">{`const res = await fetch(\`/api/sessions/\${sid}/chat\`, { method: "POST", body: form });
const reader = res.body.getReader();
const dec = new TextDecoder(); let buf = "";
for (;;) {
  const { value, done } = await reader.read(); if (done) break;
  buf += dec.decode(value, { stream: true });
  let i;
  while ((i = buf.indexOf("\\n\\n")) >= 0) {                 // 一个 SSE 帧
    const ev = JSON.parse(buf.slice(0, i).replace(/^data: /, ""));
    buf = buf.slice(i + 2);
    if (ev.type === "text")            mainBubble.append(ev.delta);    // 中间列
    else if (ev.type === "thinking"
          || ev.type.startsWith("tool_")) sidebar.card(ev);           // 右列，默认折叠
  }
}`}</Pre>
      <P>
        {label('归一的关键是一套跨引擎完全一致的 event schema：text / thinking / tool_call / tool_result / error / done，seq 单调递增。有了它，前端不需要知道背后是 codex 还是 claude，分流逻辑对三种引擎都一样。')}
      </P>

      <H2>{label('二、herdr 作为 orchestration infra 的学习')}</H2>
      <P>
        {label('herdr 是给 AI coding agent 用的终端工作区管理器。这次拿它当调度基座，把 Claude 拆出来的子任务 fanout 给多个 codex，效果出乎意料地顺。四个原语撑起了整套编排：')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('pane = 可观察、可持久的 worker 槽。')}</Strong>
          {label('每个 agent 跑在一个真实 pane 里，可以实时看它的内部步骤，跑完 pane 还留着可回溯 —— 比「子进程只能事后看日志」的可观察性好太多。')}
        </Li>
        <Li>
          <Strong>{label('herdr wait output --match <哨兵> = 干净的完成栅栏。')}</Strong>
          {label('给每个 agent 的命令尾部 echo 一个哨兵，后台 block 在这个哨兵上，命中即返回，用来唤醒 orchestrator。')}
        </Li>
        <Li>
          <Strong>{label('herdr notification show = 补上 human-in-the-loop 的缺口。')}</Strong>
          {label('每个 agent、每一轮完成都弹一个桌面通知，正好是「做完叫我」。')}
        </Li>
        <Li>
          <Strong>{label('tab = 天然的轮次隔离。')}</Strong>
          {label('一轮 fanout 一个 tab，pane 保留成审计轨迹。')}
        </Li>
      </Ul>
      <Pre lang="bash" filename="每轮 fanout 的骨架">{`# 1 tab / 轮，1 pane / 并行 agent
tab=$(herdr tab create --label round1 --cwd "$PROJ")
herdr pane split $pane --direction down                  # -> N 个 pane
herdr pane run  $pane 'codex exec --dangerously-bypass-approvals-and-sandbox \\
                         - < promptA.md; echo ___DONE_A___'
# block 到哨兵出现，再桌面通知 + 唤醒 orchestrator
herdr wait output $pane --match ___DONE_A___ --timeout 2400000
herdr notification show "round1: A done" --sound done`}</Pre>
      <Callout type="note" title={label('两个踩到的坑')}>
        <P>
          {label('1) codex exec 跑在 pane 里不是 TUI，herdr 的 agent-status 检测不到它的忙/闲，所以完成信号要用输出哨兵，而不是 wait agent-status。2) codex 的子进程要把 stdin 设成 DEVNULL，否则它会挂在等待输入上。')}
        </P>
      </Callout>
      <P>
        <Strong>{label('herdr 给了 dispatch + wait + notify，但没给冲突预防。')}</Strong>
        {label('并行 agent 之所以没互相踩，是因为先写了 SPEC.md：事件 schema、HTTP 契约、以及每个 agent 严格互斥的文件归属。这份纪律在 orchestrator 身上，不在工具里。要把 herdr 正式当构建基座，值得再包一层薄封装：输入 {契约, agent 任务[], 哨兵}，返回 pane id + 合并的 waiter。')}
      </P>

      <H2>{label('三、多引擎 / Claude SDK 的学习')}</H2>
      <P>
        {label('把三种异构 CLI 归一成同一套事件流，真正的工作量在「照着真实输出写解析」，而不是照文档猜字段。最典型的一个 bug：codex 在成功的 turn 里，也会把「skill 描述被裁剪」这类运维提示，当成 item 级的 error 事件发出来。')}
      </P>
      <Pre lang="python" filename="server/engines/codex_engine.py（要点，伪代码）">{`async for line in proc.stdout:                 # codex exec --json 的 JSONL
    item = json.loads(line).get("item") or {}
    t = item.get("type")
    if   t == "agent_message": yield text_ev(item["text"])       # -> 主对话
    elif t == "reasoning":     yield thinking_ev(item["text"])   # -> sidebar
    elif t in TOOLS:           yield tool_call_ev(...) / tool_result_ev(...)
    elif t == "error":         yield thinking_ev("[codex] " + item["message"])
                               # ↑ 这是运维提示，不是 turn 失败：折进 sidebar，
                               #   别当红色错误。真正失败走 turn.failed / 非零退出。`}</Pre>
      <P>
        {label('教训很朴素：解析异构 agent 输出时，先真跑一次看真实 JSON，把「informational notice」和「real failure」分开。前者进 sidebar，后者才是 error。否则每一轮正常对话都会闪一个假红错。')}
      </P>

      <H2>{label('一页版复用清单')}</H2>
      <Ul>
        <Li>{label('先写契约再 fanout：event schema + HTTP API + 每个 agent 互斥的文件归属，能让并行 agent 不打架。')}</Li>
        <Li>{label('Claude 编排、codex 执行、herdr 调度：pane 可观察、wait output 当栅栏、notification 叫人、tab 分轮次。')}</Li>
        <Li>{label('归一事件流：text 进主区，thinking / tool_* 进折叠 sidebar，一套 schema 打平所有引擎。')}</Li>
        <Li>{label('解析异构 CLI：照真实输出写，区分 notice 与 failure；子进程 stdin 记得 DEVNULL。')}</Li>
        <Li>{label('自己验证，别信 agent 自述：真发一个 live turn，落库回读，确认流帧与持久化都对。')}</Li>
      </Ul>

      <Callout type="warning" title={label('诚实的边界')}>
        <P>
          {label('这次 live 端到端只彻底验证了 Codex 一条路径（真实 gpt-5.6-sol xhigh，流帧 + 持久化都对）。Factory/VLM 与 Claude SDK 两条引擎已接线、语法干净、凭据探测为 true，但没跑过真实的图像 / Claude turn。要判「全部可用」，还差这两条的 live 验证。')}
        </P>
      </Callout>
    </Article>
  );
};

export default {
  id: 'orchestrating-agents-with-herdr',
  Component: OrchestratingAgentsWithHerdr,
  meta: {
    title: { zh: '用 herdr 编排 codex：一个 Claude SDK 应用的构建复盘' },
    description: {
      zh: 'Claude 做 orchestrator、herdr 做调度基座、codex 做执行体，搭一个本地多引擎流式聊天应用。核心后端约 600 行，附核心伪代码，以及 herdr / claudeSDK 的踩坑与复用清单。',
    },
    publishedAt: '2026-07-19',
    readingTime: { zh: 12 },
    category: { zh: 'Agent 工程' },
    tags: ['herdr', 'claude-sdk', 'codex', 'orchestration', 'agents'],
    languages: ['zh'],
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
