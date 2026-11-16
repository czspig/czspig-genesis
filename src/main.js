import './style.css';
import LAYOUT from './ceiling-layout.json';
import { PANELS } from './data.js';
import { createRenderer } from './gl.js';
import { createUI } from './ui.js';
import { createMusic } from './audio.js';

// ---------- 时间轴 ----------
// 参观顺序：入口（第 9 格）→ 祭坛（第 1 格）。时间单位：滚动一屏左右为 1。
const ORDER = [...PANELS].reverse();
const INTRO = 1.2, SEG = 3, OUTRO = 2.6;
const T = INTRO + ORDER.length * SEG + OUTRO;
const segStart = (i) => INTRO + i * SEG;
const BY_KEY = Object.fromEntries(PANELS.map((p) => [p.key, p]));
const [CW, CH] = LAYOUT.ceiling;

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x) => { x = clamp(x); return x * x * x * (x * (x * 6 - 15) + 10); };
const lerp = (a, b, k) => a + (b - a) * k;
const progressOf = (i, t) => clamp((t - (segStart(i) + 0.9)) / 1.3);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.getElementById('gl');
const R = createRenderer(canvas);
const ui = createUI({ panels: PANELS, onJump: jumpTo });

if (!R) {
  ui.fatal();
  throw new Error('WebGL2 not available');
}

let manifest = { orig: {}, ai: {}, water: false, music: null };
const music = createMusic();
ui.onMusic(() => ui.setMusic(music.toggle(manifest.music)));

// ---------- 版面：画格放在哪块区域、相机怎么摆 ----------
function layoutFor(view) {
  const wide = view.w >= 900 && view.w / view.h > 1.1;
  const top = 64;
  const area = wide
    ? { x: 24, y: top, w: view.w - 24 - 420, h: view.h - top - 28 }
    : { x: 12, y: top, w: view.w - 24, h: view.h * 0.56 - top };
  return { wide, area };
}

function focusCam(key, view) {
  const { rect } = LAYOUT.panels[key];
  const { area } = layoutFor(view);
  // 画格转 90 度后：矩形的高变成屏幕上的宽
  const scale = 0.92 * Math.min(area.w / rect[3], area.h / (rect[2] * (1 + 2 * extOf(key))));
  return {
    x: rect[0] + rect[2] / 2, y: rect[1] + rect[3] / 2, scale, angle: Math.PI / 2,
    ox: area.x + area.w / 2 - view.w / 2, oy: area.y + area.h / 2 - view.h / 2,
  };
}

function introCam(view) {
  const scale = (view.w / CH) * 1.05;
  return { x: view.h / 2 / scale + 60, y: CH / 2, scale, angle: Math.PI / 2, ox: 0, oy: 0 };
}

function outroCam(view) {
  const { wide } = layoutFor(view);
  if (wide) {
    const scale = 0.94 * Math.min(view.w / CW, (view.h * 0.78) / CH);
    return { x: CW / 2, y: CH / 2, scale, angle: 0, ox: 0, oy: -view.h * 0.08 };
  }
  const scale = 0.94 * Math.min(view.w / CH, (view.h * 0.74) / CW);
  return { x: CW / 2, y: CH / 2, scale, angle: Math.PI / 2, ox: 0, oy: -view.h * 0.1 };
}

function keyframes(view) {
  const k = [{ t: 0, c: introCam(view) }, { t: INTRO * 0.5, c: introCam(view) }];
  ORDER.forEach((p, i) => {
    const c = focusCam(p.key, view);
    k.push({ t: segStart(i) + 0.6, c }, { t: segStart(i) + SEG - 0.35, c });
  });
  k.push({ t: T - 1.2, c: outroCam(view) }, { t: T, c: outroCam(view) });
  return k;
}

function camAt(t, view) {
  const k = keyframes(view);
  if (t <= k[0].t) return k[0].c;
  for (let i = 1; i < k.length; i++) {
    if (t <= k[i].t) {
      const a = k[i - 1], b = k[i];
      const e = ease((t - a.t) / (b.t - a.t || 1));
      return {
        x: lerp(a.c.x, b.c.x, e), y: lerp(a.c.y, b.c.y, e),
        scale: Math.exp(lerp(Math.log(a.c.scale), Math.log(b.c.scale), e)),
        angle: lerp(a.c.angle, b.c.angle, e),
        ox: lerp(a.c.ox, b.c.ox, e), oy: lerp(a.c.oy, b.c.oy, e),
      };
    }
  }
  return k[k.length - 1].c;
}

