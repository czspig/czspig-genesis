// WebGL2 渲染：一张天顶全景 + 九个画格。画格在全景上按 ceiling-layout.json 的矩形摆放，
// 每格同时有原作和 AI 版两张贴图，用去噪转场在两者之间切换。

const VERT = `#version 300 es
in vec2 aPos;          // 世界坐标（全景像素）
in vec2 aUV;           // 矩形内 0–1
uniform vec2 uCam;     // 相机中心（世界）
uniform float uScale;  // 屏幕像素 / 世界像素
uniform float uAngle;  // 弧度
uniform vec2 uView;    // 画布 CSS 像素
uniform vec2 uOffset;  // 画面中心相对画布中心的偏移
out vec2 vUV;
out vec2 vWorld;
void main() {
  vec2 d = (aPos - uCam) * uScale;
  float c = cos(uAngle), s = sin(uAngle);
  vec2 p = vec2(c * d.x - s * d.y, s * d.x + c * d.y) + uView * 0.5 + uOffset;
  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);
  vUV = aUV;
  vWorld = aPos;
}`;

const CEIL_FRAG = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uTex;
uniform float uDim;
out vec4 o;
void main() {
  vec3 c = texture(uTex, vUV).rgb;
  o = vec4(mix(c, c * 0.28, uDim), 1.0);
}`;

const PANEL_FRAG = `#version 300 es
precision highp float;
in vec2 vUV;
in vec2 vWorld;
uniform sampler2D uOrig, uAi, uWater, uCeil;
uniform float uP, uHold, uTime, uHasAi, uWater8, uRM, uMaxD, uDim, uRot;
uniform float uExt;      // AI 图比画格高时，画格上下各伸出原画格高度的多少（原作坐标）
uniform vec2 uCeilSize;
uniform float uCeilDim;
uniform int uMode;
uniform vec2 uOrigin, uPx, uAiK;
uniform vec4 uGlow;   // x, y, 半径(原作像素), 强度
uniform vec4 uLens;   // x, y, 半径(原作像素), 放大倍数(0 = 关)
uniform float uRing;  // 放大镜描边宽度(原作像素)
out vec4 o;

const vec3 COLD = vec3(0.866, 0.965, 1.0);

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

vec3 water(vec2 s, vec3 base) {
  float l = dot(base, vec3(0.299, 0.587, 0.114));
  float sat = max(max(base.r, base.g), base.b) - min(min(base.r, base.g), base.b);
  float m = smoothstep(0.5, 0.62, l) * (1.0 - smoothstep(0.12, 0.22, sat))
          * step(base.r, base.b + 0.05) * smoothstep(0.32, 0.42, s.y);
  vec3 w = texture(uWater, s * uPx / 520.0).rgb;
  w *= l / max(dot(w, vec3(0.299, 0.587, 0.114)), 0.05);
  return mix(base, w, m * 0.85);
}

void main() {
  // 矩形内坐标 → 拉正后原作的坐标（全景上画格都转了 90 度）
  vec2 s = uRot > 0.5 ? vec2(1.0 - vUV.y, vUV.x) : vUV;

  float ring = 0.0;
  if (uLens.w > 0.0) {
    float r = length((s - uLens.xy) * uPx);
    if (r < uLens.z) s = uLens.xy + (s - uLens.xy) / uLens.w;
    ring = 1.0 - smoothstep(0.0, uRing, abs(r - uLens.z));
  }

  // 伸出画格的部分，“原作”就是天顶本身
  bool inside = s.y >= 0.0 && s.y <= 1.0;
  vec3 orig = inside ? texture(uOrig, s).rgb : texture(uCeil, vWorld / uCeilSize).rgb;
  vec3 ai = orig;
  if (uHasAi > 0.5) ai = texture(uAi, (s - 0.5) * uAiK + 0.5).rgb;
  else if (uWater8 > 0.5) ai = water(s, orig);

  float d = uMode == 1 ? (1.0 + uExt - s.y) / (1.0 + 2.0 * uExt) : length((s - uOrigin) * uPx) / uMaxD;
  float w = 0.32;
  float f = clamp((uP * (1.0 + w) - d) / w, 0.0, 1.0);
  float amt = sin(f * 3.14159) * (1.0 - uRM);

  float shown = smoothstep(0.42, 0.58, uRM > 0.5 ? uP : f);
  vec3 col = mix(orig, ai, shown);

  // 扩散式噪声：越接近转场中段，噪点越粗、越多
  float cs = mix(1.0, 7.0, amt);
  vec2 cell = floor(gl_FragCoord.xy / cs);
  float t = floor(uTime * 14.0);
  vec3 n = vec3(h21(cell + t), h21(cell + t + 17.1), h21(cell + t + 31.7));
  n = mix(vec3(dot(n, vec3(0.333))), n, 0.55);
  col = mix(col, n, amt * 0.94);

  if (uGlow.w > 0.0) {
    float g = exp(-pow(length((s - uGlow.xy) * uPx) / uGlow.z, 2.0));
    col += COLD * g * uGlow.w * smoothstep(0.6, 1.0, f) * (1.0 - uHold);
  }

  col = mix(col, orig, uHold);
  float dim = inside ? uDim : mix(uCeilDim, uDim, shown * (1.0 - uHold));
  col = mix(col, col * 0.28, dim);
  col = mix(col, COLD, ring * 0.9);
  o = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
  return sh;
}

