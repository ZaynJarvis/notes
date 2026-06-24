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
  Figure,
} from '../../blog-components';

import channelView from './assets/zouk-channel.png';
import agentConfigView from './assets/zouk-agent-config.png';
import agentSidebarView from './assets/zouk-agent-sidebar.png';

const cover = '/assets/covers/howto-use-zouk.png';

const HowToUseZouk = ({ t }) => {
  const label = (value) => t({ zh: value });

  return (
    <Article>
      <Lead>
        {label('Zouk 的核心不是聊天窗口，也不是单人 agent 控制台，而是多个人和多个 agent 共用的协作 workspace：频道承载任务上下文，人员负责判断和交接，agent 承载执行能力，侧边栏承载运行状态和调试信息。')}
      </Lead>

      <Callout type="info" title={label('一页版')}>
        <P>
          {label('先把 Zouk 当成一个给团队使用、并内置 agent runtime 的 Slack：人在频道里发任务、上传材料、做 review，agent 在同一段上下文里执行；需要配置能力时进 Agents；需要 debug 时打开 agent 侧边栏看 Activity / Memory / Config。')}
        </P>
      </Callout>

      <H2>{label('最小使用路径')}</H2>
      <Ol>
        <Li>{label('进 Home 看 workspace、频道和成员。日常任务直接进对应 channel，例如 usage。')}</Li>
        <Li>{label('在消息框发任务。Enter 发送，Shift+Enter 换行；左侧回形针可以上传文件。')}</Li>
        <Li>{label('需要 agent 工作时，确认左侧 Agents 里有可用 agent；右侧 Live Agents 可以看当前正在干活的 agent。')}</Li>
        <Li>{label('点击 agent 头像或 agent 行，打开右侧边栏看 Activity、Memory、Config。Activity 主要用于 debug。')}</Li>
        <Li>{label('需要更多人协作时，admin 在 People 里加成员；需要新 agent 或机器环境时，进入 agent 设置页，先配 Machine，再 Add agent。推荐 VPS + Codex。')}</Li>
      </Ol>

      <Figure
        src={channelView}
        alt={label('Zouk channel 页面：频道、agent、人员、消息框、上传、活跃 agent')}
        size="lg"
        frame="card"
        caption={label('频道页是默认工作面：左侧切 channel / agent，底部发消息和上传文件，右侧看 live agents。')}
      />

      <H2>{label('1. 频道页：把任务放进正确上下文')}</H2>
      <P>
        {label('频道是 Zouk 的基本协作单元。一个任务应该发到它所属的 channel，而不是私聊某个人或某个 agent。这样多个人和多个 agent 都能共享同一段上下文，后续 review、debug、handoff 才有地方发生。')}
      </P>
      <Table
        headers={[label('区域'), label('用途'), label('注意')]}
        rows={[
          [label('Home'), label('回到 workspace 首页'), label('用于从深层页面回到频道视角。')],
          [label('Channels'), label('切换任务上下文'), label('任务、材料、结论都尽量留在同一频道里。')],
          [label('Message box'), label('发任务或补充材料'), label('Enter 发送，Shift+Enter 换行。')],
          [label('Upload'), label('上传图片、文档、日志等材料'), label('材料要和任务同消息或同线程放在一起，减少 agent 猜测。')],
          [label('People'), label('管理人类协作者'), label('admin 可以加人；同一个 workspace 可以有多个成员一起看任务、补材料、review 结果。')],
          [label('Live Agents'), label('看正在工作的 agent'), label('用于判断当前有没有 agent 在处理任务。')],
        ]}
      />

      <Callout type="note" title={label('多人协作时的判断')}>
        <P>
          {label('Zouk 里的成员不是旁观者。人可以在同一个 channel 里补充材料、纠正 agent、接手 review，也可以把结论留给后来的成员。私聊适合临时沟通；真正要沉淀的任务状态应该回到 channel。')}
        </P>
      </Callout>

      <H3>{label('推荐的任务写法')}</H3>
      <P>
        {label('不要只写“帮我看看”。最小有效格式是：目标、材料、约束、交付物。')}
      </P>
      <Callout type="note" title={label('例子')}>
        <P>
          <Strong>{label('目标：')}</Strong>{label('基于这三张截图做一篇 howto use zouk notes。')}
          <br />
          <Strong>{label('材料：')}</Strong>{label('三张图片必须放进文章。')}
          <br />
          <Strong>{label('约束：')}</Strong>{label('不要写产品宣传，写实际操作。')}
          <br />
          <Strong>{label('交付物：')}</Strong>{label('直接 merge 到 notes。')}
        </P>
      </Callout>

      <H2>{label('2. Agent 设置页：配置谁来做事')}</H2>
      <P>
        {label('左侧机器人图标进入 agent 设置。这里有两层：Machine 是运行环境，Agent 是具体执行者。先有机器，再在机器上加 agent。')}
      </P>

      <Figure
        src={agentConfigView}
        alt={label('Zouk agent 设置页：机器列表、agent 列表、Machine setup、Add agent、identity prompt 和模型设置')}
        size="lg"
        frame="card"
        caption={label('Agent 设置页：先确认机器，再 Add agent；agent identity / description 会进入 prompt 语境。')}
      />

      <Table
        headers={[label('设置项'), label('怎么用'), label('建议')]}
        rows={[
          [label('Machine setup'), label('添加或配置 agent 运行机器'), label('长期运行建议用 VPS；本机适合临时开发。')],
          [label('Add agent'), label('创建新的 agent'), label('通用执行优先选 Codex；需要专门角色时再改 identity。')],
          [label('Display name'), label('agent 在 workspace 里的名字'), label('用角色名，不要用含糊名字。')],
          [label('Description'), label('agent identity / prompt 注入'), label('写清职责边界、输出偏好、不能做什么。')],
          [label('Lifecycle'), label('Persistent 或 Ephemeral'), label('需要保留上下文选 Persistent；一次性任务选 Ephemeral。')],
          [label('Model'), label('选择模型'), label('复杂代码/研究用更强模型；简单任务用轻模型。')],
          [label('OpenViking'), label('agent memory/context 集成'), label('需要长期记忆或 workspace context 时打开。')],
        ]}
      />

      <H2>{label('3. Agent 侧边栏：看它为什么卡住')}</H2>
      <P>
        {label('在频道页点击 agent 头像或 agent 行，可以打开右侧边栏。这个侧边栏不是装饰，它是判断 agent 是否真的在运行、卡在哪里、读到了什么上下文的主要入口。')}
      </P>

      <Figure
        src={agentSidebarView}
        alt={label('Zouk agent 侧边栏：Activity、Memory、Config')}
        size="lg"
        frame="card"
        caption={label('右侧边栏：Activity 看执行轨迹，Memory 看记忆，Config 看设置。')}
      />

      <Table
        headers={[label('Tab'), label('用途'), label('什么时候看')]}
        rows={[
          [label('Activity'), label('查看 agent 的工具调用、thinking、状态变化'), label('debug 用：agent 没反应、卡住、结果不对时先看这里。')],
          [label('Memory'), label('查看 agent 可用记忆 / context'), label('怀疑 agent 没读到背景、记错项目、沿用了旧上下文时看。')],
          [label('Config'), label('查看当前 agent 设置'), label('确认模型、runtime、identity、memory 开关是否符合任务。')],
        ]}
      />

      <H2>{label('4. Reset session：清掉坏上下文')}</H2>
      <P>
        {label('Agent 行旁边有 session / context 指示和 reset 按钮。一个 agent 如果明显沿用旧任务、旧 repo、旧判断，先不要继续补 prompt；可以 reset session，让它重新进入当前任务。')}
      </P>
      <Ul>
        <Li>{label('适合 reset：agent 明显混入旧任务、上下文污染、反复引用过时事实。')}</Li>
        <Li>{label('不适合 reset：任务正在进行中、还需要保留前面推理、只是缺少一个小材料。')}</Li>
        <Li>{label('reset 后要重新给足目标、材料和交付物；不要假设它还知道上一轮细节。')}</Li>
      </Ul>

      <H2>{label('5. Zouk 的默认工作流')}</H2>
      <Table
        headers={[label('阶段'), label('动作'), label('判断标准')]}
        rows={[
          [label('提出任务'), label('在 channel 里发目标 + 材料 + 约束 + 交付物'), label('人和 agent 不问你也能知道要做什么。')],
          [label('Agent 执行'), label('看 Live Agents / Activity'), label('知道谁在做、是否卡住、是否真的调用了工具。')],
          [label('补材料'), label('人类成员同频道继续上传或回复'), label('材料不会散到私聊或别的 channel。')],
          [label('Review'), label('让 agent 给出 diff、验证、未决问题；人来做最终判断'), label('能判断是否可 merge，而不是只看结果好不好看。')],
          [label('Merge / 交付'), label('确认 build / test / deploy 后合入'), label('最终链接或产物在 channel 里可追溯。')],
        ]}
      />

      <H2>{label('常见误用')}</H2>
      <Ul>
        <Li>{label('把 Zouk 当单人 agent 控制台，只关注自己和 agent 的对话，忘了 workspace 里可以有其他成员共同补材料和 review。')}</Li>
        <Li>{label('把 Zouk 当普通群聊，只在频道里喊一句需求，但不放材料和交付标准。')}</Li>
        <Li>{label('Agent 卡住时继续发“快点”，而不是打开 Activity 看它卡在哪一步。')}</Li>
        <Li>{label('给所有 agent 同一个含糊 identity，导致职责边界不清。')}</Li>
        <Li>{label('长期任务不用 Persistent，结果上下文每次断；一次性任务又开 Persistent，结果污染后续。')}</Li>
        <Li>{label('不区分 Machine 和 Agent：机器是运行环境，agent 是执行角色。')}
        </Li>
      </Ul>

      <H2>{label('最短压缩')}</H2>
      <P>
        <Strong>{label('Zouk 的正确用法：让多人和多个 agent 在 channel 里共享任务上下文，在 agent 设置里定义执行者，在侧边栏里观察 runtime。')}</Strong>
      </P>
    </Article>
  );
};

export default {
  id: 'howto-use-zouk',
  Component: HowToUseZouk,
  meta: {
    title: { zh: 'How to use Zouk' },
    description: { zh: '基于 Zouk 三张界面标注图整理的最小使用手册：多人 workspace、频道、消息、上传、agent 设置、Activity / Memory / Config 和 reset session。' },
    cover,
    publishedAt: '2026-06-19',
    readingTime: { zh: 6 },
    category: { zh: 'Zayn OS' },
    tags: ['zouk', 'agents', 'howto', 'workspace'],
    languages: ['zh'],
    llmPath: '/post/howto-use-zouk/llm.txt',
    authors: [
      {
        name: 'ZaynJarvis',
        github: 'ZaynJarvis',
        role: { zh: '作者' },
      },
    ],
  },
};
