import React from 'react';

const cover = '/assets/covers/license-activation-scheme.png';

// Faithful port of the original standalone design doc (license-scheme-evolution.html):
// its own markup + CSS, scoped under `.lsx` so it renders exactly like the reference
// instead of being flattened into generic prose. The site shell already renders the
// title / description / cover / byline / sidebar-TOC, so the hero + in-page nav of the
// original are dropped; everything from the threat model down is reproduced verbatim.

const CSS = `
.lsx{
  --bg:#f6f7f9; --panel:#ffffff; --ink:#1a1f2e; --muted:#5b6474;
  --line:#e3e6ec; --accent:#3b45b5; --accent-soft:#ecedfb;
  --good:#127a54; --good-bg:#e7f6ef; --warn:#9a6a00; --warn-bg:#fdf3dc;
  --risk:#b23636; --risk-bg:#fbe9e9; --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  background:var(--bg); color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  line-height:1.65; -webkit-font-smoothing:antialiased;
  border:1px solid var(--line); border-radius:16px; padding:12px 30px 34px;
}
.b-post__body .b-article.lsx{ max-width:none; margin:0; padding:12px 30px 34px; }
.lsx *{ box-sizing:border-box; }
.lsx a{ color:var(--accent); text-decoration:none; }
.lsx a:hover{ text-decoration:underline; }
.lsx b{ font-weight:650; }

.lsx .box{ background:var(--panel); border:1px solid var(--line); border-left:4px solid var(--accent);
  border-radius:12px; padding:18px 22px; box-shadow:0 1px 3px rgba(20,25,45,.04); margin:16px 0; }
.lsx .box.good{ border-left-color:var(--good); }
.lsx .box.warn{ border-left-color:var(--warn); }
.lsx .box.risk{ border-left-color:var(--risk); }
.lsx .box h3{ margin:0 0 8px; font-size:13px; letter-spacing:.05em; text-transform:uppercase; color:var(--accent); }
.lsx .box.good h3{ color:var(--good); }
.lsx .box.warn h3{ color:var(--warn); }
.lsx .box.risk h3{ color:var(--risk); }
.lsx .box p{ margin:0; font-size:14.5px; }
.lsx .box p+p{ margin-top:9px; }
.lsx .box ol{ margin:6px 0 0; padding-left:22px; font-size:14.5px; }
.lsx .box li{ margin:4px 0; }
.lsx .stack{ font-family:var(--mono); font-size:12.5px; background:#f2f3f9; border-radius:8px;
  padding:11px 13px; margin-top:12px; line-height:1.7; }

.lsx h2.sec{ font-size:13px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted);
  margin:48px 0 6px; padding-top:16px; border-top:2px solid var(--line); font-weight:700; }
.lsx h2.sec .big{ display:block; font-size:21px; letter-spacing:-.01em; text-transform:none; color:var(--ink); margin-top:8px; }
.lsx .sec-note{ color:var(--muted); font-size:14px; margin:2px 0 22px; }

.lsx .timeline{ position:relative; padding-left:38px; margin-top:8px; }
.lsx .timeline::before{ content:""; position:absolute; left:13px; top:8px; bottom:8px; width:2px; background:var(--line); }
.lsx .stage{ position:relative; margin-bottom:20px; }
.lsx .node{ position:absolute; left:-38px; top:2px; width:28px; height:28px; border-radius:50%;
  background:#aeb4c6; color:#fff; display:flex; align-items:center; justify-content:center;
  font-family:var(--mono); font-size:12px; font-weight:600; box-shadow:0 0 0 4px var(--bg); }
.lsx .stage.current .node{ background:var(--good); }
.lsx .card{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:16px 20px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .stage.current .card{ border-color:#bfe3d2; box-shadow:0 2px 14px rgba(18,122,84,.10); }
.lsx .card h4{ margin:0 0 4px; font-size:17px; }
.lsx .card h4 .lbl{ font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.05em; padding:2px 7px; border-radius:5px; margin-left:8px; vertical-align:middle; background:var(--good-bg); color:var(--good); }
.lsx .card .mech{ color:var(--muted); font-size:14px; margin:0 0 10px; }
.lsx .kv{ display:flex; gap:10px; font-size:13.5px; margin-top:6px; align-items:baseline; }
.lsx .kv .tag{ flex:0 0 auto; font-family:var(--mono); font-size:11px; font-weight:600; padding:2px 8px; border-radius:6px; white-space:nowrap; }
.lsx .tag.good{ color:var(--good); background:var(--good-bg); }
.lsx .tag.warn{ color:var(--warn); background:var(--warn-bg); }

.lsx table{ width:100%; border-collapse:collapse; background:var(--panel); border:1px solid var(--line);
  border-radius:12px; overflow:hidden; font-size:13.5px; box-shadow:0 1px 3px rgba(20,25,45,.04); margin:6px 0 14px; }
.lsx th,.lsx td{ text-align:left; padding:10px 14px; border-bottom:1px solid var(--line); vertical-align:top; }
.lsx th{ background:#f0f1f6; font-size:11px; letter-spacing:.05em; text-transform:uppercase; color:var(--muted); }
.lsx tbody tr:last-child td{ border-bottom:none; }
.lsx td.tier{ font-family:var(--mono); font-weight:600; white-space:nowrap; }
.lsx .yes{ color:var(--good); font-weight:600; }
.lsx .no{ color:var(--risk); font-weight:600; }
.lsx .row-hi{ background:#f4fbf7; }
.lsx .row-lo{ background:#fdf6f6; }

.lsx .insights{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:6px; }
.lsx .insight{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:15px 18px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .insight h5{ margin:0 0 6px; font-size:14.5px; display:flex; align-items:center; gap:8px; }
.lsx .insight h5 .dot{ width:8px; height:8px; border-radius:50%; background:var(--accent); flex:0 0 auto; }
.lsx .insight p{ margin:0; font-size:13.5px; color:var(--muted); }
.lsx .insight b{ color:var(--ink); }

.lsx .qa{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:6px 20px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .qa .item{ padding:14px 0; border-bottom:1px solid var(--line); }
.lsx .qa .item:last-child{ border-bottom:none; }
.lsx .qa .q{ font-weight:600; font-size:14.5px; margin:0 0 5px; }
.lsx .qa .q::before{ content:"Q"; font-family:var(--mono); font-size:11px; color:#fff; background:var(--accent); border-radius:5px; padding:1px 6px; margin-right:8px; }
.lsx .qa .a{ font-size:13.5px; color:var(--muted); margin:0; }
.lsx .qa .a::before{ content:"A"; font-family:var(--mono); font-size:11px; color:var(--good); background:var(--good-bg); border-radius:5px; padding:1px 6px; margin-right:8px; }
.lsx .qa .a b{ color:var(--ink); }

.lsx .details-list{ display:flex; flex-direction:column; gap:12px; }
.lsx .drow{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:15px 18px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .drow h5{ margin:0 0 5px; font-size:15px; display:flex; align-items:center; gap:9px; flex-wrap:wrap; }
.lsx .drow p{ margin:0; font-size:13.5px; color:var(--muted); }
.lsx .drow p+p{ margin-top:7px; }
.lsx .drow code{ font-family:var(--mono); font-size:12px; background:#f2f3f9; padding:1px 5px; border-radius:4px; color:var(--ink); }
.lsx .redline{ border-left:4px solid var(--risk); }
.lsx .badge-proto{ font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.03em; color:var(--accent); background:var(--accent-soft); padding:2px 8px; border-radius:20px; }
.lsx .badge-impl{ font-family:var(--mono); font-size:10px; font-weight:600; color:var(--muted); background:#eef0f4; padding:2px 8px; border-radius:20px; }

.lsx .flow{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:6px 20px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .fstep{ display:flex; gap:14px; padding:13px 0; border-bottom:1px solid var(--line); align-items:baseline; }
.lsx .fstep:last-child{ border-bottom:none; }
.lsx .fstep .num{ flex:0 0 26px; height:26px; border-radius:50%; background:var(--accent-soft); color:var(--accent); font-family:var(--mono); font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.lsx .fstep .txt{ font-size:13.5px; color:var(--muted); }
.lsx .fstep .txt b{ color:var(--ink); }

.lsx .full details{ background:var(--panel); border:1px solid var(--line); border-radius:12px; margin-bottom:10px; box-shadow:0 1px 3px rgba(20,25,45,.04); overflow:hidden; }
.lsx .full summary{ cursor:pointer; padding:14px 18px; font-weight:600; font-size:14.5px; list-style:none; display:flex; gap:10px; align-items:baseline; }
.lsx .full summary::-webkit-details-marker{ display:none; }
.lsx .full summary::before{ content:"\\25B8"; color:var(--accent); font-size:12px; transition:transform .15s; }
.lsx .full details[open] summary::before{ transform:rotate(90deg); }
.lsx .full summary .tno{ font-family:var(--mono); font-size:11px; color:var(--muted); }
.lsx .full .body{ padding:0 18px 16px 40px; font-size:13.5px; color:var(--muted); border-top:1px solid var(--line); }
.lsx .full .body p{ margin:12px 0 0; }
.lsx .full .body b{ color:var(--ink); }

.lsx .appx{ display:flex; flex-direction:column; gap:14px; }
.lsx .amod{ background:var(--panel); border:1px solid var(--line); border-radius:12px; padding:16px 20px; box-shadow:0 1px 3px rgba(20,25,45,.04); }
.lsx .amod h5{ margin:0 0 6px; font-size:15.5px; }
.lsx .amod .why{ font-size:12.5px; color:var(--accent); font-weight:600; margin:0 0 8px; }
.lsx .amod p{ margin:0; font-size:13.5px; color:var(--muted); }
.lsx .amod p+p{ margin-top:7px; }
.lsx .lsx-foot{ margin-top:40px; padding-top:18px; border-top:1px solid var(--line); color:var(--muted); font-size:12px; font-family:var(--mono); }
@media(max-width:680px){ .lsx .insights{ grid-template-columns:1fr; } }

/* ---- follow the site's dark theme (washi) ---- */
[data-theme="washi"] .lsx{
  --bg:#1e1d1a; --panel:#26241f; --ink:#e8e4da; --muted:#a39c8f;
  --line:#38352f; --accent:#8fb0d6; --accent-soft:#28323f;
  --good:#74c295; --good-bg:#182a20; --warn:#d8a24a; --warn-bg:#2c2413;
  --risk:#e07a6c; --risk-bg:#2f1d1a;
}
[data-theme="washi"] .lsx .stack{ background:#161512; color:#d7d2c6; }
[data-theme="washi"] .lsx .node{ background:#4a473f; }
[data-theme="washi"] .lsx .stage.current .card{ border-color:#2f5f48; }
[data-theme="washi"] .lsx th{ background:#2b2924; }
[data-theme="washi"] .lsx .row-hi{ background:#1b2620; }
[data-theme="washi"] .lsx .row-lo{ background:#291d1b; }
[data-theme="washi"] .lsx .drow code{ background:#161512; }
[data-theme="washi"] .lsx .badge-impl{ background:#2f2d27; }
[data-theme="washi"] .lsx .qa .q::before{ background:#3a5a80; color:#eaf2fb; }
[data-theme="washi"] .lsx .box,[data-theme="washi"] .lsx .card,[data-theme="washi"] .lsx table,[data-theme="washi"] .lsx .insight,[data-theme="washi"] .lsx .drow,[data-theme="washi"] .lsx .flow,[data-theme="washi"] .lsx .qa,[data-theme="washi"] .lsx .full details,[data-theme="washi"] .lsx .amod{ box-shadow:0 1px 3px rgba(0,0,0,.28); }
`;

