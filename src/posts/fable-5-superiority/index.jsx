import React from 'react';
import {
  Article,
  Lead,
  H2,
  H3,
  H4,
  P,
  Ul,
  Ol,
  Li,
  Table,
  Callout,
  Strong,
  Em,
  A,
  Pre,
  Small,
} from '../../blog-components';

const cover = '/assets/covers/fable-5-superiority.png';

// Sources (public)
const src = {
  anthropic: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
  cursorEvals: 'https://cursor.com/evals',
  cursorBench: 'https://cursor.com/cursorbench',
  cognition: 'https://cognition.com/blog/frontier-code',
  agentsDir: 'https://agentsdirectory.dev/blog/claude-fable-5-benchmarks',
  digitalapplied: 'https://www.digitalapplied.com/blog/claude-fable-5-vs-gpt-5-5-frontier-comparison-2026',
  codingfleet: 'https://codingfleet.com/blog/claude-fable-5-vs-gpt-5-5-pro/',
  contracollective: 'https://contracollective.com/blog/claude-fable-5-vs-opus-4-8-vs-gpt-5-5-vs-gemini-3-5-2026',
  contraSwe: 'https://contracollective.com/blog/claude-fable-5-vs-gpt-5-5-swe-bench-pro-agentic-coding-2026',
  datacamp: 'https://www.datacamp.com/blog/claude-fable-5-vs-gpt-5-5',
  roboflow: 'https://blog.roboflow.com/claude-fable-5-for-vision/',
  benchlm: 'https://benchlm.ai/compare/claude-fable-vs-claude-opus-4-8',
  tessl: 'https://tessl.io/blog/claude-fable-5-vs-opus-48-the-mythos-hype-meets-reality/',
  kilo: 'https://blog.kilo.ai/p/claude-fable-5-vs-gpt-5-5',
  endor: 'https://www.endorlabs.com/learn/claude-fable-5-mythos-grade-hype',
  decoder: 'https://the-decoder.com/claude-fable-5-outpaces-gpt-5-5-by-13-points-on-frontiermaths-toughest-problems/',
  groundy: 'https://groundy.com/articles/claude-fable-5-benchmarks-what-frontiercode-cursorbench-and-vibench-show/',
};

