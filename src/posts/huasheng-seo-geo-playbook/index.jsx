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
  A,
  Pre,
  Ol,
} from '../../blog-components';

const cover = '/assets/covers/huasheng-seo-geo.png';
const site = 'https://hua-sheng.org';
const repo = 'https://github.com/ZaynJarvis/hua-sheng-site';

const HuashengSeoGeoPlaybook = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('对 hua-sheng.org 做了一轮完整的 SEO + GEO overhaul，31 项 backlog 全部落地。这篇不重复执行报告，只写可迁移的方法论和踩过的坑。')}
        {' '}
        <A href="#/post/huasheng-seo-geo-report">{label('上一篇报告在这里')}</A>
        {label('。')}
      </Lead>

      <Callout type="info" title={label('一句话')}>
        <P>
          {label('优化没部署等于没优化；生成器管所有 SEO 表面；GEO 的核心是让 AI 引擎能精确引用你的事实；多 Agent 并行靠 lane 划分而不是靠主题划分。')}
        </P>
      </Callout>

      <H2>{label('先查部署，再查代码')}</H2>
      <P>
        {label('审计第一天发现的最严重问题，不是代码缺陷，而是生产环境跑着三周前的旧构建。仓库里所有 GEO 资产——answer pages、keyword hubs、entity profile、预渲染内容——线上全部 404。代码 push 到了 GitHub，但 Cloudflare Pages 项目根本没连 Git 集成，部署靠手动，没人发现漂移。')}
      </P>
      <P>
        {label('这条教训的适用范围远不止 SEO。任何涉及线上效果的工作，开工第一步应该是 diff 线上 HTML 和仓库 HTML——对比版本号或构建时间戳，确认你改的东西真的在被服务。')}
      </P>
      <Ul marker="check">
        <Li>{label('接通 GitHub → Cloudflare Pages 自动部署，push main 即上线。')}</Li>
        <Li>{label('写 smoke-check 脚本：HEAD 请求 10 个关键 URL，非 2xx 即 exit 1，每次部署后必跑。')}</Li>
        <Li>{label('版本戳从构建日期自动派生（?v=huasheng-site-YYYYMMDD-*），肉眼即可判断线上新旧。')}</Li>
      </Ul>

      <H2>{label('生成器中心化架构')}</H2>
      <P>
        {label('站点的核心设计是：几乎所有 SEO/GEO 表面都由两个脚本生成，手改生成物一定会被下次运行覆盖。')}
      </P>
      <Table
        headers={[label('脚本'), label('负责什么')]}
        rows={[
          ['update-seo-assets.mjs', label('SPA 页面 head 元数据、robots.txt、sitemap.xml、llms.txt')],
          ['update-geo-assets.mjs', label('answer pages、keyword hubs、entity-profile.jsonld、llms-full.txt、_redirects、_headers、每页预渲染内容、blog 页 head 注入和 footer 年份')],
        ]}
      />
      <H3>{label('SPA 预渲染的关键细节')}</H3>
      <P>
        {label('每个 SPA 路由的 #root 里预渲染了完整静态内容。不执行 JS 的 AI 爬虫和轻量搜索引擎能直接读到全文；浏览器端 createRoot().render() 替换之。这里有个容易踩的坑——不要用 hydrateRoot。预渲染是简化结构，强行 hydrate 会全量 mismatch。用一个构建期脚本比对每路由预渲染 h1 与 content.js 做校验就够了。')}
      </P>
      <H3>{label('共享 chrome，不发明第二套壳')}</H3>
      <P>
        {label('页头页脚抽成 siteHeaderHtml() / siteFooterHtml()，hubs、answers、blog 统一调用。改一处全站生效。这听起来是常识，但实际做的时候很容易因为"landing page 要轻量"就另起一套模板，结果加进主导航后用户点进去像换了个网站。')}
      </P>
      <Callout type="tip" title={label('幂等性铁律')}>
        <P>
          {label('跑完两个生成器和编译后，git status 必须 clean。同日重跑不产生 diff。所有 JSON-LD 用 Node 解析一遍确认合法。这是防止生成器本身引入 bug 的最后一道闸。')}
        </P>
      </Callout>

      <H2>{label('设计一致性是产品问题')}</H2>
      <P>
        {label('两次被打回的经历说明，SEO landing page 不只是技术问题。最初 keyword hubs 用了独立轻量模板，一旦加进主导航，点进去视觉断层非常明显。凡是会出现在导航里的页面，必须共享主站设计系统。修法是 hub.css 完全基于 styles.css 的 theme token（var(--bg)、--ink、--accent、--warm)），切换 body 的 data-theme 即整体适配。')}
      </P>
      <P>
        {label('另一个坑：主题的 source of truth 在代码不在注释。styles.css 注释说默认是暗色主题，实际 app.jsx 硬编码 theme = "clarity"（亮色）。按注释做的第一版全错。还有中文页的 data-lang 必须是 "cn" 不是 "zh"——styles.css 的选择器约定，写错了样式不生效。')}
      </P>
      <P>
        {label('全局 CSS 的裸元素规则也会咬人。section { padding: 96px 0 } 这类写法会渗进新模板，子模块 CSS 要显式覆盖。')}
      </P>

      <H2>{label('GEO 具体战术')}</H2>
      <P>
        {label('GEO（Generative Engine Optimization）的目标是让 AI 答案引擎在回答相关问题时引用你的站点。核心原则：让事实容易被找到、容易被引用、并且自洽。')}
      </P>

      <H3>{label('llms.txt 用链接列表格式')}</H3>
      <P>
        {label('按 llmstxt.org 规范，llms.txt 是 markdown 链接列表（- [Label](url): 描述），不是纯文本行。另外生成一份 llms-full.txt（全文语料），给需要更多上下文的 crawler。_headers 给两者配 text/plain 和 CORS。')}
      </P>

      <H3>{label('可深链的问答锚点')}</H3>
      <P>
        {label('32 个 FAQ 答案全部带 id="q-<slug>"，slug 从英文问题派生，中英文共用同一个锚点。FAQPage JSON-LD 的每个 Question 带 #q- fragment URL。这样 AI 引擎不只引用"某个 FAQ 页面"，而是精确引用到某条问答。')}
      </P>

      <H3>{label('表格是 AI 最爱抽取的格式')}</H3>
      <P>
        {label('每个 keyword hub 至少放一张语义化 spec table，用真实数据转成表格。AI 对结构化表格的抽取置信度远高于自然语言段落。')}
      </P>

      <H3>{label('事实一致性比事实数量更重要')}</H3>
      <P>
        {label('审计抓到多组矛盾数据：厂房面积 50,000m² vs 120,000m²，"30 年经验" vs 公司成立于 1989 年，新加坡号码 vs 广州实体。矛盾事实会直接损害 AI 引用置信度。修法之一：年限类数字全部计算。运行时 HS_YEARS = new Date().getFullYear() - 1989，静态页构建时同样计算并 stamp，永不过期。')}
      </P>

      <H3>{label('不造假')}</H3>
      <P>
        {label('不加 fake aggregateRating、假评论、假坐标、假认证。审计 prompt 里显式禁止，synthesis 阶段专门过滤。假数据短期可能好看，但被 AI 引擎或人工发现后对实体可信度的打击是长期的。')}
      </P>

      <H3>{label('用爬虫 UA 实测')}</H3>
      <P>
        {label('用 curl -A "GPTBot/1.0" 等 UA 实测线上页面，确认预渲染内容真的可见、没被 bot 管理拦截。这是验证 GEO 效果的最低成本手段——你不自己测，就只能等搜索引擎来告诉你。')}
      </P>

      <Callout type="warn" title={label('noindex 和跨页 canonical 不能同时用')}>
        <P>
          {label('信号矛盾，Google 的行为不可预测。要去索引就 noindex + 自引 canonical，不要混用。')}
        </P>
      </Callout>

      <H2>{label('Cloudflare Pages 特有经验')}</H2>

      <H3>{label('域名直连 Pages，不要 Worker 代理')}</H3>
      <P>
        {label('原架构 apex 域名由 Worker fetch pages.dev 再转发，导致 repo 里的 Worker 修复不随 Pages 部署生效，平白多一层。正解：在 Pages 项目里加 custom domain（DNS 指向后自动激活），删掉 apex Worker route。Worker 只留 www/* 做 www → apex 的 301 跳转，因为 Pages 的 _redirects 不支持按 host 匹配，www 重定向必须在 zone 层或 Worker 处理。')}
      </P>

      <H3>{label('pages.dev 原站去索引')}</H3>
      <P>
        {label('_headers 支持 host-scoped 规则。给 https://<project>.pages.dev/* 和 https://:version.<project>.pages.dev/* 下发 X-Robots-Tag: noindex，防止预览域名被搜索引擎收录造成重复内容。')}
      </P>

      <H3>{label('_redirects 要点')}</H3>
      <Ul>
        <Li>{label('规则优先于静态文件。')}</Li>
        <Li>{label('语言根跳转用 301 不是 302（/ /en/ 301）。')}</Li>
        <Li>{label('删除旧目录时必须补 301——这次删了 6 个根级重复目录和根级孤儿 blog。')}</Li>
      </Ul>

      <H3>{label('缓存策略')}</H3>
      <P>
        {label('HTML 用 max-age=0, must-revalidate；带 ?v= 版本戳的静态资产用 max-age=31536000, immutable。版本戳从构建日期派生，内容变了 URL 就变，缓存自然失效。')}
      </P>

      <H2>{label('多 Agent 工作流编排')}</H2>
      <P>
        {label('这次用了四阶段结构，核心思路是并行审计、怀疑主义合成、按文件冲突域划分实现 lane、独立验证。')}
      </P>

      <Table
        headers={[label('阶段'), label('做什么'), label('关键设计')]}
        rows={[
          [label('审计'), label('并行 7 个 lens，read-only'), label('metadata / structured-data / crawlability / geo-answer-engines / live-site / content-keywords / technical，每个输出 schema 化 findings（title/evidence/fix/severity/files）')],
          [label('合成'), label('单 Agent，怀疑主义'), label('逐条对 repo 和线上复核证据 → 去重合并 → 62 条砍到 31 条可执行 backlog + 3 条明确 dropped。关键字段：lane（按文件冲突域划分）+ 自包含 action + 可执行 verify')],
          [label('实现'), label('lane 内串行、lane 间并行'), label('generator lane 7 个批次严格串行（共享 scripts/*.mjs，并行必冲突）。每批次一个 commit 做 checkpoint，Agent 挂了 reset 未提交残渣即可重跑')],
          [label('验证'), label('3 个独立 verifier 并行 + fix loop'), label('build/幂等性、逐项 acceptance（跑每条 backlog 的 verify）、对抗性 diff review。verifier 交叉核对实现者的自述，不信任声明')],
        ]}
      />

      <H3>{label('几个编排原则')}</H3>
      <Ol>
        <Li>
          <Strong>{label('lane 划分按"谁写哪些文件"，不是按主题。')}</Strong>
          {label('这是并行安全的唯一依据。两个 Agent 改同一个文件就是冲突，不管它们的主题多么不相关。')}
        </Li>
        <Li>
          {label('实现 Agent 的报告必须 honest：done 仅当本地 verify 通过，skipped 要给理由。verifier 不信任实现者的自我声明。')}
        </Li>
        <Li>
          {label('checkpoint commit 让失败批次重跑成本约等于零。Agent 挂了，git reset --hard 到上一个 checkpoint，重跑该批次即可。')}
        </Li>
        <Li>
          {label('漏斗必须有丢弃环节。审计发现 62 条，synthesis 砍到 31 条可执行项 + 3 条明确 dropped（附理由）。不丢弃就等于没有优先级。')}
        </Li>
      </Ol>

      <H2>{label('可复用 checklist')}</H2>

      <H3>{label('每次改动后（本地）')}</H3>
      <Pre lang="bash" lineNumbers={false}>{`node scripts/update-seo-assets.mjs && node scripts/update-geo-assets.mjs
npx -y esbuild@0.25.12 ui.jsx pages/*.jsx app.jsx --outbase=. --outdir=compiled \\
  --format=iife --jsx-factory=React.createElement --jsx-fragment=React.Fragment --target=es2017
node scripts/check-prerender-parity.mjs
git status   # 必须 clean（同日重跑幂等）`}</Pre>

      <H3>{label('每次部署后（线上）')}</H3>
      <Pre lang="bash" lineNumbers={false}>{`node scripts/smoke-check.mjs                      # 10 个关键 URL 全 200
curl -sI https://hua-sheng.org/assets/logo.webp   # immutable 缓存头
curl -s -A "GPTBot/1.0" https://hua-sheng.org/en/ | grep bus-stop-shelters  # 爬虫可见性`}</Pre>

      <H3>{label('新增页面时')}</H3>
      <Ul marker="check">
        <Li>{label('进 sitemap（生成器 pages[] 自动）+ hreflang 成对 + prerenderNav + llms.txt 链接列表')}</Li>
        <Li>{label('有 FAQ 就带 #q- 锚点并同步进 FAQPage JSON-LD')}</Li>
        <Li>{label('用共享 chrome（siteHeaderHtml / siteFooterHtml + hub.css），别发明第二套壳')}</Li>
      </Ul>

      <P>
        {label('相关代码和脚本都在')}
        {' '}
        <A href={repo}>{label('hua-sheng-site 仓库')}</A>
        {label('，站点本身在')}
        {' '}
        <A href={site}>{label('hua-sheng.org')}</A>
        {label('。')}
      </P>
    </Article>
  );
};

export default {
  id: 'huasheng-seo-geo-playbook',
  Component: HuashengSeoGeoPlaybook,
  meta: {
    title: { zh: 'hua-sheng.org SEO/GEO 优化实战方法论' },
    description: { zh: '一次完整 SEO + GEO overhaul 的可迁移经验：部署漂移排查、生成器中心化架构、GEO 战术、Cloudflare Pages 细节、多 Agent 工作流编排。' },
    cover,
    publishedAt: '2026-07-04',
    readingTime: { zh: 12 },
    category: { zh: 'Growth Engineering' },
    tags: ['seo', 'geo', 'huasheng', 'cloudflare', 'agents', 'engineering'],
    languages: ['zh'],
    llmPath: '/post/huasheng-seo-geo-playbook/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
