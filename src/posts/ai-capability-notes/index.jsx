import React, { useMemo, useState } from 'react';
import { Article, Lead, H2, H3, P, Tag } from '../../blog-components';

const cover = '/assets/covers/ai-capability-notes.png';

const assetModules = import.meta.glob('./assets/**/*.jpg', { eager: true, import: 'default' });

function asset(path) {
  return assetModules[`./assets/${path}`];
}

const categories = [
  { id: 'all', name: '全部材料' },
  { id: 'audio', name: '音频/视频' },
  { id: 'message', name: '消息/邮件' },
  { id: 'data', name: '表格/数据' },
  { id: 'doc', name: 'PDF/文档' },
  { id: 'image', name: '图片/素材' },
  { id: 'web', name: '网页/截图' },
  { id: 'sop', name: '固定流程' },
];

const purposes = [
  { id: 'all', name: '全部目的' },
  { id: 'speed', name: '提效' },
  { id: 'risk', name: '少出错' },
  { id: 'content', name: '生成内容' },
  { id: 'understand', name: '理解材料' },
  { id: 'knowledge', name: '整理知识' },
  { id: 'followup', name: '跟进客户/团队' },
];

const paths = [
  { id: 'all', name: '全部路径', note: '自由筛选 48 个场景', ids: [] },
  { id: 'starter', name: '新手 10 个必试', note: '先获得体感，再扩展到自己的材料', ids: [1, 8, 9, 10, 15, 25, 28, 33, 34, 42] },
  { id: 'sales', name: '销售/运营高频', note: '围绕客户消息、表格和内容增长', ids: [3, 8, 11, 12, 15, 16, 22, 24, 34, 38, 42, 45] },
  { id: 'boss', name: '管理者/老板高杠杆', note: '先看异常、风险、决策和自动化', ids: [15, 16, 19, 20, 24, 25, 26, 27, 30, 40, 47, 48] },
];

const visualPages = {
  1: { page: 'pages/01-meeting-minutes-todos.jpg', base: '01-meeting-minutes-todos', count: 4 },
  8: { page: 'pages/02-customer-message-reply.jpg', base: '02-customer-message-reply', count: 4 },
  15: { page: 'pages/03-order-table-briefing.jpg', base: '03-order-table-briefing', count: 6 },
  25: { page: 'pages/04-contract-risk-list.jpg', base: '04-contract-risk-list', count: 6 },
  33: { page: 'pages/05-product-assets-ppt-video.jpg', base: '05-product-assets-ppt-video', count: 6 },
  48: { page: 'pages/06-sop-agent-run.jpg', base: '06-sop-agent-run', count: 6 },
};

const visualIds = Object.keys(visualPages).map(Number);

function profileFor(category, id) {
  const roleByCategory = {
    audio: '团队/运营',
    message: '销售/客服',
    data: '运营/管理',
    doc: '管理/法务',
    image: '市场/内容',
    web: '市场/运营',
    sop: '运营/管理',
  };
  const purposeByCategory = {
    audio: 'understand',
    message: 'followup',
    data: 'risk',
    doc: 'understand',
    image: 'content',
    web: 'knowledge',
    sop: 'speed',
  };
  let effort = '需要准备样例';
  if ([1, 8, 9, 10, 14, 28, 34, 36, 41, 43, 44, 45, 46].includes(id)) effort = '5分钟可试';
  if ([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 42, 47].includes(id)) effort = '适合批量化';
  if ([25, 26, 32, 40].includes(id)) effort = '需要人工复核';
  if ([29, 48].includes(id)) effort = '适合接入工具';
  return {
    purpose: purposeByCategory[category],
    role: roleByCategory[category],
    effort,
  };
}

function scenario(id, category, input, output, material, result, steps) {
  const profile = profileFor(category, id);
  const visual = visualPages[id];
  const practice = asset(`practice/${String(id).padStart(2, '0')}.jpg`);
  return {
    id,
    category,
    ...profile,
    input,
    output,
    title: `${input} → ${output}`,
    sentence: `把${material}变成${result}`,
    material,
    result,
    steps,
    practice,
    visual: visual ? {
      page: asset(visual.page),
      slices: Array.from({ length: visual.count }, (_, index) => asset(`slices/${visual.base}-p${index + 1}.jpg`)),
    } : null,
    prompt: `我有这些材料：${material}。\n请帮我输出：${result}。\n要求：先列关键信息，再给可执行动作；不确定的地方单独标出来，不要编造。`,
  };
}