// ---------- 坐标换算：屏幕 ↔ 拉正后原作的 0–1 坐标 ----------
function screenToStd(key, sx, sy, cam, view) {
  const { rect } = LAYOUT.panels[key];
  let dx = sx - view.w / 2 - cam.ox, dy = sy - view.h / 2 - cam.oy;
  const c = Math.cos(-cam.angle), s = Math.sin(-cam.angle);
  const wx = (c * dx - s * dy) / cam.scale + cam.x, wy = (s * dx + c * dy) / cam.scale + cam.y;
  const u = (wx - rect[0]) / rect[2], v = (wy - rect[1]) / rect[3];
  return [1 - v, u];
}

function stdToScreen(key, su, sv, cam, view) {
  const { rect } = LAYOUT.panels[key];
  const wx = rect[0] + sv * rect[2], wy = rect[1] + (1 - su) * rect[3];
  const dx = (wx - cam.x) * cam.scale, dy = (wy - cam.y) * cam.scale;
  const c = Math.cos(cam.angle), s = Math.sin(cam.angle);
  return [c * dx - s * dy + view.w / 2 + cam.ox, s * dx + c * dy + view.h / 2 + cam.oy];
}

// 原作 1 像素在屏幕上多大
const pxScale = (key, cam) => cam.scale * LAYOUT.panels[key].rect[3] / (manifest.orig[key]?.[0] || 1000);

// ---------- 贴图加载 ----------
async function bitmap(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url);
  return createImageBitmap(await res.blob());
}

const hiLoaded = new Map(); // key -> 'loading' | 'done'

// AI 图（3:2）比扁长的画格高：不裁，画格上下各伸出这么多（原作坐标）
function extOf(key) {
  const ai = manifest.ai[key], px = manifest.orig[key];
  return ai && px ? Math.max(0, (1 / coverK(px, ai.size)[1] - 1) / 2) : 0;
}

// data.js 里 ai: {...} 的坐标是在 AI 图上量的，换算成原作坐标
function aiToStd(key, [u, v]) {
  const ai = manifest.ai[key];
  if (!ai) return [u, v];
  const k = coverK(manifest.orig[key], ai.size);
  return [(u - 0.5) / k[0] + 0.5, (v - 0.5) / k[1] + 0.5];
}
function fingerOf() {
  const p = BY_KEY['04'];
  if (!manifest.ai['04'] || !p.ai?.finger) return p.finger;
  return { from: aiToStd('04', p.ai.finger.from), to: aiToStd('04', p.ai.finger.to) };
}

async function loadThumbs() {
  for (const p of PANELS) {
    const pn = R.addPanel(p.key, LAYOUT.panels[p.key].rect, LAYOUT.panels[p.key].rot, extOf(p.key));
    bitmap(`art/orig/${p.key}-s.webp`).then((b) => { if (pn.orig === R.blank) pn.orig = R.texture(b); });
    if (manifest.ai[p.key]) {
      bitmap(`art/ai/${p.key}-s.webp`).then((b) => { if (pn.ai === R.blank) pn.ai = R.texture(b); });
    }
  }
  if (manifest.water) {
    bitmap('art/ai/08-water.webp').then((b) => { R.panel('08').water = R.texture(b, true); });
  }
}

function wantHiRes(keys) {
  for (const key of keys) {
    if (hiLoaded.has(key)) continue;
    hiLoaded.set(key, 'loading');
    const pn = R.panel(key);
    const jobs = [bitmap(`art/orig/${key}.webp`)];
    if (manifest.ai[key]) jobs.push(bitmap(`art/ai/${key}.webp`));
    Promise.all(jobs).then(([o, a]) => {
      R.free(pn.orig); pn.orig = R.texture(o);
      if (a) { R.free(pn.ai); pn.ai = R.texture(a); }
      hiLoaded.set(key, 'done');
    }).catch(() => hiLoaded.delete(key));
  }
}

