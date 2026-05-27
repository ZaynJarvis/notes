import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const postPath = path.join(root, 'src/posts/ai-capability-notes/index.jsx');
const rawDir = path.join(root, 'src/posts/ai-capability-notes/assets/practice/raw');
const outDir = path.join(root, 'src/posts/ai-capability-notes/assets/practice');

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function loadScenarios() {
  const source = fs.readFileSync(postPath, 'utf8');
  const rows = new Map();
  const pattern = /scenario\((\d+),\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'[^']*',\s*'[^']*',\s*\[([^\]]+)\]\),/g;
  for (const match of source.matchAll(pattern)) {
    const id = Number(match[1]);
    const title = `${match[3]} → ${match[4]}`;
    const steps = [...match[5].matchAll(/'([^']+)'/g)].map(item => item[1]);
    rows.set(id, { id, title, steps });
  }
  return rows;
}

function stepLayout(steps) {
  const gap = 18;
  const rows = steps.length > 4 ? 2 : 1;
  const cols = Math.ceil(steps.length / rows);
  const width = (1460 - gap * (cols - 1)) / cols;
  return steps.map((step, index) => {
    const row = rows === 2 && index >= cols ? 1 : 0;
    const col = rows === 2 ? index % cols : index;
    return { step, x: 70 + col * (width + gap), y: 748 + row * 70, width, row };
  });
}

function overlaySvg(item) {
  const steps = stepLayout(item.steps);
  const stepMarkup = steps.map(({ step, x, y, width }, index) => `
    <rect x="${x}" y="${y}" width="${width}" height="52" rx="26" fill="rgba(255,255,255,.88)" stroke="rgba(16,24,40,.16)" stroke-width="1.4"/>
    <circle cx="${x + 28}" cy="${y + 26}" r="17" fill="#111827"/>
    <text x="${x + 28}" y="${y + 32}" text-anchor="middle" class="num">${index + 1}</text>
    <text x="${x + 58}" y="${y + 33}" class="step">${escapeXml(step)}</text>
  `).join('');

  return `
  <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="rgba(0,0,0,.42)"/>
        <stop offset=".32" stop-color="rgba(0,0,0,.06)"/>
        <stop offset=".66" stop-color="rgba(0,0,0,.03)"/>
        <stop offset="1" stop-color="rgba(0,0,0,.50)"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity=".20"/>
      </filter>
    </defs>
    <style>
      .eyebrow { font: 500 28px "PingFang SC", "Noto Sans CJK SC", "Heiti SC", sans-serif; fill: rgba(255,255,255,.86); }
      .title { font: 600 64px "PingFang SC", "Noto Sans CJK SC", "Heiti SC", sans-serif; fill: #ffffff; }
      .num { font: 600 18px "Inter", "Arial", sans-serif; fill: #ffffff; }
      .step { font: 600 27px "PingFang SC", "Noto Sans CJK SC", "Heiti SC", sans-serif; fill: #111827; }
    </style>
    <rect width="1600" height="900" fill="url(#shade)"/>
    <g filter="url(#softShadow)">
      <rect x="54" y="54" width="118" height="44" rx="22" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.30)"/>
      <text x="82" y="84" class="eyebrow">马上试</text>
      <text x="54" y="158" class="title">${escapeXml(item.title)}</text>
    </g>
    <g filter="url(#softShadow)">
      ${stepMarkup}
    </g>
  </svg>`;
}

async function renderOne(item) {
  const padded = String(item.id).padStart(2, '0');
  const candidates = ['png', 'jpg', 'jpeg'].map(ext => path.join(rawDir, `${padded}.${ext}`));
  const input = candidates.find(file => fs.existsSync(file));
  if (!input) throw new Error(`Missing raw image for ${padded}`);
  const output = path.join(outDir, `${padded}.jpg`);
  await sharp(input)
    .resize(1600, 900, { fit: 'cover', position: 'attention' })
    .composite([{ input: Buffer.from(overlaySvg(item)), top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
  console.log(output);
}

const scenarios = loadScenarios();
const ids = process.argv.slice(2).map(Number).filter(Boolean);
const targetIds = ids.length ? ids : [...scenarios.keys()];
fs.mkdirSync(outDir, { recursive: true });
for (const id of targetIds) {
  const item = scenarios.get(id);
  if (!item) throw new Error(`Unknown scenario id ${id}`);
  await renderOne(item);
}
