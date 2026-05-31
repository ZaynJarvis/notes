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
} from '../../blog-components';

const cover = '/assets/covers/ai-agent-hackathon-problems.png';

const AiAgentHackathonProblems = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('一个好的 AI agent hackathon 题目，不应该让学生再做一个聊天机器人或 RAG demo。它应该把真实工程问题压成 72 小时内可实现、可评审、可比较的 artifact。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('题目的目标不是展示“用了 AI”，而是筛出能处理状态、工具、证据、边界和失败恢复的人。')}
        </P>
      </Callout>

      <H2>{label('先确定题目的真实用途')}</H2>
      <P>
        {label('招聘型 hackathon 的题目不是课堂作业。它同时承担三件事：让学生理解团队在做什么，让团队看到学生如何拆问题，让评委能用相同标准比较不同方案。')}
      </P>
      <P>
        {label('所以题面不能只写一个宏大方向。它要把真实团队问题转成外部可做的任务，同时保留足够判断力：学生是否能建模边界，是否能处理脏数据和失败状态，是否能解释为什么这样设计。')}
      </P>

      <H2>{label('题目必须穿过四个约束')}</H2>
      <Table
        headers={[label('约束'), label('含义'), label('失败形态')]}
        rows={[
          [label('真实'), label('来自团队正在面对的工程摩擦'), label('题目像玩具，做完没有判断价值')],
          [label('可做'), label('72 小时内能做出可运行 artifact'), label('学生只能写方案，无法验证')],
          [label('可评'), label('有明确输入、输出、边界和评分信号'), label('评委只能凭演示观感打分')],
          [label('安全'), label('不暴露内部系统、数据、客户、流程和项目名'), label('公开传播时留下不必要风险')],
        ]}
      />
      <P>
        {label('这四个约束里，最容易被忽略的是“可评”。题目如果没有可比较的评审面，最后会变成谁的 demo 更顺、PPT 更会讲。AI agent 题尤其容易这样失败。')}
      </P>

      <H2>{label('不要写成“做一个 AI agent”')}</H2>
      <P>
        {label('“做一个 AI agent”是低信号题。它鼓励学生堆模型、工具和 UI，但很少暴露真正的工程能力。更好的题面应该指定 agent 要面对的控制问题：上下文预算、事件流、工具失败、证据链、或阅读时的模型更新。')}
      </P>
      <Callout type="warn" title={label('一个简单判断')}>
        <P>
          {label('如果一个题目换成任何 LLM wrapper 都能交付，它就不是一个好题。好题应该迫使参赛者处理机制、边界和 failure mode。')}
        </P>
      </Callout>

      <H2>{label('五个适合当前 AI agent 方向的题')}</H2>

      <H3>{label('1. 长任务 Agent 的上下文预算管理器')}</H3>
      <P>
        {label('问题：长任务 agent 经常在两种失败之间摆动：保留太多噪音，或者丢掉关键状态。参赛者要做一个系统，在固定 token budget 下选择、压缩、引用和恢复最小可用上下文。')}
      </P>
      <Ul marker="check">
        <Li>{label('交付：上下文选择 pipeline、keep/drop 理由、可回读引用、小型评测集、API 或 UI demo。')}</Li>
        <Li>{label('评审信号：引用是否正确，是否能拒绝过期/无关信息，是否区分 memory、session、checkpoint 和 scaffold。')}</Li>
        <Li>{label('风险：如果不设计恢复评测，它会退化成普通 RAG demo。')}</Li>
      </Ul>

      <H3>{label('2. 多 Agent 工作区时间线调试器')}</H3>
      <P>
        {label('问题：多 agent 协作时，消息、工具调用、任务状态、错误和验证结果会形成一条嘈杂事件流。参赛者要重建“到底发生了什么”，找出阻塞、重复工作、危险交接和缺失证据。')}
      </P>
      <Ul marker="check">
        <Li>{label('交付：事件 ingestion schema、时间线 UI、阻塞检测、任务状态 reconciliation report。')}</Li>
        <Li>{label('评审信号：能否回答谁做了什么、证据是什么、现在卡在哪里，以及下一步该谁处理。')}</Li>
        <Li>{label('风险：如果只展示日志，它没有价值。题目必须要求诊断和下一步建议。')}</Li>
      </Ul>

      <H3>{label('3. Agent 工具调用可靠性测试台')}</H3>
      <P>
        {label('问题：agent 失败常常不是模型不会回答，而是工具出错、权限缺失、状态过期、参数错误、危险重试或半成功状态未处理。参赛者要构造一个 failure harness，测试 agent 能否安全恢复。')}
      </P>
      <Ul marker="check">
        <Li>{label('交付：工具失败模拟器、恢复策略、trace viewer、评分 rubric。')}</Li>
        <Li>{label('评审信号：是否区分权限错误、暂时性错误、破坏性操作、参数错误和 ambiguous state。')}</Li>
        <Li>{label('风险：如果只做 retry framework，信号不够。场景必须包含安全和部分成功。')}</Li>
      </Ul>

      <H3>{label('4. 面向技术材料的 source-grounded reading copilot')}</H3>
      <P>
        {label('问题：大多数 summarizer 会把技术材料压平成低价值摘要。参赛者要做一个阅读 copilot，先捕捉读者 prior，再判断哪些内容可能改变模型，最后给出有来源的 knowledge update card。')}
      </P>
      <Ul marker="check">
        <Li>{label('交付：文档 ingestion、prior capture、gap classifier、带引用的 update card、review questions。')}</Li>
        <Li>{label('评审信号：是否能跳过已知背景，提取 mechanism、boundary、failure mode 和 trade-off。')}</Li>
        <Li>{label('风险：非常容易被误解成总结器。题面要明确 generic summary 不算成功。')}</Li>
      </Ul>

      <H3>{label('5. 工程任务 evidence pack 生成器')}</H3>
      <P>
        {label('问题：工程 agent 经常说“done”，但人类很难判断它是否真的完成。参赛者要把 diff、测试、日志、截图、部署检查和 PR metadata 转成紧凑证据包。')}
      </P>
      <Ul marker="check">
        <Li>{label('交付：repo/task trace parser、evidence pack generator、policy checks、示例报告。')}</Li>
        <Li>{label('评审信号：是否能把 root cause、change、validation、residual risk 和 rollback 对齐到证据。')}</Li>
        <Li>{label('风险：如果只是把日志改写成 prose，就没有用。难点是 claim-evidence alignment。')}</Li>
      </Ul>

      <H2>{label('我会优先投前两个')}</H2>
      <P>
        {label('第一个题技术深，能直接测出参赛者对 context、state、compression 和 evidence 的理解。第二个题 demo 更容易打动人，也更容易把多 agent 协作的真实问题讲清楚。')}
      </P>
      <P>
        {label('如果只能交一个题，我会选“长任务 Agent 的上下文预算管理器”。如果可以先给两个方向，我会给 1 和 2。4 很贴阅读产品，但必须把题面写得很硬，否则会被做成 summarizer。3 和 5 的招聘信号强，但 workshop 要先讲清楚 failure taxonomy 和 evidence taxonomy。')}
      </P>

      <H2>{label('正式题面应该长什么样')}</H2>
      <P>
        {label('下一步不是继续想更多题，而是把一个题扩成可执行模板。一个正式 problem statement 至少需要这些部分：')}
      </P>
      <Ul>
        <Li>{label('背景：这个问题为什么真实存在。')}</Li>
        <Li>{label('任务：参赛者要构建什么，输入输出是什么。')}</Li>
        <Li>{label('数据：给什么 mock trace、文档、日志或任务样本。')}</Li>
        <Li>{label('最低要求：必须实现哪些功能。')}</Li>
        <Li>{label('进阶方向：允许强队拉开差距的空间。')}</Li>
        <Li>{label('交付物：代码、demo、报告、评测结果、设计解释。')}</Li>
        <Li>{label('评分标准：正确性、鲁棒性、可解释性、产品完成度、工程质量。')}</Li>
      </Ul>

      <H2>{label('最后的压缩')}</H2>
      <P>
        <Strong>
          {label('好题不是让学生证明他们会调 API，而是让他们在受限时间里暴露工程判断：状态怎么保存，证据怎么对齐，失败怎么恢复，边界怎么保护。')}
        </Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'ai-agent-hackathon-problems',
  Component: AiAgentHackathonProblems,
  meta: {
    title: { zh: 'AI Agent Hackathon 题目怎么写' },
    description: { zh: '一个好的 AI agent hackathon 题目，应该把真实工程问题压成可做、可评、可比较的 artifact，而不是让学生再做一个聊天机器人。' },
    cover,
    publishedAt: '2026-05-31',
    readingTime: { zh: 6 },
    category: { zh: 'Agent 工程' },
    tags: ['agents', 'hackathon', 'evaluation', 'engineering'],
    languages: ['zh'],
    llmPath: '/post/ai-agent-hackathon-problems/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
