'use client';

/**
 * SplashCursor — WebGL fluid simulation cursor effect.
 *
 * Based on the Navier-Stokes fluid sim approach (Pavel Dobryakov / react-bits).
 * Modified for brand palette: unified purple #533fec.
 *
 *   Primary: brand purple #533fec
 *
 * Moving the mouse paints fluid. Clicking creates a burst. Fluid fades quickly
 * (DENSITY_DISSIPATION is high) so it stays ambient, not garish.
 */

import React, { useEffect, useRef } from 'react';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 6,
  VELOCITY_DISSIPATION = 4,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 2,
  SPLAT_RADIUS = 0.14,
  SPLAT_FORCE = 3000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 6,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const isTouchDevice = navigator.maxTouchPoints > 0 || !desktopPointerQuery.matches;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointers: Pointer[] = [pointerPrototype()];

    const config = {
      SIM_RESOLUTION: SIM_RESOLUTION!,
      DYE_RESOLUTION: DYE_RESOLUTION!,
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,
      PRESSURE: PRESSURE!,
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,
      CURL: CURL!,
      SPLAT_RADIUS: SPLAT_RADIUS!,
      SPLAT_FORCE: SPLAT_FORCE!,
      SHADING,
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl || !ext) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;

      if (!gl) {
        gl = (canvas.getContext('webgl', params) ||
          canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;
      }

      if (!gl) throw new Error('Unable to initialize WebGL.');

      const isWebGL2 = 'drawBuffers' in gl;

      let supportLinearFiltering = false;
      let halfFloat = null;

      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0, 0, 0, 1);

      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat && (halfFloat as any).HALF_FLOAT_OES) || 0;

      let formatRGBA: any, formatRG: any, formatR: any;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG   = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR    = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ): { internalFormat: number; format: number } | null {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if ('drawBuffers' in gl) {
          const gl2 = gl as WebGL2RenderingContext;
          switch (internalFormat) {
            case gl2.R16F:   return getSupportedFormat(gl2, gl2.RG16F,   gl2.RG,   type);
            case gl2.RG16F:  return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
            default: return null;
          }
        }
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ) {
      const texture = gl.createTexture();
      if (!texture) return false;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      if (!fbo) return false;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    function hashCode(s: string) {
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    function addKeywords(source: string, keywords: string[] | null) {
      if (!keywords) return source;
      return keywords.map(k => `#define ${k}\n`).join('') + source;
    }

    function compileShader(type: number, source: string, keywords: string[] | null = null): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, addKeywords(source, keywords));
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function createProgram(vs: WebGLShader | null, fs: WebGLShader | null): WebGLProgram | null {
      if (!vs || !fs) return null;
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return uniforms;
    }

    class Program {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vs: WebGLShader | null, fs: WebGLShader | null) {
        this.program = createProgram(vs, fs);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() { if (this.program) gl.useProgram(this.program); }
    }

    class Material {
      vertexShader: WebGLShader | null;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram | null> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vs: WebGLShader | null, fs: string) {
        this.vertexShader = vs;
        this.fragmentShaderSource = fs;
      }

      setKeywords(keywords: string[]) {
        const hash = keywords.reduce((h, k) => h + hashCode(k), 0);
        let program = this.programs[hash];
        if (!program) {
          program = createProgram(this.vertexShader, compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords));
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        if (program) this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    const copyShader       = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main () { gl_FragColor = texture2D(uTexture, vUv); }`);
    const clearShader      = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`);
    const splatShader      = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main () { vec2 p = vUv - point.xy; p.x *= aspectRatio; vec3 splat = exp(-dot(p,p)/radius)*color; vec3 base = texture2D(uTarget,vUv).xyz; gl_FragColor = vec4(base+splat,1.0); }`);
    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main () { float L=texture2D(uVelocity,vL).x; float R=texture2D(uVelocity,vR).x; float T=texture2D(uVelocity,vT).y; float B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0){L=-C.x;} if(vR.x>1.0){R=-C.x;} if(vT.y>1.0){T=-C.y;} if(vB.y<0.0){B=-C.y;} float div=0.5*(R-L+T-B); gl_FragColor=vec4(div,0.0,0.0,1.0); }`);
    const curlShader       = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main () { float L=texture2D(uVelocity,vL).y; float R=texture2D(uVelocity,vR).y; float T=texture2D(uVelocity,vT).x; float B=texture2D(uVelocity,vB).x; float vorticity=R-L-T+B; gl_FragColor=vec4(0.5*vorticity,0.0,0.0,1.0); }`);
    const pressureShader   = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; void main () { float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; float C=texture2D(uPressure,vUv).x; float divergence=texture2D(uDivergence,vUv).x; float pressure=(L+R+B+T-divergence)*0.25; gl_FragColor=vec4(pressure,0.0,0.0,1.0); }`);
    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; void main () { float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; vec2 velocity=texture2D(uVelocity,vUv).xy; velocity.xy-=vec2(R-L,T-B); gl_FragColor=vec4(velocity,0.0,1.0); }`);

    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity; uniform sampler2D uCurl;
      uniform float curl; uniform float dt;
      void main () {
        float L=texture2D(uCurl,vL).x; float R=texture2D(uCurl,vR).x;
        float T=texture2D(uCurl,vT).x; float B=texture2D(uCurl,vB).x;
        float C=texture2D(uCurl,vUv).x;
        vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
        force/=length(force)+0.0001;
        force*=curl*C; force.y*=-1.0;
        vec2 velocity=texture2D(uVelocity,vUv).xy;
        velocity+=force*dt;
        velocity=min(max(velocity,-1000.0),1000.0);
        gl_FragColor=vec4(velocity,0.0,1.0);
      }
    `);

    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity; uniform sampler2D uSource;
      uniform vec2 texelSize; uniform vec2 dyeTexelSize;
      uniform float dt; uniform float dissipation;
      vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st=uv/tsize-0.5; vec2 iuv=floor(st); vec2 fuv=fract(st);
        vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize);
        vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);
        vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize);
        vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);
        return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);
      }
      void main () {
        #ifdef MANUAL_FILTERING
          vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
          vec4 result=bilerp(uSource,coord,dyeTexelSize);
        #else
          vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;
          vec4 result=texture2D(uSource,coord);
        #endif
        float decay=1.0+dissipation*dt;
        gl_FragColor=result/decay;
      }
    `, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      vec3 linearToGamma(vec3 color) {
        color=max(color,vec3(0));
        return max(1.055*pow(color,vec3(0.416666667))-0.055,vec3(0));
      }
      void main () {
        vec3 c=texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb; vec3 rc=texture2D(uTexture,vR).rgb;
          vec3 tc=texture2D(uTexture,vT).rgb; vec3 bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc); float dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize)));
          vec3 l=vec3(0.0,0.0,1.0);
          float diffuse=clamp(dot(n,l)+0.7,0.7,1.0);
          c*=diffuse;
        #endif
        float a=max(c.r,max(c.g,c.b));
        gl_FragColor=vec4(c,a);
      }
    `;

    interface FBO {
      texture: WebGLTexture; fbo: WebGLFramebuffer;
      width: number; height: number;
      texelSizeX: number; texelSizeY: number;
      attach: (id: number) => number;
    }
    interface DoubleFBO {
      width: number; height: number;
      texelSizeX: number; texelSizeY: number;
      read: FBO; write: FBO;
      swap: () => void;
    }

    const blit = (() => {
      const buf = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
      const elem = gl.createBuffer()!;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (target: FBO | null, doClear = false) => {
        if (!target) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (doClear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let dye: DoubleFBO, velocity: DoubleFBO, divergence: FBO, curl: FBO, pressure: DoubleFBO;

    const copyProgram            = new Program(baseVertexShader, copyShader);
    const clearProgram           = new Program(baseVertexShader, clearShader);
    const splatProgram           = new Program(baseVertexShader, splatShader);
    const advectionProgram       = new Program(baseVertexShader, advectionShader);
    const divergenceProgram      = new Program(baseVertexShader, divergenceShader);
    const curlProgram            = new Program(baseVertexShader, curlShader);
    const vorticityProgram       = new Program(baseVertexShader, vorticityShader);
    const pressureProgram        = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial        = new Material(baseVertexShader, displayShaderSource);

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0,0,w,h); gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture, fbo, width: w, height: h,
        texelSizeX: 1/w, texelSizeY: 1/h,
        attach(id) { gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
      let read = createFBO(w,h,internalFormat,format,type,param);
      let write = createFBO(w,h,internalFormat,format,type,param);
      return {
        width: w, height: h, texelSizeX: read.texelSizeX, texelSizeY: read.texelSizeY,
        read, write,
        swap() { const tmp=this.read; this.read=this.write; this.write=tmp; },
      };
    }

    function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      const n = createFBO(w,h,internalFormat,format,type,param);
      copyProgram.bind();
      if (copyProgram.uniforms.uTexture) gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(n, false);
      return n;
    }

    function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (target.width===w && target.height===h) return target;
      target.read  = resizeFBO(target.read,  w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h;
      return target;
    }

    function getResolution(resolution: number) {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const aspect = w>h ? w/h : h/w;
      const min = Math.round(resolution), max = Math.round(resolution*aspect);
      return w>h ? { width: max, height: min } : { width: min, height: max };
    }

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION!);
      const dyeRes = getResolution(config.DYE_RESOLUTION!);
      const texType  = ext.halfFloatTexType;
      const rgba     = ext.formatRGBA;
      const rg       = ext.formatRG;
      const r        = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      dye      = !dye      ? createDoubleFBO(dyeRes.width,dyeRes.height,rgba.internalFormat,rgba.format,texType,filtering)
                           : resizeDoubleFBO(dye,dyeRes.width,dyeRes.height,rgba.internalFormat,rgba.format,texType,filtering);
      velocity = !velocity ? createDoubleFBO(simRes.width,simRes.height,rg.internalFormat,rg.format,texType,filtering)
                           : resizeDoubleFBO(velocity,simRes.width,simRes.height,rg.internalFormat,rg.format,texType,filtering);
      divergence = createFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
      curl       = createFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
      pressure   = createDoubleFBO(simRes.width,simRes.height,r.internalFormat,r.format,texType,gl.NEAREST);
    }

    function scaleByPixelRatio(input: number) {
      return Math.floor(input * (window.devicePixelRatio || 1));
    }

    function resizeCanvas() {
      const w = scaleByPixelRatio(canvas!.clientWidth);
      const h = scaleByPixelRatio(canvas!.clientHeight);
      if (canvas!.width!==w || canvas!.height!==h) { canvas!.width=w; canvas!.height=h; return true; }
      return false;
    }

    // ─── Brand color generation ──────────────────────────────────────────────
    // Two-colour palette: purple (#533fec) + black.
    //
    // "Black" = areas with no fluid — the canvas is transparent there, so the
    //           dark page background shows through naturally.
    // "Purple" = brand purple #533fec (RGB 83, 63, 236).
    //
    // With mix-blend-mode:screen (dark) / multiply (light) on the canvas
    // container, the fluid ILLUMINATES whatever's beneath it — making content
    // POP with a purple cast instead of blocking it.

    function generateColor(): ColorRGB {
      // Fixed brand purple #533fec (83, 63, 236), dimmed for ambient glow
      const c: ColorRGB = { r: 83 / 255, g: 63 / 255, b: 236 / 255 };
      const mult = 0.10;
      c.r *= mult;
      c.g *= mult;
      c.b *= mult;
      return c;
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      let r=0,g=0,b=0;
      const i=Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
      switch(i%6){
        case 0:r=v;g=t;b=p;break; case 1:r=q;g=v;b=p;break; case 2:r=p;g=v;b=t;break;
        case 3:r=p;g=q;b=v;break; case 4:r=t;g=p;b=v;break; case 5:r=v;g=p;b=q;break;
      }
      return { r, g, b };
    }

    function wrap(value: number, min: number, max: number) {
      const range = max-min;
      return range===0 ? min : ((value-min)%range)+min;
    }

    // ─── Simulation loop ─────────────────────────────────────────────────────

    displayMaterial.setKeywords(config.SHADING ? ['SHADING'] : []);
    initFramebuffers();

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0;
    let animFrameId = 0;

    function updateFrame() {
      const now = Date.now();
      const dt  = Math.min((now-lastUpdateTime)/1000, 0.016666);
      lastUpdateTime = now;

      if (resizeCanvas()) initFramebuffers();

      // Cycle colors on schedule
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach(p => { p.color = generateColor(); });
      }

      // Apply pointer splats
      for (const p of pointers) {
        if (p.moved) { p.moved=false; splatPointer(p); }
      }

      step(dt);
      render(null);
      animFrameId = requestAnimationFrame(updateFrame);
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      if(curlProgram.uniforms.texelSize) gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(curlProgram.uniforms.uVelocity) gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      if(vorticityProgram.uniforms.texelSize) gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(vorticityProgram.uniforms.uVelocity) gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      if(vorticityProgram.uniforms.uCurl)     gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      if(vorticityProgram.uniforms.curl)      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      if(vorticityProgram.uniforms.dt)        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();

      divergenceProgram.bind();
      if(divergenceProgram.uniforms.texelSize)  gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(divergenceProgram.uniforms.uVelocity)  gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      if(clearProgram.uniforms.uTexture) gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      if(clearProgram.uniforms.value)    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write); pressure.swap();

      pressureProgram.bind();
      if(pressureProgram.uniforms.texelSize)   gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(pressureProgram.uniforms.uDivergence) gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for(let i=0;i<config.PRESSURE_ITERATIONS;i++){
        if(pressureProgram.uniforms.uPressure) gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      gradienSubtractProgram.bind();
      if(gradienSubtractProgram.uniforms.texelSize)  gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(gradienSubtractProgram.uniforms.uPressure)  gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      if(gradienSubtractProgram.uniforms.uVelocity)  gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      advectionProgram.bind();
      if(advectionProgram.uniforms.texelSize) gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if(!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const vId = velocity.read.attach(0);
      if(advectionProgram.uniforms.uVelocity)   gl.uniform1i(advectionProgram.uniforms.uVelocity, vId);
      if(advectionProgram.uniforms.uSource)     gl.uniform1i(advectionProgram.uniforms.uSource, vId);
      if(advectionProgram.uniforms.dt)          gl.uniform1f(advectionProgram.uniforms.dt, dt);
      if(advectionProgram.uniforms.dissipation) gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      if(!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      if(advectionProgram.uniforms.uVelocity)   gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      if(advectionProgram.uniforms.uSource)     gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      if(advectionProgram.uniforms.dissipation) gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function render(target: FBO | null) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      const w = target ? target.width  : gl.drawingBufferWidth;
      const h = target ? target.height : gl.drawingBufferHeight;
      displayMaterial.bind();
      if(config.SHADING && displayMaterial.uniforms.texelSize) gl.uniform2f(displayMaterial.uniforms.texelSize, 1/w, 1/h);
      if(displayMaterial.uniforms.uTexture) gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target, false);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {
      splatProgram.bind();
      if(splatProgram.uniforms.uTarget)     gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      if(splatProgram.uniforms.aspectRatio) gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width/canvas!.height);
      if(splatProgram.uniforms.point)       gl.uniform2f(splatProgram.uniforms.point, x, y);
      if(splatProgram.uniforms.color)       gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
      if(splatProgram.uniforms.radius)      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS/100 * (canvas!.width>canvas!.height ? canvas!.width/canvas!.height : 1));
      blit(velocity.write); velocity.swap();
      if(splatProgram.uniforms.uTarget)     gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      if(splatProgram.uniforms.color)       gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function splatPointer(p: Pointer) {
      splat(p.texcoordX, p.texcoordY, p.deltaX*config.SPLAT_FORCE, p.deltaY*config.SPLAT_FORCE, p.color);
    }

    function clickSplat(p: Pointer) {
      const c = generateColor();
      // Slightly brighter on click — still subtle
      c.r *= 3; c.g *= 3; c.b *= 3;
      splat(p.texcoordX, p.texcoordY, 10*(Math.random()-0.5), 30*(Math.random()-0.5), c);
    }

    function updatePointerDownData(p: Pointer, id: number, posX: number, posY: number) {
      p.id=id; p.down=true; p.moved=false;
      p.texcoordX=posX/canvas!.width; p.texcoordY=1-posY/canvas!.height;
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
      p.deltaX=0; p.deltaY=0; p.color=generateColor();
    }

    function updatePointerMoveData(p: Pointer, posX: number, posY: number, color: ColorRGB) {
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
      p.texcoordX=posX/canvas!.width; p.texcoordY=1-posY/canvas!.height;
      const aspect = canvas!.width/canvas!.height;
      p.deltaX = (p.texcoordX-p.prevTexcoordX) * (aspect<1 ? aspect : 1);
      p.deltaY = (p.texcoordY-p.prevTexcoordY) / (aspect>1 ? aspect : 1);
      p.moved  = Math.abs(p.deltaX)>0 || Math.abs(p.deltaY)>0;
      p.color  = color;
    }

    function updatePointerUpData(p: Pointer) { p.down=false; }

    // ─── Event listeners ─────────────────────────────────────────────────────

    const onMouseDown = (e: MouseEvent) => {
      const p=pointers[0], x=scaleByPixelRatio(e.clientX), y=scaleByPixelRatio(e.clientY);
      updatePointerDownData(p,-1,x,y); clickSplat(p);
    };

    const onMouseMove = (e: MouseEvent) => {
      const p=pointers[0], x=scaleByPixelRatio(e.clientX), y=scaleByPixelRatio(e.clientY);
      updatePointerMoveData(p,x,y,p.color);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t=e.targetTouches[0], p=pointers[0];
      updatePointerDownData(p,t.identifier,scaleByPixelRatio(t.clientX),scaleByPixelRatio(t.clientY));
    };

    const onTouchMove = (e: TouchEvent) => {
      const t=e.targetTouches[0], p=pointers[0];
      updatePointerMoveData(p,scaleByPixelRatio(t.clientX),scaleByPixelRatio(t.clientY),p.color);
    };

    const onTouchEnd = (e: TouchEvent) => {
      updatePointerUpData(pointers[0]);
    };

    // Kick off the loop on first mouse move
    function handleFirstMove(e: MouseEvent) {
      const p=pointers[0], x=scaleByPixelRatio(e.clientX), y=scaleByPixelRatio(e.clientY);
      updatePointerMoveData(p,x,y,generateColor());
      animFrameId = requestAnimationFrame(updateFrame);
      window.removeEventListener('mousemove', handleFirstMove);
    }

    window.addEventListener('mousedown',  onMouseDown,  { passive: true });
    window.addEventListener('mousemove',  onMouseMove,  { passive: true });
    window.addEventListener('mousemove',  handleFirstMove, { once: true, passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mousemove',  handleFirstMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [
    SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION, VELOCITY_DISSIPATION,
    PRESSURE, PRESSURE_ITERATIONS, CURL,
    SPLAT_RADIUS, SPLAT_FORCE, SHADING,
    COLOR_UPDATE_SPEED, BACK_COLOR, TRANSPARENT,
  ]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-25 dark:opacity-40 [mix-blend-mode:multiply] dark:[mix-blend-mode:screen]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}
