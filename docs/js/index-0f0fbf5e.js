import{_ as e,a as s}from"./index-f57b762d.js";import{i as t,e as a,_ as i,k as o,j as l,c as r,a as n,F as m,a8 as p,u,V as c,P as d,S as v,ai as j,o as f,U as g,ay as y,az as x}from"./@vue-bf6c6ff6.js";import"./@element-plus-7f5482a3.js";import"./element-plus-e4ede52b.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-dc4a31b0.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./dayjs-c6009091.js";import"./aplayer-5d7f43e3.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./vxe-table-ad5101dd.js";import"./xe-utils-79f6bbe6.js";import"./dom-zindex-e3f8f991.js";import"./axios-86de682d.js";import"./vuex-7f823aa9.js";import"./vue-router-2e9de4c5.js";import"./vue-i18n-9a9600a9.js";import"./@intlify-b74bcea3.js";const h={class:"container"},_={class:"main"},k={class:"img-area"},z=["src","poster"],T=["title"],w=(e=>(y("data-v-4a9a3c4a"),e=e(),x(),e))((()=>n("div",null,[n("div",null,"下一页"),n("div",null,"更多精彩")],-1))),E=e({__name:"index",setup(e){const{proxy:y}=t(),x=a([]),E=a(0),U=i({page:0,size:15});let b=o((()=>x.value.length>0&&x.value.length<E.value));const B=async()=>{var e,t;const a=await s(U);200==a.code&&(x.value=[...x.value,...null==(e=a.result)?void 0:e.list],E.value=null==(t=a.result)?void 0:t.total,N())},N=()=>{let e=document.getElementsByTagName("video");y.$nextTick((function(){for(let s=0;s<e.length;s++)!function(s){e[s].addEventListener("play",(function(){R(s)}))}(s)}))},R=e=>{let s=document.getElementsByTagName("video");y.$nextTick((function(){for(let t=0;t<s.length;t++)t!==e&&s[t].pause()}))};return l((()=>{B()})),(e,s)=>{const t=j("DArrowRight"),a=j("el-icon");return f(),r("div",h,[n("div",_,[(f(!0),r(m,null,p(x.value,((e,s)=>(f(),r("div",{class:"item",key:s},[n("div",k,[n("video",{ref_for:!0,ref:"videoRef",src:e.playUrl,poster:e.coverUrl,controls:"controls"},null,8,z)]),n("div",{class:"name",title:e.title},g(e.title),9,T)])))),128)),u(b)?(f(),r("div",{key:0,class:"item card",onClick:s[0]||(s[0]=e=>(U.page++,void B()))},[c(a,{size:60},{default:d((()=>[c(t)])),_:1}),w])):v("",!0)])])}}},[["__scopeId","data-v-4a9a3c4a"]]);export{E as default};
