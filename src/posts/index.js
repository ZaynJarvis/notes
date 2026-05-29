import { registerPost } from '../blog-components.jsx';
import aiCapabilityNotes from './ai-capability-notes/index.jsx';
import contextLifecycle from './context-lifecycle/index.jsx';

[
  contextLifecycle,
  aiCapabilityNotes,
].forEach(registerPost);
