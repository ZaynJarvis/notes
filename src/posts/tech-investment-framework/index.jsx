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
  Pre,
} from '../../blog-components';

const cover = '/assets/covers/tech-investment-framework.png';

const TechInvestmentFramework = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('科技股全链路分析分八步：先定宏观技术周期方向，再用二维矩阵给子行业分类定策略，然后拆解商业模式护城河与单元经济，进行三表建模与 ROIC 测算，预测 Bull / Base / Bear 三情景成长路径，构建估值工具组合（EV/Rev → DCF），绘制催化剂地图，最后用四类风险矩阵确定对冲方案。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('科技行业没有单一万能估值工具，也没有可以直接抄的研究模板。可复用的是流程：从宏观周期到子行业归类，再到公司模型与估值，最后落到催化剂时间表和风险对冲。该框架从大宗商品研究框架与三小时通用研究法迁移而来，适用于 SaaS、平台、AI 算力、半导体、Fintech 等主流子行业。')}
        </P>
      </Callout>

      <H2>{label('八步一页版')}</H2>
      <P>
        {label('每次开始新标的研究前，按此清单逐项确认。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`① 宏观技术周期定位
   · AI/AIGC 第几阶段？利率路径方向？监管收紧 or 放开？

② 子行业矩阵分类
   · 落在哪个象限？结构成长 vs 周期 / 宏观关联 vs 行业专有

③ 商业模式
   · ROE 驱动类型？护城河来源？收入结构？
   · 单元经济：SaaS → NRR & LTV/CAC；平台 → GMV & ARPU

④ 财务建模
   · 三表清洗（剥离 SBC）；FCF 质量；ROIC vs WACC
   · Rule of 40 / EBITDA Margin 路径

⑤ 成长预测
   · 收入驱动因子（用户 × ARPU / GMV × Take Rate / 产能 × ASP）
   · Bull / Base / Bear 三情景 + 关键假设差异点

⑥ 估值
   · 工具选择：EV/Rev → EV/EBITDA → FCF Yield → DCF
   · Comps 选同子行业；DCF 做 WACC / 终值敏感性

⑦ 催化剂地图
   · 未来 3-6 个月产品 + 财报 + 监管 + 资本事件清单

⑧ 风险矩阵
   · 4 类风险 + 论点失效条件（任何 2 个同时发生 → 下修）
   · 对冲工具配置`}</Pre>

      <H2>{label('Step 01 — 宏观与科技周期定位')}</H2>
      <P>
        {label('目标：判断当前处于哪个技术范式阶段，为整体仓位方向设定基准。输出"Bullish / Neutral / Cautious"的整体判断，指导选股难度和仓位规模。')}
      </P>
      <Ul>
        <Li>
          <Strong>{label('技术范式切换。')}</Strong>
          {label('AI / AIGC 周期处于什么阶段（基础设施建设期 / 应用扩散期 / 过热泡沫期）？参考 TFP / PPF 逻辑：新技术采用期增长真实，成熟期出现 overcapacity。')}
        </Li>
        <Li>
          <Strong>{label('利率路径。')}</Strong>
          {label('高利率压缩高倍数成长股估值（分母效应）；降息周期打开重估空间。判断当前 terminal rate 预期，以及 FOMC 节点的边际影响。')}
        </Li>
        <Li>
          <Strong>{label('监管周期。')}</Strong>
          {label('反垄断、数据隐私、AI 监管、加密政策——哪些在收紧，哪些在放开，直接影响估值折价幅度。')}
        </Li>
        <Li>
          <Strong>{label('资本流向。')}</Strong>
          {label('PE / VC 退出节奏、IPO 窗口开关、VIX 水平、成长 vs 价值风格轮动、ARKK 等科技 beta 情绪指标。')}
        </Li>
      </Ul>

      <H2>{label('Step 02 — 子行业分类（2×2 矩阵）')}</H2>
      <P>
        {label('把不同科技子行业映射到四个象限，匹配差异化的分析重点和持仓策略。X 轴是基本面需求强弱，Y 轴是宏观关联度 vs 行业专有性。')}
      </P>
      <Table
        headers={[label('象限'), label('特征'), label('典型标的'), label('策略')]}
        rows={[
          [
            label('Q1 结构成长 × 宏观关联'),
            label('需求长期向上 + 受宏观利率/流动性影响大'),
            label('云计算 / AI 算力（NVDA、MSFT、AMZN）'),
            label('长期持有，降息加仓，估值稍贵可接受'),
          ],
          [
            label('Q2 周期 × 宏观关联'),
            label('需求受宏观周期波动 + 政策驱动明显'),
            label('消费电子 / PC / 广告科技'),
            label('做波段，跟政策节点'),
          ],
          [
            label('Q3 结构成长 × 行业专有'),
            label('需求长期向上 + 集中于少数下游行业'),
            label('垂直 SaaS（医疗、法律）/ 半导体设备'),
            label('深入行业需求链，高护城河持有'),
          ],
          [
            label('Q4 周期 × 行业专有'),
            label('需求受行业周期波动 + 行业特定催化'),
            label('游戏 / 加密基础设施 / 部分 Fintech'),
            label('重跟踪行业需求信号，波段操作'),
          ],
        ]}
      />

      <H2>{label('Step 03 — 商业模式拆解')}</H2>
      <P>
        {label('核心问题：赚什么钱、护城河是否真实、增长是否可持续。对应通用研究法第一小时。')}
      </P>

      <H3>{label('ROE 驱动分析')}</H3>
      <Table
        headers={[label('驱动类型'), label('典型公司'), label('分析重点')]}
        rows={[
          [label('高利润率驱动'), label('Microsoft, Adobe'), label('毛利 + Operating Margin 扩张路径；定价权持续性')],
          [label('高资产周转率驱动'), label('Amazon AWS'), label('收入 / 资产比；规模效应下的边际利润改善')],
          [label('杠杆驱动'), label('少见（需谨慎）'), label('债务 / 资本结构；周期下行时的偿债能力')],
        ]}
      />

      <H3>{label('护城河类型')}</H3>
      <Ul>
        <Li>
          <Strong>{label('网络效应。')}</Strong>
          {label('Meta、Uber — 用户越多产品越有价值，切换成本随时间增厚。')}
        </Li>
        <Li>
          <Strong>{label('转换成本。')}</Strong>
          {label('Salesforce、SAP — 深度整合工作流；迁移成本高于价格差异。')}
        </Li>
        <Li>
          <Strong>{label('规模效应。')}</Strong>
          {label('Amazon、TSMC — 边际成本递减；固定成本摊薄优势难以复制。')}
        </Li>
        <Li>
          <Strong>{label('品牌 + 数据飞轮。')}</Strong>
          {label('Google、Apple — 数据积累形成反馈循环，产品越用越好。')}
        </Li>
        <Li>
          <Strong>{label('监管牌照。')}</Strong>
          {label('Robinhood、Coinbase — 合规准入形成准入壁垒，短期难以复制。')}
        </Li>
        <Li>
          <Strong>{label('技术专利 / R&D。')}</Strong>
          {label('Qualcomm、ASML — 专利组合 + 持续 R&D 投入构建技术壁垒。')}
        </Li>
      </Ul>

      <H3>{label('单元经济（科技特有）')}</H3>
      <Table
        headers={[label('业务类型'), label('核心指标'), label('健康基准')]}
        rows={[
          [label('SaaS'), label('NRR、CAC、LTV/CAC、ACV、Churn'), label('NRR > 120% · LTV/CAC > 3x · Churn < 5%/yr')],
          [label('平台'), label('GMV × Take Rate、MAU、ARPU'), label('Take Rate 稳定或提升；ARPU YoY 增长')],
          [label('硬件 + 服务'), label('设备出货量 × 服务 ARPU、attach rate'), label('服务收入占比持续提升（Apple 模式）')],
          [label('AI / 基础设施'), label('GPU 出货量 × ASP、数据中心 Capex 份额'), label('份额稳定 + ASP 不受压')],
        ]}
      />

      <H2>{label('Step 04 — 财务建模')}</H2>
      <P>
        {label('目标：建立可运行的三表模型，产出真实盈利能力指标。对应通用研究法第二小时。')}
      </P>

      <H3>{label('三表清洗要点')}</H3>
      <Ul>
        <Li>
          <Strong>{label('IS（利润表）。')}</Strong>
          {label('把 SBC（股权激励）单独剥离——SBC 是真实成本，non-GAAP 调整后会高估利润；识别重组费用等一次性项目。')}
        </Li>
        <Li>
          <Strong>{label('BS（资产负债表）。')}</Strong>
          {label('关注递延收入（预付款，利好现金流稳定性）；商誉减值风险（并购密集型公司）；净现金 vs 净债务。')}
        </Li>
        <Li>
          <Strong>{label('CFS（现金流量表）。')}</Strong>
          {label('FCF = Operating CF − Capex。SaaS 公司 Capex 轻；芯片 / 云基础设施 Capex 重，需区分维护性与增长性 Capex。')}
        </Li>
      </Ul>

      <H3>{label('核心指标矩阵')}</H3>
      <Table
        headers={[label('维度'), label('指标'), label('科技行业健康值参考')]}
        rows={[
          [label('盈利质量'), label('GAAP Operating Margin、Adj. EBITDA Margin、NOPAT Margin'), label('SaaS 目标 Adj. EBITDA > 20%；Rule of 40：Revenue Growth% + FCF Margin% ≥ 40')],
          [label('效率'), label('Revenue / Employee、Capital Turnover'), label('高效公司 > $500K revenue/employee')],
          [label('资本回报'), label('ROIC、ROACE、ROE'), label('ROIC > WACC（通常 > 10-12%）')],
          [label('现金质量'), label('FCF Conversion (NI → FCF)'), label('SaaS 通常 > 80%；优质公司 > 100%')],
          [label('杠杆'), label('Net Gearing = (Debt − Cash) / Equity'), label('多数科技公司 net cash；净杠杆为负是健康信号')],
          [label('SBC 警觉'), label('SBC / Revenue'), label('SBC/Rev > 15-20% 是危险信号，稀释真实回报')],
        ]}
      />

      <Callout type="warn" title={label('Rule of 40 适用边界')}>
        <P>
          {label('Rule of 40 是 SaaS 行业常用健康指标（增长率 + FCF 利润率 ≥ 40），但成熟期科技公司（AAPL、MSFT）更应看绝对 FCF 和 ROIC，不要硬套 SaaS 指标。')}
        </P>
      </Callout>

      <H2>{label('Step 05 — 成长预测与情景建模')}</H2>
      <P>
        {label('按业务类型选择收入预测驱动，构建 Bull / Base / Bear 三情景。')}
      </P>

      <H3>{label('收入预测驱动（按业务类型）')}</H3>
      <Ul>
        <Li>
          <Strong>SaaS：</Strong>
          {label('用户数 × 每用户 ARR，需体现 expansion revenue 和 churn 净影响。')}
        </Li>
        <Li>
          <Strong>{label('平台：')}</Strong>
          {label('MAU × ARPU 或 GMV × Take Rate，关注货币化效率趋势。')}
        </Li>
        <Li>
          <Strong>{label('半导体：')}</Strong>
          {label('产能利用率 × ASP × 市场份额，需预判产能扩张节奏。')}
        </Li>
        <Li>
          <Strong>{label('AI 基础设施：')}</Strong>
          {label('数据中心支出大盘规模 × 市场份额，参考超大云厂商 Capex 指引。')}
        </Li>
      </Ul>

      <H3>{label('三情景框架')}</H3>
      <Table
        headers={[label('情景'), label('营收 CAGR'), label('利润率路径'), label('关键假设')]}
        rows={[
          [label('Bull'), '25-35%', label('持续扩张，40%+ Adj. EBITDA'), label('产品 upsell 成功、新市场渗透、AI 驱动需求超预期')],
          [label('Base'), '15-20%', label('稳定扩张，Rule of 40 达标'), label('主业稳定、新产品贡献温和、宏观无重大冲击')],
          [label('Bear'), '5-8%', label('压缩，FCF Margin 下行'), label('宏观放缓 / 竞争加剧 / 监管 / 客户 churn 上升')],
        ]}
      />

      <H2>{label('Step 06 — 估值工具组合')}</H2>
      <P>
        {label('科技行业没有单一万能估值工具，需根据公司盈利阶段选择合适方法并交叉验证。')}
      </P>
      <Table
        headers={[label('工具'), label('适用场景'), label('注意事项')]}
        rows={[
          [label('EV/Revenue'), label('高增早期、尚未盈利'), label('需结合毛利率；忽视毛利率会高估低毛利公司')],
          [label('EV/Gross Profit'), label('毛利率差异大时（SaaS vs 硬件）'), label('更公平的跨业务比较基础')],
          [label('EV/EBITDA'), label('已规模盈利的科技公司'), label('最常用；注意 Adj. EBITDA 是否剔除 SBC')],
          [label('P/E (GAAP)'), label('成熟盈利公司'), label('SBC 高的公司会低估真实盈利成本')],
          [label('FCF Yield'), label('成熟科技（AAPL、MSFT）'), label('FCF Yield = FCF / Market Cap；> 4-5% 相对安全')],
          [label('DCF'), label('长期内在价值锚定'), label('对 WACC 和 terminal growth rate 极度敏感，必须做敏感性分析')],
          [label('PEG'), label('判断高增成长股是否合理溢价'), label('PEG = P/E ÷ 增长率；PEG < 1 一般偏便宜')],
        ]}
      />

      <Callout type="note" title={label('Comps 选择')}>
        <P>
          {label('可比公司法要在同一子行业内比较（不要拿纯 SaaS 和半导体混比）；注意各公司 NTM 预期来源（卖方共识 vs 自建模型）；历史估值区间（均值 ± 1SD）提供估值锚。')}
        </P>
      </Callout>

      <H2>{label('Step 07 — 催化剂与短期时机')}</H2>
      <P>
        {label('科技股短期价格往往由可预期的事件节点驱动，提前绘制催化剂地图可改善入场时机。')}
      </P>
      <Table
        headers={[label('类型'), label('典型事件')]}
        rows={[
          [label('产品发布'), label('WWDC、Build、Google I/O、AWS re:Invent；新产品线上市常常提前半年埋伏')],
          [label('财报 Beat & Raise'), label('季度 EPS / Revenue beat 同时上调全年指引是最强正催化；反之 miss & lower 触发多重压缩')],
          [label('大客户 / 政府合同'), label('JEDI 等大型政府合同、AI 大模型厂商合作披露、超大 MSA 签约公告')],
          [label('监管 / 诉讼'), label('反垄断诉讼判决、数据隐私执法、AI 监管框架落地、加密或 Fintech 牌照政策')],
          [label('指数 / 调仓'), label('S&P 500 纳入带来被动资金流入；季度末 ETF 再平衡形成短期交易窗口')],
          [label('资本事件'), label('超预期回购授权、战略性并购宣布或取消、创始人 / CEO 变动')],
        ]}
      />

      <H2>{label('Step 08 — 风险矩阵与对冲')}</H2>
      <Callout type="warn" title={label('监管面正在变宽')}>
        <P>
          {label('科技行业监管面正在快速变宽：PFOF、加密资产、event contracts、AI 工具、私募分发——任何一条新规都可能在短期内压缩特定子行业估值。需要明确列出"论点失效条件"。')}
        </P>
      </Callout>
      <Table
        headers={[label('风险类型'), label('具体体现'), label('严重性'), label('对冲方式')]}
        rows={[
          [label('估值风险'), label('高倍数 + 利率上升 = 多重压缩'), label('HIGH'), label('配置低估值 / 盈利型科技对冲；限制高 P/S 仓位')],
          [label('竞争风险'), label('颠覆性竞争者出现、护城河蚕食'), label('MEDIUM'), label('持续跟踪市场份额变化、客户 NRR 趋势')],
          [label('执行风险'), label('产品 miss、增长 miss、管理层变动'), label('MEDIUM'), label('季报后复盘关键 KPI；设置止损纪律')],
          [label('监管 / 宏观风险'), label('反垄断、AI 监管、降息节奏变化'), label('HIGH'), label('行业内配置分散；宏观对冲工具（TLT、VIX）')],
        ]}
      />

      <H2>{label('框架来源')}</H2>
      <Ul>
        <Li>{label('Step 01-02 宏观 + 矩阵：四维投资框架 — cycles / 2026 outlook、two dimensions 章节')}</Li>
        <Li>{label('Step 03 商业模式：通用研究法 — 第 1 小时部分')}</Li>
        <Li>{label('Step 04 财务建模：通用研究法 — 第 2 小时部分')}</Li>
        <Li>{label('Step 05-06 预测 + 估值：通用研究法 + CFA Equity Valuation Applications and Processes 2026')}</Li>
        <Li>{label('Step 07 催化剂：四维投资框架 — short term timing 章节')}</Li>
        <Li>{label('Step 08 风险：通用研究法 + CFA Standard V(A) Diligence + CFA Standard V(B) Client Communication')}</Li>
      </Ul>

      <H2>{label('最后的压缩')}</H2>
      <P>
        <Strong>{label('框架不是用来证明你"研究过"，而是用来确保下一次你看一个新标的时不会漏掉关键判断点。')}</Strong>
      </P>
      <P>
        {label('每个新科技股标的研究开始之前，对照八步 Checklist 跑一遍。Step 1-2 决定整体方向，Step 3-4 是基本面真伪检验，Step 5-6 给出估值锚，Step 7-8 决定操作节奏。任何一步如果模糊，对应的投资判断就该往保守方向调。')}
      </P>
    </Article>
  );
};

export default {
  id: 'tech-investment-framework',
  Component: TechInvestmentFramework,
  meta: {
    title: { zh: '科技行业全链路投资分析框架' },
    description: { zh: '八步系统化方法：从宏观周期到子行业矩阵，到商业模式、财务建模、估值、催化剂和风险对冲。' },
    cover,
    publishedAt: '2026-06-18',
    readingTime: { zh: 14 },
    category: { zh: 'Investment' },
    tags: ['investment', 'framework', 'equity-research', 'tech-stocks', 'valuation'],
    languages: ['zh'],
    llmPath: '/post/tech-investment-framework/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
