import{j as r,S as i}from"./Setup-TSTbCgsd.js";import"./index-DJO9vBfz.js";import"./extends-CF3RwP-h.js";const x={title:"Geometric/Cube",tags:["autodocs"],argTypes:{color:{control:"color",description:"Cube color"}},args:{color:"orange"},decorators:[e=>r.jsx(i,{children:r.jsx(e,{})})]},o={render({color:e}){return r.jsxs("mesh",{children:[r.jsx("boxGeometry",{}),r.jsx("meshBasicMaterial",{color:e})]})}},s={render({color:e}){return r.jsxs("mesh",{children:[r.jsx("boxGeometry",{}),r.jsx("meshStandardMaterial",{color:e})]})}};var a,t,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render({
    color
  }) {
    return <mesh>
      <boxGeometry />
      <meshBasicMaterial color={color} />
    </mesh>;
  }
}`,...(n=(t=o.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var c,m,d;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render({
    color
  }) {
    return <mesh>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>;
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const h=["Basic","Standard"];export{o as Basic,s as Standard,h as __namedExportsOrder,x as default};
