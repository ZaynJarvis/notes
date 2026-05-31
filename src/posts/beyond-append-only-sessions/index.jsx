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
  Tag,
  Cols,
  Col,
} from '../../blog-components';

const cover = '/assets/covers/beyond-append-only-sessions.png';

const styles = `
.session-note__deck { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin: 1.25rem 0 2rem; }
.session-note__card { border: thin solid var(--th-line); border-radius: var(--th-radius); background: color-mix(in oklab, var(--th-bg) 88%, var(--th-bg-2)); padding: .95rem; }
.session-note__card span { display: inline-block; margin-bottom: .65rem; font-family: var(--th-font-mono); font-size: .72rem; color: var(--th-accent); }
.session-note__card strong { display: block; margin-bottom: .4rem; font-family: var(--th-font-display); font-size: 1.1rem; line-height: 1.25; font-weight: 500; }
.session-note__card p { margin: 0; color: var(--th-mute); line-height: 1.55; font-size: .92rem; }
.session-note__flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .65rem; margin: 1rem 0 1.5rem; }
.session-note__step { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); padding: .8rem; }
.session-note__step b { display: inline-grid; place-items: center; width: 1.55rem; height: 1.55rem; border-radius: 999rem; background: var(--th-accent); color: var(--th-bg); font-family: var(--th-font-mono); font-size: .75rem; font-weight: 500; margin-bottom: .65rem; }
.session-note__step strong { display: block; font-family: var(--th-font-display); font-weight: 500; line-height: 1.25; margin-bottom: .35rem; }
.session-note__step p { margin: 0; color: var(--th-mute); font-size: .9rem; line-height: 1.5; }
.session-note__tagline { display: flex; flex-wrap: wrap; gap: .45rem; margin: .75rem 0 1.25rem; }
@media (max-width: 62rem) { .session-note__deck, .session-note__flow { grid-template-columns: 1fr; } }
`;

const zh = (value) => ({ zh: value.zh, en: value.en });

const cards = [
  {
    k: { zh: '产品目标', en: 'Product goal' },
    title: { zh: '用户不再管理 session', en: 'Users stop managing sessions' },
    body: {
      zh: '用户一直在默认 session 里工作。系统内部负责拆 topic、追 task、组装前缀、控制 token。',
      en: 'Users keep working in one default session. The system handles topics, tasks, context prefixes, and token budgets internally.',
    },
  },
  {
    k: { zh: '技术核心', en: 'Technical core' },
    title: { zh: 'session state 取代线性日志', en: 'Session state replaces linear logs' },
    body: {
      zh: 'append-only log 只是原材料。真正要交付的是 task、fact、decision、open loop、evidence 和 stale state。',
      en: 'The append-only log is raw material. The product must expose tasks, facts, decisions, open loops, evidence, and stale state.',
    },
  },
  {
    k: { zh: '评测方式', en: 'Evaluation' },
    title: { zh: '看效果，也看 token', en: 'Measure quality and tokens' },
    body: {
      zh: '最终看任务回答是否正确、是否引用证据、是否用更少上下文超过 append-only baseline。',
      en: 'The final score depends on task answers, evidence grounding, and whether the system beats append-only baselines with less context.',
    },
  },
];

const flow = [
  {
    title: { zh: '读入混乱日志', en: 'Read the messy log' },
    body: { zh: '多用户、多 agent、启动噪音、工具输出、话题跳转都在同一个 session。', en: 'One session contains multiple humans, agents, startup noise, tool outputs, and topic switches.' },
  },
  {
    title: { zh: '重建状态', en: 'Rebuild state' },
    body: { zh: '识别 topic、task、fact、inference、decision、open loop、artifact 和 stale claim。', en: 'Detect topics, tasks, facts, inferences, decisions, open loops, artifacts, and stale claims.' },
  },
  {
    title: { zh: '组装前缀', en: 'Assemble the prefix' },
    body: { zh: '针对当前输入，在 token budget 下选择最小可用 context，而不是塞最近 N 条。', en: 'For the current input, choose the minimum useful context under a token budget instead of taking the latest N turns.' },
  },
  {
    title: { zh: '完成任务', en: 'Complete the task' },
    body: { zh: '用单 agent 输入验证效果。multi-agent fanout 可选，不作为最低门槛。', en: 'Evaluate the result through a single-agent input. Multi-agent fanout is allowed, but not required.' },
  },
];

