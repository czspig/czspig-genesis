import { UI } from './data.js';

const $ = (s) => document.querySelector(s);
const ORDER_KEYS = ['09', '08', '07', '06', '05', '04', '03', '02', '01'];

export function createUI({ panels, onJump }) {
  const byKey = Object.fromEntries(panels.map((p) => [p.key, p]));
  let lang = 'zh';
  try { lang = localStorage.getItem('genesis-lang') || 'zh'; } catch { /* 隐私模式 */ }
  let musicOn = false, musicCb = null;
  let shown = { key: null, phase: null, lang: null, pending: null };
  let thumbs = {};

  const card = $('#card'), rail = $('#rail'), intro = $('#intro'), ending = $('#ending');
  const toc = $('#toc'), credits = $('#credits');
  const line = $('#thread line'), dot = $('#thread circle');

  // 右侧经文刻度：从入口（创 9:21）往下数到祭坛（创 1:4）
  rail.innerHTML = ORDER_KEYS.map((k) => `<button data-key="${k}"><span></span></button>`).join('');
  rail.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) onJump(b.dataset.key);
  });

  $('#btn-lang').addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('genesis-lang', lang); } catch { /* 忽略 */ }
    applyLang();
  });
  $('#btn-toc').addEventListener('click', () => { renderToc(); toc.showModal(); });
  $('#btn-music').addEventListener('click', () => musicCb && musicCb());
  $('#btn-credits').addEventListener('click', () => credits.showModal());
  $('#btn-top').addEventListener('click', () => onJump('top'));
  for (const d of [toc, credits]) {
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  }
  toc.addEventListener('click', (e) => {
    const b = e.target.closest('[data-key]');
    if (b) { toc.close(); onJump(b.dataset.key); }
  });

  function renderToc() {
    toc.querySelector('.grid').innerHTML = ORDER_KEYS.map((k) => {
      const p = byKey[k];
      return `<button data-key="${k}"><img src="${thumbs[k] || ''}" alt=""><span class="r">${p.ref[lang]}</span><span class="n">${p.title[lang]}</span></button>`;
    }).join('');
  }

  function applyLang() {
    const u = UI[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = lang === 'zh' ? '新创世纪 · Genesis, Retold' : 'Genesis, Retold · 新创世纪';
    $('#brand').textContent = u.title;
    $('#btn-lang').textContent = u.lang;
    $('#btn-toc').textContent = u.toc;
    $('#btn-music').setAttribute('aria-label', u.music);
    $('#btn-music .t').textContent = u.music;
    intro.querySelector('h1').textContent = u.title;
    intro.querySelector('.sub').textContent = u.sub;
    intro.querySelector('.lead').textContent = u.lead;
    intro.querySelector('.hint').textContent = u.scroll;
    ending.querySelector('.line').textContent = u.ending;
    $('#btn-credits').textContent = u.credits;
    $('#btn-top').textContent = u.top;
    toc.querySelector('h3').textContent = u.toc;
    credits.querySelector('h3').textContent = u.credits;
    credits.querySelector('.body').innerHTML = u.creditsBody.map((s) => `<p>${s}</p>`).join('');
    for (const d of document.querySelectorAll('[data-close]')) d.textContent = u.close;
    rail.querySelectorAll('button').forEach((b) => {
      const p = byKey[b.dataset.key];
      b.querySelector('span').textContent = p.ref[lang];
      b.title = p.title[lang];
    });
    shown.lang = null; // 让卡片重画
  }

  function renderCard(cur, phase, pending) {
    const u = UI[lang];
    card.querySelector('.ref').textContent = cur.ref[lang];
    card.querySelector('h2').textContent = cur.title[lang];
    card.querySelector('.verse').textContent = cur.verse[lang];
    card.querySelector('.text > .about .lab').textContent = u.origLabel;
    card.querySelector('.text > .about p').textContent = cur.about[lang];
    card.querySelector('.text > .meaning .lab').textContent = u.nowLabel;
    card.querySelector('.text > .meaning p').textContent = cur.meaning[lang];
    card.querySelector('.badge').textContent = u.pending;
    card.classList.toggle('pending', !!pending);
    const hint = cur.key === '04' ? u.finger : cur.lens ? u.lens : u.hold;
    card.querySelector('.hint').textContent = phase === 'meaning' ? (cur.key === '04' || cur.lens ? `${hint} · ${u.hold}` : hint) : '';
  }

  applyLang();

  return {
    fatal() {
      document.body.classList.add('no-gl');
      intro.querySelector('.hint').textContent = lang === 'zh'
        ? '这个浏览器不支持 WebGL2，请换用新版 Chrome、Edge、Safari 或 Firefox。'
        : 'This browser does not support WebGL2. Please try a recent Chrome, Edge, Safari or Firefox.';
    },
    ready() { document.body.classList.add('ready'); },
    onMusic(cb) { musicCb = cb; },
    setMusic(on) { musicOn = on; $('#btn-music').classList.toggle('on', on); },
    setThumbs(m) { thumbs = m; },

    update(s) {
      intro.style.opacity = s.intro.toFixed(3);
      intro.style.visibility = s.intro > 0.01 ? 'visible' : 'hidden';
      ending.style.opacity = s.outro.toFixed(3);
      ending.style.visibility = s.outro > 0.01 ? 'visible' : 'hidden';
      document.body.classList.toggle('wide', s.wide);

      card.classList.toggle('show', !!s.cardVisible);
      if (s.current) {
        const k = s.current.key;
        if (shown.key !== k || shown.phase !== s.phase || shown.lang !== lang || shown.pending !== s.pending) {
          renderCard(s.current, s.phase, s.pending);
          card.classList.toggle('meaning', s.phase === 'meaning');
          shown = { key: k, phase: s.phase, lang, pending: s.pending };
        }
      }
      rail.classList.toggle('show', !!s.current);
      rail.querySelectorAll('button').forEach((b) => b.classList.toggle('on', s.current?.key === b.dataset.key));
    },

    thread(a, b, visible) {
      const svg = line.ownerSVGElement;
      if (!a || !visible) { svg.style.opacity = 0; return; }
      svg.style.opacity = 1;
      line.setAttribute('x1', a[0]); line.setAttribute('y1', a[1]);
      line.setAttribute('x2', b[0]); line.setAttribute('y2', b[1]);
      dot.setAttribute('cx', b[0]); dot.setAttribute('cy', b[1]);
    },
  };
}