const scenarios = [
  scenario(1, 'audio', '会议录音', '纪要待办', '一段会议录音', '纪要、待办、责任人', ['录音', '提炼', '纪要', '确认']),
  scenario(2, 'audio', '电话录音', '客户需求摘要', '一段销售或售后电话', '客户背景、真实诉求、下一步动作', ['上传录音', '提取诉求', '补充背景', '生成跟进']),
  scenario(3, 'audio', '销售通话', '跟进话术', '销售和客户的通话记录', '下一次沟通要点和可直接发的话', ['听通话', '找异议', '写话术', '设提醒']),
  scenario(4, 'audio', '培训视频', '操作手册', '内部培训视频或录屏', '步骤手册、注意事项、检查题', ['转文字', '拆步骤', '补注意', '生成手册']),
  scenario(5, 'audio', '直播回放', '切片脚本', '一段直播或活动回放', '短视频切点、标题、口播稿', ['看回放', '找亮点', '写标题', '出脚本']),
  scenario(6, 'audio', '访谈录音', '用户洞察', '客户访谈或用户研究录音', '痛点、原话、机会点', ['转写', '归类', '摘原话', '列机会']),
  scenario(7, 'audio', '客服录音', '投诉原因分类', '多段客服通话', '投诉类型、频次、改进建议', ['导入录音', '聚类原因', '统计频次', '给建议']),
  scenario(8, 'message', '客户消息', '回复方案', '微信、邮件或客服消息', '回复草稿、报价说明、跟进提醒', ['消息', '判断', '方案', '发送']),
  scenario(9, 'message', '微信群记录', '问题清单', '一段项目群聊天记录', '问题、负责人、截止时间', ['粘贴记录', '找问题', '分负责人', '发清单']),
  scenario(10, 'message', '邮件往来', '项目进展摘要', '一个邮件线程', '进展、争议、待确认事项', ['导入邮件', '梳理时间线', '标决策', '写摘要']),
  scenario(11, 'message', '售后消息', '安抚话术', '客户投诉或售后对话', '安抚回复、补偿边界、升级建议', ['看情绪', '定级别', '写回复', '留记录']),
  scenario(12, 'message', '供应商消息', '议价要点', '报价沟通记录', '可谈条件、底线、替代方案', ['整理报价', '找差异', '列筹码', '写话术']),
  scenario(13, 'message', '招聘沟通', '候选人摘要', '候选人简历和聊天记录', '匹配度、风险点、面试问题', ['读简历', '看沟通', '打标签', '出问题']),
  scenario(14, 'message', '群公告草稿', '多版本通知', '一段通知要点', '正式版、轻松版、短消息版', ['写要点', '选对象', '改语气', '发版本']),
  scenario(15, 'data', '订单表', '经营简报', '订单 Excel 或 CSV', '销售额、异常单、下步行动', ['订单表', '清洗', '分类', '指标', '简报', '复盘']),
  scenario(16, 'data', '销售表', '异常客户提醒', '按客户汇总的销售表', '下滑客户、增长客户、跟进优先级', ['导入表', '看变化', '找异常', '排优先']),
  scenario(17, 'data', '库存表', '补货建议', '库存、销量、在途数据', '缺货风险和补货数量', ['读库存', '看周转', '算风险', '给建议']),
  scenario(18, 'data', '发货表', '延误风险清单', '发货计划和物流状态', '可能延误订单和通知文案', ['导入发货', '对日期', '标风险', '写通知']),
  scenario(19, 'data', '费用表', '成本波动分析', '月度费用明细', '异常费用、原因假设、检查方向', ['清分类', '比同期', '找异常', '写解释']),
  scenario(20, 'data', '回款表', '催收优先级', '应收账款和账期数据', '催收名单、话术、风险等级', ['看账龄', '分等级', '排名单', '写话术']),
  scenario(21, 'data', '考勤表', '排班问题提示', '考勤和排班表', '缺勤、超时、排班冲突', ['读考勤', '查规则', '标冲突', '给排班']),
  scenario(22, 'data', '客户名单', '分层跟进计划', '客户资料和历史成交', 'A/B/C 分层和跟进节奏', ['清名单', '打标签', '分层级', '排动作']),
  scenario(23, 'data', '报价表', '利润测算', '成本和报价明细', '毛利、敏感项、调价建议', ['读报价', '算毛利', '找敏感', '给区间']),
  scenario(24, 'data', '采购表', '供应商对比', '供应商报价和交期表', '价格、质量、交期对比', ['合并表', '统一口径', '算得分', '出建议']),
  scenario(25, 'doc', '合同PDF', '风险清单', '客户或供应商合同 PDF', '风险条款、谈判点、修改建议', ['合同', '识别', '标红', '清单', '人审', '修改']),
  scenario(26, 'doc', '招标文件', '响应要点', '招标书或 RFP', '资格要求、评分点、材料清单', ['上传文件', '抽要求', '列材料', '排责任']),
  scenario(27, 'doc', '政策文件', '影响摘要', '政策通知或监管文件', '对业务的影响和待办', ['读政策', '摘变化', '看影响', '列动作']),
  scenario(28, 'doc', '产品说明书', '销售话术', '产品说明和参数文档', '卖点话术、FAQ、异议回答', ['读说明', '找卖点', '写问答', '出话术']),
  scenario(29, 'doc', '操作规程', '检查清单', 'SOP 或制度文件', '执行检查项和常见错误', ['读规程', '拆步骤', '列检查', '标错误']),
  scenario(30, 'doc', '财报PDF', '管理层摘要', '财报或经营报告', '核心指标、变化原因、风险', ['读报告', '取指标', '比变化', '写摘要']),
  scenario(31, 'doc', '客户方案', '优化建议', '给客户看的方案初稿', '结构问题、补充内容、表达优化', ['读方案', '找缺口', '改结构', '补亮点']),
  scenario(32, 'doc', '法务文件', '关键条款提取', '协议、声明、授权文件', '关键义务、限制、到期日', ['上传文件', '抽条款', '标责任', '给提醒']),
  scenario(33, 'image', '产品素材', 'PPT/短视频', '产品照片、规格、卖点', 'PPT 页面和短视频脚本', ['素材', '卖点', '排版', 'PPT', '视频', '检查']),
  scenario(34, 'image', '产品照片', '电商详情页文案', '一组产品照片', '标题、卖点、详情页模块', ['看照片', '提卖点', '排模块', '写文案']),
  scenario(35, 'image', '门店照片', '陈列优化建议', '门店货架或展台照片', '陈列问题和调整方案', ['看照片', '找拥挤', '排动线', '给建议']),
  scenario(36, 'image', '活动照片', '宣传海报文案', '活动现场图片', '海报标题、短文案、发布语', ['选照片', '定主题', '写标题', '出发布']),
  scenario(37, 'image', '包装图', '卖点提炼', '包装正反面照片', '主卖点、注意事项、竞品角度', ['读包装', '抽信息', '转卖点', '写短句']),
  scenario(38, 'image', '竞品截图', '差异对比', '竞品页面或宣传图', '功能差异、价格差异、话术机会', ['看截图', '抽卖点', '对自家', '列机会']),
  scenario(39, 'image', '菜单照片', '套餐推荐', '菜单或价目表照片', '套餐组合、客单价建议', ['读菜单', '分品类', '组套餐', '写推荐']),
  scenario(40, 'image', '工厂现场照', '安全隐患提示', '车间或现场照片', '风险点、整改建议、复查清单', ['看现场', '标风险', '给整改', '列复查']),
  scenario(41, 'web', '竞品官网', '卖点拆解', '竞品官网截图或链接', '定位、卖点、CTA、内容结构', ['打开网页', '拆结构', '抽卖点', '对自家']),
  scenario(42, 'web', '平台评论', '用户痛点总结', '电商、应用商店或论坛评论', '高频痛点和改进方向', ['收评论', '聚类', '摘原话', '排优先']),
  scenario(43, 'web', '小红书笔记', '内容选题', '同类笔记截图或链接', '选题角度、标题、封面方向', ['看笔记', '找爆点', '改角度', '写选题']),
  scenario(44, 'web', '抖音评论', '话题机会', '视频评论区截图', '用户关心的问题和下条视频选题', ['看评论', '分问题', '找争议', '出选题']),
  scenario(45, 'web', '电商页面', '标题优化', '商品页标题和详情', '更清楚的标题、卖点排序', ['读页面', '看关键词', '改标题', '排卖点']),
  scenario(46, 'web', '后台截图', '操作指引', '系统后台页面截图', '下一步操作、字段说明、注意事项', ['看截图', '识别字段', '写步骤', '标注意']),
  scenario(47, 'web', '舆情页面', '风险摘要', '新闻、微博、论坛讨论', '风险等级、关键观点、应对建议', ['收页面', '分观点', '定等级', '写建议']),
  scenario(48, 'sop', '固定SOP', 'Agent代跑', '重复执行的流程说明', '自动执行、异常提醒、运行记录', ['SOP', '拆步', '代跑', '异常', '人审', '记录']),
];

