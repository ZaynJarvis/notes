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

const cover = '/assets/covers/runtime-state-models.svg';

const RuntimeStateModels = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('复杂 Agent 系统里，真正要管理的不是任务列表或记忆文本，而是可恢复、可验证、可归属的运行状态。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('Zayn 当前不需要更多泛泛的高级概念。最值得内化的是三件事：真实 runtime state、明确 source of truth、可复现 feedback loop。Zouk / OpenViking / agents 的复杂度，主要来自 state 在 UI、server、daemon、runtime、repo、部署产物之间漂移。')}
        </P>
      </Callout>

      <H2>{label('一页版')}</H2>
      <P>
        {label('以后遇到任何 agent 系统问题，不要先听代码叙事，也不要先做抽象 taxonomy。先穿过这八个模型。')}
      </P>
      <Table
        headers={[label('模型'), label('它防止什么误判'), label('一句话用法')]}
        rows={[
          [label('Runtime Contract'), label('代码看起来做了，运行时其实没消费'), label('沿 UI -> API -> server -> daemon -> runtime 查谁真的决定行为')],
          [label('State Transition'), label('只看当前状态，忽略切换边界'), label('问 A 到 B 时谁清理、失效、广播、确认、持久化')],
          [label('Source-of-Truth Routing'), label('在错误 repo / 包 / 进程里修代码'), label('先确认 source repo、发布产物、运行版本、部署路径')],
          [label('Behavior Fix vs Cleanup'), label('把热修和架构清理混成一个 PR'), label('先修用户可见行为，再单独处理 cleanup')],
          [label('Evidence Ladder'), label('事实、推断、建议混写'), label('把 confirmed fact / inference / proposal 分层')],
          [label('User-Visible Feedback'), label('错误只在日志里，用户只看到卡住'), label('影响协作的错误要进入协作流')],
          [label('Default Path Contract'), label('默认路径只是 UI convenience'), label('默认打开就应该服务最高频判断')],
          [label('Small Patch, Full Verification'), label('小改动只跑脑内 happy path'), label('小 patch 也要完整闭环验证到运行产物')],
        ]}
      />

      <H2>{label('这篇不讲什么')}</H2>
      <P>
        {label('这不是“系统思维”“第一性原理”“复杂系统涌现”这种大词集合。那些词不落到 runtime contract，就会变成装饰。')}
      </P>
      <Ul>
        <Li>{label('不讲 agent swarm 自动化最大化。Zayn 当前更需要 ownership、review、handoff、状态可见性，不是多开 agent。')}</Li>
        <Li>{label('不讲 CQRS、event sourcing、microservice boundary 这类架构炫技。当前很多问题不是缺复杂架构，而是 transition 和 source-of-truth 没画清。')}</Li>
        <Li>{label('不讲纯 prompt engineering。对当前系统最有用的是工具、状态、部署、证据链，而不是把 prompt 写得更漂亮。')}</Li>
        <Li>{label('不把 OpenViking 讲成抽象 memory database。更接近的上层抽象是 context lifecycle、checkpoint、provenance、rehydration。')}</Li>
      </Ul>

      <H2>{label('1. Runtime Contract > 代码叙事')}</H2>
      <P>
        {label('代码叙事是“这个函数名、注释、PR description 看起来在做什么”。Runtime contract 是“运行时到底由谁消费哪个字段，哪个值触发哪个行为”。复杂系统里，可信的是 runtime contract，不是命名。')}
      </P>
      <Callout type="note" title={label('Zouk 里的典型误判')}>
        <P>
          {label('reset button 注释说 cold-start，不代表实际就是 cold-start。如果 server 仍传旧 sessionId，daemon cache 也可能兜底 resume，那么用户点 reset 后仍可能恢复旧会话。正确路径不是相信注释，而是沿 UI -> API -> server -> daemon -> runtime 查：谁决定 sessionId，null / undefined / missing 分别意味着什么。')}
        </P>
      </Callout>
      <Pre lang="text" lineNumbers={false}>{`不要问：
  这段代码是不是写了 reset？

要问：
  runtime 收到的 contract 是什么？
  哪个字段决定 cold-start？
  谁可以覆盖它？
  旧 session 从哪里被重新引入？
  哪个测试能证明 reset 后不会 resume？`}</Pre>

      <H2>{label('2. State Transition > 静态状态')}</H2>
      <P>
        {label('很多线上问题不是“状态错了”，而是“状态从 A 到 B 的过程没有守门”。连接重建、workspace 切换、daemon restart、agent stop/start、token 过期、activity 更新，这些 transition 如果没有 guard / invalidation / ack，就会制造漂移。')}
      </P>
      <Table
        headers={[label('场景'), label('不要只问'), label('要追的 transition')]}
        rows={[
          [label('iOS PWA eager WS'), label('WebSocket 现在连上了吗'), label('什么时候建连、断线后谁重连、旧连接如何失效')],
          [label('workspace switch stale write'), label('当前 workspace 是谁'), label('切换瞬间旧请求能不能写进新 workspace')],
          [label('activity stuck working'), label('activity 状态是什么'), label('agent idle / stop / error 如何广播并落到 UI')],
          [label('daemon restart'), label('进程是否 online'), label('新版本是否启动、连接、sent ready、旧进程是否还在写')],
        ]}
      />
      <P>
        {label('Zayn 需要训练的不是“看状态”，而是“看状态转换边界”。真正的 bug 常常藏在边界上：A 已经不该写了但还在写，B 已经启动了但没有宣告 ready，旧 owner 已失效但仍被当成 source of truth。')}
      </P>

      <H2>{label('3. Source-of-Truth Routing')}</H2>
      <P>
        {label('复杂协作里，修错地方比修错代码更常见。一个行为可能经过 source repo、build artifact、npm/pip package、PM2 process、Cloudflare deploy、browser cache。任何一层搞错，代码正确也不会生效。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`动手前先画 routing：

source repo:
  这段代码真正应该在哪个 repo 改？

publish artifact:
  运行时吃的是源码、npm 包、pip wheel、Docker image，还是静态 build？

running process:
  PM2 / Railway / Cloudflare 当前跑的是哪个版本？

deployment path:
  CI/CD 从哪个 branch、tag、workflow 出发？

verification:
  我如何证明线上吃到的是这个 commit / version？`}</Pre>
      <Callout type="warning" title={label('近期例子')}>
        <P>
          {label('zouk-daemon-bak 和 t0saki/zouk-daemon 看起来都像 daemon，但只有后者是应该修改的 source repo。全局安装的 @openviking/zouk-daemon 是发布产物，不是开发位置。OpenViking source build 和 pip package 也必须分清。')}
        </P>
      </Callout>

      <H2>{label('4. Behavior Fix 与 Cleanup 解耦')}</H2>
      <P>
        {label('用户当前行为错了，应该先修 behavior contract；老接口、死代码、架构不干净，通常是另一个任务。把两者混成一个 PR，会让范围膨胀、验证困难、rollback 不清楚。')}
      </P>
      <Table
        headers={[label('问题类型'), label('优先级'), label('交付标准')]}
        rows={[
          [label('Behavior fix'), label('先做'), label('用户可见错误消失，有回归验证，有部署验证')],
          [label('Compatibility guard'), label('通常同 PR'), label('旧数据/旧 daemon/旧字段不会破坏新行为')],
          [label('Cleanup'), label('后做'), label('删除死代码、统一 helper、重命名、降低重复')],
          [label('Architecture cleanup'), label('单独评估'), label('有明确收益、迁移路径、风险边界')],
        ]}
      />
      <P>
        {label('例如 reset 修复，立即要修的是 cold-start 不 resume；prompt / toolDefinitions / OV startup context 的死代码删除，可以是后续 cleanup。这个分离能保留 deployment-safe intermediate state。')}
      </P>

      <H2>{label('5. Evidence Ladder：fact / inference / proposal 分层')}</H2>
      <P>
        {label('Zayn 对 plausible narrative 的容忍度很低。不是因为不能接受推断，而是推断必须标注为推断。一个可靠技术更新应该让人一眼看出：哪些是事实，哪些是根因假设，哪些是建议动作。')}
      </P>
      <Pre lang="text" lineNumbers={false}>{`Confirmed fact:
  日志、代码、接口返回、测试输出、commit、version、CI 状态。

Inference:
  基于事实推断的可能根因，必须可被反证。

Proposal:
  建议采取的修法、验证路径、rollback 或后续 cleanup。`}</Pre>
      <P>
        {label('这适用于 OpenViking permission denied、CLI result nesting、Remote Compact、Cloudflare deployment、agent stuck working。不要把 observation、interpretation、recommendation 写成同一种语气。')}
      </P>

      <H2>{label('6. User-Visible Feedback Loop')}</H2>
      <P>
        {label('Zouk 不是普通 UI，而是协作 runtime。协作 runtime 的错误不能只留在 server logs 或 activity panel 里；如果错误影响协作，它应该进入协作流，让用户和其他 agents 能共同处理。')}
      </P>
      <Ul marker="check">
        <Li>{label('daemon 重连失败：说明哪个 daemon、哪个 workspace、最后一次 ready 是什么时候。')}</Li>
        <Li>{label('tool bridge 失败：说明哪个 tool、哪类输入、是否可重试。')}</Li>
        <Li>{label('agent activity stuck：说明 owner、session、stop/idle 信号是否收到。')}</Li>
        <Li>{label('部署未生效：说明当前线上 commit/version 和期望 commit/version 的差异。')}</Li>
      </Ul>
      <P>
        {label('这不是把错误吵闹化，而是把不可见状态变成可协作对象。用户看到“agent 没反应”时，系统已经失败；用户看到“哪个 bot 因为什么错误停住”时，协作还在。')}
      </P>

      <H2>{label('7. Default Path as Product Contract')}</H2>
      <P>
        {label('默认路径不是 UI convenience，而是产品对“用户一打开应该看到什么”的承诺。默认打开的东西应该服务最高频判断，不应该只是暴露原始树的第一层。')}
      </P>
      <Callout type="note" title={label('OpenViking memory page 的例子')}>
        <P>
          {label('默认展开 profile.md 可能不够，因为用户真正需要判断的是 memories 下 preferences / entities / events / privacy 的结构。默认路径应该帮助用户判断“这个 agent 现在知道什么、缺什么、哪里可改”，而不是让他从文件树第一层开始猜。')}
        </P>
      </Callout>
      <P>
        {label('同样逻辑也适用于 notes、zaynjarvis.com、Studio、PWA。第一屏不是装饰，而是 product contract：它应该把最高频判断提前。')}
      </P>

      <H2>{label('8. Small Patch, Full Verification')}</H2>
      <P>
        {label('Zayn 可以接受快速 merge，但前提是验证闭环完整。小 patch 不等于小风险；很多协作系统 bug 恰恰来自“小改动 + 没验证部署产物”。')}
      </P>
      <Table
        headers={[label('改动'), label('最低验证闭环')]}
        rows={[
          [label('Zouk UI'), label('typecheck / build / lint / 关键 Playwright 或 screenshot 验证')],
          [label('daemon'), label('test / build / publish / PM2 定向 restart / version + Connected + Sent ready 日志')],
          [label('OpenViking package'), label('source test / wheel or package smoke / import or runtime smoke')],
          [label('Cloudflare static site'), label('local build / pushed commit / CF deploy status / public URL smoke')],
          [label('notes 发布'), label('npm build / rendered routes / pushed commit / 线上路径或部署状态')],
        ]}
      />
      <P>
        {label('验证不是仪式，而是 source-of-truth routing 的最后一步：证明运行中的系统真的吃到了这次改动。')}
      </P>

      <H2>{label('把八个模型合成一个默认调试协议')}</H2>
      <Pre lang="text" lineNumbers={false}>{`1. State
   当前用户可见错误是什么？它在哪个 transition 出现？

2. Runtime contract
   谁真正决定这个行为？字段、协议、版本、owner 是什么？

3. Source of truth
   应该改哪个 repo？发布产物是什么？运行进程吃哪个版本？

4. Evidence ladder
   confirmed fact / inference / proposal 分别是什么？

5. Patch shape
   行为修复是什么？cleanup 是否需要拆出去？

6. Feedback
   用户是否能看见错误、恢复、进展？

7. Verification
   如何证明代码、产物、部署、运行态都一致？

8. Residual risk
   还可能在哪个 transition 漂移？rollback 路径是什么？`}</Pre>

      <H2>{label('对 OpenViking / Zouk 的设计影响')}</H2>
      <Ul>
        <Li>{label('OpenViking 不应只卖“记忆”。更强的 framing 是 context lifecycle：checkpoint、provenance、rehydration、source-of-truth、debug surface。')}</Li>
        <Li>{label('Zouk 不应只展示消息。它应该展示协作 runtime 的状态变化：谁在工作、谁卡住、哪个 daemon 断了、哪个 deploy 未生效。')}</Li>
        <Li>{label('Agent 协作不应只追求并行。并行之前先要有 ownership、handoff、review、验证和可见状态。')}</Li>
        <Li>{label('Notes 不应只是文章。它应该沉淀 Zayn 的判断协议，让未来的系统设计和 agent 行为可复用。')}</Li>
      </Ul>

      <H2>{label('Knowledge Update Card')}</H2>
      <Table
        headers={[label('字段'), label('更新')]}
        rows={[
          [label('这次解决的问题'), label('把 Louise 对 Zayn/Zouk/OpenViking 协作的工程判断，压缩成可复用的 8 个思维模型。')],
          [label('Zayn 读前的 prior'), label('大概率已经理解系统复杂，但容易在具体任务里被 repo、runtime、部署产物、transition 边界同时拉扯。')],
          [label('关键增量'), label('不要把复杂度理解成功能多；它主要来自 state 跨层漂移。')],
          [label('更新后的模型'), label('每个判断都要落到 runtime contract、source-of-truth routing、feedback loop。')],
          [label('适用边界'), label('适用于 Zouk、OpenViking、agent runtime、部署链路、协作系统调试；不适合替代深层算法/模型能力研究。')],
          [label('反例或 failure mode'), label('如果问题本身是业务方向或用户价值错了，只看 runtime state 会过度工程化。')],
          [label('对工程判断的影响'), label('先画运行链路和状态转换，再决定 PR 范围；先修 behavior contract，再 cleanup。')],
          [label('还没解决的问题'), label('这些模型还需要转成 Zouk/OV 的具体 checklist、PR template、agent handoff protocol。')],
          [label('下一步最小行动'), label('下一次 bugfix 或 deploy 复盘时，用八步协议写一版 evidence -> root cause -> validation -> risk。')],
        ]}
      />

      <H2>{label('最后压缩')}</H2>
      <P>
        <Strong>{label('复杂 Agent 系统的核心能力，不是“会做更多任务”，而是“状态不会漂移，漂移后能被看见、归因、恢复”。')}</Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'runtime-state-models',
  Component: RuntimeStateModels,
  meta: {
    title: { zh: 'Agent 系统的运行状态思维模型' },
    description: { zh: 'Zayn 在 Zouk / OpenViking / agent 协作里最该内化的 8 个工程判断：runtime contract、state transition、source of truth、evidence ladder 和完整验证闭环。' },
    cover,
    publishedAt: '2026-05-30',
    readingTime: { zh: 12 },
    category: { zh: 'Zayn OS' },
    tags: ['agents', 'systems', 'openviking', 'zouk'],
    languages: ['zh'],
    llmPath: '/post/runtime-state-models/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
