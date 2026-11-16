// 背景音乐：有 public/audio/music.* 就循环播放它；没有就用 Web Audio 合成一段低沉、缓慢的持续和声。
// 默认静音，观众点了才响。

export function createMusic() {
  let on = false;
  let audio = null;
  let ctx = null, master = null, chordTimer = 0;

  // D 多利亚调式的四个和弦，慢慢轮换（每个音是 Hz）
  const CHORDS = [
    [73.42, 110.0, 146.83, 174.61, 220.0, 293.66], // Dm
    [58.27, 116.54, 146.83, 174.61, 233.08, 293.66], // B♭
    [87.31, 130.81, 174.61, 220.0, 261.63, 349.23], // F
    [65.41, 98.0, 130.81, 164.81, 196.0, 261.63], // C
  ];
  let voices = [], chordIndex = 0;

  function startSynth() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1100; lp.Q.value = 0.4;
      // 简单的回声，营造礼拜堂的空间感
      const delay = ctx.createDelay(2); delay.delayTime.value = 0.43;
      const fb = ctx.createGain(); fb.gain.value = 0.42;
      const wet = ctx.createGain(); wet.gain.value = 0.5;
      lp.connect(master); lp.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      master.connect(ctx.destination);
      voices = CHORDS[0].map((f, i) => {
        const o = ctx.createOscillator();
        o.type = i < 2 ? 'sine' : 'triangle';
        o.frequency.value = f;
        o.detune.value = (i % 2 ? 1 : -1) * (3 + i);
        const g = ctx.createGain();
        g.gain.value = i < 2 ? 0.16 : 0.07;
        // 每个声部缓慢起伏，像唱诗班在换气
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05 + i * 0.013;
        const lg = ctx.createGain(); lg.gain.value = i < 2 ? 0.05 : 0.035;
        lfo.connect(lg); lg.connect(g.gain); lfo.start();
        o.connect(g); g.connect(lp); o.start();
        return o;
      });
    }
    ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.32, ctx.currentTime, 1.5);
    clearInterval(chordTimer);
    chordTimer = setInterval(() => {
      chordIndex = (chordIndex + 1) % CHORDS.length;
      CHORDS[chordIndex].forEach((f, i) => voices[i].frequency.setTargetAtTime(f, ctx.currentTime, 2.5));
    }, 14000);
  }

  function stopSynth() {
    if (!ctx) return;
    clearInterval(chordTimer);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
    setTimeout(() => { if (!on) ctx.suspend(); }, 2500);
  }

  function fade(el, to, ms, done) {
    const from = el.volume, t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      el.volume = from + (to - from) * k;
      if (k < 1) requestAnimationFrame(step); else if (done) done();
    };
    requestAnimationFrame(step);
  }

  return {
    toggle(url) {
      on = !on;
      if (url) {
        if (!audio) { audio = new Audio(url); audio.loop = true; audio.volume = 0; }
        if (on) { audio.play().catch(() => {}); fade(audio, 0.6, 1500); }
        else fade(audio, 0, 800, () => audio.pause());
      } else if (on) startSynth();
      else stopSynth();
      return on;
    },
  };
}