const styles = `
.ai-notes { --ai-soft: color-mix(in oklab, var(--th-bg-2) 80%, var(--th-bg)); --ai-card: color-mix(in oklab, var(--th-bg) 86%, var(--th-bg-2)); }
.ai-notes__hero { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--ai-soft); padding: 1rem; margin: 1.5rem 0 2rem; }
.ai-notes__stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: 1rem; }
.ai-notes__stat { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); padding: .85rem; }
.ai-notes__stat strong { display: block; font-family: var(--th-font-display); font-size: clamp(1.5rem, 4vw, 2.4rem); line-height: 1; color: var(--th-accent); font-weight: 500; }
.ai-notes__stat span { display: block; margin-top: .35rem; color: var(--th-mute); font-family: var(--th-font-mono); font-size: .75rem; }
.ai-notes__path-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin: 1rem 0 1.5rem; }
.ai-notes__path { text-align: left; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); color: var(--th-ink); padding: .85rem; cursor: pointer; }
.ai-notes__path:hover, .ai-notes__path.is-active { border-color: var(--th-accent); box-shadow: var(--th-shadow); }
.ai-notes__path strong { display: block; font-family: var(--th-font-display); font-size: 1.05rem; line-height: 1.25; font-weight: 500; }
.ai-notes__path span { display: block; margin-top: .4rem; color: var(--th-mute); line-height: 1.45; font-size: .9rem; }
.ai-notes__path small { display: inline-block; margin-top: .75rem; color: var(--th-accent); font-family: var(--th-font-mono); font-size: .72rem; }
.ai-notes__control { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--ai-soft); padding: .85rem; margin: 1rem 0; }
.ai-notes__control-head { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-bottom: .75rem; color: var(--th-mute); font-size: .85rem; }
.ai-notes__count { font-family: var(--th-font-mono); color: var(--th-ink); }
.ai-notes__reset { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); color: var(--th-accent); cursor: pointer; font: inherit; padding: .35rem .55rem; }
.ai-notes__reset:hover { border-color: var(--th-accent); }
.ai-notes__search { width: 100%; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); color: var(--th-ink); font: inherit; padding: .8rem .9rem; outline: none; }
.ai-notes__rail { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: .75rem; }
.ai-notes__chip { border: thin solid var(--th-line); border-radius: 999rem; background: var(--th-bg); color: var(--th-mute); padding: .38rem .68rem; cursor: pointer; font-family: var(--th-font-mono); font-size: .78rem; }
.ai-notes__chip:hover { color: var(--th-ink); border-color: var(--th-accent); }
.ai-notes__chip.is-active { color: var(--th-bg); background: var(--th-ink); border-color: var(--th-ink); }
.ai-notes__visual-shortcuts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin: 1rem 0 1.5rem; }
.ai-notes__visual-button { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); color: var(--th-ink); padding: 0; overflow: hidden; text-align: left; cursor: pointer; }
.ai-notes__visual-button:hover { border-color: var(--th-accent); box-shadow: var(--th-shadow); }
.ai-notes__visual-button img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-bottom: thin solid var(--th-line); }
.ai-notes__visual-button span { display: block; padding: .65rem .7rem; font-size: .88rem; line-height: 1.35; }
.ai-notes__workspace { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-top: 1.5rem; }
.ai-notes__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; align-items: stretch; }
.ai-notes__card { text-align: left; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--ai-card); color: var(--th-ink); padding: .9rem; cursor: pointer; min-height: 12rem; display: flex; flex-direction: column; gap: .7rem; transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease; }
.ai-notes__card:hover, .ai-notes__card.is-active { transform: translateY(-.0625rem); border-color: var(--th-accent); box-shadow: var(--th-shadow); }
.ai-notes__card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: .75rem; color: var(--th-mute); font-family: var(--th-font-mono); font-size: .72rem; }
.ai-notes__badge { border: thin solid var(--th-line); border-radius: 999rem; padding: .18rem .45rem; white-space: nowrap; }
.ai-notes__card h3 { margin: 0; font-family: var(--th-font-display); font-size: clamp(1.05rem, 2vw, 1.32rem); line-height: 1.25; font-weight: 500; color: var(--th-ink); }
.ai-notes__sentence { margin: 0; color: var(--th-ink); font-size: .95rem; line-height: 1.48; }
.ai-notes__meta { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: auto; }
.ai-notes__meta span { border: thin solid var(--th-line); border-radius: var(--th-radius); padding: .2rem .38rem; color: var(--th-mute); font-size: .72rem; }
.ai-notes__detail { border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); padding: 1rem; position: sticky; top: 5.5rem; align-self: start; }
.ai-notes__detail h3 { margin: .35rem 0 .75rem; font-family: var(--th-font-display); font-size: clamp(1.35rem, 3vw, 2rem); font-weight: 500; line-height: 1.2; }
.ai-notes__pillrow { display: flex; flex-wrap: wrap; gap: .45rem; margin-bottom: 1rem; }
.ai-notes__section { border-top: thin solid var(--th-line); padding-top: .9rem; margin-top: .9rem; }
.ai-notes__section h4 { margin: 0 0 .65rem; font-family: var(--th-font-mono); font-size: .78rem; letter-spacing: 0; text-transform: uppercase; color: var(--th-mute); font-weight: 500; }
.ai-notes__practice-visual { border: thin solid var(--th-line); border-radius: var(--th-radius); overflow: hidden; background: var(--ai-soft); margin-bottom: .7rem; }
.ai-notes__practice-visual img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
.ai-notes__steps { list-style: none; padding: 0; margin: 0; display: grid; gap: .45rem; }
.ai-notes__steps li { display: grid; grid-template-columns: 1.65rem minmax(0, 1fr); gap: .55rem; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--ai-soft); padding: .5rem; color: var(--th-ink); }
.ai-notes__steps strong { display: inline-grid; place-items: center; width: 1.35rem; height: 1.35rem; border-radius: 999rem; background: var(--th-accent); color: var(--th-bg); font-family: var(--th-font-mono); font-size: .75rem; font-weight: 500; }
.ai-notes__prompt { white-space: pre-wrap; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--ai-soft); padding: .85rem; line-height: 1.6; font-size: .92rem; color: var(--th-ink); }
.ai-notes__copy { width: 100%; margin-top: .55rem; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); color: var(--th-accent); font: inherit; padding: .7rem; cursor: pointer; }
.ai-notes__copy:hover { border-color: var(--th-accent); }
.ai-notes__visual { border: thin solid var(--th-line); border-radius: var(--th-radius); overflow: hidden; background: var(--ai-soft); }
.ai-notes__visual img { display: block; width: 100%; height: auto; }
.ai-notes__slices { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .45rem; margin-top: .55rem; }
.ai-notes__slices img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border: thin solid var(--th-line); border-radius: var(--th-radius); background: var(--th-bg); }
.ai-notes__empty { border: thin dashed var(--th-line); border-radius: var(--th-radius); padding: 1.2rem; color: var(--th-mute); text-align: center; }
@media (min-width: 70rem) { .ai-notes__workspace { grid-template-columns: minmax(0, 1fr) minmax(22rem, 26rem); } }
@media (max-width: 47.5rem) { .ai-notes__grid, .ai-notes__stats, .ai-notes__path-grid, .ai-notes__visual-shortcuts { grid-template-columns: 1fr; } .ai-notes__control-head { align-items: flex-start; flex-direction: column; } .ai-notes__detail { position: static; } }
`;

