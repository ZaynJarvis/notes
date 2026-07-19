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
        {label('我搭了个本地跑的多引擎流式聊天应用，但代码基本不是我写的。我只负责编排：把活拆开，用 herdr 分发给几个 codex 去执行，自己收结果。应用本身不算什么，值得记下来的是这套分工，还有核心后端小得出乎我意料。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('核心后端就 600 行左右，砍到最小骨架（app + db + sessions + routes）才 370 行。业务逻辑没什么复杂度，难的是两个边界。一是把 codex、droid、claude-sdk 三种 CLI 的输出流揉成同一套 event schema；二是让几个并行的 agent 各写各的、最后拼到一起还不打架。而第二件事的分发、等待、通知，herdr 基本一行命令就搞定。')}
        </P>
      </Callout>

      <H2>{label('背景：这次到底建了什么')}</H2>
      <P>
        {label('想要的东西很具体：一个本地聊天应用，assistant 的正文流进主对话区，thinking、tool_call、tool_result 这些「内部步骤」折叠到右边 sidebar。引擎有三种，按 session 各选各的：OpenAI Codex 订阅（gpt-5.6-sol，xhigh）、factory.ai 的 Droid 拿来做 VLM，再加 Claude Agent SDK。会话能建、能续、能切，凭据一律从本机读，不往外传。')}
      </P>
      <P>
        {label('不过重点不在应用，在怎么建的。业务代码我一行没写，只当 orchestrator：先落一份 SPEC.md 当契约，再让 herdr 把任务派给几个 codex agent 同时干。一个 agent 占一个 pane，一轮 fanout 开一个 tab，跑完我收结果、做验证，不够再来一轮。下面分两条线写，一条是核心到底有多简单，另一条是 herdr 和 claudeSDK 上踩到的东西。')}
      </P>

      <H2>{label('一、核心后端有多简单')}</H2>
      <P>{label('按代码行数分一下组，空行和注释不算：')}</P>
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
        {label('整套流式契约其实就压在一个 endpoint 里。先把 user 消息落库，然后引擎每吐一个事件就转成一帧 SSE 发出去，收到 done 再把 assistant 消息落库，正文、sidebar 事件、还有引擎自己那个 session id 一起存下来，方便之后恢复。')}
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
        {label('前端那边，主对话和 sidebar 的分流也就是读一遍流、加一个 if。EventSource 不支持 POST 和 multipart，所以改用 fetch 加 getReader，自己切 SSE 帧：')}
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
        {label('能这么简单，全靠一套三种引擎通用的 event schema：text、thinking、tool_call、tool_result、error、done，seq 递增。有了它，前端根本不用管背后跑的是 codex 还是 claude，分流逻辑三种引擎共用一套。而这套 schema 不是我拍脑袋定的，是直接借了 Claude Agent SDK 的 message 形状，第三节细说。')}
      </P>

      <H2>{label('二、herdr 作为 orchestration infra 的学习')}</H2>
      <P>
        {label('herdr 本来是给 AI coding agent 用的终端工作区管理器。我这次把它当调度层用，把拆出来的子任务 fanout 给一堆 codex，意外地顺手。真正用到的就四个原语。')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('pane = 可观察、可持久的 worker 槽。')}</Strong>
          {label('每个 agent 跑在真实的 pane 里，中间步骤能实时看，跑完 pane 也不销毁，随时回去翻。比起「子进程跑完只剩一坨日志」，可观察性完全是两回事。')}
        </Li>
        <Li>
          <Strong>{label('herdr wait output --match <哨兵> = 干净的完成栅栏。')}</Strong>
          {label('在每个 agent 的命令末尾 echo 一个哨兵字符串，后台就 block 在这个哨兵上，一命中就返回，正好拿来唤醒 orchestrator。')}
        </Li>
        <Li>
          <Strong>{label('herdr notification show = 补上 human-in-the-loop 的缺口。')}</Strong>
          {label('agent 完成、整轮完成，各弹一个桌面通知，就是那句「做完叫我」。')}
        </Li>
        <Li>
          <Strong>{label('tab = 天然的轮次隔离。')}</Strong>
          {label('一轮 fanout 开一个 tab，里面的 pane 留着当审计轨迹。')}
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
          {label('1) codex exec 在 pane 里跑的不是 TUI，herdr 的 agent-status 认不出它是忙是闲，所以完成信号得靠输出哨兵，别指望 wait agent-status。2) codex 子进程的 stdin 要设成 DEVNULL，不然它会卡在等输入。')}
        </P>
      </Callout>
      <P>
        <Strong>{label('herdr 给的是 dispatch、wait、notify，冲突预防它不管。')}</Strong>
        {label('几个 agent 没互相踩，靠的是那份先写好的 SPEC.md：事件 schema、HTTP 契约，还有每个 agent 各管哪几个文件、界限划死。这活儿得 orchestrator 自己扛，工具帮不上。真要把 herdr 当构建基座长期用，可以在外面套一层薄封装，喂给它契约、一串 agent 任务和哨兵，回一组 pane id 和一个合并好的 waiter。')}
      </P>

      <H2>{label('三、Claude Agent SDK 在这套东西里到底怎么用')}</H2>
      <P>
        {label('Claude 在这里其实出现了两次，容易混。第一次是当 orchestrator：整个 build 就是 Claude Code 在拆任务、写契约、调 herdr、收结果，而 Claude Code 本身就跑在 Claude Agent SDK 的 agent loop 上。第二次是当应用里的一个引擎，也就是 server/engines/claude_engine.py。这一节讲后者，因为正是它顺手定义了前面那套 event schema。')}
      </P>
      <P>
        {label('SDK 的用法很直接：ClaudeAgentOptions 配好 model、cwd、权限，再 async for 迭代 query() 吐出来的 message。真正的价值在于它吐的不是一坨纯文本，而是已经分好类的 message 和 block。AssistantMessage 里有 TextBlock、ThinkingBlock、ToolUseBlock、ToolResultBlock，最后一个 ResultMessage 收尾、带 usage。这套现成的分类，正好就是我要的主对话和 sidebar 分流。')}
      </P>
      <Pre lang="python" filename="server/engines/claude_engine.py（要点，伪代码）">{`# SDK 的 message 流，逐 block 映射成统一事件
options = ClaudeAgentOptions(model=model, cwd=workdir,
                             permission_mode="bypassPermissions",
                             resume=session_id)          # 有 id 就续，没有就新开
async for message in query(prompt=prompt, options=options):
    if is(message, "ResultMessage"):                     # turn 收尾
        yield done_ev(seq, session_id, usage(message)); return
    for block in getattr(message, "content", []):
        if   is(block, "TextBlock") and is(message, "AssistantMessage"):
             yield text_ev(seq, block.text)              # -> 主对话
        elif is(block, "ThinkingBlock"):
             yield thinking_ev(seq, block.thinking)      # -> sidebar
        elif is(block, "ToolUseBlock"):
             yield tool_call_ev(seq, block.id, block.name, block.input)     # -> sidebar
        elif is(block, "ToolResultBlock"):
             yield tool_result_ev(seq, block.tool_use_id,
                                  not block.is_error, block.content)         # -> sidebar`}</Pre>
      <P>
        {label('这里 is() 是自己写的小工具，先按 isinstance 认 SDK 的类，认不出再退回按类名字符串匹配。这样 SDK 小版本变动、类被挪了位置，引擎也不会直接崩。另外，settings 里 claude 那条「可用」，判据就是这个 SDK import 得进来。')}
      </P>
      <P>
        {label('反过来看另外两条引擎，就清楚它们在干嘛了：codex 和 droid 是把各自 CLI 的 JSONL，翻译回 SDK 这个形状。谁缺 thinking 就补上，谁的 error 语义不对就纠回来。claude_engine 是参照物，另外两个是照着它翻译。所以那套 schema 与其说是我设计的，不如说是从 SDK 的 message 形状抄下来的。')}
      </P>
      <P>
        {label('翻译时最容易翻错的一个字段，是 codex 的 error。它哪怕这一 turn 成功了，也会把「skill 描述被裁剪」这种运维提示，当成 item 级 error 吐出来。照 SDK 的语义，这应该是个提示、进 sidebar，而不是红色 error：')}
      </P>
      <Pre lang="python" filename="server/engines/codex_engine.py（翻译回 SDK 形状，伪代码）">{`async for line in proc.stdout:                 # codex exec --json 的 JSONL
    item = json.loads(line).get("item") or {}
    t = item.get("type")
    if   t == "agent_message": yield text_ev(item["text"])       # -> 主对话
    elif t == "reasoning":     yield thinking_ev(item["text"])   # -> sidebar
    elif t in TOOLS:           yield tool_call_ev(...) / tool_result_ev(...)
    elif t == "error":         yield thinking_ev("[codex] " + item["message"])
                               # ↑ 运维提示，不是 turn 失败：折进 sidebar，
                               #   别当红色错误。真正失败走 turn.failed / 非零退出。`}</Pre>
      <P>
        {label('所以解析这类 agent 输出，先真跑一遍看看 JSON 长啥样，对着 SDK 的 block 语义把「提示」和「真失败」分清楚。提示归 sidebar，只有真失败才算 error。不然每轮正常对话都会闪一下假的红色报错，挺膈应人。')}
      </P>

      <H2>{label('一页版复用清单')}</H2>
      <Ul>
        <Li>{label('先写契约再 fanout。事件 schema、HTTP API、每个 agent 管哪些文件，都定死，并行起来才不打架。')}</Li>
        <Li>{label('分工是 Claude 编排、codex 执行、herdr 调度。pane 用来看，wait output 当栅栏，notification 叫人，tab 分轮次。')}</Li>
        <Li>{label('event schema 别自己发明。Claude Agent SDK 的 message/block 分类（Text/Thinking/ToolUse/ToolResult + ResultMessage）就是现成的契约，其它引擎照它翻译。')}</Li>
        <Li>{label('事件流归一：text 进主区，thinking 和 tool_* 进折叠 sidebar，一套 schema 把三种引擎抹平。')}</Li>
        <Li>{label('解析异构 CLI 照真实输出来写，分清提示和失败；子进程 stdin 记得设 DEVNULL。')}</Li>
        <Li>{label('别信 agent 的自我汇报。自己真发一个 live turn，落库再读回来，确认流帧和持久化都对得上。')}</Li>
      </Ul>

      <Callout type="warning" title={label('诚实的边界')}>
        <P>
          {label('有一点得说清楚：这次真正端到端验证过的只有 Codex 这条路（真跑了 gpt-5.6-sol xhigh，流帧和持久化都对）。Factory/VLM 和 Claude SDK 两条已经接好线、语法没问题、凭据也探测到了，但没真发过图像或 Claude 的 turn。所以还不能说「三条都能用」，那两条还欠一次实跑。')}
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
      zh: '代码基本不是我写的：我只做编排，herdr 分发，codex 执行，搭出一个本地多引擎流式聊天应用。核心后端约 600 行；重点讲 Claude Agent SDK 在这里的两种用法，以及它的 message/block 分类怎么直接变成整套 event schema。',
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