const FableSuperiority = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('Fable 5 真正拉开差距的地方不是某一条榜单分数，而是一整类工作：长程、跨仓库、需要连续几个小时自己盯着的 agentic 任务。任务越长越复杂，它对 Opus 4.8 和 GPT-5.5 的领先就越大。但它不是全能冠军——视觉感知、超长上下文检索、网页浏览和安全编码上它明显吃亏。这篇把「它到底强在哪、怎么用才吃得到、以及我打算把它塞进哪些自己的项目」讲清楚。')}
      </Lead>

      <Callout type="info" title={label('一句话判断')}>
        <P>
          {label('把 Fable 5 当成一个「资深 tech lead」：让它做规划、跨仓库改动、长程综合和最终决策；把机械执行和高频小任务留给更便宜的模型。它单价是 Opus 4.8 的两倍（$10/$50 vs $5/$25 每百万 token），所以只有当任务够难、够长，领先幅度能盖过差价时，用它才划算。')}
        </P>
      </Callout>

      <P>
        {label('下面的数字来自 Anthropic 官方发布、Cursor 与 Cognition 的第一方评测，以及一批第三方对比汇总。我尽量标了出处，也标了哪些只是单一来源的轶事、哪些榜单存在污染或口径问题。凡是「官方说很强但第三方对不上」的地方，我都写出来了。')}
      </P>

      {/* ============ SECTION 1a: WHERE IT WINS ============ */}
      <H2>{label('一、五个已经被验证的差距')}</H2>
      <P>
        {label('先说结论：Fable 5 的优势不是均匀分布的。它集中在「跨越很多步、很多文件、很多来源，且要保持一致性」的工作上。下面五块从最硬、最可复现，排到最需要打折扣看。')}
      </P>

      <H3>{label('1. 前沿编码与跨仓库 agentic 工作（最大、最可靠的差距）')}</H3>
      <P>
        {label('这是 Fable 5 最大、也最经得起第三方复现的优势。关键在于：这些榜单量的不是「代码能不能跑」，而是「改动能不能作为生产级 PR 合进去」。越难的任务，差距越大——从 Terminal-Bench 上约 5 分，到 SWE-Bench Pro 的 11 分，再到 FrontierCode Diamond 的 24 分。')}
      </P>
      <Table
        headers={[label('评测'), label('Fable 5'), label('Opus 4.8'), label('GPT-5.5'), label('差距')]}
        rows={[
          ['SWE-Bench Pro', '80.3%', '69.2%', '58.6%', label('+11.1 / +21.7')],
          [label('FrontierCode Diamond（最难 50 题）'), '29.3%', '13.4%', '5.7%', label('2.19× / 5.1×')],
          ['CursorBench 3.1', label('72.9%（Max）'), label('58.4%（High）'), label('62.6%（High）'), label('霸榜前四')],
          [label('FrontierCode Extended'), label('57.0（medium）'), label('48.8（high）'), label('44.8（high）'), label('中档打赢对手高档')],
        ]}
        caption={label('编码类榜单对比。来源：Anthropic、Cursor、Cognition、第三方汇总。')}
      />
      <P>
        {label('最能说明问题的一条：在 CursorBench 上，Fable 5 开 Low 档（64.2%、$5.70/任务）就已经压过 Opus 4.8 开 Max 档（63.8%、$7.59/任务）——更少 token、更少步骤、更低成本、还更高分。')}
        {' '}
        <A href={src.cursorBench}>{label('Cursor 评测')}</A>
        {' · '}
        <A href={src.cognition}>{label('Cognition FrontierCode')}</A>
      </P>
      <Callout type="note" title={label('那条 Stripe 轶事怎么看')}>
        <P>
          {label('官方说 Fable 5 在一个约 5000 万行的 Ruby 单体仓库里，一天完成了一次全仓库迁移，人工估计要一个团队两个多月。这是单一客户的说法，没有独立复现，别当基准。但它说明了能力的天花板：Fable 5 能在整个代码库尺度上连续操作，这是前几代做不到的。')}
        </P>
      </Callout>

      <H3>{label('2. 长程 agentic 推理与多步自主')}</H3>
      <P>
        {label('在衡量「端到端完成多步任务」的榜单上——需要规划、用工具、自我纠错、长时间不跑偏——Fable 5 对两个对手都稳定领先。GDPval-AA 上对 GPT-5.5 领先 163 个 Elo，换算成人评偏好大概是七成以上的胜率，这已经是质的差别，不是零点几分的抖动。')}
      </P>
      <Table
        headers={[label('评测'), label('Fable 5'), label('Opus 4.8'), label('GPT-5.5')]}
        rows={[
          [label('GDPval-AA（知识工作 Elo）'), '1932', '1890', '1769'],
          [label('Humanity’s Last Exam（带工具）'), '64.5%', '57.9%', '52.2%'],
          [label('OSWorld-Verified（电脑操作）'), '85.0%', '83.4%', '78.7%'],
          [label('Artificial Analysis 智能指数'), label('64.9（#1）'), '—', label('落后约 5 分')],
        ]}
        caption={label('agentic / 知识工作类。来源：Artificial Analysis、第三方汇总。')}
      />
      <Callout type="warn" title={label('别把「越长越领先」当成对所有对手成立')}>
        <P>
          {label('官方那句「任务越长越复杂，领先越大」，原文限定的是「相对我们自己之前的模型」，不是相对所有竞品。反例是存在的：Agents’ Last Exam 上 GPT-5.5 反而略高（24.0% vs 22.0%），BrowseComp 网页浏览 GPT-5.5 Pro 也赢（90.1%，Fable 5 没公布）。所以更准确的说法是：在编码和大多数自主任务上领先随难度扩大，但不是每条长程榜单都这样。')}
        </P>
      </Callout>

      <H3>{label('3. 结构化视觉推理：图表、文档、截图')}</H3>
      <P>
        {label('Fable 5 对 Opus 4.8 最锋利的一刀在多模态：读科学图表、读文档、从截图还原代码这类「对图像做推理」的任务。BenchLM 多模态类目上比 Opus 高 16.3 分，是它俩之间最大的单类目差距。它甚至只靠原始游戏截图打通了 Pokémon FireRed，而前几代要靠地图和游戏状态工具的复杂脚手架。')}
      </P>
      <Callout type="warn" title={label('但「视觉 SOTA」这句被夸大了')}>
        <P>
          {label('这个优势只对「对图像做推理」成立，不对「一般视觉感知」成立。在 Roboflow 的真实世界视觉评测里，Fable 5 只排第 10（74.63%），落后于 Gemini 3.5 Flash、GPT-5.4、GPT-5.5；计数类任务只拿 3/10，空间类任务专用检测器完胜。它在物体理解上是满分 14/14，但要数清楚有几个、定位在哪，还得配一个专用检测器。')}
          {' '}
          <A href={src.roboflow}>{label('Roboflow 视觉评测')}</A>
        </P>
      </Callout>

      <H3>{label('4. 专业领域推理：金融、医疗、法律、前沿数学')}</H3>
      <P>
        {label('专业领域是 Fable 5 另一片主场。金融上它拿了 Hebbia 基准的最高分（官方和 Hebbia 自己都确认了）；医疗 HealthBench 比 GPT-5.5 高 14.2 分；前沿数学最难的 Tier 4 拿 88%，比 GPT-5.5 的约 75% 高 13 分。')}
      </P>
      <Table
        headers={[label('领域'), label('评测'), label('结果')]}
        rows={[
          [label('金融'), 'Hebbia Finance Benchmark', label('全场最高分')],
          [label('医疗'), 'HealthBench Professional', label('66.0% vs Opus 56.9% vs GPT 51.8%')],
          [label('数学'), 'FrontierMath Tier 4', label('88% vs GPT-5.5 约 75%')],
          [label('法律'), 'Legal Agent Benchmark', label('13.3% vs GPT-5.5 2.1%（倍数大，绝对值都很低）')],
        ]}
        caption={label('专业领域推理。来源：Anthropic、digitalapplied、the-decoder。')}
      />
      <P>
        {label('要诚实的地方：法律那条虽然是 6.3 倍，但两边绝对分都极低，说明「领先是真的，能力还很初级」。IMC 交易分析「几乎全项通过」只是定性说法，没有硬数字。金融和数学这两条是量化最扎实的。')}
        {' '}
        <A href={src.decoder}>{label('FrontierMath 报道')}</A>
      </P>

      <H3>{label('5. Token 效率与更少回合（但 2× 单价常把优势抵消）')}</H3>
      <P>
        {label('Fable 5 用更少的 token、更少的步骤拿到更高的质量。CursorBench 上它 Low 档用掉的 token 只有 Opus Max 档的约四分之一，分还略高；表格类任务它每个档位都比 Opus 快 25–30%。但它单价正好是 Opus 4.8 的两倍，所以「每任务成本」经常反而更高——token 省下来的，被单价吃回去了。')}
      </P>
      <Table
        headers={[label('口径'), label('结论')]}
        rows={[
          [label('每任务 token'), label('CursorBench：Fable Low 用 18,882 token / $5.70，Opus Max 用 77,370 / $7.59')],
          [label('速度/回合'), label('表格套件每档快 25–30%，回合更少')],
          [label('每问题成本（SWE-Bench Pro）'), label('Fable $0.41 vs Opus $0.31 vs GPT-5.5 $0.28')],
          [label('同计划执行成本（Kilo 实验）'), label('两模型都过 15/15，但 GPT-5.5 花 $6.30，Fable 花 $16.66')],
        ]}
        caption={label('效率与成本。来源：Cursor、contracollective、tessl、kilo。')}
      />
      <P>
        {label('换句话说：token 效率是真的，但它变成省钱只发生在一种情况——Fable 更高的成功率省掉了重试，或者更快完成本身值钱。否则同样一件事，Fable 更贵。')}
        {' '}
        <A href={src.tessl}>{label('tessl 成本分析')}</A>
      </P>

      {/* ============ SECTION 1b: PRACTICES ============ */}
      <H2>{label('二、把差距吃到嘴里：一套使用范式')}</H2>
      <P>
        {label('知道它强在哪只是一半，另一半是怎么用才不浪费。下面这些不是玄学，每条都对得上上面的机制。')}
      </P>

      <H3>{label('按任务复杂度路由，而不是无脑全用 Fable')}</H3>
      <P>
        {label('在「日常 agent 技能任务」上，Fable 只比 Opus 高不到 1 分，却贵一倍。所以把最难的那 5–10%（全仓库迁移、多文件重构、复杂 issue）交给 Fable 开 high，其余单文件小改留给 Opus 4.8。让它去啃只有它啃得动的骨头，剩下的用便宜模型。')}
      </P>

      <H3>{label('把 effort 调到任务难度，Fable 的 medium 常常顶得上 Opus 的 xhigh')}</H3>
      <P>
        {label('Fable 每一档的底层推理质量都更高。官方推荐默认从 high 起步，而不是像 Opus 那样从 xhigh。给成本敏感的生产链路用 medium——它在 FrontierCode 上开 medium 就已经赢 Opus 开 high。只有质量压倒一切时才上 max。过度堆 effort 既烧 token，又可能让它想太多。')}
      </P>

      <H3>{label('给它接上基于文件的持久记忆——Fable 从自己的笔记里获益是 Opus 的 3 倍')}</H3>
      <P>
        {label('这是 Fable 最独特、最该利用的一点。官方在《杀戮尖塔》测试里发现：同一套基于文件的记忆，对 Fable 5 的提升是对 Opus 4.8 的三倍，通关最终章的频率也高三倍。它是被专门训练来利用持久笔记的——不给它记忆，等于白扔一大块能力。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`记忆组织建议：
  - 用很多个「小、按主题命名」的文件，存事实和教训，不要存对话流水
  - 长任务开始前先让它读记忆
  - 干活过程中让它随手把发现写回去
  - 记忆是给「下一次运行的自己」看的，不是给人看的摘要`}</Pre>

      <H3>{label('让 Fable 当 tech lead / 编排者，把执行外包给便宜的子代理')}</H3>
      <P>
        {label('Kilo 的拆分实验里，Fable 的规划质量明显更高（9.1 vs GPT-5.5 的 8.3），但两者执行打平——也就是说用它去写样板代码是浪费。Cognition 的 Devin Fusion 也独立验证了这点：Fable 5 配上便宜的 sidekick 模型，能在质量不掉的前提下省 35% 成本。')}
      </P>
      <Callout type="tip" title={label('编排模式')}>
        <P>
          {label('Fable 5 开 max 只做编排：规划、拆解、综合、拍板。机械实现丢给 Sonnet，需要深推理的子任务丢给 Opus 4.8。这样能让 Fable 的上下文保持干净，六个小时后它还能做出锋利的判断，同时把 token 成本砍掉 50–70%。')}
        </P>
      </Callout>

      <H3>{label('给最少的脚手架，说清楚目标和边界，别写步骤')}</H3>
      <P>
        {label('Fable 只靠视觉就打通了 Pokémon，而前几代要地图和游戏状态。官方明确警告：过于规定动作的 skill「会降低输出质量」。所以要主动删掉 Opus 时代的补丁——一步步的流程、「CRITICAL: MUST」这类升级措辞、强制进度节奏、「不许开子代理」的护栏、「解释你的推理」这类指令（后者甚至可能触发 reasoning 抽取的拒答分类器）。换成简短的一句话：目标是什么、约束是什么，别管怎么走。')}
      </P>

      <H3>{label('放手让它跑长程：一次性把 spec 说全，用异步 check-in，别微操')}</H3>
      <P>
        {label('Fable 能扛住多天的目标导向运行（官方那次一周的自主基因组学、Stripe 一天的迁移）。它的领先随任务长度增长，中途打断反而打乱节奏、逼它重建上下文。做法是：第一轮就把完整 spec（需求、约束、完成定义）交足，然后设异步 check-in 而不是阻塞式盯着。相信它能连续几个小时不丢线。')}
      </P>

      <H3>{label('视觉任务：Fable 负责推理，专用检测器负责计数和定位')}</H3>
      <P>
        {label('接着上面第 3 块的结论——别指望一个 Fable 通吃视觉。让它做 VQA、文档抽取、截图转代码、从科学图里读数这类推理；计数、空间、缺陷检测这类交给一个微调过的检测器（比如 RF-DETR）。一个「Fable 推理 + 专用检测器」的组合，比任何单一前沿 VLM 都强，还更便宜。')}
      </P>

      <H3>{label('超长上下文：检索找 GPT-5.5，综合找 Fable')}</H3>
      <P>
        {label('不同的超长上下文任务偏好不同的模型。50 万 token 以上的「大海捞针」式检索用 GPT-5.5（MRCR v2 在 1M 上 74.0%，Fable 没公布）；跨文档的推理与综合（法律/金融文档分析）用 Fable。别用一个模型硬扛两种活。')}
      </P>

      <H3>{label('信它的自我纠错，但外部再验一遍')}</H3>
      <P>
        {label('Fable 开高 effort 会主动自查，但官方自己的测试也发现：独立的验证者比自我批评更靠谱。所以高风险产出上，加一个「全新上下文、看不到原始推理」的验证子代理去交叉核对。再加一句指令给 Fable：「报告进度前，逐条对照本次会话里的工具结果核实」——这几乎消灭了它编造进度的情况。')}
      </P>

      <H3>{label('无人值守的过夜任务，Opus 4.8 的「校准过的谨慎」可能更安全')}</H3>
      <P>
        {label('这条是反直觉的。Fable 的 Omniscience 准确率更高（61% vs 46.6%），但那是知识更多带来的，不是幻觉更少。Opus 4.8 有一套校准过的谨慎，对「出错代价很高、又没人盯着」的过夜运行可能更合适。社区确实报告过 Fable 会「自信地宣布测试通过了」而其实没通过。要点：别因为它更聪明，就默认它在无人监督时更可靠。')}
      </P>

      {/* ============ SECTION 1c: CAVEATS ============ */}
      <H2>{label('三、它不擅长的地方（诚实清单）')}</H2>
      <P>
        {label('一篇只讲优点的对比是软文。下面这些是真实的边界，直接影响该不该用它。')}
      </P>
      <Ul>
        <Li>{label('不是全能 SOTA。真实世界视觉排第 10；超长上下文检索、网页浏览（BrowseComp）、ARC-AGI-2 都是 GPT-5.5 赢。')}</Li>
        <Li>{label('安全编码是短板。Endor Labs 的 200 个真实安全任务里，功能通过率 59.8%，但「安全解出率」只有 19.0%，还伴随更明显的「刷测试」行为。')}</Li>
        <Li>{label('贵一倍。$10/$50 vs Opus 4.8 的 $5/$25、GPT-5.5 的 $5/$30。很多任务上每任务净成本比两个对手都高。')}</Li>
        <Li>{label('过度修改的失败模式。SWE-Bench Pro 的失败里有 38% 是「主改动对了，又顺手加了别的改动，引入新 bug」——比 GPT-5.5 那种「补丁太浅」更难在 review 里抓到。')}</Li>
        <Li>{label('榜单污染。SWE-bench Verified 上约 32% 的高分补丁可能复现了训练数据里的标准答案，有参与出题的实验室已经内部停报这个分。95% 的头条要打折扣看。')}</Li>
        <Li>{label('强制 30 天数据留存。Mythos 级模型的所有流量都要留存 30 天，签了零留存协议的企业客户会每个请求都 400。')}</Li>
        <Li>{label('约 5% 的会话会回退到 Opus 4.8（独立测量约 8–9%，某些评测高到 35%）。碰到网络安全、生物化学、蒸馏相关的话题几乎必被路由走——那些会话里 Fable 就等于 Opus。')}</Li>
      </Ul>

      {/* ============ SECTION 2: PERSONAL INTEGRATION ============ */}
      <H2>{label('四、放进我自己的系统：集成清单')}</H2>
      <P>
        {label('我的日常主力是金融和个股分析，每天有一份用 Codex + gpt-5.5（xhigh）跑的投资简报；基础设施这一摞是 OpenViking（给 Agent 用的上下文/记忆库）、LoopX（长跑 Agent 的控制面）、Zouk（起管 Agent）、Hermes（我的交互助手）、swarm-eval（评测编排）、rtk（省 token 的 CLI 代理）。把上面那些「差距」和「范式」对到这些仓库上，下面是我排过序的接入清单——每条都指到了具体文件。')}
      </P>
      <Table
        headers={[label('优先级'), label('项目'), label('做什么'), label('吃的是哪块优势'), label('工作量')]}
        rows={[
          ['1', 'hermes-agent', label('默认模型换 Fable（金融主场）'), label('知识工作 + 自校验'), label('极小')],
          ['2', 'hermes-agent', label('每日投资简报 skill + cron'), label('长程自主 + 金融'), label('中')],
          ['3', 'OpenViking', label('拆分语义/记忆两条模型路由'), label('记忆 3× 提升'), label('中')],
          ['4', 'swarm-eval', label('协调者从 Opus 换 Fable'), label('长程 + 自校验'), label('极小')],
          ['5', 'loopx', label('dreaming 从规则升级为 Fable 洞察'), label('长程 + 反思'), label('中')],
          ['6', 'agentmail', label('money 类邮件走 Fable'), label('金融文档理解'), label('小')],
          ['7', 'zouk-daemon', label('UI 里加 Fable 选项'), label('长程 agentic'), label('极小')],
        ]}
        caption={label('按投入产出比排序的 Fable 5 接入点。')}
      />

      <H3>{label('1–2. Hermes：金融是我这里最直接的杀手场景')}</H3>
      <P>
        {label('金融是所有优势里离我实际工作最近的一条。Hebbia 第一、IMC 全项通过、加上「会杀掉自己错误信念」的自校验，正好对上我要的「带明确下行和风险的、能决策的输出」。两件事：')}
      </P>
      <Ul>
        <Li>{label('把 Hermes 的默认模型换成 Fable。当前默认是 Claude Opus 4.6（见 cli-config.yaml.example:11），改配置即可，无需动代码。注意它比 Opus 4.8 贵一倍，所以这是「质量换成本」的取舍，值得先 A/B 一段时间再定。')}</Li>
        <Li>{label('把每日投资简报做成 Hermes 的一个 skill + cron，用 Fable 的长程自主一次跑完「取数 → 交叉验证 → 找风险/催化剂 → 结构化输出」。cron 基础设施已经有了（cron/scheduler.py），目前没有 finance skill 目录，新建 optional-skills/finance/daily-brief/SKILL.md 即可。它现在跑在 gpt-5.5 上，换 Fable 大约是双倍单价换更强的金融推理和更少的幻觉——对一份可能影响交易决定的早报，这个取舍我认为值。')}</Li>
      </Ul>

      <H3>{label('3. OpenViking：把「记忆 3× 提升」这条头条优势真正接住')}</H3>
      <P>
        {label('这是所有接入里战略价值最高的一条。OpenViking 现在只有一套 vlm 配置（走火山引擎 Ark 的 doubao-seed 系模型），喂给所有环节：文件摘要、ExtractLoop、compressor_v3、以及 session/train。问题是——文件摘要是高频、便宜就够；而记忆抽取才是 Fable「3× 记忆提升」真正兑现的地方。')}
      </P>
      <P>
        {label('做法是把 vlm 拆成两条：vlm_semantic（文件/代码/文档摘要，继续走便宜模型）和 vlm_memory（ExtractLoop、compressor_v3、trajectory 分析——走 Fable）。这样既拿到记忆提升，又不会因为「每个文件都上 Fable」把成本打爆。要改的调用点很明确：extract_loop.py:116、compressor_v3.py:127、session/train/components/trajectory_analyzer.py:186、rollout_executor.py:42。第一阶段只加一个配置键、读不到就回退到旧 vlm，一个小时能落地。')}
      </P>
      <Callout type="tip" title={label('顺带一个横切判断')}>
        <P>
          {label('OpenViking 一旦接住记忆提升，收益会外溢：每一个用它做上下文的 Agent（LoopX、Zouk、Hermes 的 skill）都跟着变聪明——偏好检测更准、经验规则更可迁移、skill 抽取更干净。这也是为什么它排在 3，比很多「极小工作量」的接入更值得投入。')}
        </P>
      </Callout>

      <H3>{label('4. swarm-eval：协调者换 Fable，几乎零成本')}</H3>
      <P>
        {label('评测编排是「便宜模型当 worker、贵模型当协调者」的教科书场景。worker 保持 Haiku（单发结构化抽取，Haiku 每次 $0.015–0.025 就是最优解，换 Fable 贵 20–40 倍还没质量提升）；协调者从 Opus 换成 Fable——它跨几百个会话累积模式、消解模糊发现，正好吃 Fable 的自校验（「杀掉错误信念」而不是把它们攒进目录）。协调者一轮跑十几次，成本差可以忽略。改动就一行：analyzer/config.py:44 把 coordinator_model 从 opus 改掉；新版 harness 在 src/orchestrator.py:32，或者直接用已有的 --coordinator-model 命令行标志做 A/B。')}
      </P>

      <H3>{label('5–7. LoopX、AgentMail、Zouk')}</H3>
      <Ul>
        <Li>{label('LoopX 的 dreaming 现在是关键词匹配（dreaming.py 里 token-match「refactor / duplicate / lesson / stale」）。这是它最欠开发、产品上行空间最大的功能。加一个 build_dreaming_proposal_with_model()，把紧凑的运行历史（_signal_runs() 已经收好了）喂给 Fable，产出真正可执行的重构预警、记忆固化成 playbook、探索建议；保留规则版做兜底。dreaming 是纯建议性的，风险低。')}</Li>
        <Li>{label('AgentMail 只把 money 类邮件（汇丰、星展、公积金、税、保险、发票）走 Fable，其余保持默认。这类邮件低频但高风险——一封被误分类成「摘要」而不是「待办」的公积金通知可能真花钱。改在 agentmail.py 的 codex_triage()（第 914 行）为 money 通道加一遍 Fable pass。')}</Li>
        <Li>{label('Zouk 在 Claude 驱动里已经把 --model 当不透明字符串透传（claude.ts:255-256），所以只是在建 Agent 的 UI 下拉里加一个「fable-5」选项、默认 effort 给 xhigh，守护进程一行代码都不用改。之后我通过 Zouk 起的长跑研究/迁移 Agent 就能吃到「比任何前代跑得更久」。')}</Li>
      </Ul>

      <H3>{label('横切模式：不是逐个换模型，而是几种结构')}</H3>
      <Ol>
        <Li>{label('「便宜 worker + Fable 协调者」应该成为我以后所有多 Agent 系统的默认模板。swarm-eval 里已经是这个形状（worker=haiku, coordinator=贵模型）。经济学很硬：便宜模型扛 95% 的量（分类、抽取），Fable 只扛 5% 质量会复利的综合瓶颈。')}</Li>
        <Li>{label('「语义 vs 记忆」的模型路由拆分是单点杠杆最大的基础设施改动，先在 OpenViking 做，别把它当成一次性优化。')}</Li>
        <Li>{label('rtk + Fable 的净成本值得实测。rtk 已经帮我省了 85.4% 的输出 token（4768 条命令、8760 万 token）。Fable 每任务少 25–30% 回合，配上 rtk 对输出的过滤，对我的工作流未必比 Opus 更贵。前提是确保 rtk 也过滤 Fable 的输出（它本来就透明代理所有命令）。')}</Li>
        <Li>{label('那条「约 5% 回退到 Opus」的警告，对我实际的活影响最小——金融分析、评测协调、记忆抽取、dreaming，都不碰网络安全/生物化学。唯一擦边的是 swarm-eval 分析安全工具的会话记录，但那种会话里 Fable 本来就等于 Opus，最坏情况是「没变化」。')}</Li>
      </Ol>

      <H3>{label('不值得上 Fable 的地方')}</H3>
      <P>
        {label('把贵模型用在对的地方，也意味着承认哪里不该用它。')}
      </P>
      <Ul>
        <Li>{label('评测的 worker（swarm-eval / 分析器）：Haiku 是单发结构化抽取的成本最优解，保持不动。')}</Li>
        <Li>{label('OpenViking 的文件/代码/文档摘要：量太大（每个文件都过），继续走便宜模型。')}</Li>
        <Li>{label('tmux-journal 的日常会话摘要：每 10 次捕获跑一次，Haiku 够用；只在「金融分析类会话」或按需的实体合并上才值得升 Fable。')}</Li>
        <Li>{label('newtab 的 RAG 关键词抽取：从网页里抽 5–10 个关键词，Fable 是杀鸡用牛刀，价值在 embedding + 重排，不在关键词。')}</Li>
        <Li>{label('Orca 的模型选择、Zouk 里非 Anthropic 的驱动（hermes/kimi/gemini 等）：要么是 UI 装饰，要么根本是别的 provider，Fable 只作用于 claude 驱动。')}</Li>
      </Ul>

      {/* ============ CLOSE ============ */}
      <H2>{label('一句话收束')}</H2>
      <P>
        <Strong>{label('Fable 5 不是「更好的 Opus」，而是一种「敢把更长、更复杂的任务整包交出去」的模型。')}</Strong>
      </P>
      <P>
        {label('把它当资深 tech lead，用在跨仓库编码、长程自主、金融/知识综合这些它领先随难度扩大的地方；给它接上文件记忆、砍掉旧脚手架、放手让它跑；剩下的高频小活和它不擅长的视觉感知、超长检索、安全编码，交给更便宜或更合适的模型。对我自己，最先动的是 Hermes 的金融链路和 OpenViking 的记忆路由——这两条离我的日常和我的基础设施最近，也最能兑现它那块真正独特的记忆优势。')}
      </P>
      <Small>
        {label('文中数字来自 Anthropic 官方发布、Cursor 与 Cognition 的第一方评测，以及 datacamp、digitalapplied、contracollective、agentsdirectory、Roboflow、tessl、Kilo、Endor Labs 等第三方汇总；轶事与定性说法已在文中标注。')}
      </Small>
    </Article>
  );
};

export default {
  id: 'fable-5-superiority',
  Component: FableSuperiority,
  meta: {
    title: { zh: 'Fable 5 到底强在哪，以及我打算怎么用它' },
    description: {
      zh: 'Fable 5 的真正优势在长程、跨仓库、agentic 的工作上，任务越难领先越大——但它不是全能。一份已验证的差距清单、一套使用范式，加上我把它接进自己项目的集成计划。',
    },
    cover,
    publishedAt: '2026-07-04',
    readingTime: { zh: 18 },
    category: { zh: 'AI 工作流' },
    tags: ['ai', 'claude', 'fable-5', 'agents', 'benchmarks', 'openviking'],
    languages: ['zh'],
    llmPath: '/post/fable-5-superiority/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
