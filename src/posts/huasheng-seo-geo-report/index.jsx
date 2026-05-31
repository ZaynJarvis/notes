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
} from '../../blog-components';

const cover = '/assets/covers/huasheng-seo-geo.png';
const repoCommit = 'https://github.com/ZaynJarvis/huasheng/commit/6d17a66';
const site = 'https://hua-sheng.org';
const pagesDeploy = 'https://80173a4d.hua-sheng-site.pages.dev';

const HuashengSeoGeoReport = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('这次目标不是写一份建议，而是尽可能免费地把 hua-sheng.org 变成更容易被搜索引擎和生成式答案引擎读取、归因、引用和收录的公司站。')}
      </Lead>

      <Callout type="info" title={label('执行结论')}>
        <P>
          {label('已完成代码、GitHub 元数据、Cloudflare Pages 部署、Cloudflare Worker canonical redirect、www DNS、线上验证和可复用报告沉淀。追加一轮后，主站现在还有独立 /zh/ 中文 SEO 页面、同站 blog 内容目录、3 篇静态文章、外部目录实体链接和同步更新的 sitemap / llms-full.txt。')}
        </P>
      </Callout>

      <H2>{label('我实际做了什么')}</H2>
      <Table
        headers={[label('层面'), label('改动'), label('价值')]}
        rows={[
          [label('技术 SEO'), label('为 /、/about、/capabilities、/projects、/quality、/contact 生成静态可爬取 HTML。'), label('不执行 JS 的 crawler 也能读到 H1、正文、内链和核心事实。')],
          [label('页面元数据'), label('每个核心页面增加独立 title、description、canonical、Open Graph、Twitter card。'), label('提升搜索摘要、社交预览和 canonical 归因质量。')],
          [label('结构化数据'), label('增加 Organization、WebSite、WebPage、Service、FAQPage、BreadcrumbList、项目 ItemList。'), label('让搜索引擎和 LLM 更容易识别公司实体、服务和项目证据。')],
          [label('GEO'), label('新增 /llms.txt 和 /llms-full.txt。'), label('给 LLM crawler 一个短事实面和一个长事实面，便于回答“华盛做什么”。')],
          [label('产品词入口'), label('新增 4 个静态产品落地页：bus shelters、advertising light boxes、metal kiosks、precision metal OEM。'), label('承接更具体的商业搜索意图，而不是所有词都挤在首页。')],
          [label('索引控制'), label('新增 robots.txt、sitemap.xml、404.html、site.webmanifest、_headers、_redirects。'), label('明确可抓取页面、减少软 404、改善资源类型和缓存。')],
          [label('站内链接'), label('把 React 导航的 href="#" 改成真实 URL。'), label('crawler 不需要执行点击逻辑，也能发现主导航页面。')],
          [label('中文 SEO'), label('新增独立 /zh/ 静态中文页面，而不是只靠 JS 语言切换。'), label('中文关键词、canonical、zh-CN hreflang、正文和 FAQ 都能被 crawler 直接读取。')],
          [label('内容 SEO'), label('新增 /blog/ 内容目录和 3 篇静态文章：公交候车亭制造流程、户外广告灯箱防候处理、AI 应用会议记录。'), label('把“每月 1-2 篇案例/工艺文章”的机制接入 sitemap 和 llms-full.txt。')],
          [label('实体一致性'), label('把旧官网、Alibaba、Made-in-China、GoldSupplier、GitHub source 写入 sameAs、页面外链和 llms facts。'), label('帮助搜索和 LLM 把多个目录资料归并到 hua-sheng.org canonical 实体。')],
          [label('可信度修正'), label('去掉 placeholder ICP，更新 2026 年份，修正“三十六年”为“三十七年”，弱化未验证的 400W 激光切割表述。'), label('减少明显过期或不可信的页面信号。')],
        ]}
      />

      <H2>{label('新增的商业关键词覆盖')}</H2>
      <P>
        {label('我没有做关键词堆砌，而是把词放到 title、description、页面正文、产品页、FAQ、llms.txt 和 schema 的 knowsAbout 里。')}
      </P>
      <Ul marker="check">
        <Li>{label('bus shelter manufacturer / bus stop shelter supplier / smart bus shelter / public transit shelter')}</Li>
        <Li>{label('advertising light box manufacturer / MUPI light box / outdoor display panels')}</Li>
        <Li>{label('metal kiosk manufacturer / street kiosks / postal shelters / public service booths')}</Li>
        <Li>{label('precision metal OEM / ODM / sheet metal fabrication / Guangzhou metal fabrication')}</Li>
        <Li>{label('ISO 9001 metal manufacturing / DMAIC / IQC / IPQC / FQC')}</Li>
        <Li>{label('公交候车亭厂家 / 广告灯箱厂家 / 金属 OEM 代工 / 不锈钢工程')}</Li>
      </Ul>

      <H2>{label('上线与外部免费动作')}</H2>
      <Table
        headers={[label('动作'), label('状态')]}
        rows={[
          [label('GitHub commit'), <A href={repoCommit}>{label('6d17a66 · Add HuaSheng Chinese and blog SEO pages')}</A>],
          [label('GitHub repo description'), label('已设置为官方站点 + bus shelters / light boxes / OEM metal fabrication 描述。')],
          [label('GitHub topics'), label('已添加 huasheng、guangzhou、metal-fabrication、bus-shelters、street-furniture、advertising-light-box、stainless-steel、oem、odm、manufacturing、cloudflare-pages、static-site。')],
          [label('Cloudflare Pages'), <A href={pagesDeploy}>{label('已用 Wrangler 部署生产页面')}</A>],
          [label('Cloudflare DNS'), label('已新增 www.hua-sheng.org CNAME。')],
          [label('Cloudflare Worker'), label('已更新 huasheng-site-proxy：处理 www → apex、http → https、/cases → /projects、产品页 trailing slash，并取消 300 秒 cacheEverything。')],
        ]}
      />

      <H2>{label('线上验证结果')}</H2>
      <Pre lang="text" lineNumbers={false}>{`https://hua-sheng.org/                         200 text/html; charset=utf-8
https://hua-sheng.org/about                    200 text/html; charset=utf-8
https://hua-sheng.org/projects                 200 text/html; charset=utf-8
https://hua-sheng.org/products/bus-shelters/   200 text/html; charset=utf-8
https://hua-sheng.org/zh/                      200 text/html; charset=utf-8
https://hua-sheng.org/blog/                    200 text/html; charset=utf-8
https://hua-sheng.org/blog/bus-shelter-manufacturing-process/ 200 text/html; charset=utf-8
https://hua-sheng.org/llms.txt                 200 text/plain; charset=utf-8
https://hua-sheng.org/llms-full.txt            200 text/plain; charset=utf-8
https://hua-sheng.org/site.webmanifest         200 application/manifest+json
https://hua-sheng.org/not-real-page            404 text/html; charset=utf-8
https://hua-sheng.org/cases                    301 -> https://hua-sheng.org/projects
http://hua-sheng.org/                          301 -> https://hua-sheng.org/
https://www.hua-sheng.org/                     301 -> https://hua-sheng.org/`}</Pre>
      <P>
        {label('还检查了首页和产品页原始 HTML，确认可以直接看到 route-specific title、description、canonical、JSON-LD、产品关键词和 FAQPage，不依赖 React 渲染。')}
      </P>

      <H2>{label('关键页面')}</H2>
      <Ul>
        <Li><A href={`${site}/`}>{label('首页：Bus Shelter Manufacturer in China | HuaSheng Metal Materials')}</A></Li>
        <Li><A href={`${site}/products/bus-shelters/`}>{label('产品页：Custom bus shelter manufacturer for city transit projects')}</A></Li>
        <Li><A href={`${site}/products/advertising-light-boxes/`}>{label('产品页：Advertising light boxes and MUPI display structures')}</A></Li>
        <Li><A href={`${site}/products/metal-kiosks/`}>{label('产品页：Metal kiosks, postal shelters, and public service booths')}</A></Li>
        <Li><A href={`${site}/products/precision-metal-oem/`}>{label('产品页：Precision metal OEM and ODM manufacturing')}</A></Li>
        <Li><A href={`${site}/zh/`}>{label('中文 SEO 页面：公交候车亭厂家 | 广告灯箱与金属 OEM 代工')}</A></Li>
        <Li><A href={`${site}/blog/`}>{label('Blog 内容目录：项目案例与制造工艺文章')}</A></Li>
        <Li><A href={`${site}/blog/bus-shelter-manufacturing-process/`}>{label('文章：公交候车亭制造流程')}</A></Li>
        <Li><A href={`${site}/blog/outdoor-light-box-weatherproofing/`}>{label('文章：户外广告灯箱防候处理')}</A></Li>
        <Li><A href={`${site}/llms.txt`}>{label('LLM facts：/llms.txt')}</A></Li>
        <Li><A href={`${site}/llms-full.txt`}>{label('LLM facts full：/llms-full.txt')}</A></Li>
      </Ul>

      <H2>{label('追加完成：中文页、blog 和外部目录实体链接')}</H2>
      <Ul marker="check">
        <Li>{label('新增 /zh/，页面原始 HTML 直接包含中文 H1、description、关键词、FAQ、内链和 zh-CN hreflang。')}</Li>
        <Li>{label('把 /blog/ 合并进同一个 HuaSheng 站点，不需要单独部署第二个 Cloudflare 站。')}</Li>
        <Li>{label('新增两篇可持续 SEO 内容样板：Bus Shelter Manufacturing Process 与 Outdoor Advertising Light Box Weatherproofing。旧 AI 应用会议内容也迁成静态文章。')}</Li>
        <Li>{label('sitemap.xml、llms.txt、llms-full.txt 已同步新增 /zh/、/blog/ 和所有文章页。')}</Li>
        <Li>{label('站内已经把旧官网、Alibaba、Made-in-China、GoldSupplier 与 GitHub source 作为官方资料入口写入 schema sameAs、页面链接和 llms facts。外部平台后台仍需要账号登录后把 website 字段改到 https://hua-sheng.org。')}</Li>
      </Ul>

      <H3>{label('外部目录资料入口')}</H3>
      <Ul>
        <Li><A href="https://www.huasheng-metal.com/">{label('旧官网：huasheng-metal.com')}</A></Li>
        <Li><A href="https://gzhsgm.en.alibaba.com/">{label('Alibaba：gzhsgm.en.alibaba.com')}</A></Li>
        <Li><A href="https://gz-huasheng.en.made-in-china.com/">{label('Made-in-China：gz-huasheng.en.made-in-china.com')}</A></Li>
        <Li><A href="https://gzhsgm.goldsupplier.com/">{label('GoldSupplier：gzhsgm.goldsupplier.com')}</A></Li>
      </Ul>

      <H2>{label('这次最重要的 SEO/GEO 改善')}</H2>
      <P>
        {label('改动前，主站页面主要是空 root + React/Babel，所有主路由共享同一个 title，没有 description、canonical、schema 或可直接索引正文。对 Google 可能还能靠渲染补救，但对很多 crawler、社交 bot、LLM ingestion、目录站和轻量搜索引擎都很弱。')}
      </P>
      <P>
        {label('改动后，页面原始 HTML 就包含可索引内容。生成式答案引擎现在能直接读到公司实体、中文名、业务范围、项目证据、质量体系、联系方式和 canonical 页面列表。')}
      </P>

      <H2>{label('还没有做、但建议下一步做')}</H2>
      <Ul>
        <Li>{label('把 Google Search Console / Bing Webmaster Tools 接上并提交 sitemap。这个需要账号侧验证权限。')}</Li>
        <Li>{label('登录受控的旧官网、Alibaba、Made-in-China、GoldSupplier、LinkedIn、Google Business Profile、Bing Places 后台，把 website/contact URL 统一改成 https://hua-sheng.org。站内侧的 sameAs 和 checklist 已经就位。')}</Li>
        <Li>{label('长期性能优化：把浏览器 Babel + React UMD 改成 Vite production bundle。当前我优先解决 crawlability 和 GEO，没有重构前端构建链。')}</Li>
        <Li>{label('持续内容：每月继续增加 1-2 篇项目案例或工艺文章；生成器已经支持同步到 sitemap 和 llms-full.txt。')}</Li>
      </Ul>

      <H2>{label('最终判断')}</H2>
      <P>
        <Strong>{label('这轮最有价值的不是“加几个 meta 标签”，而是把 HuaSheng 从 JS-only 宣传页改成了可被 crawler、搜索引擎、目录系统和 LLM 都能直接消费的结构化公司资料库。')}</Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'huasheng-seo-geo-report',
  Component: HuashengSeoGeoReport,
  meta: {
    title: { zh: '华盛 hua-sheng.org SEO / GEO 免费优化执行报告' },
    description: { zh: '一次端到端 SEO/GEO 执行：静态可爬取 HTML、route metadata、schema、llms.txt、产品落地页、GitHub 元数据、Cloudflare Pages 与 Worker canonical redirect。' },
    cover,
    publishedAt: '2026-05-31',
    readingTime: { zh: 8 },
    category: { zh: 'Growth Engineering' },
    tags: ['seo', 'geo', 'huasheng', 'cloudflare', 'github'],
    languages: ['zh'],
    llmPath: '/post/huasheng-seo-geo-report/llm.txt',
    authors: [
      {
        name: 'Louise',
        github: 'ZaynJarvis',
        role: { zh: '执行与报告' },
      },
    ],
  },
};