// ---------- 滚动 ----------
const spacer = document.getElementById('scroll');
let unit = 1, tTarget = 0, tShown = 0;
function sizeScroll() {
  unit = window.innerHeight * 0.9;
  spacer.style.height = `${T * unit + window.innerHeight}px`;
}
window.addEventListener('resize', sizeScroll);
window.addEventListener('scroll', () => { tTarget = clamp(window.scrollY / unit, 0, T); }, { passive: true });

function jumpTo(target) {
  // target: 画格 key，'top' 或 'end'
  let t = 0;
  if (target === 'end') t = T;
  else if (target !== 'top') t = segStart(ORDER.findIndex((p) => p.key === target)) + SEG * 0.72;
  window.scrollTo({ top: t * unit, behavior: 'instant' });
  tTarget = tShown = t;
}

// ---------- 指针：按住看原作 / 放大镜 / 拖手指 ----------
const pointer = { x: 0, y: 0, inside: false, down: false, holdTimer: 0, hold: 0, holdTarget: 0, start: null };
const finger = { active: false, k: 0, target: 0 };
let current = null, cam = null, view = { w: 1, h: 1 };

canvas.addEventListener('pointermove', (e) => {
  pointer.x = e.clientX; pointer.y = e.clientY; pointer.inside = true;
  if (pointer.start && Math.hypot(e.clientX - pointer.start[0], e.clientY - pointer.start[1]) > 10 && !finger.active) {
    clearTimeout(pointer.holdTimer);
    pointer.holdTarget = 0;
  }
  if (finger.active) updateFinger();
});
canvas.addEventListener('pointerleave', () => { pointer.inside = false; });
canvas.addEventListener('pointerdown', (e) => {
  pointer.x = e.clientX; pointer.y = e.clientY; pointer.down = true; pointer.start = [e.clientX, e.clientY];
  if (current?.key === '04' && currentP() > 0.95 && nearFinger(e.clientX, e.clientY)) {
    finger.active = true;
    canvas.setPointerCapture(e.pointerId);
    updateFinger();
    return;
  }
  if (current?.lens && currentP() > 0.95) return;
  clearTimeout(pointer.holdTimer);
  pointer.holdTimer = setTimeout(() => { pointer.holdTarget = 1; }, 160);
});
const release = () => {
  pointer.down = false; pointer.start = null;
  clearTimeout(pointer.holdTimer);
  pointer.holdTarget = 0;
  finger.active = false; finger.target = 0;
};
canvas.addEventListener('pointerup', release);
canvas.addEventListener('pointercancel', release);
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

const currentP = () => (current ? progressOf(ORDER.indexOf(current), tShown) : 0);

function nearFinger(x, y) {
  const f = fingerOf().from;
  const [fx, fy] = stdToScreen('04', f[0], f[1], cam, view);
  return Math.hypot(x - fx, y - fy) < Math.max(44, view.w * 0.04);
}

function updateFinger() {
  const { from, to } = fingerOf();
  const a = stdToScreen('04', from[0], from[1], cam, view), b = stdToScreen('04', to[0], to[1], cam, view);
  const dx = b[0] - a[0], dy = b[1] - a[1], len2 = dx * dx + dy * dy;
  const k = ((pointer.x - a[0]) * dx + (pointer.y - a[1]) * dy) / len2;
  finger.target = clamp(k, 0, 0.86); // 永远差一点
}

