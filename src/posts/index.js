import { registerPost } from '../blog-components.jsx';
import aiCapabilityNotes from './ai-capability-notes/index.jsx';
import aiAgentHackathonProblems from './ai-agent-hackathon-problems/index.jsx';
import beyondAppendOnlySessions from './beyond-append-only-sessions/index.jsx';
import contextLifecycle from './context-lifecycle/index.jsx';
import huashengSeoGeoReport from './huasheng-seo-geo-report/index.jsx';
import makeAGoal from './make-a-goal/index.jsx';
import runtimeStateModels from './runtime-state-models/index.jsx';
import techInvestmentFramework from './tech-investment-framework/index.jsx';

[
  techInvestmentFramework,
  beyondAppendOnlySessions,
  aiAgentHackathonProblems,
  huashengSeoGeoReport,
  runtimeStateModels,
  makeAGoal,
  contextLifecycle,
  aiCapabilityNotes,
].forEach(registerPost);
