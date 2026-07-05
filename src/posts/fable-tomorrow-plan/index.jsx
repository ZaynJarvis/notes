import React from 'react';
import {
  Article,
  Lead,
  H2,
  H3,
  P,
  Ul,
  Ol,
  Li,
  Table,
  Callout,
  Strong,
  A,
  Pre,
} from '../../blog-components';

const cover = '/assets/covers/fable-5-superiority.png';
const thariqArticle = 'https://x.com/trq212/status/2073100352921215386';
const companionExamples = 'https://thariqs.github.io/html-effectiveness/unknowns/';

const sources = {
  thariq: thariqArticle,
  examples: companionExamples,
  pr401: 'https://github.com/ZaynJarvis/zouk/pull/401',
};

const FableTomorrowPlan = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('Fable 5 的工作质量瓶颈不是模型会不会写，而是你能不能把真实工作里的 unknowns 暴露出来。明天最值得做的，不是再让 Fable 机械实现一个功能，而是拿一个真实高不确定性任务做一次 Unknowns Sprint。')}
      </Lead>

      <Callout type="info" title={label('TL;DR')}>
        <P>
          {label('明天用 ')}
          <Strong>{label('Zouk PR #401 (read-cursor persistence)')}</Strong>
          {label(' 做一次 5 阶段 Unknowns Sprint：Blind Spot Pass → Interview → Implementation Plan → Implementation+Notes → Quiz。预计 2-3 小时，交付物是一份 ')}
          <code>fable-unknowns-brief.html</code>
          {label('，里面有 unknowns matrix、参考代码路径、方案分歧、已回答决策、实施计划和合并前 quiz。')}
        </P>
      </Callout>

      <H2>{label('背景：Thariq 的 Fable 方法论')}</H2>
      <P>
        {label('Thariq 在 ')}
        <A href={sources.thariq}>{label('"A Field Guide to Fable: Finding Your Unknowns"')}</A>
        {label(' 和 companion examples ')}
        <A href={sources.examples}>{label('"Know your unknowns"')}</A>
        {label(' 里提出了一个核心框架：')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('Map ≠ Territory')}</Strong>
          {label(' — 你给 Claude 的 prompt/skills/context 是"地图"，真实代码库和问题是"领土"，两者差距 = unknowns')}
        </Li>
        <Li>
          <Strong>{label('4 种 Unknowns')}</Strong>
          {label('：Known Knowns（prompt 里写的）、Known Unknowns（你知道自己不懂的）、Unknown Knowns（太显然不会写但看到会认的）、Unknown Unknowns（完全没考虑过的）')}
        </Li>
        <Li>
          <Strong>{label('核心技能')}</Strong>
          {label('：在实施前、中、后系统性地发现和澄清 unknowns')}
        </Li>
      </Ul>

      <H3>{label('Thariq 的技巧清单')}</H3>
      <Table
        headers={[label('阶段'), label('技巧'), label('解决什么 unknown')]}
        rows={[
          ['Pre', 'Blind Spot Pass', label('Unknown Unknowns → Known Unknowns')],
          ['Pre', 'Brainstorms / Prototypes', label('Unknown Knowns（看到就知道）')],
          ['Pre', 'Interviews', label('模糊点 → 明确决策')],
          ['Pre', 'References', label('无法描述的需求 → 源码参考')],
          ['Pre', 'Implementation Plan', label('Known Unknowns → 可执行步骤')],
          ['During', 'Implementation Notes', label('追踪新发现的 unknowns')],
          ['Post', 'Pitches / Explainers', label('让 reviewer 快速对齐')],
          ['Post', 'Quizzes', label('验证你真的理解了改动')],
        ]}
      />

      <H2>{label('选什么项目？')}</H2>
      <P>
        {label('从手上活跃项目里，选 unknown 密度最高、但又足够真实的任务。推荐排序：')}
      </P>
      <Table
        headers={[label('优先级'), label('项目'), label('理由'), label('Unknown 密度')]}
        rows={[
          ['🥇', label('Zouk PR #401（read-cursor persistence）'), label('open PR；daemon ↔ server ↔ client 三层交互；崩溃恢复、并发、多设备同步、workspace 边界都有 unknown'), label('高')],
          ['🥈', label('Tech News Automation 首跑 review'), label('明天 13:00 第一次自动跑；观察实际行为 vs 预期差距'), label('中')],
          ['🥉', label('下一个 blog 选题'), label('用 brainstorm + blind spot pass 找写作角度'), label('中低')],
        ]}
      />

      <Callout type="success" title={label('推荐：#401')}>
        <P>
          {label('为什么是 ')}
          <A href={sources.pr401}>{label('#401')}</A>
          {label('：(1) 已经是 open PR；(2) 三层交互 = unknown unknowns 多；(3) Fable 长程实现 + 你对代码库的深度理解是最佳组合；(4) Thariq 方法论能系统性降低踩坑概率。')}
        </P>
      </Callout>

      <H2>{label('融合后的工作原则')}</H2>
      <P>
        {label('Zeus 的计划给出了一个具体练习对象：#401。Louise clone 的计划补了一个关键约束：不要把 Fable 当作"更强执行器"，而要把它当作"unknown discovery partner"。所以明天的目标不是快速把 PR 写完，而是验证一套能复用到 Zouk / OpenViking / Notes 的工作法。')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('先让 Fable 找 unknowns')}</Strong>
          {label('：明确 known knowns / known unknowns / unknown knowns / unknown unknowns，而不是马上让它改代码。')}
        </Li>
        <Li>
          <Strong>{label('先看 reference')}</Strong>
          {label('：让它读相关代码、旧 PR、相邻功能和外部参考，把抽象偏好变成可指向的证据。')}
        </Li>
        <Li>
          <Strong>{label('先给多个方向')}</Strong>
          {label('：要求 3-4 个差异足够大的方向，并写出"什么条件会让这个方向变错"。')}
        </Li>
        <Li>
          <Strong>{label('实现中持续记账')}</Strong>
          {label('：每个偏离计划的地方都写进 implementation notes，标出是保守选择、用户决策还是新发现的 unknown。')}
        </Li>
      </Ul>

      <H2>{label('5 阶段执行流程')}</H2>
      <P>
        {label('预计总时长 2-3 小时。在 fable tmux session 里进行；若当天有生产火情，只抽取其中最有歧义的 30-45 分钟切片做这套流程。')}
      </P>

      <H3>{label('Phase 1: Blind Spot Pass (30 min)')}</H3>
      <P>
        <Strong>{label('目标：')}</Strong>
        {label('把 unknown unknowns 变成 known unknowns')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`我是 Zayn，Zouk 项目的 owner。我要做 read-cursor persistence（PR #401）。

我对这个 feature 的理解是：
- 需要持久化每个用户/channel 的最后阅读位置
- 涉及 server 端存储和 client 端上报
- 可能和 WS push / activity feed / workspace scope 有交互
- 我担心模型会默认做一个"看起来能跑"但边界不稳的实现

帮我做一个 blind spot pass：
1. 读 zouk daemon 和 server 的相关代码（message_visibility, last_read, cursor 相关）
2. 找出我可能没考虑到的 unknown unknowns
3. 按风险排序：崩溃恢复 / 并发写入 / 多设备同步 / 性能 / 安全
4. 每个 unknown 给我一个具体问题，让我回答后能缩小 map-territory 差距`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        {label('一份 ')}
        <code>unknowns.md</code>
        {label('，列出 5-10 个 blind spots，并标注每个 blind spot 会影响数据模型、UX、WS、迁移、测试还是部署')}
      </P>

      <H3>{label('Phase 2: Interview (20 min)')}</H3>
      <P>
        <Strong>{label('目标：')}</Strong>
        {label('澄清 unknown knowns')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`基于刚才的 blind spot pass，逐个问我问题。
一次只问一个。优先问"我的回答会改变架构决策"的问题。
对于每个问题，给我 2-3 个选项让我选（而不是开放式回答）。`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        {label('澄清后的架构决策清单')}
      </P>

      <H3>{label('Phase 3: Implementation Plan (30 min)')}</H3>
      <P>
        <Strong>{label('目标：')}</Strong>
        {label('把澄清后的 unknowns 变成可执行计划')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`基于我们的讨论，写一个 implementation plan。
要求：
- 重点放在最可能变的部分（数据模型变更、新类型接口、用户可见行为）
- 机械性重构放最后（我信任你）
- 每个步骤标注：这步解决了哪个 unknown
- 写出 3-4 个方案方向，以及"什么证据会让这个方向不成立"
- 用 HTML 格式输出，方便我在浏览器里看和批注`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        <code>plan.html</code>
        {label(' — 带方向对比、决策树和风险预算的实施计划')}
      </P>

      <H3>{label('Phase 4: Implementation + Notes (60-90 min)')}</H3>
      <P>
        <Strong>{label('目标：')}</Strong>
        {label('动手实现，追踪偏差')}
      </P>
      <P>
        {label('开一个新 session（保持 plan session 干净）：')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`这是 spec 文件和实施计划。开始实现 read-cursor persistence。

规则：
- 保持 implementation-notes.md
- 如果遇到 edge case 迫使你偏离计划，选保守选项，记在 "Deviations" 下，继续
- 每个 deviation 标注：触发了哪个 unknown（如果是新发现的 unknown unknown，标 ⚠️）
- 如果某个决定会改变用户可见行为或数据模型，停下来问我；不要替我拍板
- 写完后跑相关测试`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        {label('代码 + ')}
        <code>implementation-notes.md</code>
        {label('（含 deviations 列表）')}
      </P>

      <H3>{label('Phase 5: Quiz (15 min)')}</H3>
      <P>
        <Strong>{label('目标：')}</Strong>
        {label('验证你真的理解了改了什么')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`我想确保我完全理解这次改动。
给我一个 HTML 报告：
- 改了什么（文件/函数级别）
- 每个改动解决了哪个 unknown
- 有什么 trade-off
- 残留风险是什么
- 哪些实现笔记应该保留到 PR description / docs / follow-up

然后底部给我一个 quiz（5 道选择题），我必须全对才算理解了。`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        <code>fable-unknowns-brief.html</code>
        {label(' + merge/readiness quiz')}
      </P>

      <H2>{label('明天的具体时间盒')}</H2>
      <Table
        headers={[label('时间盒'), label('动作'), label('停手标准')]}
        rows={[
          ['0:00-0:15', label('收集 source packet：PR #401、相关文件、旧 cursor/visibility 行为、用户期望'), label('Fable 能复述问题边界')],
          ['0:15-0:45', label('Blind Spot Pass'), label('至少 5 个有架构影响的 unknown')],
          ['0:45-1:05', label('Interview'), label('只剩可接受的小歧义')],
          ['1:05-1:35', label('方案对比 + plan.html'), label('你能删掉/选中一个方向')],
          ['1:35-2:45', label('实现或只做 proof slice + implementation-notes'), label('关键边界有测试或明确 follow-up')],
          ['2:45-3:00', label('brief + quiz'), label('能判断是否 merge / continue / split PR')],
        ]}
      />

      <H2>{label('为什么这是好计划')}</H2>
      <Ol>
        <Li>
          <Strong>{label('直接应用文章方法论')}</Strong>
          {label(' — 每个 phase 对应 Thariq 的一个技巧')}
        </Li>
        <Li>
          <Strong>{label('低风险高回报')}</Strong>
          {label(' — Blind Spot Pass 成本极低（30 min），但能避免实现中踩大坑')}
        </Li>
        <Li>
          <Strong>{label('可验证')}</Strong>
          {label(' — Quiz 确保你真的理解了改动，不只是"让 Claude 写了代码"')}
        </Li>
        <Li>
          <Strong>{label('可复用')}</Strong>
          {label(' — 这套流程可以套用到任何项目上')}
        </Li>
        <Li>
          <Strong>{label('不会过度相信模型')}</Strong>
          {label(' — 每个阶段都把 Fable 的输出转成可审查 artifact，而不是隐式接受它的假设')}
        </Li>
      </Ol>

      <H2>{label('备选方案')}</H2>
      <P>
        {label('如果不做 #401：')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('Tech News Automation Review')}</Strong>
          {label(' — 用 Blind Spot Pass 分析实际输出 vs 预期输出的差距；Interview 你对"好的 tech digest"的 unknown knowns')}
        </Li>
        <Li>
          <Strong>{label('Blog 选题 Brainstorm')}</Strong>
          {label(' — "写一篇关于 agent 协作的文章，给我 5 个截然不同的切入点"')}
        </Li>
      </Ul>

      <Callout type="info" title={label('融合结论')}>
        <P>
          {label('最终采用 Zeus 的具体对象选择（#401）+ Louise clone 的流程约束（unknown discovery partner）。明天的最佳用法是：用 Fable 先降低未知密度，再决定是否实现；若实现，也必须留下 implementation notes 和合并前 quiz。')}
        </P>
      </Callout>
    </Article>
  );
};

export default {
  id: 'fable-tomorrow-plan',
  Component: FableTomorrowPlan,
  meta: {
    title: { zh: '明天用 Fable 做什么：一次 Unknowns Sprint' },
    description: {
      zh: '基于 Thariq 的 Fable unknowns 方法论，用 Zouk PR #401 做一次 5 阶段 Unknowns Sprint，并把 Fable 当作 unknown discovery partner，而不是单纯执行器。',
    },
    cover,
    publishedAt: '2026-07-05',
    readingTime: { zh: 8 },
    category: { zh: 'AI 工作流' },
    tags: ['ai', 'claude', 'fable-5', 'agents', 'workflow', 'zouk'],
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