const BODY = `
  <p class="sec-note"><b>威胁模型(两层)</b> —— 先明确要防什么,再给结论。</p>
  <table>
    <thead><tr><th>层级</th><th>手法</th><th>结果</th></tr></thead>
    <tbody>
      <tr class="row-hi"><td class="tier">Tier 1<br>无修改的复制</td><td>复制/克隆整个运行系统(含 RT)—— 超量自部署 / 整环境克隆 / 取出并复用 RT</td><td class="yes">✅ 可检测(内存 instance-id 并发检测 + 频率)</td></tr>
      <tr class="row-lo"><td class="tier">Tier 2<br>改代码 / 伪造内部信任</td><td>改 agent/服务、patch 掉校验、把 instance-id 固定住、伪造 agent↔业务服务信任</td><td class="no">❌ 纯软件不防(法务合同)</td></tr>
    </tbody>
  </table>

  <div class="box good">
    <h3>结论 · 激活码 + 静态 RT + 内存 random-id 检测 + 短效签名 License</h3>
    <p>用简单结构解决<b>代码不被逆向 (Tier-1) 威胁</b>。activation_code 单次激活 → 获取一个<b>静态 refresh token(不含授权信息)</b>;每次刷新返回一张<b>短效签名 License File(SLF,携带全量 entitlement)</b>并必要时更新 RT <b>TTL</b>,不做 RT 轮转。复制检测靠 agent 启动时在<b>内存生成的 random instance-id</b>(不落盘):每次 refresh 带上,云端见同一 RT 获取<b>短效 License</b> 出现多个并发且持续的 instance-id → 出现证书复用异常 → <b>[告警 → 确认 → 吊销]</b>。</p>
    <div class="stack">activation code(一次性)<br>&nbsp;&nbsp;+ 静态 Refresh Token(纯身份 / 续期延 TTL)<br>&nbsp;&nbsp;+ Short License File(全量 entitlement 快照)<br>&nbsp;&nbsp;+ 内存 random instance-id(内存 random 不可读,支持复制检测)<br>&nbsp;&nbsp;+ 审计 + 云上 HMAC verifier(RT 不会在云上泄露)<br>———<br>应急"轮转" = re-activation → new activation code</div>
  </div>

  <h2 class="sec" id="premise" data-toc="true">0<span class="big">设计前提</span></h2>
  <div class="box risk">
    <h3>承重前提</h3>
    <ol>
      <li>本方案假设私有化验签服务与业务服务之间的信任通道不会被攻破,License 不在私有化环境内泄露。业务服务只接受本地 license agent 推送的 entitlement,不自己验签 bearer license file。「把签名 license/entitlement 扇出给 N 个集群」必须让 N 个集群指向同一个验证激活 agent,即伪造 agent↔业务服务信任,而这被前提排除。</li>
      <li><b>license agent 集群内单例</b>(HA 用 leader)。这样"一个集群 = 一个活着的 agent = 一个 instance-id",内存 instance-id 是干净的复制检测信号。</li>
    </ol>
    <p style="margin-top:10px;"><b>失效条件:</b>当签名 license 可被盗用,需评估 license 加密绑定方案(key-binding)。</p>
  </div>

  <h2 class="sec" id="evo" data-toc="true">Ⅰ<span class="big">方案演进路径(新 → 旧)</span></h2>
  <p class="sec-note">每一步:机制 / 解决了什么 / 遗留了什么。方案自下(旧)而上(新)演进,每一步都解决了上一步的一个新问题;★ 为当前方案。</p>
  <div class="timeline">
    <div class="stage current">
      <div class="node">★</div>
      <div class="card">
        <h4>静态 RT + 内存 instance-id 检测盗用<span class="lbl">当前</span></h4>
        <p class="mech">activation code 引导 → 获取静态 RT(纯身份)+ 首张 SLF(全量 entitlement);每次刷新延 RT TTL + 换新 SLF;agent 启动生成内存 random instance-id,每次 refresh 带上,云端见同一 RT 多个<b>持续</b> instance-id → 发现复用异常。</p>
        <div class="kv"><span class="tag good">解决</span><span>补上「RT 泄露/克隆难发现」:内存 instance-id 抓克隆(克隆拿不到内存 id),比 deployment_id 干净;结构最简单,无轮转状态机 / grace / 变砖;重启/滚动升级容忍 overlap。</span></div>
        <div class="kv"><span class="tag warn">遗留</span><span>需 agent 单例(HA leader 选举);patch instance_id 破解(Tier-2 威胁)。</span></div>
      </div>
    </div>
    <div class="stage">
      <div class="node">④</div>
      <div class="card">
        <h4>Activation Code 换 Refresh Token</h4>
        <p class="mech">一次性 activation code 首次 redeem → refresh token;之后用 RT 刷新拿 SLF。</p>
        <div class="kv"><span class="tag good">解决</span><span>收窄<b>集群外分发链路</b>(邮件/合同/工单/installer)泄露;RT 只在集群内产生。</span></div>
        <div class="kv"><span class="tag warn">遗留</span><span>RT 仍是长期 token,集群内泄露/克隆后难发现 —— 由 ★「内存 instance-id 检测」检测复制盗用。</span></div>
      </div>
    </div>
    <div class="stage">
      <div class="node">③</div>
      <div class="card">
        <h4>Key 换 短效 License(SLF)</h4>
        <p class="mech">license file 改为短有效期(天)的全量 entitlement 快照,周期性 (+主动触发) 刷新。</p>
        <div class="kv"><span class="tag good">解决</span><span>支持提前 revoke、扩缩权、动态 entitlement、fail-close;每张 SLF 全量快照,不管理 entitlement state(见 Ⅴ Q8)。</span></div>
        <div class="kv"><span class="tag warn">遗留</span><span>Key 是长期 token,泄露可被盗用 —— 由 ④ activation code 收窄。</span></div>
      </div>
    </div>
    <div class="stage">
      <div class="node">②</div>
      <div class="card">
        <h4>Key 换 License File</h4>
        <p class="mech">部署时配长期 key,客户端拿 key 去云端换 license file。</p>
        <div class="kv"><span class="tag good">解决</span><span>在线续期方便,不必每年手动替换。</span></div>
        <div class="kv"><span class="tag warn">遗留</span><span>Key 是长期 token,有效期内无法 revoke/缩权 —— 由 ③ 短 lease 解决。</span></div>
      </div>
    </div>
    <div class="stage">
      <div class="node">①</div>
      <div class="card">
        <h4>静态 License File</h4>
        <p class="mech">云端签发静态签名文件,客户端内置 public key 本地验签。</p>
        <div class="kv"><span class="tag good">解决</span><span>最简单,完全离线可用。</span></div>
        <div class="kv"><span class="tag warn">遗留</span><span>续期要手动换文件、无法在线 revoke —— 由 ② key 换文件解决。</span></div>
      </div>
    </div>
  </div>

  <h2 class="sec" id="insight" data-toc="true">Ⅱ<span class="big">关键洞察与 Q&A(简化)</span></h2>
  <p class="sec-note">这一节是结论层;每条背后的完整推理见下方 Ⅴ 完整 context Q&A。</p>
  <div class="box good">
    <h3>核心不变量</h3>
    <p><b>一个 license = 一个 RT = 一个 live consumer。</b>「整环境克隆」与「复制 RT」会制造「第二个 consumer」的两种方式。用内存 instance-id 探测「第二个 consumer」。</p>
  </div>
  <div class="insights">
    <div class="insight"><h5><span class="dot"></span>内存 instance-id 是承重的 duplication 信号</h5><p>agent 启动时在<b>内存</b>生成 random id、不落盘、每次 refresh 带上。<b>克隆拿不到它</b> → 克隆生成新 id → 同一 RT 出现多个并发持续 id = duplication。比 deployment_id 干净(后者被克隆继承、与迁移同形)。</p></div>
    <div class="insight"><h5><span class="dot"></span>authN / authZ 拆分</h5><p><b>RT = 纯身份</b>(长期,不含 entitlement),<b>SLF = 全量 entitlement 快照</b>(短期,签名)。就是 OAuth 的 refresh token + access token 模型。好处:duplication 检测干净落在 authN 层,与 entitlement 解耦。</p></div>
    <div class="insight"><h5><span class="dot"></span>短 SLF = 无状态全量 entitlement</h5><p>每张 SLF 是自包含签名快照 → 变更/revoke/降权 trivial(下张换新数字)、客户端对 entitlement 无状态、单签名防篡改、审计天然。避开「长文件 + heartbeat」的 base+delta 对账。</p></div>
    <div class="insight"><h5><span class="dot"></span>静态 RT 可 revoke,无"永久泄露"</h5><p>续期只延 TTL、token 值不变;但 churn / 账号到期 / 确认盗用都能<b>服务端 revoke</b>,一个 TTL 内 fail-close。并发重复由 instance-id 抓——<b>不需要轮转/mutate token</b>(那样只加状态机与变砖风险却无新覆盖)。</p></div>
    <div class="insight"><h5><span class="dot"></span>activation code = 外链 seam</h5><p>把 durable 凭证挡在外链(邮件/合同/installer)之外:外链泄露要么在客户 redeem 后变死物,要么在小偷抢先 redeem 时变成响亮的"激活冲突"。并给出 <b>pre-handoff(交付链)vs runtime(客户内部)</b> 的归因。</p></div>
    <div class="insight"><h5><span class="dot"></span>detection-first,不发现即停</h5><p>HA 无选举、滚动升级会造成短暂多 id → 用 overlap 容忍窗口 + 「告警 → 累积/确认 → revoke」。对脆弱小客户别静默停服。<b>它永不变砖,只是去重容忍。</b></p></div>
  </div>
  <div class="qa" style="margin-top:16px;">
    <div class="item"><p class="q">为什么 RT 可以是静态的?</p><p class="a">因为 duplication 由<b>内存 instance-id</b> 检测,不需要靠 token 变化来暴露复用。省掉整套轮转状态机 / grace / 变砖。</p></div>
    <div class="item"><p class="q">静态 RT 泄露会永久有效吗?</p><p class="a">不会。churn / 账号到期 / 确认盗用都能 revoke,一个 TTL 内 fail-close。并发重复由 instance-id 抓。</p></div>
    <div class="item"><p class="q">为什么用 RT + 短 SLF,而不是长 License File + heartbeat?</p><p class="a">短 SLF 每张是<b>全量签名快照</b> → 无 entitlement state 管理、变更 trivial;RT 因此退化为<b>纯身份</b>(authN/authZ 拆分)。长文件要动态调整就得维护 base+delta 对账。</p></div>
    <div class="item"><p class="q">instance-id 和 fingerprint 什么关系?</p><p class="a">分开:fingerprint 是<b>可伪造的软信号</b>;instance-id 是<b>承重的 duplication 检测信号</b>(内存、克隆拿不到)。</p></div>
    <div class="item"><p class="q">还要不要 activation code?</p><p class="a">要。主因是不再出现集群外泄露持久化凭证的情况。与检测机制正交。</p></div>
  </div>

  <h2 class="sec" id="activation" data-toc="true">Ⅲ<span class="big">激活 / 恢复流程</span></h2>
  <p class="sec-note">正常激活是一次性引导;恢复走 re-activation。核心不变量:<b>一个 license 任意时刻只有一个 live activation code + 一条 live RT 链</b>。</p>
  <p class="sec-note" style="margin-top:20px;"><b>正常激活(首次)</b></p>
  <div class="flow">
    <div class="fstep"><div class="num">1</div><div class="txt">购买后,云端签发一个 <b>activation code</b>:高熵、短有效期、绑定 customer/license、可人工 revoke、不可枚举、不暴露内部信息。</div></div>
    <div class="fstep"><div class="num">2</div><div class="txt">客户用 <b>CLI redeem</b>。集群 HA 时由 <b>单例/leader agent 执行一次 redeem</b>。</div></div>
    <div class="fstep"><div class="num">3</div><div class="txt">云端校验(<b>单次使用 / 未过期 / 未 revoke</b>)→ mint <b>静态 RT + 首张短 SLF</b>,绑定账号,<b>记录 redeem 上下文</b>(时间/IP/来源)以支撑归因 → activation code 立即作废。</div></div>
    <div class="fstep"><div class="num">4</div><div class="txt">agent 把 RT 存入<b>共享 Secret</b>(供 HA 副本读取),在<b>内存生成 instance-id</b>,起 refresh loop(延 RT TTL + 换新 SLF)。</div></div>
  </div>
  <p class="sec-note" style="margin-top:22px;"><b>恢复 / re-activation(两种模式)</b></p>
  <div class="flow">
    <div class="fstep"><div class="num">A</div><div class="txt"><b>恢复模式(benign):</b>RT 丢失(Secret 被删等)→ Revoke 旧 code,发新 code,<b>客户端 redeem 新 code</b> 切短证书,避免 downtime。</div></div>
    <div class="fstep"><div class="num">B</div><div class="txt"><b>吊销模式(确认盗用 / 应急"轮转"):</b>发新 code 并<b>立即吊销旧 RT</b>,旧凭证一个 TTL 内失效。</div></div>
    <div class="fstep"><div class="num">!</div><div class="txt">两种模式操作一致,都必须<b>先 revoke 旧 activation code</b>,最终收敛到"一条 live 链"。发新 code = 唯一的"轮转"入口,不做服务端静默轮转。</div></div>
  </div>
  <div class="box warn" style="margin-top:16px;">
    <h3>激活环节的泄露信号</h3>
    <p>对<b>已消费的 activation code 再次 redeem</b> → 返回明确错误 + <b>记为潜在外链泄露事件</b>(带上下文)。因为小偷抢先 redeem 会让合法客户激活失败 —— 这把一次静默的外链泄露变成<b>响亮、可归因的冲突</b>。activation code 的 TTL 要匹配客户实际部署前置期,并留一条便捷的 re-issue 路径,避免正常客户因过期受阻。</p>
  </div>

  <h2 class="sec" id="detail" data-toc="true">Ⅳ<span class="big">细节问题</span></h2>
  <p class="sec-note"><span class="badge-proto">协议相关</span> = 涉及交互协议(交换的字段 / 端点语义 / 状态机),<b>请仔细 review</b>;<span class="badge-impl">实现/运维</span> = 不影响交互流程。</p>
  <div class="details-list">
    <div class="drow redline"><h5>内存 instance-id 语义 <span class="badge-proto">协议相关</span></h5><p>agent 启动生成 random id,<b>只在内存、不落盘、不写 Secret</b>;每次 refresh 携带。云端按「同一 RT × 时间窗内并发且持续的不同 id 数」判 duplication。要求 <b>agent 单例</b>,并给重启/滚动升级一个 <b>overlap 容忍窗口</b>。<b>(检测核心)</b></p></div>
    <div class="drow redline"><h5>re-activation / 应急轮转 <span class="badge-proto">协议相关</span></h5><p>见 Ⅲ。两模式(恢复 / 吊销)都<b>先 revoke 旧 code + 收敛到一条 live 链</b>。不变量:<b>一个 license = 一个 live activation code + 一条 live RT 链</b>。</p></div>
    <div class="drow"><h5>activation code 语义 <span class="badge-proto">协议相关</span></h5><p>redeem 端点:<b>单次使用、redeem 后失效</b>、绑定 customer/license、rate limit、不可枚举。<b>已消费码再 redeem → 报错 + 提示泄露</b>。记录 redeem 上下文以支撑归因。</p></div>
    <div class="drow"><h5>RT (更新 token) 续期 / revoke <span class="badge-proto">协议相关</span></h5><p>每次 refresh 服务端<b>延长 RT expiry</b>(token 值不变),并返回新 SLF。revoke = 服务端拒绝续期(账号到期 / churn / 确认盗用)→ 一个 TTL 内 fail-close。</p></div>
    <div class="drow"><h5>SLF(短 License File)payload <span class="badge-proto">协议相关</span></h5><p>签名覆盖全量:<code>license_id / customer_id / product_id / entitlement / lease_id / sequence / issued_at / not_before / expires_at</code>。客户端验签 + product/license 匹配 + 时间窗 + sequence 不回退,即用即弃、整张替换。签名建议 Ed25519。</p></div>
    <div class="drow"><h5>旧 license replay <span class="badge-proto">协议相关</span></h5><p>SLF 携带单调递增 <code>sequence</code>;客户端保存 <code>last_accepted_sequence</code>,收到更小的即拒。整机快照回滚会连 sequence 一起回滚 → 纯软件无法完全防,靠短有效期 + 联网暴露 + 审计缩短窗口。</p></div>
    <div class="drow"><h5>时钟回拨 <span class="badge-proto">协议相关</span></h5><p>协议:SLF 的 <code>issued_at / expires_at</code> 以<b>服务端时间</b>为准。每次重启都需要 refresh from server,运行过程中用 <code>time.Since</code>(monotonic clock)。</p></div>
    <div class="drow"><h5>离线 License 验证 <span class="badge-proto">协议相关</span></h5><p>license 绑定 <code>kube-system</code> namespace 的 UID。</p></div>
    <div class="drow"><h5>fingerprint / deployment_id <span class="badge-proto">协议相关</span> <span class="badge-proto" style="background:var(--warn-bg);color:var(--warn);">P1</span></h5><p>请求携带 <code>deployment_id / client_version</code> 等 client_info。是<b>可伪造软信号</b>(降误判、识别迁移、审计),<b>非承重</b>——duplication 承重信号是内存 instance-id。</p></div>
    <div class="drow"><h5>DB 泄露 <span class="badge-impl">实现/运维</span></h5><p>云端<b>不存 raw RT</b>,只存 <code>HMAC(server_secret, raw_rt)</code> verifier;<code>server_secret</code> 放 KMS、与 DB 不同权限域、可版本轮换。</p></div>
    <div class="drow"><h5>日志泄露 <span class="badge-impl">实现/运维</span></h5><p>token 带前缀便于按前缀 redaction;各类日志 / trace / metrics / crash dump 全部脱敏;错误只回 <code>error code + request_id</code>。</p></div>
  </div>

  <h2 class="sec" id="full" data-toc="true">Ⅴ<span class="big">完整 context Q&A(详细 · 默认折叠)</span></h2>
  <p class="sec-note">这一节保留讨论的<b>完整推理链</b>,供未来协作者/agent 理解「为什么是这套方案、每个岔口是怎么被排除的」。</p>
  <div class="full">
    <details>
      <summary><span class="tno">Q1</span>威胁模型与目标是什么?</summary>
      <div class="body">
        <p>目标不是绝对防破解,而是把盗版变成<b>可检测、可止损、可追责</b>。在设计前提下(§0),威胁收敛为两层:<b>Tier 1 无修改的复制</b>(克隆运行系统)→ 可检测;<b>Tier 2 改代码 / 伪造内部信任</b> → 纯软件不防,靠硬件 attestation / 合同法务。</p>
        <p>频率下限保证:N 个独立集群各 ≥1×/有效期 才能不 fail-close → 合并 ≥N×,不建 coordinator 藏不住。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q2</span>为什么 RT 可以是静态的?(不 mutate / 不轮转)</summary>
      <div class="body">
        <p>因为 duplication 的检测不依赖 token 变化,而依赖<b>内存 instance-id</b>:agent 启动在内存生成 random id、不落盘、每次 refresh 带上。<b>克隆拿不到内存里的 id</b> → 克隆生成新 id → 同一 RT 出现多个并发持续 id = duplication。它比 deployment_id 干净(后者被克隆继承、与迁移同形),要绕过需 patch agent 固定 id = Tier 2。</p>
        <p>既然检测已由 instance-id 提供,让 token 变化(轮转)只会引入状态机 / grace / 丢响应变砖等复杂度,<b>却不带来任何新覆盖</b> —— 故 RT 取静态,续期只延 TTL。本质:instance-id 是"去签名的轻量 PoP",只做检测不做认证,明文走 TLS 足够。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q3</span>anti-duplication 与 anti-extraction 是同一件事吗?</summary>
      <div class="body">
        <p><b>核心不变量:一个 license = 一条 live RT 链 = 一个 live consumer。</b>克隆与抠取都只是「制造第二个 consumer」;<b>覆盖等价</b>(同一「多 instance-id」信号)→ 做到 anti-dup,anti-extraction 自然成立。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q4</span>客户画像:两类客户都有,该不该上保护?</summary>
      <div class="body">
        <p>大客户受品牌 + 合同 + 审计约束,基本不碰。<b>威胁集中在小客户</b>:超量自部署 / 整环境克隆 = Tier 1,正是本方案 sweet spot。故 <b>detection-first、确认后再 revoke</b>——小客户运维糙(无 HA / 手动迁移 / 快照恢复),别静默停服误伤。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q5</span>agent 托管 RT 后,威胁是「抠取」还是「克隆」?</summary>
      <div class="body">
        <p>agent 托管 refresh,多数客户不碰 RT。模态盗版<b>不是抠 RT,而是整环境克隆</b>——RT 随 Secret 一起被复制。<b>而内存 instance-id 恰好抓这个</b>:克隆拿不到内存 id,克隆的 agent 生成新 id → 同一 RT 两个并发 id → duplication。真去 patch agent 固定 id 的,是 Tier 2。</p>
        <p>另外两点修正:legit 客户 friction 比想象低(agent 稳健托管);RT 意外外泄面比原设想小(只在集群内)。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q6</span>还要不要 activation code?它的价值是判断泄露源吗?</summary>
      <div class="body">
        <p><b>主因不是归因,是把 durable 凭证挡在外链之外。</b>去掉它就得把 RT 烤进下发 package;一旦 package 在外链泄露且被<b>单独使用</b>(小偷抢先部署 / 合法方未上线),<b>instance-id 救不了</b>(它只抓并发)。activation code 让外链只跑一次性码:客户 redeem 后即死;小偷抢先 redeem 则客户激活失败 → 立刻暴露。</p>
        <p><b>归因是白得的第二价值:</b>activation 是离散节点,把泄露切成 pre-handoff(交付链)vs runtime(客户内部)。但打两折:activate 泄露也可能是客户采购转发;runtime duplication 也可能是外部攻击者攻进客户;且只有记录了 redeem 上下文才成立 → 强先验,非铁证。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q7</span>静态 RT "永久有效"是不是个问题?</summary>
      <div class="body">
        <p><b>不是——"永久有效"的说法过头了。</b>静态 = 值不变,但<b>可 revoke</b>:退订 / 账号到期 / 确认盗用,服务端拒绝续期,一个 TTL 内 fail-close。对 duplication(并发重复)这个真正威胁,静态 RT + revoke + instance-id 已全覆盖;原本担心的残余是一个非-duplication 的角落(小偷单独用、账号仍续费、合法方从不上线),既不是重复使用也几乎不成立。真要让旧凭证被动失效 → 走 re-activation。</p>
      </div>
    </details>
    <details open>
      <summary><span class="tno">Q8</span>为什么用 RT + 短 SLF,而不是长 License File + heartbeat?</summary>
      <div class="body">
        <p><b>核心好处:无状态的全量 entitlement 交付。</b>每张 SLF 是自包含、签名、带时效的<b>全量快照</b>。由此:entitlement 变更/revoke/降权 trivial(下张换新数字,无 delta 协议);客户端对 entitlement <b>无状态</b>(只持有当前 SLF + <code>last_accepted_sequence</code>,整张替换);<b>单签名防篡改</b>(不用给一串 delta 逐条签名排序);审计天然(每次签发即一条带快照 + sequence 的记录)。</p>
        <p><b>对比长文件 + heartbeat:</b>要支持动态 entitlement,heartbeat 就得携带更新 → 维护 base + 一串可变 delta、两边对账、逐条签名排序 —— 正是用 SLF 避开的复杂 state;只延时效则做不了动态调整。</p>
        <p><b>由此 RT 退化为纯身份</b>(不含 entitlement)= <b>authN / authZ 拆分</b> = OAuth 的 refresh token(身份)+ access token(签名 claims)。三点补充:① state 不消失,是搬到<b>服务端</b>(source of truth),客户端最小;② "短"给及时 revoke/变更,"全量"给无状态,是一对;③ 代价 = <b>SLF TTL = revoke 延迟下限</b>(已签发的 SLF 收不回,只能不再续发,与 heartbeat 模型对称)。分层红利:duplication 检测(RT + instance-id)干净落在 authN 层,与 entitlement 解耦。</p>
      </div>
    </details>
    <details>
      <summary><span class="tno">Q9</span>激活 / 恢复流程与边界?</summary>
      <div class="body">
        <p>正常激活见 Ⅲ:一次性 code → 单例/leader agent redeem → 云端校验(单次/未过期/未 revoke)→ mint 静态 RT + 首张 SLF + 记录 redeem 上下文 → code 作废 → RT 入共享 Secret、生成内存 instance-id、起 refresh loop。</p>
        <p><b>redeem 冲突 = 泄露信号:</b>对已消费码再 redeem → 明确报错 + 记为潜在外链泄露(小偷抢先会让合法客户激活失败 → 响亮暴露)。</p>
        <p><b>恢复 / re-activation 两模式:</b>恢复(RT 丢失,旧链保留到新码 redeem,避免 downtime)vs 吊销(确认盗用,立即杀旧链)。都先 revoke 旧 code,收敛到一条 live 链。<b>边界:</b>RT 丢失 / code 过期 → 走 re-activation(接受人工介入,罕见);code TTL 匹配部署前置期 + 留 re-issue 路径。</p>
      </div>
    </details>
  </div>

  <h2 class="sec" id="appx" data-toc="true">Ⅵ<span class="big">附录</span></h2>
  <div class="appx">
    <div class="amod">
      <h5>A · 能防 / 不能防(scope 边界)</h5>
      <p class="why">为什么:明确边界能管理预期、避免过度投入,也是合同/license terms 追责条款的依据。</p>
      <p><b>能防或缓解(Tier 1):</b>静态文件长期复制、长期 key 泄露、RT 二次分发、整环境克隆 / 并发重复使用、旧 license replay、简单时钟回拨、entitlement 动态调整、提前 revoke、超授权多集群、DB 泄露拿 token。</p>
      <p><b>不能彻底防(Tier 2):</b>改代码 / patch 掉本地校验、把 instance-id 固定住、伪造 agent↔业务服务内部信任、持续同步最新 RT 给攻击者、无可信存储时整机快照回滚、云端高权限内鬼、被授权客户主动转卖最新 Secret。</p>
    </div>
    <div class="amod">
      <h5>B · 术语表</h5>
      <p class="why">为什么:未来 agent / 新同事快速对齐;部分词有特定含义。</p>
      <p><b>activation code</b> 一次性引导凭证 · <b>refresh token(RT)</b> 集群内静态凭证,纯身份、续期只延 TTL · <b>SLF(短 License File)</b> daily 短签名租约,携带全量 entitlement 快照,服务消费 · <b>内存 instance-id</b> agent 启动生成、不落盘、每次 refresh 带上的实例身份,duplication 承重信号 · <b>duplication 检测</b> 同一 RT 出现多个并发持续 instance-id · <b>re-activation</b> 重新申请 activation code(先吊销旧链),兼作应急"轮转",分恢复/吊销两模式 · <b>Tier 1 / Tier 2</b> 复制类(可检测)/ 改代码类(不防)。</p>
    </div>
  </div>

  <div class="lsx-foot">License Scheme Design Reference · 2026-07-08 · 核心:让盗版不再便宜、不再隐形、不再难以追责。</div>
`;

const LicenseActivationScheme = () => (
  <div className="b-article lsx">
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div dangerouslySetInnerHTML={{ __html: BODY }} />
  </div>
);

export default {
  id: 'license-activation-scheme',
  Component: LicenseActivationScheme,
  meta: {
    title: { zh: '私有化 License 激活方案' },
    description: {
      zh: '私有化交付的 License 激活方案：激活码 + 静态 Refresh Token + 内存 random instance-id 检测 + 短效签名 License，把盗版从低成本、无感、不可追责变成可检测、可止损、可追责。含威胁模型、方案演进、激活/恢复流程与完整推理 Q&A。',
    },
    cover,
    publishedAt: '2026-07-08',
    readingTime: { zh: 13 },
    category: { zh: '系统设计' },
    tags: ['license', 'security', 'anti-piracy', 'private-deployment', 'authn', 'architecture'],
    languages: ['zh'],
    llmPath: '/post/license-activation-scheme/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
