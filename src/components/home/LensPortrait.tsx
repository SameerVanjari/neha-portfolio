"use client";

import { useEffect, useRef, useState } from "react";
import { LENS_ORDER, LENSES, type HomeLensId } from "@/data/lenses";
import { useMotionPref } from "@/components/motion/reveal";

/**
 * About portrait. The four lens scenes play in order. A diagonal noise wipe —
 * the same idea as the hero model's dissolve — sweeps from the current image
 * to the next, with the incoming lens colour on the edge. Choosing a lens in
 * the journey jumps the loop to that scene. The photograph underneath stays
 * visible until the first frame is drawn, and stays visible if WebGL is
 * unavailable.
 */

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uProgress;
uniform vec3 uAccent;
uniform vec2 uFromSize;
uniform vec2 uToSize;
uniform vec2 uFrame;
out vec4 fragColor;

vec2 cover(vec2 uv, vec2 size) {
  float imageAspect = size.x / max(size.y, 1.0);
  float frameAspect = uFrame.x / max(uFrame.y, 1.0);
  vec2 scale = vec2(1.0);
  if (imageAspect > frameAspect) scale.x = frameAspect / imageAspect;
  else scale.y = imageAspect / frameAspect;
  return (uv - 0.5) * scale + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec3 fromColor = texture(uFrom, cover(vUv, uFromSize)).rgb;
  vec3 toColor = texture(uTo, cover(vUv, uToSize)).rgb;
  float n = hash(gl_FragCoord.xy * 0.17);
  float band = vUv.x * 0.38 + vUv.y * 0.62 + (n - 0.5) * 0.18;
  float sweep = uProgress * 1.22 - 0.11;
  float reveal = smoothstep(band - 0.055, band + 0.055, sweep);
  float edge = smoothstep(0.11, 0.0, abs(sweep - band));
  float edgeFade = smoothstep(0.0, 0.08, uProgress) * smoothstep(1.0, 0.9, uProgress);
  vec3 color = mix(fromColor, toColor, reveal) + uAccent * edge * edgeFade * 0.85;
  fragColor = vec4(color, 1.0);
}
`;

const DURATION = 880;
/** Settled time on each scene before the next wipe. The wipe itself is DURATION. */
const HOLD = 3200;

type Tex = { texture: WebGLTexture; width: number; height: number };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LensPortrait({ lensId }: { lensId: HomeLensId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const goRef = useRef<(url: string, nextAccent: string) => void>(() => undefined);
  const reduceRef = useRef(false);
  const reduce = useMotionPref();
  const [painted, setPainted] = useState(false);
  const [index, setIndex] = useState(() => Math.max(0, LENS_ORDER.indexOf(lensId)));
  const shot = LENSES[LENS_ORDER[index]];

  useEffect(() => {
    reduceRef.current = reduce;
  }, [reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uFrom = gl.getUniformLocation(program, "uFrom");
    const uTo = gl.getUniformLocation(program, "uTo");
    const uProgress = gl.getUniformLocation(program, "uProgress");
    const uAccent = gl.getUniformLocation(program, "uAccent");
    const uFromSize = gl.getUniformLocation(program, "uFromSize");
    const uToSize = gl.getUniformLocation(program, "uToSize");
    const uFrame = gl.getUniformLocation(program, "uFrame");
    gl.uniform1i(uFrom, 0);
    gl.uniform1i(uTo, 1);

    const cache = new Map<string, Tex>();
    let disposed = false;
    let from: Tex | null = null;
    let to: Tex | null = null;
    let accentRgb: [number, number, number] = [0.71, 0.63, 0.4];
    let progress = 1;
    let raf = 0;
    let token = 0;
    let started = 0;

    const load = (url: string) => {
      const hit = cache.get(url);
      if (hit) return Promise.resolve(hit);
      return new Promise<Tex>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          if (disposed) {
            reject(new Error("disposed"));
            return;
          }
          const texture = gl.createTexture();
          if (!texture) {
            reject(new Error("texture"));
            return;
          }
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          const record = { texture, width: image.naturalWidth, height: image.naturalHeight };
          cache.set(url, record);
          resolve(record);
        };
        image.onerror = () => reject(new Error(url));
        image.src = url;
      });
    };

    const draw = () => {
      if (!from) return;
      const dest = to ?? from;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, from.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, dest.texture);
      gl.uniform1f(uProgress, to ? progress : 1);
      gl.uniform3f(uAccent, accentRgb[0], accentRgb[1], accentRgb[2]);
      gl.uniform2f(uFromSize, from.width, from.height);
      gl.uniform2f(uToSize, dest.width, dest.height);
      gl.uniform2f(uFrame, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(parent.clientWidth * dpr));
      const height = Math.max(1, Math.round(parent.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      draw();
    };

    const go = async (url: string, nextAccent: string) => {
      const mine = ++token;
      let next: Tex;
      try {
        next = await load(url);
      } catch {
        return;
      }
      if (disposed || mine !== token) return;
      accentRgb = hexToRgb(nextAccent);
      if (to && (reduceRef.current || next === to)) {
        from = next;
        to = null;
        progress = 1;
      }
      if (!from || reduceRef.current || from === next) {
        from = next;
        to = null;
        progress = 1;
        resize();
        setPainted(true);
        return;
      }
      to = next;
      progress = 0;
      started = performance.now();
      cancelAnimationFrame(raf);
      const frame = (now: number) => {
        const t = Math.min(1, (now - started) / DURATION);
        progress = t * t * (3 - 2 * t);
        draw();
        if (t < 1) {
          raf = requestAnimationFrame(frame);
          return;
        }
        from = to;
        to = null;
        progress = 1;
        draw();
      };
      raf = requestAnimationFrame(frame);
    };

    goRef.current = go;
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    for (const id of LENS_ORDER) void load(LENSES[id].portrait).catch(() => undefined);

    return () => {
      disposed = true;
      token += 1;
      goRef.current = () => undefined;
      cancelAnimationFrame(raf);
      observer.disconnect();
      for (const record of cache.values()) gl.deleteTexture(record.texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  useEffect(() => {
    const next = LENS_ORDER.indexOf(lensId);
    if (next >= 0) setIndex(next);
  }, [lensId]);

  useEffect(() => {
    goRef.current(shot.portrait, shot.accent);
  }, [shot.portrait, shot.accent]);

  useEffect(() => {
    if (reduce) return;
    const frame = canvasRef.current?.parentElement;
    if (!frame) return;

    let timer = 0;
    let onScreen = true;
    const clear = () => window.clearTimeout(timer);
    const arm = () => {
      clear();
      if (!onScreen || document.hidden) return;
      timer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % LENS_ORDER.length);
      }, HOLD + DURATION);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) arm();
        else clear();
      },
      { threshold: 0.45 },
    );
    observer.observe(frame);
    document.addEventListener("visibilitychange", arm);
    arm();

    return () => {
      clear();
      observer.disconnect();
      document.removeEventListener("visibilitychange", arm);
    };
  }, [index, reduce]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot.portrait}
        alt="Neha Mayacharya working across product, experience, XR, and AI"
        className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
          painted ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 size-full transition-opacity duration-300 ${
          painted ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
