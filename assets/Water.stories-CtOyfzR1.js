import{j as a,S as P,P as C,R as E,V as w,C as f,D as B,u as h}from"./Setup-TSTbCgsd.js";import{r as d}from"./index-DJO9vBfz.js";import"./extends-CF3RwP-h.js";var M=`uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWavesSpeed;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); 
    vec3 Pi1 = Pi0 + vec3(1.0); 
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation =
        sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed) *
        cos(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWavesSpeed) *
        uBigWavesElevation;

    for (float i = 1.0; i <= 4.0; i++) {
        elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionMatrix = projectionMatrix * viewPosition;

    gl_Position = projectionMatrix;
    vUv = uv;
    vElevation = elevation;
}`,q=`precision mediump float;

uniform vec3 uColor;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec2 vUv;
varying float vElevation;

void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}`;const _={title:"Shader/Water",tags:["autodocs"],argTypes:{uBigWavesElevation:{control:"number",description:"Big waves elevation"},uBigWavesFrequency:{control:"object",description:"Big waves frequency"},uSmallWavesElevation:{control:"number",description:"Small waves elevation"},uSmallWavesFrequency:{control:"number",description:"Small waves frequency"},uSmallWavesSpeed:{control:"number",description:"Small waves speed"},uSmallWavesIterations:{control:"number",description:"Small waves iterations"},uBigWavesSpeed:{control:"number",description:"Big waves speed"},uDepthColor:{control:"color",description:"Depth color"},uSurfaceColor:{control:"color",description:"Surface color"},uColorOffset:{control:"number",description:"Color offset"},uColorMultiplier:{control:"number",description:"Color multiplier"}},args:{uBigWavesElevation:.2,uBigWavesFrequency:{x:4,y:1.5},uSmallWavesElevation:.15,uSmallWavesFrequency:3,uSmallWavesSpeed:.2,uSmallWavesIterations:4,uBigWavesSpeed:.75,uDepthColor:"#186691",uSurfaceColor:"#9bd8ff",uColorOffset:.1,uColorMultiplier:5},decorators:[e=>a.jsx(P,{cameraPosition:[1,1,2],children:a.jsx(e,{})})]},n={render({uBigWavesElevation:e,uBigWavesFrequency:o,uSmallWavesElevation:r,uSmallWavesFrequency:t,uSmallWavesSpeed:l,uSmallWavesIterations:i,uBigWavesSpeed:u,uDepthColor:v,uSurfaceColor:s,uColorOffset:c,uColorMultiplier:m}){const S=d.useMemo(()=>new C(2,2,512,512),[]),g=d.useMemo(()=>new E({vertexShader:M,fragmentShader:q,wireframe:!0,uniforms:{uTime:{value:0},uBigWavesElevation:{value:e},uBigWavesFrequency:{value:new w(o.x,o.y)},uSmallWavesElevation:{value:r},uSmallWavesFrequency:{value:t},uSmallWavesSpeed:{value:l},uSmallWavesIterations:{value:i},uBigWavesSpeed:{value:u},uDepthColor:{value:new f(v)},uSurfaceColor:{value:new f(s)},uColorOffset:{value:c},uColorMultiplier:{value:m}},side:B}),[e,o,r,t,l,i,u,v,s,c,m]);return h(z=>{const W=z.clock.getElapsedTime();g.uniforms.uTime.value=W}),a.jsx("mesh",{"rotation-x":Math.PI/2,geometry:S,material:g})}};var x,y,p;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render({
    uBigWavesElevation,
    uBigWavesFrequency,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallWavesIterations,
    uBigWavesSpeed,
    uDepthColor,
    uSurfaceColor,
    uColorOffset,
    uColorMultiplier
  }) {
    const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2, 512, 512), []);
    const material = useMemo(() => new THREE.RawShaderMaterial({
      vertexShader,
      // @lib/shaders/water/vertex.glsl
      fragmentShader,
      // @lib/shaders/water/fragment.glsl
      wireframe: true,
      uniforms: {
        uTime: {
          value: 0
        },
        uBigWavesElevation: {
          value: uBigWavesElevation
        },
        uBigWavesFrequency: {
          value: new THREE.Vector2(uBigWavesFrequency.x, uBigWavesFrequency.y)
        },
        uSmallWavesElevation: {
          value: uSmallWavesElevation
        },
        uSmallWavesFrequency: {
          value: uSmallWavesFrequency
        },
        uSmallWavesSpeed: {
          value: uSmallWavesSpeed
        },
        uSmallWavesIterations: {
          value: uSmallWavesIterations
        },
        uBigWavesSpeed: {
          value: uBigWavesSpeed
        },
        uDepthColor: {
          value: new THREE.Color(uDepthColor)
        },
        uSurfaceColor: {
          value: new THREE.Color(uSurfaceColor)
        },
        uColorOffset: {
          value: uColorOffset
        },
        uColorMultiplier: {
          value: uColorMultiplier
        }
      },
      side: THREE.DoubleSide
    }), [uBigWavesElevation, uBigWavesFrequency, uSmallWavesElevation, uSmallWavesFrequency, uSmallWavesSpeed, uSmallWavesIterations, uBigWavesSpeed, uDepthColor, uSurfaceColor, uColorOffset, uColorMultiplier]);
    useFrame(state => {
      const elapsedTime = state.clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
    });
    return <mesh rotation-x={Math.PI / 2} geometry={geometry} material={material} />;
  }
}`,...(p=(y=n.parameters)==null?void 0:y.docs)==null?void 0:p.source}}};const D=["Default"];export{n as Default,D as __namedExportsOrder,_ as default};
