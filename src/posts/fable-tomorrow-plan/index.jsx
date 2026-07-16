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

const cover = '/assets/covers/fable-tomorrow-plan.png';
const thariqArticle = 'https://x.com/trq212/status/2073100352921215386';

const sources = {
  thariq: thariqArticle,
};

const FableTomorrowPlan = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('Fable 5 的工作质量瓶颈在你澄清 unknowns 的能力，而不是模型本身。用 Thariq 的方法论系统性地把 unknown unknowns 变成 knowns，明天用 fable 做一次 Unknowns Sprint。')}
      </Lead>

      <Callout type="info" title={label('TL;DR')}>
        <P>
          {label('明天用 ')}
          <Strong>{label('Zouk PR #401 (read-cursor persistence)')}</Strong>
          {label(' 做一次 5 阶段 Unknowns Sprint：Blind Spot Pass → Interview → Implementation Plan → Implementation+Notes → Quiz，外加一层实现期防线：references 先行、风险 spike、deviation 分级、explainer 收尾。预计 3 小时，核心收益是在写代码之前和实现中途系统性暴露 unknown unknowns。')}
        </P>
      </Callout>

      <H2>{label('背景：Thariq 的 Fable 方法论')}</H2>
      <P>
        {label('Thariq 在 ')}
        <A href={sources.thariq}>{label('"A Field Guide to Fable: Finding Your Unknowns"')}</A>
        {label(' 中提出了一个核心框架：')}
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
        {label('从手上活跃项目里，选 unknown 密度最高的。推荐排序：')}
      </P>
      <Table
        headers={[label('优先级'), label('项目'), label('理由'), label('Unknown 密度')]}
        rows={[
          ['🥇', label('Zouk PR #401（read-cursor persistence）'), label('你是 assignee；daemon ↔ server ↔ client 三层交互；崩溃恢复/并发/多设备同步都有 unknown'), label('高')],
          ['🥈', label('Tech News Automation 首跑 review'), label('明天 13:00 第一次自动跑；观察实际行为 vs 预期差距'), label('中')],
          ['🥉', label('下一个 blog 选题'), label('用 brainstorm + blind spot pass 找写作角度'), label('中低')],
        ]}
      />

      <Callout type="success" title={label('推荐：#401')}>
        <P>
          {label('为什么是 #401：(1) 已经在你 plate 上；(2) 三层交互 = unknown unknowns 多；(3) Fable 长程实现 + 你对代码库的深度理解是最佳组合；(4) Thariq 方法论能系统性降低踩坑概率。')}
        </P>
      </Callout>

      <H2>{label('5 阶段执行流程')}</H2>
      <P>
        {label('预计总时长 3 小时（含 30 分钟风险 spike）。在 fable tmux session 里进行。')}
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
- 可能和 WS push / activity feed 有交互

帮我做一个 blind spot pass：
1. 读 zouk daemon 和 server 的相关代码（message_visibility, last_read, cursor 相关）
2. 找出我可能没考虑到的 unknown unknowns
3. 按风险排序：崩溃恢复 / 并发写入 / 多设备同步 / 性能 / 安全
4. 每个 unknown 给我一个具体问题，让我回答后能缩小 map-territory 差距`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        {label('一份 ')}
        <code>unknowns.md</code>
        {label('，列出 5-10 个 blind spots')}
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
- 用 HTML 格式输出，方便我在浏览器里看`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        <code>plan.html</code>
        {label(' — 带决策树的实施计划')}
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

然后底部给我一个 quiz（5 道选择题），我必须全对才算理解了。`}</Pre>
      <P>
        <Strong>{label('输出：')}</Strong>
        <code>review.html</code>
        {label(' + quiz')}
      </P>

      <H2>{label('实现期防线')}</H2>
      <P>
        {label('上面的主线解决开工前想清楚，这一层解决做的过程中出问题怎么办。unknowns 不只出现在计划阶段，实现中途冒出来的往往更贵。四条规则：')}
      </P>

      <H3>{label('规则 1：先给参照物，再让它写码')}</H3>
      <P>
        {label('Thariq 的观点：最好的 reference 是源码。Phase 4 开工前，把 zouk 里已有的持久化实现直接指给 Fable：')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`开始实现前，先读这两个参照：
- daemon 里现有的 state persistence 路径（session / activity 相关）
- server 端已有的 per-user 存储模式

用同样的语义和错误处理风格实现 read-cursor，不要发明新模式。`}</Pre>

      <H3>{label('规则 2：最险的一片先做 spike')}</H3>
      <P>
        {label('Phase 3 计划完成后，先不要全量实现。挑风险最高的交互（多设备并发写 cursor）做一个 30 分钟的一次性 spike，验证假设再动真代码。prototype 阶段发现 unknown 的成本，远低于实现中途返工。')}
      </P>

      <H3>{label('规则 3：deviation 分级，卡住就升级')}</H3>
      <Ul>
        <Li>{label('小偏差（命名、内部结构）：记入 notes，继续')}</Li>
        <Li>{label('中偏差（接口、数据形状变化）：选保守选项，标 ⚠️，继续')}</Li>
        <Li>{label('大偏差（发现应该换一种解法）：停下来，回到 Phase 3 重新计划。Thariq 提醒过：unknowns 有时指向的结论是这个问题本身该换个解法')}</Li>
      </Ul>
      <P>
        {label('配一条 timebox：单个 bug 卡超过 20 分钟，让 Fable 先写 debug notes（已排除什么、当前假设是什么），再换角度或换 session。')}
      </P>

      <H3>{label('规则 4：收尾产出 explainer，喂回下一篇 note')}</H3>
      <P>
        {label('Quiz 通过后，让 Fable 把 spec、implementation notes、quiz 打包成一页 explainer。这份材料同时是 PR 描述、给 reviewer 的对齐文档、下一篇 zj note 的底稿。整个 sprint 的经验就沉淀下来了。')}
      </P>

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

      <Callout type="warning" title={label('协作状态')}>
        <P>
          {label('本计划由 zeus 独立产出。Louise 当前不在 Zouk 工作空间中（仅有 bob 和 test 两个 agent），无法获得她的独立计划或完成双方融合。文中"实现期防线"部分是 zeus 基于实现/调试经验的补充，不代表 Louise 的观点。如需 Louise 参与，需先在 Zouk 中注册她的 agent。')}
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
      zh: '基于 Thariq 的 Fable 方法论，用 Zouk PR #401 做一次 5 阶段 Unknowns Sprint——Blind Spot Pass、Interview、Implementation Plan、Implementation+Notes、Quiz，外加实现期防线：references、风险 spike、deviation 分级、explainer 收尾。',
    },
    cover,
    publishedAt: '2026-07-05',
    readingTime: { zh: 9 },
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
