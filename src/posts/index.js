import { registerPost } from '../blog-components.jsx';
import aiCapabilityNotes from './ai-capability-notes/index.jsx';
import contextLifecycle from './context-lifecycle/index.jsx';
import makeAGoal from './make-a-goal/index.jsx';
import runtimeStateModels from './runtime-state-models/index.jsx';

[
  runtimeStateModels,
  makeAGoal,
  contextLifecycle,
  aiCapabilityNotes,
].forEach(registerPost);
