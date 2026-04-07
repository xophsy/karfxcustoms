"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Vertical offset — shifts the image down to show more car ──────────────────
const HERO_V_OFFSET = 0.12;

// ── Mobile horizontal offset — pans right to bring the car into frame ─────────
const MOBILE_H_OFFSET = 0.00;

// ── Mobile zoom-out — pulls back slightly on small screens ────────────────────
const MOBILE_ZOOM_OUT = 1.25;

// ── WebGL shaders ─────────────────────────────────────────────────────────────

const VERT = `
  attribute vec2 aPos;
  attribute vec2 aUV;
  varying vec2 vUV;
  void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
    vUV = aUV;
  }
`;

const FRAG = `
  precision mediump float;
  uniform sampler2D uTex;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform vec2 uCover;
  uniform float uVOffset;
  uniform float uHOffset;
  varying vec2 vUV;
  void main() {
    vec2 uv     = (vUV - 0.5) * uCover + vec2(0.5 + uHOffset, 0.5 + uVOffset);
    float depth = texture2D(uDepth, uv).r;
    vec2 offset = uMouse * depth * 0.038;

    // Chromatic aberration — RGB split scales with depth + mouse magnitude
    vec2 ca = uMouse * depth * 0.006;
    float r = texture2D(uTex, uv + offset + ca).r;
    float g = texture2D(uTex, uv + offset     ).g;
    float b = texture2D(uTex, uv + offset - ca).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── WebGL init ────────────────────────────────────────────────────────────────

function initGL(canvas: HTMLCanvasElement) {
  const _gl = canvas.getContext("webgl", { alpha: false, antialias: false });
  if (!_gl) return null;
  const gl = _gl;

  function makeShader(type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("Shader:", gl.getShaderInfoLog(s)); return null;
    }
    return s;
  }
  const vs = makeShader(gl.VERTEX_SHADER, VERT);
  const fs = makeShader(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program:", gl.getProgramInfoLog(prog)); return null;
  }
  gl.useProgram(prog);

  const quad = new Float32Array([-1,-1,0,1, 1,-1,1,1, -1,1,0,0, 1,1,1,0]);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, "aPos");
  const aUV  = gl.getAttribLocation(prog, "aUV");
  gl.enableVertexAttribArray(aPos); gl.enableVertexAttribArray(aUV);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(aUV,  2, gl.FLOAT, false, 16, 8);

  function makeTex(unit: number) {
    gl.activeTexture(unit);
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return t;
  }

  makeTex(gl.TEXTURE1); gl.uniform1i(gl.getUniformLocation(prog, "uDepth"), 1);
  makeTex(gl.TEXTURE0); gl.uniform1i(gl.getUniformLocation(prog, "uTex"),   0);

  return {
    gl,
    uMouse:   gl.getUniformLocation(prog, "uMouse")!,
    uCover:   gl.getUniformLocation(prog, "uCover")!,
    uVOffset: gl.getUniformLocation(prog, "uVOffset")!,
    uHOffset: gl.getUniformLocation(prog, "uHOffset")!,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef     = useRef<ReturnType<typeof initGL>>(null);
  const ready     = useRef(false);
  const rafId     = useRef(0);

  const tick = useCallback(() => {
    const s = glRef.current;
    if (s && ready.current) {
      s.gl.uniform2f(s.uMouse, 0, 0);
      s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4);
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = initGL(canvas);
    if (!state) return;
    glRef.current = state;
    const { gl, uCover, uVOffset, uHOffset } = state;
    gl.uniform1f(uVOffset, HERO_V_OFFSET);

    let imgW = 1, imgH = 1;

    const resize = () => {
      // Use the canvas's actual rendered size so WebGL matches CSS exactly
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      const cR = w / h;
      const iR = imgW / imgH;
      // Slight zoom-out on mobile, pure cover on desktop
      const zoom = w < 768 ? MOBILE_ZOOM_OUT : 1.0;
      gl.uniform2f(uCover, (cR > iR ? 1 : cR / iR) * zoom, (cR > iR ? iR / cR : 1) * zoom);
      // Pan right on mobile so the car is visible, no pan on desktop
      gl.uniform1f(uHOffset, w < 768 ? MOBILE_H_OFFSET : 0);
    };
    resize();
    window.addEventListener("resize", resize);

    Promise.all([
      loadImage("/images/home/hero/background.jpg"),
      loadImage("/images/home/hero/depth.png"),
    ]).then(([img, depth]) => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      gl.activeTexture(gl.TEXTURE0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.activeTexture(gl.TEXTURE1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, depth);
      resize();
      ready.current = true;
      canvas.style.opacity = canvas.offsetWidth < 768 ? "0.78" : "0.90";
    });

    // ── Scroll parallax: CSS translateY on the canvas ────────────────────────
    const onScroll = () => {
      const offset = window.scrollY * 0.35;
      canvas.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
      glRef.current = null;
      ready.current = false;
    };
  }, [tick]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900/30 via-surface-900/5 to-surface-900/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-900/45 via-surface-900/0 to-surface-900/10" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 44%, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 62% 78%, rgba(212,175,55,0.12), transparent 28%)",
        }}
      />
    </div>
  );
}