function program(gl, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.bindAttribLocation(p, 1, 'aUV');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  const u = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) {
    const name = gl.getActiveUniform(p, i).name;
    u[name] = gl.getUniformLocation(p, name);
  }
  return { p, u };
}

function quad(gl, x, y, w, h, u0 = 0, u1 = 1) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x, y, u0, 0, x + w, y, u1, 0, x, y + h, u0, 1, x + w, y + h, u1, 1,
  ]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
  return vao;
}

export function createRenderer(canvas) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
  if (!gl) return null;
  const ceilProg = program(gl, CEIL_FRAG);
  const panelProg = program(gl, PANEL_FRAG);
  const blank = makeTexture(gl, null);

  function makeTexture(gl, bitmap, repeat = false) {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    if (bitmap) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 18, 16, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const wrap = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    return t;
  }

  let ceiling = { tex: blank, vao: null, size: [1, 1] };
  const panels = new Map(); // key -> { vao, rect, rot, orig, ai, water }

  return {
    gl,
    texture: (bitmap, repeat) => makeTexture(gl, bitmap, repeat),
    free: (t) => t && t !== blank && gl.deleteTexture(t),
    blank,
    setCeiling(size, tex) {
      ceiling = { tex, vao: quad(gl, 0, 0, size[0], size[1]), size };
    },
    // ext：画格沿全景 x 方向（转正后是上下）各伸出多少，用于比画格高的 AI 图；只支持转 90 度的画格
    addPanel(key, rect, rot, ext = 0) {
      const [x, y, w, h] = rect;
      const vao = quad(gl, x - ext * w, y, w * (1 + 2 * ext), h, -ext, 1 + ext);
      panels.set(key, { vao, rect, rot, ext, orig: blank, ai: blank, water: blank });
      return panels.get(key);
    },
    panel: (key) => panels.get(key),

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      return { w, h, dpr };
    },

    // cam: {x, y, scale, angle, ox, oy}；states: key -> {p, hold, hasAi, water8, aiK, origin, mode, maxD, px, glow, lens, dim}
    draw(cam, view, time, rm, ceilDim, states) {
      gl.clearColor(0.05, 0.045, 0.04, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const camU = (u) => {
        gl.uniform2f(u.uCam, cam.x, cam.y);
        gl.uniform1f(u.uScale, cam.scale);
        gl.uniform1f(u.uAngle, cam.angle);
        gl.uniform2f(u.uView, view.w, view.h);
        gl.uniform2f(u.uOffset, cam.ox, cam.oy);
      };
      if (ceiling.vao) {
        gl.useProgram(ceilProg.p);
        camU(ceilProg.u);
        gl.uniform1f(ceilProg.u.uDim, ceilDim);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, ceiling.tex);
        gl.uniform1i(ceilProg.u.uTex, 0);
        gl.bindVertexArray(ceiling.vao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      const u = panelProg.u;
      gl.useProgram(panelProg.p);
      camU(u);
      gl.uniform1f(u.uTime, time);
      gl.uniform1f(u.uRM, rm ? 1 : 0);
      gl.uniform1i(u.uOrig, 0);
      gl.uniform1i(u.uAi, 1);
      gl.uniform1i(u.uWater, 2);
      gl.uniform1i(u.uCeil, 3);
      gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, ceiling.tex);
      gl.uniform2f(u.uCeilSize, ceiling.size[0], ceiling.size[1]);
      gl.uniform1f(u.uCeilDim, ceilDim);
      for (const [key, pn] of panels) {
        const st = states[key];
        if (!st) continue;
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pn.orig);
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, pn.ai);
        gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, pn.water);
        gl.uniform1f(u.uP, st.p);
        gl.uniform1f(u.uHold, st.hold);
        gl.uniform1f(u.uHasAi, st.hasAi ? 1 : 0);
        gl.uniform1f(u.uWater8, st.water8 ? 1 : 0);
        gl.uniform1f(u.uRot, pn.rot === 90 ? 1 : 0);
        gl.uniform1f(u.uExt, pn.ext);
        gl.uniform1i(u.uMode, st.mode === 'rise' ? 1 : 0);
        gl.uniform2f(u.uOrigin, st.origin[0], st.origin[1]);
        gl.uniform2f(u.uPx, st.px[0], st.px[1]);
        gl.uniform2f(u.uAiK, st.aiK[0], st.aiK[1]);
        gl.uniform1f(u.uMaxD, st.maxD);
        gl.uniform1f(u.uDim, st.dim);
        gl.uniform4fv(u.uGlow, st.glow || [0, 0, 1, 0]);
        gl.uniform4fv(u.uLens, st.lens || [0, 0, 0, 0]);
        gl.uniform1f(u.uRing, st.ring || 1);
        gl.bindVertexArray(pn.vao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    },
  };
}
