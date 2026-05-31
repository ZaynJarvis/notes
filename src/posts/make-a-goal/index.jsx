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

const cover = '/assets/covers/make-a-goal.png';
const lockeLatham = 'https://goal-lab.psych.umn.edu/orgPsych/readings/5.%20Motivation/Locke%20%26%20Latham%20%282002%29.pdf';
const selfDetermination = 'https://pubmed.ncbi.nlm.nih.gov/11392867/';
const bandura = 'https://pubmed.ncbi.nlm.nih.gov/847061/';
const mentalContrasting = 'https://bpb-us-e1.wpmucdn.com/wp.nyu.edu/dist/c/6235/files/2019/02/oettingen-et-al-2001-self-regulation-of-goal-setting.pdf';
const implementationIntentions = 'https://www.socmot.uni-konstanz.de/publications/implementation-intentions-strong-effects-simple-plans';
const goalSystems = 'https://researchconnect.suny.edu/en/publications/a-theory-of-goal-systems/';

const MakeAGoal = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('一个真正能用的目标不是愿望、KPI 或 SMART 句子，而是一个控制系统：它让未来行为在不确定性下持续校准。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('Zayn 现在不是缺大方向，而是缺把大方向变成 daily-correctable identity evidence 的系统。热情通常不是输入，而是 agency、traction、coherence 和 fit 的滞后信号。')}
        </P>
      </Callout>

      <H2>{label('一页版')}</H2>
      <P>
        {label('目标要能运行，至少要穿过这十个槽位。如果一个槽位填不出来，它就还不是目标，只是愿望。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`Vision
  为什么这个方向值得存在？

Identity hypothesis
  如果我持续这么做，我在成为谁？

Goal type
  这是 outcome / performance / learning / exploration 的哪一种？

Desired state
  30-90 天后现实中什么会不同？

Current state
  现在真实状态是什么？

Daily control variable
  今天或本周我能控制什么？

Feedback
  哪个 leading indicator / learning signal 能告诉我是否有效？

Obstacle
  最可能打断我的阻力是什么？

If-then
  如果阻力出现，我立刻做什么？

Review / kill criteria
  什么时候继续、调整、暂停或杀掉？`}</Pre>

      <H2>{label('你当前的问题不是没有目标')}</H2>
      <P>
        {label('你已经有 broad direction：OpenViking、Zouk、human-AI collaboration substrate、context lifecycle、agent runtime。真正缺的是中间层：从 vision 到 identity hypothesis，再到可验证目标、daily variable 和 feedback loop。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`vision 太大
  -> identity 太虚
    -> goal 不可验证
      -> daily action 只能靠短期任务驱动
        -> passion 没有地方生成`}</Pre>
      <P>
        {label('所以这篇不是让你“发现热情”，而是给你一个系统：通过真实 artifact 生成 evidence，让热情、身份和方向从反馈里长出来。')}
      </P>

      <H2>{label('模型索引')}</H2>
      <Table
        headers={[label('模型'), label('解决的问题'), label('一句话用法')]}
        rows={[
          [label('目标是控制系统'), label('愿望无法执行'), label('找 desired/current gap、control variable、feedback')],
          [label('目标层级'), label('愿景太大，行动太散'), label('vision -> identity -> outcome -> project -> daily variable')],
          [label('目标类型'), label('不知道目标时硬设 KPI'), label('区分 outcome / performance / learning / exploration')],
          [label('Goal-setting theory'), label('目标太模糊'), label('明确、困难、有反馈；复杂任务先用 learning goal')],
          [label('Feedback loop'), label('做了很多但不知道有没有用'), label('设计 leading indicator 和 learning signal')],
          [label('SDT / self-efficacy'), label('没热情、没能量'), label('诊断 autonomy、competence、relatedness、agency')],
          [label('Mental contrasting'), label('只幻想未来'), label('把 wish 和 obstacle 放在一起')],
          [label('Implementation intention'), label('关键时刻断掉'), label('写 if situation, then action')],
          [label('Goal systems'), label('目标太多互相打架'), label('建 goal graph，而不是 todo list')],
          [label('Goal shielding'), label('新想法/新任务偷资源'), label('给 focal goal 设边界')],
          [label('Exploration vs exploitation'), label('不知道想要什么'), label('先设探索目标，用证据生成偏好')],
          [label('Goal review'), label('目标变成僵硬承诺'), label('daily/weekly/monthly review + kill criteria')],
        ]}
      />

      <H2>{label('1. 目标是控制系统，不是愿望')}</H2>
      <P>
        {label('控制系统的基本结构是 desired state -> current state -> gap -> operation -> feedback -> update。个人目标也一样：你想让现实出现什么变化，现在真实状态是什么，你能控制什么动作，反馈如何进入下一轮修正。')}
      </P>
      <P>
        {label('当你说“我想更有目标感”时，不要先找一句更燃的话。先问：目标感的 desired state 是什么？缺的是方向、反馈、可控动作，还是 review？哪个变量今天能被我改变？')}
      </P>
      <Callout type="note" title={label('例子')}>
        <P>
          {label('坏目标：我要找到我真正热爱的方向。控制系统版本：未来 14 天，每天完成一个能降低 OpenViking 未来判断成本的 artifact，并记录它改变了哪个判断、服务了谁、是否让我更想继续。')}
        </P>
      </Callout>

      <H2>{label('2. 目标必须有层级')}</H2>
      <P>
        {label('目标至少有五层：Vision 说明为什么值得存在；Identity 说明你在成为谁；Outcome 说明现实中什么会不同；Project/Strategy 说明路径；Daily control variable 说明今天能修正什么。')}
      </P>
      <Table
        headers={[label('层级'), label('作用'), label('失败症状')]}
        rows={[
          [label('Vision'), label('为什么这件事值得存在'), label('做很多事但不知道为了什么')],
          [label('Identity'), label('我在成为哪种人'), label('目标像外部任务，不像自我构造')],
          [label('Outcome'), label('现实中要改变什么'), label('愿景无法验证')],
          [label('Project / Strategy'), label('通过什么路径改变'), label('目标太大，不知道怎么推进')],
          [label('Daily control variable'), label('今天能修正什么'), label('短期任务散乱，不能积累')],
        ]}
      />
      <P>
        {label('你的 OpenViking 目标可以这样落地：Vision 是构建 human-AI collaboration 的上下文/runtime substrate；Identity 是把真实摩擦转成 durable system primitives 的人；Outcome 是 30 天内形成一个可验证的 context lifecycle thesis；Daily variable 是每天一个 Zayn/OV update。')}
      </P>

      <H2>{label('3. 目标类型不同，写法不同')}</H2>
      <P>
        {label('很多目标失败，是因为把探索问题伪装成执行问题。目标至少分 outcome、performance、learning、exploration 四种。')}
      </P>
      <Ul>
        <Li>{label('Outcome goal：结果目标。适合结果可定义的场景，比如发布文章、完成 demo、上线功能。')}</Li>
        <Li>{label('Performance goal：表现目标。适合已有能力、需要稳定产出的场景，比如每周完成 3 个 artifact。')}</Li>
        <Li>{label('Learning goal：学习目标。适合策略未知的场景，比如搞清楚 post-training 何时优于 prompt engineering。')}</Li>
        <Li>{label('Exploration goal：探索目标。适合还不知道自己想要什么的时候，用来生成偏好和能量证据。')}</Li>
      </Ul>
      <Callout type="tip" title={label('你的当前用法')}>
        <P>
          {label('你现在说“不知道具体目标是什么”，这更像 exploration goal，不是 outcome goal。正确目标不是“我要确定人生目标”，而是“未来 14 天生成足够 evidence 来判断哪类 OpenViking 工作最能产生 agency、competence、external usefulness 和 identity coherence”。')}
        </P>
      </Callout>

      <H2>{label('4. 具体且有难度的目标有效，但有条件')}</H2>
      <P>
        {label('Locke & Latham 的 goal-setting theory 支持一个高价值判断：具体且有挑战性的目标通常比 do your best 更有效。但它依赖 commitment、feedback、能力或学习策略。复杂任务不要只压 outcome，要允许 learning goal。')}
        {' '}
        <A href={lockeLatham}>{label('来源')}</A>
      </P>
      <P>
        {label('明确任务可以设困难目标，比如“本周发布 2 篇 notes，并让每篇都回答一个 OpenViking 架构判断”。高不确定任务应该设学习目标，比如“本周搞清楚 context lifecycle 和 memory database 的核心差别，并用一个案例验证”。')}
      </P>

      <H2>{label('5. 反馈比目标本身更重要')}</H2>
      <P>
        {label('目标没有 feedback，就只是意图。反馈至少分三类：lagging indicator、leading indicator、learning signal。')}
      </P>
      <Table
        headers={[label('反馈'), label('例子'), label('风险/用途')]}
        rows={[
          [label('Lagging indicator'), label('用户数、收入、发布量、阅读量'), label('来得慢，不能直接指导今天')],
          [label('Leading indicator'), label('每天完成 artifact、每周找 3 个真实摩擦'), label('能指导行动')],
          [label('Learning signal'), label('判断是否更清楚、是否发现反例'), label('适合探索型目标')],
        ]}
      />
      <P>
        {label('如果目标是构建 OpenViking thesis，不要只看外部成果。每天记录：这个 artifact 改变了哪个判断？服务了谁？产生了 autonomy、competence、relatedness 中哪一种？让我更想继续，还是更空？')}
      </P>

      <H2>{label('6. 动机不是一种东西')}</H2>
      <P>
        {label('Self-Determination Theory 把持续动机和 autonomy、competence、relatedness 三个心理需要联系起来。Bandura 的 self-efficacy 又补充：人是否相信自己能有效行动，会影响困难前的坚持、换策略或退出。')}
        {' '}
        <A href={selfDetermination}>{label('SDT')}</A>
        {' · '}
        <A href={bandura}>{label('self-efficacy')}</A>
      </P>
      <Table
        headers={[label('缺口'), label('症状'), label('修正方式')]}
        rows={[
          [label('Autonomy 低'), label('像在完成别人的任务'), label('重写成自己认可的理由')],
          [label('Competence 低'), label('一想到目标就无力'), label('降低粒度，设计快速胜利')],
          [label('Relatedness 低'), label('做完也像没人需要'), label('找真实用户、agent 或读者反馈')],
          [label('Self-efficacy 低'), label('觉得做了也没用'), label('设 24-48 小时可证明行动有效的小实验')],
        ]}
      />
      <P>
        {label('如果 OpenViking 目标让你觉得太远，可能不是它没价值，而是缺 competence feedback 和 relatedness feedback。每天把一个真实协作摩擦转成 reusable artifact，会同时提供自主感、能力感和连接感。')}
      </P>

      <H2>{label('7. Mental contrasting：把未来和现实撞在一起')}</H2>
      <P>
        {label('Oettingen 的 mental contrasting 思路是：只想象正面未来不够；要把 desired future 和 present obstacle 放在一起，才会激活更现实的 commitment。常见实践格式是 WOOP：Wish -> Outcome -> Obstacle -> Plan。')}
        {' '}
        <A href={mentalContrasting}>{label('来源')}</A>
      </P>
      <Pre lang="text" lineNumbers={false}>{`Wish:
  我想找到一个愿意长期投入的 OpenViking 方向。

Outcome:
  我每天知道自己在推进什么；每周都有一个能改变判断的 artifact。

Obstacle:
  我会被短期任务吞掉，只做修 bug / respond / ship。

Plan:
  如果一天结束前我只有短期执行，没有沉淀 artifact，
  那么我花 20 分钟把当天最大 friction 写成 reusable note / issue / checklist。`}</Pre>

      <H2>{label('8. Implementation intention：把意志力前移成 if-then')}</H2>
      <P>
        {label('Gollwitzer 的 implementation intentions 很实用：不要只写 I will do X，而要写 If situation Y happens, then I will do Z。人在关键时刻不应该重新决策。目标系统要提前把常见阻力编译成触发器。')}
        {' '}
        <A href={implementationIntentions}>{label('来源')}</A>
      </P>
      <Pre lang="text" lineNumbers={false}>{`If I feel "this goal is too abstract",
then I will ask: what is the smallest artifact that would make this judgment inspectable?

If I spend the day only doing reactive tasks,
then I will end the day by writing one reusable friction note.

If I feel no passion,
then I will not introspect for passion; I will create one 30-minute action that can produce agency evidence.

If a goal has no feedback for 7 days,
then I will either change its metric, reduce its scope, or kill it.`}</Pre>

      <H2>{label('9. Goal systems：目标是网络，不是列表')}</H2>
      <P>
        {label('Goal Systems Theory 把目标、手段、子目标看成一个网络。一个手段可能服务多个目标，一个目标也可能有多个手段。你不是缺任务，而是缺一个能处理冲突的 goal graph。')}
        {' '}
        <A href={goalSystems}>{label('来源')}</A>
      </P>
      <Pre lang="text" lineNumbers={false}>{`Focal goal:
  构造 human-AI collaboration substrate，并通过它构造 zaynjarvis。

Support goals:
  - Zouk/OV product primitives
  - public notes as thought crystallization
  - agent workflow as coordination lab
  - research notes as architecture judgment update

Competing goals:
  - reactive maintenance without abstraction
  - public content without mechanism
  - learning without project consequence

High-leverage means:
  每天一个 Zayn/OV update，因为它同时服务 product、notes、identity、agent workflow。`}</Pre>

      <H2>{label('10. Goal shielding：重要目标需要防御机制')}</H2>
      <P>
        {label('如果一个目标真的重要，你需要设计边界，让相似但低价值的目标不要偷走资源。')}
      </P>
      <Ul marker="check">
        <Li>{label('如果一个任务不能产生 artifact、decision update、workflow primitive 或 user-visible improvement，它不能吃掉当天最好的 2 小时。')}</Li>
        <Li>{label('如果一份材料不能改变 OpenViking / context / identity 的判断，只做 scout，不 deep read。')}</Li>
        <Li>{label('如果一个 bug fix 没有抽象出 durable lesson，它只算 maintenance，不算 Zayn/OV update。')}</Li>
      </Ul>

      <H2>{label('11. Exploration vs exploitation')}</H2>
      <P>
        {label('当你已经知道方向，目标应该帮助 exploitation：集中资源、稳定产出、提高效率。当你不知道方向，目标应该帮助 exploration：生成证据、比较能量、发现偏好、暴露反例。')}
      </P>
      <P>
        {label('把 exploration 当 exploitation，会逼自己承诺一个还没有 evidence 的方向。一旦没热情，你会误判为自己懒，而不是目标类型错了。')}
      </P>
      <Callout type="info" title={label('当前更适合你的目标')}>
        <P>
          {label('未来 14 天，通过 14 个 Zayn/OV updates 判断哪类工作最能同时产生 agency、competence growth、external usefulness 和 identity coherence。')}
        </P>
      </Callout>

      <H2>{label('12. Goal review：目标不是拿来坚持的，是拿来更新的')}</H2>
      <P>
        {label('目标一旦设定，不代表它就是对的。目标应该像产品假设一样被 review。')}
      </P>
      <Table
        headers={[label('节奏'), label('问题')]}
        rows={[
          [label('Daily'), label('今天的 control variable 有没有完成？如果没有，是目标错、环境错、计划错，还是能量错？')],
          [label('Weekly'), label('哪个 artifact 最有复利？哪个指标没有解释力？哪个目标应该降级、合并、暂停、删除？')],
          [label('Monthly'), label('identity hypothesis 有没有变清楚？哪类 work 真的让我更有 agency？哪个方向值得从 exploration 转成 commitment？')],
        ]}
      />
      <P>
        {label('目标也需要 kill criteria：连续两周没有任何 feedback；完成它不会改变重要判断；它只能制造 guilt 不能制造 action；它和更高层 identity 不再一致；它只服务外部期待，不服务 autonomy、competence、relatedness。')}
      </P>

      <H2>{label('完整模板：如何从 0 做出一个目标')}</H2>
      <Ol>
        <Li>{label('先诊断目标问题类型：没方向、方向太大、动机低、执行弱、反馈弱、目标太多。你当前更像方向太大 + 动机低 + 反馈弱。')}</Li>
        <Li>{label('写 identity hypothesis，不写 identity slogan。例：我正在成为能把 AI collaboration 中真实摩擦转成 system primitive、public note 和 product loop 的人。')}</Li>
        <Li>{label('定义 30 天 outcome。例：形成一个 context lifecycle thesis，并通过 notes、产品/工作流改动、真实协作案例验证。')}</Li>
        <Li>{label('定义 daily control variable。例：每天完成一个 Zayn/OV update。')}</Li>
        <Li>{label('定义 feedback。每天记录它改变了哪个判断、服务了谁、产生了哪种动机信号、让我更想继续还是更空。')}</Li>
        <Li>{label('定义 obstacle + if-then。例：如果一天只有 reactive execution，没有 durable artifact，就用 20 分钟写一个 friction-to-artifact note。')}</Li>
        <Li>{label('定义 weekly review。判断哪类 artifact 最有复利，哪类只是短期维护，下周加码或减少什么。')}</Li>
      </Ol>

      <H2>{label('三个案例')}</H2>
      <H3>{label('Case 1：把“我要做 OpenViking”变成目标系统')}</H3>
      <P>
        {label('坏版本是“我要把 OpenViking 做好”。它没有 feedback、日控制变量、review，也容易被短期任务吞掉。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`Identity hypothesis:
  我是一个把 AI collaboration friction 转成 context/runtime primitives 的系统构造者。

30-day outcome:
  形成一个 context lifecycle thesis，并通过 6 篇 notes、3 个产品/工作流改动、3 个真实协作案例验证。

Daily variable:
  每天一个 Zayn/OV update。

Feedback:
  每个 update 必须标注：它改变了什么判断、沉淀成什么 artifact、谁会复用它。

If-then:
  如果当天只是在处理临时任务，那么睡前写一个 friction-to-artifact note。`}</Pre>

      <H3>{label('Case 2：把“我想了解 post-training”变成学习目标')}</H3>
      <P>
        {label('坏版本是“我要系统学习 post-training”。它太大，容易变成论文消费，和项目判断连接不够。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`Learning goal:
  14 天内搞清楚：什么时候 prompt/workflow/runtime 不再足够，行为应该进入 preference/data/post-training loop。

Artifact:
  一张 decision table：prompt engineering vs memory/session/workflow vs post-training。

Daily variable:
  每天只读一个能改变该 decision table 的材料片段。

Skip rule:
  不改变 decision table 的算法细节先 parking lot。`}</Pre>

      <H3>{label('Case 3：把“我想有热情”变成探索目标')}</H3>
      <P>
        {label('热情不可直接控制，容易变成 introspection loop。更好的目标是让热情有机会被观察。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`Exploration goal:
  14 天内通过 14 个小 artifact，观察什么类型的工作最能产生 agency 和继续投入的冲动。

可比较维度:
  - product primitive
  - public note
  - agent workflow
  - research synthesis
  - user-facing demo

每天记录:
  今天的 artifact 让我更清楚、更多能量、更有连接，还是更空？`}</Pre>

      <H2>{label('7 天 goal construction sprint')}</H2>
      <P>
        {label('如果你要真的学会，不要继续读目标理论。直接做 7 天。')}
      </P>
      <Callout type="tip" title={label('7 天目标')}>
        <P>
          {label('用 7 个 Zayn/OV updates 验证一个 provisional identity：我正在成为一个把 human-AI collaboration 的真实摩擦转成 durable system primitives 的人。')}
        </P>
      </Callout>
      <Ul marker="check">
        <Li>{label('每天一个 artifact：note、decision memo、checklist、issue、PR、demo、agent workflow rule、architecture map。')}</Li>
        <Li>{label('每天记录 judgment update：它改变了哪个判断？')}</Li>
        <Li>{label('每天记录 control axis：context、session、task、identity、workflow、provenance、verification、runtime。')}</Li>
        <Li>{label('每天记录 motivation signal：autonomy、competence、relatedness 中哪一个出现了？')}</Li>
        <Li>{label('每天写 next：明天最小延续动作是什么？')}</Li>
      </Ul>
      <P>
        {label('第 7 天只问五个问题：哪类 artifact 最像我想长期做的东西？哪类只是消耗短期执行力？哪个方向值得转成 30 天 commitment？provisional identity 哪部分更可信？下一个目标应该是 exploration、learning、performance，还是 outcome？')}
      </P>

      <H2>{label('Goal Quality Checklist')}</H2>
      <P>{label('一个目标写完后，必须过这 12 个检查。')}</P>
      <Ol>
        <Li>{label('它服务哪个 vision？')}</Li>
        <Li>{label('它验证哪个 identity hypothesis？')}</Li>
        <Li>{label('它是 outcome、performance、learning，还是 exploration goal？')}</Li>
        <Li>{label('它有没有 desired state？')}</Li>
        <Li>{label('它有没有 current state？')}</Li>
        <Li>{label('它有没有 daily / weekly control variable？')}</Li>
        <Li>{label('它有没有 leading indicator？')}</Li>
        <Li>{label('它有没有 learning signal？')}</Li>
        <Li>{label('它有没有 feedback cadence？')}</Li>
        <Li>{label('它有没有主要 obstacle？')}</Li>
        <Li>{label('它有没有 if-then implementation intention？')}</Li>
        <Li>{label('它有没有 kill / pivot criteria？')}</Li>
      </Ol>

      <H2>{label('最后的压缩')}</H2>
      <P>
        <Strong>{label('如果一个目标没有 daily control variable、feedback、if-then 和 review，它就不是目标，只是愿望。')}</Strong>
      </P>
      <P>
        {label('Zayn/OV 当前最好的起点不是再找一个更大的口号，而是每天完成一个能让判断更清楚的 artifact。目标感不是想出来的，是在可纠错行动里长出来的。')}
      </P>
    </Article>
  );
};

export default {
  id: 'make-a-goal',
  Component: MakeAGoal,
  meta: {
    title: { zh: '如何做出一个目标' },
    description: { zh: '目标不是愿望、KPI 或 SMART 句子，而是一个能让未来行为持续校准的控制系统。' },
    cover,
    publishedAt: '2026-05-30',
    readingTime: { zh: 16 },
    category: { zh: 'Zayn OS' },
    tags: ['goals', 'identity', 'openviking', 'self-regulation'],
    languages: ['zh'],
    llmPath: '/post/make-a-goal/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
