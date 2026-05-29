import React from 'react';
import {
  Article,
  Lead,
  H2,
  P,
  Ul,
  Li,
  Table,
  Callout,
  Strong,
  A,
} from '../../blog-components';

const cover = '/assets/covers/context-lifecycle.svg';
const codexSystemCard = 'https://cdn.openai.com/pdf/2a7d98b1-57e5-4147-8d0e-683894d782ae/5p1_codex_max_card_03.pdf';
const promptCachingGuide = 'https://developers.openai.com/api/docs/guides/prompt-caching';

const ContextLifecycle = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('长任务里的 Agent 不是用完文本窗口才失败，而是丢掉了可继续执行的状态。好的上下文压缩，不应该只是写一段漂亮摘要，而应该像一次运行时检查点。')}
      </Lead>

      <Callout type="info" title={label('核心判断')}>
        <P>
          {label('摘要帮助人记住发生过什么；compact checkpoint 让 Agent 安全继续正在做的事。')}
        </P>
      </Callout>

      <H2>{label('长任务缺的不是文本，是可靠执行状态')}</H2>
      <P>
        {label('很多人第一次理解上下文压缩，会把它想成“聊天记录太长了，压成一段总结”。这个理解只对了一半。对人来说，summary 的目标是恢复叙事；对 Agent 来说，compact 的目标应该是恢复执行。')}
      </P>
      <P>
        {label('执行状态包含的东西比故事多：目标、约束、已经做过的决策、未解决问题、文件和任务锚点、工具边界、证据来源、风险，以及哪些动作必须等人确认。少掉任何一类，后面的 Agent 都可能看起来还在工作，其实已经偏离控制面。')}
      </P>

      <H2>{label('为什么普通 summary 会失败')}</H2>
      <P>
        {label('想象一个真实 bugfix：中间有二十次工具调用、三次测试失败、两个分支、一次用户纠偏、几条 PR review comment，还有日志和截图。如果最后只剩一段自然语言摘要，那么所有没有写进摘要的低层事实，都等于从后续运行里消失。')}
      </P>
      <P>
        {label('更麻烦的是，本地 summary 往往发生在 context pressure 已经很高的时候。Agent 要在上下文快满、注意力已经紧张的状态下，自己判断哪些执行状态可以丢。它最容易丢的不是背景知识，而是 provenance、open loops、role constraints、tool/session state 和 scaffolding 线索。')}
      </P>
      <P>
        {label('这种失败通常不像幻觉，反而更像“谨慎但失忆”：它不敢乱说，于是开始重复确认、绕开细节、保守推进。真正丢掉的是能继续完成任务的控制点。')}
      </P>

      <H2>{label('Compact 应该是 checkpoint')}</H2>
      <P>
        {label('更好的理解是：compact 是一次 runtime state transition。它把当前执行状态抽取出来，保留不变量，再给下一段上下文一个 rehydration plan。也就是：extract checkpoint → rebuild scaffolding → resume in fresh context。')}
      </P>
      <P>
        {label('公开证据已经指向这个方向。OpenAI 的 GPT-5.1-Codex-Max system card 说，这个模型被训练为通过 compaction 跨多个 context windows 工作；同一份文档也提到，要发挥这种能力，需要配套 scaffolding。')}
        {' '}
        <A href={codexSystemCard}>{label('查看 system card')}</A>
      </P>
      <Callout type="note" title={label('证据边界')}>
        <P>
          {label('这里不要把闭源实现写成确定事实。公开能说的是：长任务能力不只是模型权重，也来自 product/runtime 对 compact、scaffold、工具和恢复流程的管理。至于某个 Remote Compact 内部到底如何保存状态，应该标成推断，而不是当作证据。')}
        </P>
      </Callout>

      <H2>{label('Scaffold 是恢复的一部分')}</H2>
      <P>
        {label('压缩后还能继续工作，很大一部分来自规则和工具环境的重建。仓库规则、系统约束、权限策略、skills、apps、plugins、当前目录、workspace、channel/task 规则，都不应该靠 summary 背下来。它们应该由 runtime deterministic 地重新注入。')}
      </P>
      <P>
        {label('这样 summary 只需要承担 task state：目标是什么，下一步是什么，哪里有证据，哪里有风险。规则和工具边界由 scaffold 恢复，证据由资源回读，摘要才不会变成一个什么都要记的脆弱容器。')}
      </P>

      <H2>{label('Prompt cache 只是旁证，不是主线')}</H2>
      <P>
        {label('Prompt caching 的意义不是“省 token”这个表层结论，而是它提示我们：上下文已经是运行时资源。OpenAI 的 prompt caching 文档明确要求稳定内容放在 prompt 前面、动态内容放在后面；messages、images、tools 和 structured output schema 都可能参与缓存。')}
        {' '}
        <A href={promptCachingGuide}>{label('查看 prompt caching docs')}</A>
      </P>
      <P>
        {label('这支持一个架构判断：stable scaffold 和 dynamic task state 应该分层。稳定前缀越稳定，缓存和恢复都越容易；变化的任务状态则应该用 checkpoint、resource pointer 和 resume contract 管理，而不是随手改写历史中段。')}
      </P>

      <H2>{label('OpenViking 的上层抽象是 lifecycle control')}</H2>
      <P>
        {label('Memory database 是必要底座，但不是最高抽象。长期事实要存，用户偏好要存，项目约束也要存；但长任务 Agent 更需要的是对 working context 的生命周期控制：什么时候保存状态，哪些证据必须可回读，哪些规则必须重建，什么时候恢复无效。')}
      </P>
      <Table
        headers={[label('层'), label('负责什么'), label('不要混成什么')]}
        rows={[
          [label('stable memory'), label('用户偏好、项目约束、长期事实'), label('完整工具日志')],
          [label('session archive'), label('原始消息、工具调用、测试输出、附件和 PR 链接'), label('每次都塞进模型窗口')],
          [label('compact checkpoint'), label('目标、约束、决策、open loops、风险和下一步'), label('漂亮但不可执行的摘要')],
          [label('deterministic scaffold'), label('规则、权限、工具、skills、workspace 和 channel/task 边界'), label('靠模型记忆的隐性上下文')],
          [label('evidence resources'), label('大输出、截图、日志、报告、可回读 URI'), label('summary 里的长段复制')],
          [label('resume contract'), label('新 Agent 先读什么、如何确认状态、何时人审'), label('启动后自由猜测')],
        ]}
      />
      <P>
        {label('这个分层能把 Agent 从“凭摘要猜”变成“按 checkpoint 恢复”：摘要告诉它去哪继续，证据和规则都能重新拿，恢复失败也能被定位。')}
      </P>

      <H2>{label('工程接口应该先定义边界')}</H2>
      <P>
        {label('如果把 OpenViking 做成 context lifecycle layer，第一批接口不一定复杂，但边界要明确。')}
      </P>
      <Ul marker="check">
        <Li>{label('append-only session archive：原始历史和工具证据可以回读，不能只剩摘要。')}</Li>
        <Li>{label('checkpoint writer：压缩时写出结构化任务状态，而不是泛泛总结。')}</Li>
        <Li>{label('resource URI：大日志、截图、报告、数据文件外置，checkpoint 里只引用 URI。')}</Li>
        <Li>{label('scaffold manifest：声明恢复时必须重新注入哪些规则、工具、权限和 workspace 上下文。')}</Li>
        <Li>{label('rehydration plan：新 Agent 先读哪些资源、如何确认状态、什么时候需要人审。')}</Li>
        <Li>{label('invalidation/debug surface：能看出是 checkpoint 丢了、证据缺了、权限错了，还是 scaffold 没装上。')}</Li>
      </Ul>

      <H2>{label('什么必须穿过 compaction')}</H2>
      <P>
        {label('判断一个 Agent 系统是不是只做了“摘要”，可以问这些 survivability criteria。')}
      </P>
      <Ul>
        <Li>{label('目标和成功标准能不能穿过去：新 Agent 是否知道这件事到底要完成什么？')}</Li>
        <Li>{label('约束和角色边界能不能穿过去：哪些仓库、权限、merge/deploy 边界不能越？')}</Li>
        <Li>{label('open loops 能不能穿过去：哪些问题未解决、哪些反馈未处理、哪些测试还没跑？')}</Li>
        <Li>{label('证据锚点能不能穿过去：文件、PR、任务、日志、截图、附件和原始工具输出有没有稳定 URI 或路径？')}</Li>
        <Li>{label('工具/session 状态能不能穿过去：哪些工具已经用过、当前 session 处于什么状态、哪些凭证或环境不可假设？')}</Li>
        <Li>{label('风险和下一步能不能穿过去：下一步做什么、失败时怎么回滚、什么时候必须请人确认？')}</Li>
        <Li>{label('失败时能不能定位：是 checkpoint 丢了、证据缺了、权限错了，还是 scaffold 没装上？')}</Li>
      </Ul>

      <H2>{label('产品上的一句话')}</H2>
      <P>
        {label('未来 Agent 的差距不会只来自模型本身，而会来自模型加 harness。Remote Compact、native tools、prompt cache、工具协议、训练数据飞轮，都会让第一方 Agent 变强。第三方 Agent 要追的不是“接上同一个模型 API”，而是把 context lifecycle 做扎实。')}
      </P>
      <P>
        <Strong>{label('Memory 让 Agent 记得你是谁；context lifecycle 让 Agent 记得自己正在做什么，并且能证明为什么应该这样继续。')}</Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'context-lifecycle',
  Component: ContextLifecycle,
  meta: {
    title: { zh: '上下文压缩不是总结，是运行时检查点' },
    description: { zh: '长任务 Agent 的真正差距，不是摘要更漂亮，而是 compact、scaffold、证据和恢复流程被当成运行时状态管理。' },
    cover,
    publishedAt: '2026-05-30',
    readingTime: { zh: 8 },
    category: { zh: 'Agent 工程' },
    tags: ['agents', 'context', 'openviking', 'codex'],
    languages: ['zh'],
    llmPath: '/post/context-lifecycle/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
