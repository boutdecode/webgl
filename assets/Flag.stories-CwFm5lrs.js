import{a as p,b as m,T as d,c as v,j as c,S as E,P as h,R as j,V as w,C as M,D as b,u as F}from"./Setup-TSTbCgsd.js";import{r as i}from"./index-DJO9vBfz.js";import"./extends-CF3RwP-h.js";const l=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function f(e,t){const o=p(n=>n.gl),r=m(v,l(e)?Object.values(e):e);return i.useLayoutEffect(()=>{t==null||t(r)},[t]),i.useEffect(()=>{if("initTexture"in o){let n=[];Array.isArray(r)?n=r:r instanceof d?n=[r]:l(r)&&(n=Object.values(r)),n.forEach(a=>{a instanceof d&&o.initTexture(a)})}},[o,r]),i.useMemo(()=>{if(l(e)){const n={};let a=0;for(const y in e)n[y]=r[a++];return n}else return r},[e,r])}f.preload=e=>m.preload(v,e);f.clear=e=>m.clear(v,e);var P=`uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionMatrix = projectionMatrix * viewPosition;

    gl_Position = projectionMatrix;
    vUv = uv;
    vElevation = elevation;
}`,S=`precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation + .5;
    gl_FragColor = textureColor * vec4(uColor, 1.0);
}`;const D={title:"Shader/Flag",tags:["autodocs"],argTypes:{color:{control:"color",description:"Flag color"},frequency:{control:"object",description:"Flag frequency"}},args:{color:"white",frequency:{x:10,y:5}},decorators:[e=>c.jsx(E,{cameraPosition:[0,0,1],children:c.jsx(e,{})})]},s={render({color:e,frequency:t}){const o=f("./textures/flag-french.jpg"),r=i.useMemo(()=>new h(1,1,32,32),[]),u=i.useMemo(()=>new j({vertexShader:P,fragmentShader:S,uniforms:{uFrequency:{value:new w(t.x,t.y)},uTime:{value:0},uColor:{value:new M(e)},uTexture:{value:o}},side:b}),[e,t,o]);return F(n=>{const a=n.clock.getElapsedTime();u.uniforms.uTime.value=a}),c.jsx("mesh",{geometry:r,material:u})}};var x,g,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render({
    color,
    frequency
  }) {
    const flagTexture = useTexture('./textures/flag-french.jpg');
    const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 32, 32), []);
    const material = useMemo(() => new THREE.RawShaderMaterial({
      vertexShader,
      // @lib/shaders/flag/vertex.glsl
      fragmentShader,
      // @lib/shaders/flag/fragment.glsl
      uniforms: {
        uFrequency: {
          value: new THREE.Vector2(frequency.x, frequency.y)
        },
        uTime: {
          value: 0
        },
        uColor: {
          value: new THREE.Color(color)
        },
        uTexture: {
          value: flagTexture
        }
      },
      side: THREE.DoubleSide
    }), [color, frequency, flagTexture]);
    useFrame(state => {
      const elapsedTime = state.clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
    });
    return <mesh geometry={geometry} material={material} />;
  }
}`,...(T=(g=s.parameters)==null?void 0:g.docs)==null?void 0:T.source}}};const _=["Default"];export{s as Default,_ as __namedExportsOrder,D as default};