function findById(list, id, fallback) {
  return list.find(item => item.id === id) || fallback || list[0];
}

function ScenarioCard({ item, active, onClick, label }) {
  const category = findById(categories, item.category);
  return (
    <button type="button" className={`ai-notes__card ${active ? 'is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      <div className="ai-notes__card-top">
        <span>{String(item.id).padStart(2, '0')}</span>
        <span className="ai-notes__badge">{label(category.name)}</span>
      </div>
      <h3>{label(item.title)}</h3>
      <p className="ai-notes__sentence">{label(item.sentence)}</p>
      <div className="ai-notes__meta">
        <span>{label(item.effort)}</span>
        <span>{label(item.role)}</span>
        {item.visual ? <span>{label('图解')}</span> : null}
      </div>
    </button>
  );
}

function DetailPanel({ item, label }) {
  const [copied, setCopied] = useState(false);
  const category = findById(categories, item.category);
  const purpose = findById(purposes, item.purpose);

  const copyPrompt = async () => {
    try {
      if (!navigator?.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className="ai-notes__detail">
      <div className="ai-notes__pillrow">
        <Tag>{String(item.id).padStart(2, '0')}</Tag>
        <Tag>{label(category.name)}</Tag>
        <Tag>{label(purpose.name)}</Tag>
        <Tag>{label(item.role)}</Tag>
        <Tag>{label(item.effort)}</Tag>
      </div>
      <h3>{label(item.title)}</h3>
      <P>{label(item.sentence)}</P>

      <div className="ai-notes__section">
        <h4>{label('马上怎么试')}</h4>
        {item.practice ? (
          <div className="ai-notes__practice-visual">
            <img src={item.practice} alt={label(`${item.title} 练习图`)} loading="lazy" decoding="async" />
          </div>
        ) : null}
        <ol className="ai-notes__steps">
          {item.steps.map((step, index) => (
            <li key={step}>
              <strong>{index + 1}</strong>
              <span>{label(step)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="ai-notes__section">
        <h4>{label('可复制提示词')}</h4>
        <div className="ai-notes__prompt">{label(item.prompt)}</div>
        <button type="button" className="ai-notes__copy" onClick={copyPrompt}>
          {label(copied ? '已复制' : '复制提示词')}
        </button>
      </div>

      {item.visual ? (
        <div className="ai-notes__section">
          <h4>{label('图解页')}</h4>
          <div className="ai-notes__visual">
            <img src={item.visual.page} alt={label(item.title)} loading="lazy" decoding="async" />
          </div>
          <div className="ai-notes__slices">
            {item.visual.slices.map((src, index) => (
              <img key={src} src={src} alt={label(`${item.title} - ${item.steps[index] || index + 1}`)} loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function PathCards({ value, onChange, label }) {
  return (
    <div className="ai-notes__path-grid" aria-label={label('学习路径')}>
      {paths.filter(item => item.id !== 'all').map(item => (
        <button
          type="button"
          key={item.id}
          className={`ai-notes__path ${value === item.id ? 'is-active' : ''}`}
          aria-pressed={value === item.id}
          onClick={() => onChange(item.id)}
        >
          <strong>{label(item.name)}</strong>
          <span>{label(item.note)}</span>
          <small>{label(`${item.ids.length} 个场景`)}</small>
        </button>
      ))}
    </div>
  );
}

function VisualShortcuts({ label, onSelect }) {
  const visualScenarios = visualIds.map(id => scenarios.find(item => item.id === id)).filter(Boolean);
  return (
    <div className="ai-notes__visual-shortcuts" aria-label={label('图解案例')}>
      {visualScenarios.map(item => (
        <button type="button" key={item.id} className="ai-notes__visual-button" onClick={() => onSelect(item.id)}>
          <img src={item.visual.page} alt={label(item.title)} loading="lazy" decoding="async" />
          <span>{label(`${String(item.id).padStart(2, '0')} ${item.title}`)}</span>
        </button>
      ))}
    </div>
  );
}

function FilterRail({ items, value, onChange, label, title, countFor }) {
  return (
    <div className="ai-notes__rail" aria-label={label(title)}>
      {items.map(item => (
        <button
          type="button"
          key={item.id}
          className={`ai-notes__chip ${value === item.id ? 'is-active' : ''}`}
          aria-pressed={value === item.id}
          onClick={() => onChange(item.id)}
        >
          {countFor ? `${label(item.name)} ${countFor(item)}` : label(item.name)}
        </button>
      ))}
    </div>
  );
}

const AiCapabilityNotes = ({ t }) => {
  const label = (value) => t({ zh: value });
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [purpose, setPurpose] = useState('all');
  const [path, setPath] = useState('all');
  const [selectedId, setSelectedId] = useState(1);
  const activePath = findById(paths, path);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scenarios.filter(item => {
      const matchCategory = category === 'all' || item.category === category;
      const matchPurpose = purpose === 'all' || item.purpose === purpose;
      const matchPath = activePath.id === 'all' || activePath.ids.includes(item.id);
      const haystack = [item.title, item.sentence, item.material, item.result, item.role, item.effort, item.steps.join(' ')].join(' ').toLowerCase();
      return matchCategory && matchPurpose && matchPath && (!q || haystack.includes(q));
    });
  }, [activePath, category, purpose, query]);

  const selected = filtered.find(item => item.id === selectedId) || filtered[0] || scenarios[0];
  const hasActiveFilters = query.trim() || category !== 'all' || purpose !== 'all' || path !== 'all';
  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setPurpose('all');
    setPath('all');
  };
  const jumpToScenario = (id) => {
    resetFilters();
    setSelectedId(id);
  };

  return (
    <Article className="ai-notes">
      <style>{styles}</style>
      <Lead>{label('这不是一份抽象能力清单，而是一张练习地图：先看你手上有什么材料，再看 AI 能换回什么结果，然后立刻复制提示词试一次。')}</Lead>

      <div className="ai-notes__hero">
        <H2>{label('先从 48 个小练习开始')}</H2>
        <P>{label('这里把场景按目的、材料和学习路径三种方式组织。第一次看建议走“新手 10 个必试”；已经有具体工作要处理，就直接按目的或材料筛选。')}</P>
        <div className="ai-notes__stats" aria-label={label('内容统计')}>
          <div className="ai-notes__stat"><strong>48</strong><span>{label('核心场景')}</span></div>
          <div className="ai-notes__stat"><strong>7</strong><span>{label('材料分类')}</span></div>
          <div className="ai-notes__stat"><strong>6</strong><span>{label('图解案例')}</span></div>
        </div>
      </div>

      <H2>{label('三条学习路径')}</H2>
      <P>{label('路径不是唯一入口，只是帮你先避开“从 48 张卡里随便翻”的成本。选中路径后，下面的卡片会自动收窄到对应场景。')}</P>
      <PathCards value={path} onChange={setPath} label={label} />

      <H2>{label('六个图解样例')}</H2>
      <P>{label('有完整图解的场景会展示整页视图和分块切图。先点图解样例，可以快速理解一张卡片里“输入、处理、输出、马上试”的结构。')}</P>
      <VisualShortcuts label={label} onSelect={jumpToScenario} />

      <H2>{label('按问题找入口')}</H2>
      <div className="ai-notes__control">
        <div className="ai-notes__control-head">
          <span><strong className="ai-notes__count">{filtered.length}</strong> {label('个匹配场景')} · {label(activePath.note)}</span>
          {hasActiveFilters ? (
            <button type="button" className="ai-notes__reset" onClick={resetFilters}>{label('重置筛选')}</button>
          ) : null}
        </div>
        <input
          className="ai-notes__search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={label('搜索：合同、订单、客户、SOP...')}
          aria-label={label('搜索场景')}
        />
        <FilterRail items={purposes} value={purpose} onChange={setPurpose} label={label} title="目的筛选" />
        <FilterRail
          items={categories}
          value={category}
          onChange={setCategory}
          label={label}
          title="材料筛选"
          countFor={(item) => item.id === 'all' ? scenarios.length : scenarios.filter(s => s.category === item.id).length}
        />
        <FilterRail items={paths} value={path} onChange={setPath} label={label} title="学习路径筛选" />
      </div>

      <div className="ai-notes__workspace">
        <section>
          <H3>{label('场景卡片')}</H3>
          {filtered.length ? (
            <div className="ai-notes__grid">
              {filtered.map(item => (
                <ScenarioCard
                  key={item.id}
                  item={item}
                  active={selected.id === item.id}
                  label={label}
                  onClick={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="ai-notes__empty">{label('没有匹配结果，换个关键词试试。')}</div>
          )}
        </section>
        <DetailPanel item={selected} label={label} />
      </div>
    </Article>
  );
};

export default {
  id: 'ai-capability-notes',
  Component: AiCapabilityNotes,
  meta: {
    title: { zh: 'AI 可以帮你做什么' },
    description: { zh: '48 个能马上练的 AI 场景，按目的、材料和学习路径组织成一篇可交互笔记。' },
    cover,
    publishedAt: '2026-05-27',
    readingTime: { zh: 8 },
    category: { zh: 'AI 工作流' },
    tags: ['ai', 'workflow', 'training', 'notes'],
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