function MiniCards({ t }) {
  return (
    <div className="session-note__deck">
      {cards.map((card) => (
        <div className="session-note__card" key={card.k.en}>
          <span>{t(card.k)}</span>
          <strong>{t(card.title)}</strong>
          <p>{t(card.body)}</p>
        </div>
      ))}
    </div>
  );
}

function Flow({ t }) {
  return (
    <div className="session-note__flow">
      {flow.map((step, index) => (
        <div className="session-note__step" key={step.title.en}>
          <b>{index + 1}</b>
          <strong>{t(step.title)}</strong>
          <p>{t(step.body)}</p>
        </div>
      ))}
    </div>
  );
}

const BeyondAppendOnlySessions = ({ t }) => {
  return (
    <Article className="session-note">
      <style>{styles}</style>
      <Lead>
        {t({
          zh: '这道题不应该写成“做一个更长的聊天窗口”。真正的问题是：用户想一直在一个默认 session 里工作，系统能不能自动把混乱历史整理成可继续执行的状态。',
          en: 'This challenge should not be framed as building a longer chat window. The real problem is whether a user can keep working in one default session while the system turns chaotic history into executable state.',
        })}
      </Lead>

      <MiniCards t={t} />

      <Callout type="info" title={t({ zh: '一句话题眼', en: 'One-line thesis' })}>
        <P>
          <Strong>
            {t({
              zh: '默认 session 可以无限长；真正有限的是模型每次能看的上下文。好的 session manager 负责在两者之间做转换。',
              en: 'The default session can feel infinite; the model context is still finite. A good session manager converts between the two.',
            })}
          </Strong>
        </P>
      </Callout>

      <H2>{t({ zh: '先说人话', en: 'Plain version' })}</H2>
      <P>
        {t({
          zh: '现在很多 AI 产品把 session 当成聊天记录。用户一旦在同一个窗口里混着聊代码、产品、部署、阅读、临时问题，系统就开始靠“最近上下文”猜当前话题。这个体验很脆。用户最后会被迫手动切 session、复制背景、提醒 agent “我们刚才说的是另一个事”。',
          en: 'Many AI products still treat a session as a chat transcript. Once a user mixes code, product planning, deployment, reading, and small side questions in one window, the system starts guessing from recent context. The user ends up manually switching sessions, copying background, or reminding the agent which topic is active.',
        })}
      </P>
      <P>
        {t({
          zh: '更好的产品不应该把这个负担丢给用户。用户只要继续说话。系统内部自动判断：这句话属于哪个 topic？关联哪个 task？之前哪些约束还有效？哪些结论已经过期？这次回答需要组装哪些前缀？用了多少 token？',
          en: 'A better product should not push that burden to the user. The user keeps talking. The system decides which topic the new input belongs to, which task it updates, which constraints still matter, which conclusions are stale, which prefix should be assembled, and how many tokens it spends.',
        })}
      </P>

      <H2>{t({ zh: '这题考什么', en: 'What the challenge tests' })}</H2>
      <div className="session-note__tagline">
        <Tag>{t({ zh: 'session state', en: 'session state' })}</Tag>
        <Tag>{t({ zh: 'topic routing', en: 'topic routing' })}</Tag>
        <Tag>{t({ zh: 'prefix assembly', en: 'prefix assembly' })}</Tag>
        <Tag>{t({ zh: 'token usage', en: 'token usage' })}</Tag>
        <Tag>{t({ zh: 'state UI', en: 'state UI' })}</Tag>
      </div>
      <P>
        {t({
          zh: '它考的不是谁会接一个大模型 API，也不是谁会做一个 RAG。它考的是一个更接近产品内核的问题：append-only log 只是原料，系统有没有能力从里面重建一个“当前工作面”。',
          en: 'It does not test who can call an LLM API or build another RAG wrapper. It tests a product-core capability: the append-only log is only raw material; the system must reconstruct the current workspace from it.',
        })}
      </P>
      <Flow t={t} />

      <H2>{t({ zh: 'Problem Statement / 问题陈述', en: 'Problem statement' })}</H2>
      <P>
        {t({
          zh: '请构建一个面向长周期 AI workspaces 的 session management layer。它接收混乱的 append-only session log，自动切分 topic 和 task，构建结构化 session state，并在用户继续输入时组装最小有效上下文前缀，驱动单 agent 给出正确回答或继续完成任务。',
          en: 'Build a session management layer for long-running AI workspaces. It receives chaotic append-only session logs, segments topics and tasks, builds structured session state, and assembles the minimum useful context prefix for a single agent to answer correctly or continue the task.',
        })}
      </P>
      <P>
        {t({
          zh: '输入历史可以包含 multi-human 和 multi-agent 内容。评测入口只验证 single-agent input。multi-agent fanout 是允许的实现手段，不是硬要求。系统必须提供 state-centric Web demo，因为这个能力只有在前端可见时，用户才会相信自己不需要切 session。',
          en: 'The history may contain multi-human and multi-agent interactions. Evaluation uses a single-agent input. Multi-agent fanout is allowed as an implementation choice, but not required. A state-centric Web demo is required because users will only trust this capability if the state is visible.',
        })}
      </P>

      <H2>{t({ zh: '测试集长什么样', en: 'What the benchmark looks like' })}</H2>
      <P>
        {t({
          zh: '测试集不需要内部数据。主办方可以提供 synthetic cases。每个 case 都是一个混乱 session：里面有无意义启动信息、多个话题、多个人、多个 agent、工具结果、过时结论和未完成任务。',
          en: 'The benchmark does not need internal data. Organizers can provide synthetic cases. Each case is a messy session containing meaningless startup messages, multiple topics, several humans, several agents, tool results, stale conclusions, and unfinished tasks.',
        })}
      </P>
      <Pre lang="json" filename="session_log.jsonl">{`{"id":"e001","type":"startup","speaker":"system","text":"Agent booted. Loading tools...","topic":null}
{"id":"e014","type":"user","speaker":"human_a","text":"For the release, do not rely on external API calls during startup.","topic":"release"}
{"id":"e026","type":"agent_note","speaker":"agent_research","text":"The failure is probably fixed by commit 71ab.","topic":"release","status":"inference"}
{"id":"e031","type":"tool_result","speaker":"ci","text":"Regression test still fails when external API is disabled.","topic":"release","evidence_id":"ci-031"}
{"id":"e044","type":"user","speaker":"human_b","text":"Switching topic: keep both 'Atlas' and 'Workbench' as product name candidates.","topic":"naming"}
{"id":"e057","type":"summary","speaker":"agent_writer","text":"Release is likely ready; product naming is done.","topic":"mixed","status":"stale"}
{"id":"e063","type":"user","speaker":"human_a","text":"Can we ship now? Also what remains open on naming?","topic":null}`}</Pre>
      <Callout type="note" title={t({ zh: '这个 case 要测什么', en: 'What this case tests' })}>
        <P>
          {t({
            zh: '系统应该判断 release 不能直接发，因为 `ci-031` 说明禁用外部 API 时回归测试仍失败；同时 naming 还没关闭，因为候选名仍有两个。系统不能相信 `e057` 里“都好了”的过时 summary。',
            en: 'The system should decide that the release cannot ship because `ci-031` says the regression still fails with external APIs disabled. It should also say naming is still open because two candidates remain. It must not trust the stale “everything is done” summary in `e057`.',
          })}
        </P>
      </Callout>

      <H2>{t({ zh: '学生要交什么', en: 'What teams build' })}</H2>
      <Cols count={2}>
        <Col>
          <H3>{t({ zh: '最低交付', en: 'Required deliverables' })}</H3>
          <Ul marker="check">
            <Li>{t({ zh: '一个可运行的 Web demo，重点展示 state，而不是只展示聊天。', en: 'A runnable Web demo that exposes state, not just chat.' })}</Li>
            <Li>{t({ zh: '`session_state.json`：topic、task、fact、inference、decision、open loop、artifact、stale claim。', en: '`session_state.json`: topics, tasks, facts, inferences, decisions, open loops, artifacts, and stale claims.' })}</Li>
            <Li>{t({ zh: '`answers.jsonl`：对评测问题的回答，带 evidence id。', en: '`answers.jsonl`: answers to benchmark questions with evidence IDs.' })}</Li>
            <Li>{t({ zh: '`token_usage.json`：每次 prefix assembly 和最终回答的 token usage。', en: '`token_usage.json`: token usage for prefix assembly and final answers.' })}</Li>
            <Li>{t({ zh: '`implementation_review.md`：解释状态结构、前缀策略、模型选择和取舍。', en: '`implementation_review.md`: state model, prefix policy, model choices, and trade-offs.' })}</Li>
          </Ul>
        </Col>
        <Col>
          <H3>{t({ zh: '加分方向', en: 'Bonus directions' })}</H3>
          <Ul>
            <Li>{t({ zh: 'topic graph：展示话题之间的依赖、冲突和回归。', en: 'Topic graph showing dependencies, conflicts, and returns.' })}</Li>
            <Li>{t({ zh: 'prefix diff：展示 append-only baseline 和系统组装前缀的差异。', en: 'Prefix diff comparing append-only baseline and assembled prefix.' })}</Li>
            <Li>{t({ zh: 'stale invalidation：明确标出哪些旧结论已失效。', en: 'Stale invalidation that marks which old claims are no longer valid.' })}</Li>
            <Li>{t({ zh: 'multi-agent fanout：用多个 worker 辅助建状态或做验证。', en: 'Multi-agent fanout for state construction or verification.' })}</Li>
            <Li>{t({ zh: 'LLM judge：辅助横评实现方案，但不能替代 deterministic checks。', en: 'LLM judge for implementation review, without replacing deterministic checks.' })}</Li>
          </Ul>
        </Col>
      </Cols>

      <H2>{t({ zh: '为什么 Web UI 是必需品', en: 'Why the Web UI matters' })}</H2>
      <P>
        {t({
          zh: '这个题不能只做 CLI。CLI 可以证明算法跑得通，但它证明不了产品体验。这个产品的核心承诺是“你不用再切 session”。用户要相信这件事，必须能看到系统现在认为有哪些 topic、哪个 task active、哪些 open loop 没关、哪些证据支撑当前回答、这次用了多少 token。',
          en: 'This cannot be a CLI-only challenge. A CLI can prove the algorithm runs, but not the product experience. The product promise is: you no longer need to switch sessions. To trust that promise, users must see the system’s topics, active tasks, open loops, evidence, and token usage.',
        })}
      </P>
      <P>
        {t({
          zh: '所以 banner image、cover image、信息层级、状态面板都重要。不是因为比赛要漂亮，而是因为 session state 本身不可见。好的前端要把不可见的工作记忆变成用户能理解、能检查、能纠正的界面。',
          en: 'That is why the banner, cover, information hierarchy, and state panels matter. Not because the contest rewards decoration, but because session state is invisible by default. Good UI turns working memory into something users can understand, inspect, and correct.',
        })}
      </P>

      <H2>{t({ zh: '怎么评', en: 'How it is evaluated' })}</H2>
      <Table
        headers={[t({ zh: '维度', en: 'Dimension' }), t({ zh: '看什么', en: 'What to evaluate' })]}
        rows={[
          [t({ zh: '任务表现', en: 'Task performance' }), t({ zh: '回答是否正确，是否能跨话题恢复约束、open loop 和旧证据。', en: 'Whether answers are correct and recover constraints, open loops, and evidence across topics.' })],
          [t({ zh: '证据引用', en: 'Evidence grounding' }), t({ zh: '关键结论是否引用正确 event/resource id，是否区分 fact 和 inference。', en: 'Whether key claims cite the correct event/resource IDs and distinguish facts from inferences.' })],
          [t({ zh: 'Token usage', en: 'Token usage' }), t({ zh: '相比最近窗口、普通摘要、简单 RAG baseline，是否用更少上下文获得更好结果。', en: 'Whether it beats recent-window, narrative-summary, and simple-RAG baselines with less context.' })],
          [t({ zh: '状态设计', en: 'State design' }), t({ zh: 'session state 是否结构清晰，可机器读取，可被后续 agent 继续使用。', en: 'Whether session state is clear, machine-readable, and reusable by later agents.' })],
          [t({ zh: 'Web 产品感', en: 'Web product quality' }), t({ zh: '状态是否可见、可理解、可检查，页面是否能让用户想用。', en: 'Whether state is visible, understandable, inspectable, and usable as a product.' })],
          [t({ zh: '实现横评', en: 'Implementation review' }), t({ zh: '用 LLM 和人工共同比较 schema、routing、prefix policy、取舍和可复现性。', en: 'Human and LLM-assisted review of schema, routing, prefix policy, trade-offs, and reproducibility.' })],
        ]}
      />

      <H2>{t({ zh: '技术边界', en: 'Technical boundaries' })}</H2>
      <Ul>
        <Li>{t({ zh: '技术栈不限。可以用开源 LLM、商业 LLM、vector DB、graph DB、context DB、agent harness、browser automation。', en: 'The stack is open: open-source or commercial LLMs, vector DBs, graph DBs, context DBs, agent harnesses, and browser automation are all allowed.' })}</Li>
        <Li>{t({ zh: '不能只说“我用了 RAG”。必须说明 session state schema、routing policy、prefix assembly 和 token accounting。', en: '“We used RAG” is not enough. Teams must explain the session state schema, routing policy, prefix assembly, and token accounting.' })}</Li>
        <Li>{t({ zh: '最终方案建议开源。评测不仅看结果，也看实现是否值得别人复现和学习。', en: 'Final solutions should be open source. The benchmark evaluates not only the result, but also whether the implementation is reproducible and worth learning from.' })}</Li>
        <Li>{t({ zh: 'multi-agent 可以用，但不是必须。强单 agent + 好 session manager 也应该能拿高分。', en: 'Multi-agent systems are allowed but not required. A strong single-agent implementation with a good session manager can score highly.' })}</Li>
      </Ul>

      <H2>{t({ zh: '三天怎么做', en: 'Three-day plan' })}</H2>
      <Table
        headers={[t({ zh: '时间', en: 'Time' }), t({ zh: '应该完成什么', en: 'What to finish' })]}
        rows={[
          [t({ zh: 'Day 1', en: 'Day 1' }), t({ zh: '读懂 benchmark，解析 session log，定义 state schema，跑 append-only baseline。', en: 'Understand the benchmark, parse session logs, define the state schema, and run an append-only baseline.' })],
          [t({ zh: 'Day 2', en: 'Day 2' }), t({ zh: '实现 topic/task routing、state extraction、prefix assembly、token accounting，开始 Web UI。', en: 'Implement topic/task routing, state extraction, prefix assembly, token accounting, and start the Web UI.' })],
          [t({ zh: 'Day 3', en: 'Day 3' }), t({ zh: '跑完所有 cases，优化任务表现和 token usage，完成 state UI、报告和实现解释。', en: 'Run all cases, improve task quality and token usage, finalize the state UI, report, and implementation explanation.' })],
        ]}
      />

      <H2>{t({ zh: '最后压缩', en: 'Compressed version' })}</H2>
      <P>
        <Strong>
          {t({
            zh: '这道题的最终目标不是让 session 真的无限长，而是让用户不用感知 session 的边界。系统应该把无限长体验翻译成有限 token 下的正确工作状态。',
            en: 'The goal is not to make sessions literally infinite. The goal is to hide session boundaries from the user by translating an infinite-session experience into correct working state under finite token budgets.',
          })}
        </Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'beyond-append-only-sessions',
  Component: BeyondAppendOnlySessions,
  meta: {
    title: {
      zh: '默认 Session 应该无限长',
      en: 'The Default Session Should Feel Infinite',
    },
    description: {
      zh: '一个更自然的 AI agent 题目：用户不用切 session，系统自动切 topic、组装前缀、控制 token，并用 Web UI 展示工作状态。',
      en: 'A more natural AI agent challenge: users stop switching sessions while the system routes topics, assembles prefixes, controls tokens, and exposes working state in a Web UI.',
    },
    cover,
    publishedAt: '2026-05-31',
    readingTime: { zh: 8, en: 8 },
    category: { zh: 'Agent 工程', en: 'Agent Engineering' },
    tags: ['agents', 'session-management', 'evaluation', 'ux'],
    languages: ['zh', 'en'],
    llmPath: '/post/beyond-append-only-sessions/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者', en: 'Author' },
      },
    ],
  },
};
