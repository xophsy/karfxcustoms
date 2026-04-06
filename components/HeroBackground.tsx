"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// ── Vertical offset — increase to shift the image down and show more car ──────
const HERO_V_OFFSET = 0.12;

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
  varying vec2 vUV;
  void main() {
    vec2 uv     = (vUV - 0.5) * uCover + vec2(0.5, 0.5 + uVOffset);
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

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

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
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target    = useRef({ x: 0, y: 0 });
  const smooth    = useRef({ x: 0, y: 0 });
  const glRef     = useRef<ReturnType<typeof initGL>>(null);
  const ready     = useRef(false);
  const rafId     = useRef(0);
  const lastMove  = useRef(0);
  const gyroRef   = useRef<((e: DeviceOrientationEvent) => void) | null>(null);

  // Only shown on iOS — Android attaches gyro automatically
  const [showGyroBtn, setShowGyroBtn] = useState(false);

  // Defined outside useEffect so the iOS button's onClick can call it directly
  const onOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma === null || e.beta === null) return;
    lastMove.current = performance.now();
    target.current = {
      x: -clamp(e.gamma / 15, -0.5, 0.5),
      y:  clamp((e.beta - 60) / 20, -0.5, 0.5),
    };
  }, []);

  const requestGyroIOS = useCallback(() => {
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission: () => Promise<string>;
    };
    DOE.requestPermission()
      .then((state) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", onOrientation);
          gyroRef.current = onOrientation;
        }
      })
      .catch(() => {})
      .finally(() => setShowGyroBtn(false));
  }, [onOrientation]);

  const tick = useCallback(() => {
    const now  = performance.now();
    const idle = now - lastMove.current > 2000;

    if (idle) {
      const t = now * 0.001;
      target.current.x = Math.sin(t * 0.31) * 0.13;
      target.current.y = Math.cos(t * 0.19) * 0.09;
    }

    smooth.current.x += (target.current.x - smooth.current.x) * 0.055;
    smooth.current.y += (target.current.y - smooth.current.y) * 0.055;
    const s = glRef.current;
    if (s && ready.current) {
      s.gl.uniform2f(s.uMouse, smooth.current.x, smooth.current.y);
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
    const { gl, uCover, uVOffset } = state;
    gl.uniform1f(uVOffset, HERO_V_OFFSET);

    let imgW = 1, imgH = 1;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      const cR = canvas.width / canvas.height;
      const iR = imgW / imgH;
      gl.uniform2f(uCover, cR > iR ? 1 : cR / iR, cR > iR ? iR / cR : 1);
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
      canvas.style.opacity = window.innerWidth >= 768 ? "0.72" : "0.60";
    });

    // ── Pointer: handles mouse (desktop) + touch drag (mobile) ───────────────
    // pointermove fires on mouse hover AND on finger drag — no permissions needed
    const onPointer = (e: PointerEvent) => {
      lastMove.current = performance.now();
      target.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * -1,
        y: (e.clientY / window.innerHeight - 0.5),
      };
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ── Gyroscope ─────────────────────────────────────────────────────────────
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DOE.requestPermission === "function") {
      // iOS 13+ — needs explicit user gesture; show a button
      setShowGyroBtn(true);
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      // Android / non-iOS — attach directly, no permission needed
      window.addEventListener("deviceorientation", onOrientation);
      gyroRef.current = onOrientation;
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      if (gyroRef.current) {
        window.removeEventListener("deviceorientation", gyroRef.current);
      }
      cancelAnimationFrame(rafId.current);
      glRef.current = null;
      ready.current = false;
    };
  }, [tick, onOrientation]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 via-surface-900/10 to-surface-900/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-900/65 via-surface-900/5 to-surface-900/25" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 44%, rgba(255,255,255,0.08), transparent 24%), radial-gradient(circle at 62% 78%, rgba(212,175,55,0.12), transparent 28%)",
        }}
      />

      {/* iOS tilt permission button — fixed so it escapes all stacking contexts */}
      {showGyroBtn && (
        <button
          onClick={requestGyroIOS}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-[11px] font-medium tracking-wide text-white/50 backdrop-blur-sm transition-opacity hover:text-white/80"
          aria-label="Enable tilt parallax"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-500" />
          Tilt to explore
        </button>
      )}
    </div>
  );
}