// ---------- 每帧 ----------
let last = performance.now();
function frame(now) {
  const dt = clamp((now - last) / 1000, 0, 0.05);
  last = now;
  if (!Number.isFinite(tTarget)) tTarget = 0;
  if (!Number.isFinite(tShown)) tShown = tTarget;
  view = R.resize();

  tShown += (tTarget - tShown) * Math.min(1, dt * (reduceMotion ? 20 : 5));
  if (Math.abs(tTarget - tShown) < 1e-4) tShown = tTarget;
  const t = tShown;
  cam = camAt(t, view);

  const idx = clamp(Math.floor((t - INTRO) / SEG), 0, ORDER.length - 1);
  const inPanels = t >= INTRO - 0.4 && t < T - OUTRO + 0.4;
  current = inPanels ? ORDER[idx] : null;

  const near = current ? [current.key, ORDER[idx + 1]?.key, ORDER[idx - 1]?.key].filter(Boolean) : t < INTRO ? ['09'] : [];
  wantHiRes(near);

  pointer.hold += (pointer.holdTarget - pointer.hold) * Math.min(1, dt * 10);
  finger.k += ((finger.active ? finger.target : 0) - finger.k) * Math.min(1, dt * (finger.active ? 18 : 6));

  // 天顶和非当前画格压暗：开场半暗，走进画格时更暗，结尾全亮
  const outroK = ease((t - (T - OUTRO)) / 1.4);
  const ceilDim = lerp(lerp(0.45, 0.78, ease(t / INTRO)), 0, outroK);

  const states = {};
  ORDER.forEach((p, i) => {
    const px = manifest.orig[p.key] || [1000, 1000];
    const ai = manifest.ai[p.key];
    const aiK = ai ? coverK(px, ai.size) : [1, 1];
    const e = extOf(p.key), useAi = ai && p.ai;
    const origin = useAi?.origin ? aiToStd(p.key, p.ai.origin) : p.origin || [0.5, 1];
    const glow = useAi?.glow ? [...aiToStd(p.key, p.ai.glow), p.ai.glow[2], p.ai.glow[3]] : p.glow;
    const maxD = Math.max(...[[0, -e], [1, -e], [0, 1 + e], [1, 1 + e]].map(([x, y]) => Math.hypot((x - origin[0]) * px[0], (y - origin[1]) * px[1])));
    const isCur = current === p;
    const st = {
      p: outroK > 0 ? Math.max(progressOf(i, t), outroK) : progressOf(i, t),
      hold: isCur ? pointer.hold : 0,
      hasAi: !!ai, water8: p.key === '08' && !ai && manifest.water,
      aiK, origin, mode: p.mode, maxD, px,
      dim: isCur ? 0 : lerp(0.62, 0, outroK) * (current ? 1 : 0.4),
      glow: glow ? [...glow] : null,
    };
    if (isCur && p.lens && progressOf(i, t) > 0.95 && pointer.inside && !reduceMotion) {
      const [u, v] = screenToStd(p.key, pointer.x, pointer.y, cam, view);
      if (u > 0 && u < 1 && v > -e && v < 1 + e) {
        const ps = pxScale(p.key, cam);
        const r = Math.min(view.w, view.h) * 0.13;
        st.lens = [u, v, r / ps, 2.8];
        st.ring = 1.5 / ps;
      }
    }
    states[p.key] = st;
  });

  R.draw(cam, view, now / 1000, reduceMotion, ceilDim, states);

  // 界面
  const p = currentP();
  ui.update({
    t, T, intro: 1 - ease((t - 0.15) / (INTRO * 0.7)), outro: ease((t - (T - 1.3)) / 1.0),
    current, phase: p > 0.6 ? 'meaning' : 'about', p,
    pending: current && !manifest.ai[current.key] && !(current.key === '08' && manifest.water),
    cardVisible: current && t > segStart(idx) + 0.35 && t < segStart(idx) + SEG - 0.15,
    wide: layoutFor(view).wide,
  });
  if (current?.key === '04' && p > 0.95) {
    const { from, to } = fingerOf();
    const a = stdToScreen('04', from[0], from[1], cam, view), b = stdToScreen('04', to[0], to[1], cam, view);
    ui.thread(a, [lerp(a[0], b[0], finger.k), lerp(a[1], b[1], finger.k)], finger.k > 0.01);
  } else ui.thread(null);

  requestAnimationFrame(frame);
}

function coverK(panel, ai) {
  const pa = panel[0] / panel[1], aa = ai[0] / ai[1];
  return aa > pa ? [pa / aa, 1] : [1, aa / pa];
}

// ---------- 启动 ----------
async function start() {
  sizeScroll();
  try {
    manifest = await (await fetch('art/manifest.json', { cache: 'no-cache' })).json();
  } catch { /* 没有清单就全部当作待绘 */ }
  bitmap('art/ceiling.webp').then((b) => { R.setCeiling(LAYOUT.ceiling, R.texture(b)); ui.ready(); });
  loadThumbs();
  ui.setThumbs(Object.fromEntries(PANELS.map((p) => [p.key, `art/${manifest.ai[p.key] ? 'ai' : 'orig'}/${p.key}-s.webp`])));
  tTarget = tShown = clamp(window.scrollY / unit, 0, T);
  requestAnimationFrame(frame);
}
start();

// 调试用：在控制台里 __genesis.jump('04')
window.__genesis = { jump: jumpTo, get t() { return tShown; }, T };
