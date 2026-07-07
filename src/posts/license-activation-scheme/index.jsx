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
  InlineCode,
  Pre,
  Small,
} from '../../blog-components';

const cover = '/assets/covers/license-activation-scheme.png';

const stack = `activation code（一次性）
  + 静态 Refresh Token（纯身份 / 续期延 TTL）
  + Short License File（全量 entitlement 快照）
  + 内存 random instance-id（内存 random 不可读，支持复制检测）
  + 审计 + 云上 HMAC verifier（RT 不会在云上泄露）
———
应急"轮转" = re-activation → new activation code`;

const LicenseActivationScheme = () => {
  return (
    <Article>
      <Lead>
        私有化交付的 License 目标很实际：让盗版变成<Strong>高成本、可检测、可止损、可追责</Strong>。这篇记录方案怎么一步步演进到今天、几条核心洞察、激活与恢复流程，以及完整的推理 Q&A。范围只聚焦 license 的<Strong>激活交互流程</Strong>，不讨论客户端拿到 license file 之后怎么消费。
      </Lead>

      <H2>威胁模型（两层）</H2>
      <P>先明确要防什么，再给结论。在下面「设计前提」的假设下，威胁收敛为两层。</P>
      <Table
        headers={['层级', '手法', '结果']}
        rows={[
          [
            'Tier 1 · 无修改的复制',
            '复制 / 克隆整个运行系统（含 RT）—— 超量自部署、整环境克隆、取出并复用 RT。',
            '✅ 可检测（内存 instance-id 并发检测 + 频率）',
          ],
          [
            'Tier 2 · 改代码 / 伪造内部信任',
            '改 agent / 服务、patch 掉校验、把 instance-id 固定住、伪造 agent 与业务服务之间的信任。',
            '❌ 纯软件不防（靠法务合同）',
          ],
        ]}
      />

      <Callout type="tip" title="结论">
        <P>
          方案 = <Strong>激活码 + 静态 Refresh Token + 内存 random instance-id 检测 + 短效签名 License</Strong>。用简单结构解决 <Strong>代码不被逆向（Tier-1）威胁</Strong>：<InlineCode>activation_code</InlineCode> 单次激活换一个静态 refresh token（不含授权信息）；每次刷新返回一张短效签名 License File（SLF，携带全量 entitlement），必要时顺延 RT 的 TTL，不做 RT 轮转。
        </P>
        <P>
          复制检测靠 agent 启动时在内存生成的 random instance-id（不落盘）：每次 refresh 带上，云端看到同一个 RT 出现多个并发且持续的 instance-id，就判定证书复用，走 <Strong>告警 → 确认 → 吊销</Strong>。
        </P>
      </Callout>

      <Pre lang="text" lineNumbers={false}>{stack}</Pre>

      <H2>0 · 设计前提（承重假设）</H2>
      <Callout type="warn" title="承重前提">
        <Ol>
          <Li>
            假设私有化验签服务与业务服务之间的信任通道不会被攻破，License 不在私有化环境内泄露。业务服务只接受本地 license agent 推送的 entitlement，不自己验签 bearer license file。「把签名 license / entitlement 扇出给 N 个集群」必须让 N 个集群指向同一个验证激活 agent，即伪造 agent 与业务服务的信任，而这被前提排除。
          </Li>
          <Li>
            <Strong>license agent 集群内单例</Strong>（HA 用 leader）。这样「一个集群 = 一个活着的 agent = 一个 instance-id」，内存 instance-id 才是干净的复制检测信号。
          </Li>
        </Ol>
        <P>
          <Strong>失效条件：</Strong>当签名 license 可被盗用（例如某业务服务改成自己拿 public key 验签），需要重新评估 license 加密绑定集群公钥的方案（key-binding）。
        </P>
      </Callout>

      <H2>Ⅰ · 方案演进路径（新 → 旧）</H2>
      <P>每一步都记：机制 / 解决了什么 / 遗留了什么。方案自下（旧）而上（新）演进，每一步解决上一步留下的一个新问题；★ 是当前方案。</P>
      <Table
        headers={['阶段', '机制', '解决', '遗留']}
        rows={[
          [
            '★ 当前 · 静态 RT + 内存 instance-id 检测盗用',
            'activation code 引导 → 获取静态 RT（纯身份）+ 首张 SLF；每次刷新延 RT TTL + 换新 SLF；agent 启动生成内存 random instance-id，每次 refresh 带上，云端见同一 RT 多个持续 instance-id → 发现复用异常。',
            '内存 instance-id 抓克隆（克隆拿不到内存 id），比 deployment_id 干净；结构最简单，无轮转状态机 / grace / 变砖；重启、滚动升级容忍 overlap。',
            '需 agent 单例（HA leader 选举）；patch instance_id 破解属 Tier-2。',
          ],
          [
            '④ Activation Code 换 Refresh Token',
            '一次性 activation code 首次 redeem → refresh token；之后用 RT 刷新拿 SLF。',
            '收窄集群外分发链路（邮件 / 合同 / 工单 / installer）泄露；RT 只在集群内产生。',
            'RT 仍是长期 token，集群内泄露 / 克隆后难发现 —— 由 ★ 内存 instance-id 检测补上。',
          ],
          [
            '③ Key 换 短效 License（SLF）',
            'license file 改为短有效期（天级）的全量 entitlement 快照，周期性（+主动触发）刷新。',
            '支持提前 revoke、扩缩权、动态 entitlement、fail-close；每张 SLF 全量快照，不管理 entitlement state。',
            'Key 是长期 token，泄露可被盗用 —— 由 ④ activation code 收窄。',
          ],
          [
            '② Key 换 License File',
            '部署时配长期 key，客户端拿 key 去云端换 license file。',
            '在线续期方便，不必每年手动替换。',
            'Key 是长期 token，有效期内无法 revoke / 缩权 —— 由 ③ 短 lease 解决。',
          ],
          [
            '① 静态 License File',
            '云端签发静态签名文件，客户端内置 public key 本地验签。',
            '最简单，完全离线可用。',
            '续期要手动换文件、无法在线 revoke —— 由 ② key 换文件解决。',
          ],
        ]}
      />

      <H2>Ⅱ · 关键洞察</H2>
      <Callout type="info" title="核心不变量">
        <P>
          <Strong>一个 license = 一个 RT = 一个 live consumer。</Strong>「整环境克隆」和「复制 RT」都是在制造「第二个 consumer」。用内存 instance-id 探测「第二个 consumer」，一个信号同时覆盖 anti-duplication 与 anti-extraction。
        </P>
      </Callout>
      <Table
        headers={['洞察', '说明']}
        rows={[
          [
            '内存 instance-id 是承重的复制信号',
            'agent 启动时在内存生成 random id、不落盘、每次 refresh 带上。克隆拿不到它 → 克隆生成新 id → 同一 RT 出现多个并发持续 id = duplication。比 deployment_id 干净（后者被克隆继承、与迁移同形）。',
          ],
          [
            'authN / authZ 拆分',
            'RT = 纯身份（长期，不含 entitlement），SLF = 全量 entitlement 快照（短期，签名）。就是 OAuth 的 refresh token + access token 模型。复制检测干净落在 authN 层，与 entitlement 解耦。',
          ],
          [
            '短 SLF = 无状态全量 entitlement',
            '每张 SLF 是自包含签名快照 → 变更 / revoke / 降权 trivial（下张换新数字）、客户端对 entitlement 无状态、单签名防篡改、审计天然。避开「长文件 + heartbeat」的 base+delta 对账。',
          ],
          [
            '静态 RT 可 revoke，无「永久泄露」',
            '续期只延 TTL、token 值不变；但 churn、账号到期、确认盗用都能服务端 revoke，一个 TTL 内 fail-close。并发重复由 instance-id 抓 —— 不需要轮转 / mutate token（那样只加状态机与变砖风险，却无新覆盖）。',
          ],
          [
            'activation code = 外链 seam',
            '把 durable 凭证挡在外链（邮件 / 合同 / installer）之外：外链泄露要么在客户 redeem 后变死物，要么在小偷抢先 redeem 时变成响亮的「激活冲突」。顺带给出 pre-handoff（交付链）vs runtime（客户内部）的归因。',
          ],
          [
            'detection-first，不发现即停',
            'HA 无选举、滚动升级会造成短暂多 id → 用 overlap 容忍窗口 + 「告警 → 累积 / 确认 → revoke」。对脆弱小客户别静默停服。它永不变砖，只是去重容忍。',
          ],
        ]}
      />

      <H3>Q&A（简化）</H3>
      <Table
        headers={['问', '答']}
        rows={[
          [
            '为什么 RT 可以是静态的？',
            '因为复制由内存 instance-id 检测，不需要靠 token 变化来暴露复用。省掉整套轮转状态机 / grace / 变砖。',
          ],
          [
            '静态 RT 泄露会永久有效吗？',
            '不会。churn、账号到期、确认盗用都能 revoke，一个 TTL 内 fail-close。并发重复由 instance-id 抓。',
          ],
          [
            '为什么用 RT + 短 SLF，而不是长 License File + heartbeat？',
            '短 SLF 每张是全量签名快照 → 无 entitlement state 管理、变更 trivial；RT 因此退化为纯身份（authN / authZ 拆分）。长文件要动态调整就得维护 base+delta 对账。',
          ],
          [
            'instance-id 和 fingerprint 什么关系？',
            '分开：fingerprint 是可伪造的软信号；instance-id 是承重的复制检测信号（内存、克隆拿不到）。',
          ],
          [
            '还要不要 activation code？',
            '要。主因是不再出现「集群外泄露持久化凭证」的情况，与检测机制正交。',
          ],
        ]}
      />

      <H2>Ⅲ · 激活 / 恢复流程</H2>
      <P>
        正常激活是一次性引导；恢复走 re-activation。核心不变量：<Strong>一个 license 任意时刻只有一个 live activation code + 一条 live RT 链</Strong>。
      </P>

      <H3>正常激活（首次）</H3>
      <Ol>
        <Li>购买后，云端签发一个 activation code：高熵、短有效期、绑定 customer / license、可人工 revoke、不可枚举、不暴露内部信息。</Li>
        <Li>客户用 CLI redeem。集群 HA 时由单例 / leader agent 执行一次 redeem。</Li>
        <Li>云端校验（单次使用 / 未过期 / 未 revoke）→ mint 静态 RT + 首张短 SLF，绑定账号，记录 redeem 上下文（时间 / IP / 来源）以支撑归因 → activation code 立即作废。</Li>
        <Li>agent 把 RT 存入共享 Secret（供 HA 副本读取），在内存生成 instance-id，起 refresh loop（延 RT TTL + 换新 SLF）。</Li>
      </Ol>

      <H3>恢复 / re-activation（两种模式）</H3>
      <Ul>
        <Li><Strong>A · 恢复模式（benign）</Strong>：RT 丢失（Secret 被删等）→ revoke 旧 code，发新 code，客户端 redeem 新 code 切短证书，避免 downtime。</Li>
        <Li><Strong>B · 吊销模式（确认盗用 / 应急「轮转」）</Strong>：发新 code 并立即吊销旧 RT，旧凭证一个 TTL 内失效。</Li>
      </Ul>
      <P>
        两种模式操作一致，都必须先 revoke 旧 activation code，最终收敛到一条 live 链。发新 code 是唯一的「轮转」入口，不做服务端静默轮转。
      </P>

      <Callout type="warn" title="激活环节的泄露信号">
        <P>
          对已消费的 activation code 再次 redeem → 返回明确错误 + 记为潜在外链泄露事件（带上下文）。因为小偷抢先 redeem 会让合法客户激活失败 —— 这把一次静默的外链泄露变成响亮、可归因的冲突。activation code 的 TTL 要匹配客户实际部署前置期，并留一条便捷的 re-issue 路径，避免正常客户因过期受阻。
        </P>
      </Callout>

      <H2>Ⅳ · 细节问题</H2>
      <P>
        <Strong>协议相关</Strong> = 涉及交互协议（交换的字段 / 端点语义 / 状态机），需仔细 review；<Strong>实现 / 运维</Strong> = 不影响交互流程。
      </P>
      <Table
        headers={['项目', '类别', '说明']}
        rows={[
          [
            '内存 instance-id 语义（检测核心）',
            '协议相关',
            'agent 启动生成 random id，只在内存、不落盘、不写 Secret；每次 refresh 携带。云端按「同一 RT × 时间窗内并发且持续的不同 id 数」判 duplication。要求 agent 单例，并给重启 / 滚动升级一个 overlap 容忍窗口。',
          ],
          [
            're-activation / 应急轮转',
            '协议相关',
            '两模式（恢复 / 吊销）都先 revoke 旧 code + 收敛到一条 live 链。不变量：一个 license = 一个 live activation code + 一条 live RT 链。',
          ],
          [
            'activation code 语义',
            '协议相关',
            'redeem 端点：单次使用、redeem 后失效、绑定 customer / license、rate limit、不可枚举。已消费码再 redeem → 报错 + 提示泄露。记录 redeem 上下文以支撑归因。',
          ],
          [
            'RT（更新 token）续期 / revoke',
            '协议相关',
            '每次 refresh 服务端延长 RT expiry（token 值不变），并返回新 SLF。revoke = 服务端拒绝续期（账号到期 / churn / 确认盗用）→ 一个 TTL 内 fail-close。',
          ],
          [
            'SLF（短 License File）payload',
            '协议相关',
            '签名覆盖全量：license_id / customer_id / product_id / entitlement / lease_id / sequence / issued_at / not_before / expires_at。客户端验签 + product / license 匹配 + 时间窗 + sequence 不回退，即用即弃、整张替换。签名建议 Ed25519。',
          ],
          [
            '旧 license replay',
            '协议相关',
            'SLF 携带单调递增 sequence；客户端保存 last_accepted_sequence，收到更小的即拒。整机快照回滚会连 sequence 一起回滚 → 纯软件无法完全防，靠短有效期 + 联网暴露 + 审计缩短窗口。',
          ],
          [
            '时钟回拨',
            '协议相关',
            '协议：SLF 的 issued_at / expires_at 以服务端时间为准。每次重启都需要 refresh from server，运行过程中用 time.Since（monotonic clock）计时。',
          ],
          [
            '离线 License 验证',
            '协议相关',
            'license 绑定 kube-system namespace 的 UID。',
          ],
          [
            'fingerprint / deployment_id',
            '协议相关 · P1',
            '请求携带 deployment_id / client_version 等 client_info。是可伪造软信号（降误判、识别迁移、审计），非承重 —— 复制的承重信号是内存 instance-id。',
          ],
          [
            'DB 泄露',
            '实现 / 运维',
            '云端不存 raw RT，只存 HMAC(server_secret, raw_rt) verifier；server_secret 放 KMS、与 DB 不同权限域、可版本轮换。',
          ],
          [
            '日志泄露',
            '实现 / 运维',
            'token 带前缀便于按前缀 redaction；各类日志 / trace / metrics / crash dump 全部脱敏；错误只回 error code + request_id。',
          ],
        ]}
      />

      <H2>Ⅴ · 完整推理 Q&A</H2>
      <P>这一节保留完整推理链，用来说明「为什么是这套方案、每个岔口是怎么被排除的」。</P>

      <H3>Q1 · 威胁模型与目标是什么？</H3>
      <P>
        目标不是绝对防破解，而是把盗版变成可检测、可止损、可追责。在设计前提下，威胁收敛为两层：Tier 1 无修改的复制（克隆运行系统）→ 可检测；Tier 2 改代码 / 伪造内部信任 → 纯软件不防，靠硬件 attestation 或合同法务。
      </P>
      <P>
        频率下限保证：N 个独立集群各至少刷新一次 / 有效期才能不 fail-close → 合并起来至少 N 次，不建一个 coordinator 藏不住这个频率。
      </P>

      <H3>Q2 · 为什么 RT 可以是静态的？（不 mutate / 不轮转）</H3>
      <P>
        因为复制的检测不依赖 token 变化，而依赖内存 instance-id：agent 启动在内存生成 random id、不落盘、每次 refresh 带上。克隆拿不到内存里的 id → 克隆生成新 id → 同一 RT 出现多个并发持续 id = duplication。它比 deployment_id 干净（后者被克隆继承、与迁移同形），要绕过需 patch agent 固定 id，属 Tier 2。
      </P>
      <P>
        既然检测已由 instance-id 提供，让 token 变化（轮转）只会引入状态机 / grace / 丢响应变砖等复杂度，却不带来任何新覆盖 —— 所以 RT 取静态，续期只延 TTL。本质上 instance-id 是一个「去签名的轻量 PoP」，只做检测不做认证，明文走 TLS 就够。
      </P>

      <H3>Q3 · anti-duplication 与 anti-extraction 是同一件事吗？</H3>
      <P>
        核心不变量：一个 license = 一条 live RT 链 = 一个 live consumer。克隆与抠取都只是「制造第二个 consumer」；覆盖等价（同一「多 instance-id」信号）→ 做到 anti-dup，anti-extraction 自然成立。
      </P>

      <H3>Q4 · 客户画像：两类客户都有，该不该上保护？</H3>
      <P>
        大客户受品牌、合同、审计约束，基本不碰。威胁集中在小客户：超量自部署、整环境克隆 = Tier 1，正是本方案的 sweet spot。所以 detection-first、确认后再 revoke —— 小客户运维糙（无 HA / 手动迁移 / 快照恢复），别静默停服误伤。
      </P>

      <H3>Q5 · agent 托管 RT 后，威胁是「抠取」还是「克隆」？</H3>
      <P>
        agent 托管 refresh，多数客户不碰 RT。主流盗版不是抠 RT，而是整环境克隆 —— RT 随 Secret 一起被复制。而内存 instance-id 恰好抓这个：克隆拿不到内存 id，克隆的 agent 生成新 id → 同一 RT 两个并发 id → duplication。真去 patch agent 固定 id 的，是 Tier 2。
      </P>
      <P>
        另外两点修正：合法客户的 friction 比想象低（agent 稳健托管）；RT 意外外泄面比原设想小（只在集群内）。
      </P>

      <H3>Q6 · 还要不要 activation code？它的价值是判断泄露源吗？</H3>
      <P>
        主因不是归因，而是把 durable 凭证挡在外链之外。去掉它就得把 RT 烤进下发 package；一旦 package 在外链泄露且被单独使用（小偷抢先部署 / 合法方未上线），instance-id 救不了（它只抓并发）。activation code 让外链只跑一次性码：客户 redeem 后即死；小偷抢先 redeem 则客户激活失败 → 立刻暴露。
      </P>
      <P>
        归因是白得的第二价值：activation 是离散节点，把泄露切成 pre-handoff（交付链）vs runtime（客户内部）。但要打折看：activate 泄露也可能是客户采购转发；runtime duplication 也可能是外部攻击者攻进客户；且只有记录了 redeem 上下文才成立 → 是强先验，不是铁证。
      </P>

      <H3>Q7 · 静态 RT「永久有效」是不是个问题？</H3>
      <P>
        不是 ——「永久有效」的说法过头了。静态 = 值不变，但可 revoke：退订、账号到期、确认盗用，服务端拒绝续期，一个 TTL 内 fail-close。对 duplication（并发重复）这个真正威胁，静态 RT + revoke + instance-id 已全覆盖；原本担心的残余是一个非-duplication 的角落（小偷单独用、账号仍续费、合法方从不上线），既不是重复使用也几乎不成立。真要让旧凭证被动失效 → 走 re-activation。
      </P>

      <H3>Q8 · 为什么用 RT + 短 SLF，而不是长 License File + heartbeat？</H3>
      <P>
        核心好处是无状态的全量 entitlement 交付。每张 SLF 是自包含、签名、带时效的全量快照。由此：entitlement 变更 / revoke / 降权 trivial（下张换新数字，无 delta 协议）；客户端对 entitlement 无状态（只持有当前 SLF + last_accepted_sequence，整张替换）；单签名防篡改（不用给一串 delta 逐条签名排序）；审计天然（每次签发即一条带快照 + sequence 的记录）。
      </P>
      <P>
        对比长文件 + heartbeat：要支持动态 entitlement，heartbeat 就得携带更新 → 维护 base + 一串可变 delta、两边对账、逐条签名排序 —— 正是用 SLF 避开的复杂 state；只延时效则做不了动态调整。
      </P>
      <P>
        由此 RT 退化为纯身份（不含 entitlement）= authN / authZ 拆分 = OAuth 的 refresh token（身份）+ access token（签名 claims）。三点补充：① state 不消失，是搬到服务端（source of truth），客户端最小；②「短」给及时 revoke / 变更，「全量」给无状态，是一对；③ 代价 = SLF TTL = revoke 延迟下限（已签发的 SLF 收不回，只能不再续发，与 heartbeat 模型对称）。分层红利：复制检测（RT + instance-id）干净落在 authN 层，与 entitlement 解耦。
      </P>

      <H3>Q9 · 激活 / 恢复流程与边界？</H3>
      <P>
        正常激活见上：一次性 code → 单例 / leader agent redeem → 云端校验（单次 / 未过期 / 未 revoke）→ mint 静态 RT + 首张 SLF + 记录 redeem 上下文 → code 作废 → RT 入共享 Secret、生成内存 instance-id、起 refresh loop。
      </P>
      <P>
        redeem 冲突 = 泄露信号：对已消费码再 redeem → 明确报错 + 记为潜在外链泄露（小偷抢先会让合法客户激活失败 → 响亮暴露）。
      </P>
      <P>
        恢复 / re-activation 两模式：恢复（RT 丢失，旧链保留到新码 redeem，避免 downtime）vs 吊销（确认盗用，立即杀旧链）。都先 revoke 旧 code，收敛到一条 live 链。边界：RT 丢失 / code 过期 → 走 re-activation（接受人工介入，罕见）；code TTL 匹配部署前置期 + 留 re-issue 路径。
      </P>

      <H2>Ⅵ · 附录</H2>

      <H3>A · 能防 / 不能防（scope 边界）</H3>
      <P>明确边界能管理预期、避免过度投入，也是合同 / license terms 追责条款的依据。</P>
      <Callout type="tip" title="能防或缓解（Tier 1）">
        <P>
          静态文件长期复制、长期 key 泄露、RT 二次分发、整环境克隆 / 并发重复使用、旧 license replay、简单时钟回拨、entitlement 动态调整、提前 revoke、超授权多集群、DB 泄露拿 token。
        </P>
      </Callout>
      <Callout type="warn" title="不能彻底防（Tier 2）">
        <P>
          改代码 / patch 掉本地校验、把 instance-id 固定住、伪造 agent 与业务服务的内部信任、持续同步最新 RT 给攻击者、无可信存储时整机快照回滚、云端高权限内鬼、被授权客户主动转卖最新 Secret。
        </P>
      </Callout>

      <H3>B · 术语表</H3>
      <Table
        headers={['术语', '含义']}
        rows={[
          ['activation code', '一次性引导凭证。'],
          ['refresh token（RT）', '集群内静态凭证，纯身份、续期只延 TTL。'],
          ['SLF（短 License File）', '短签名租约，携带全量 entitlement 快照，供业务服务消费。'],
          ['内存 instance-id', 'agent 启动生成、不落盘、每次 refresh 带上的实例身份，复制检测的承重信号。'],
          ['复制检测（duplication）', '同一 RT 出现多个并发持续 instance-id。'],
          ['re-activation', '重新申请 activation code（先吊销旧链），兼作应急「轮转」，分恢复 / 吊销两模式。'],
          ['Tier 1 / Tier 2', '复制类（可检测）/ 改代码类（纯软件不防）。'],
        ]}
      />

      <Small>核心一句话：让盗版不再便宜、不再隐形、不再难以追责。</Small>
    </Article>
  );
};

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
