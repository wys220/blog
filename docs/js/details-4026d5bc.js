import{_ as s,g as e}from"./index-f57b762d.js";import{u as a}from"./vue-router-2e9de4c5.js";import{i as t,e as i,_ as l,k as r,j as o,c as m,a as p,F as u,a8 as n,u as v,V as c,P as d,S as j,ai as f,o as y,U as g,ay as h,az as x}from"./@vue-bf6c6ff6.js";import"./@element-plus-7f5482a3.js";import"./element-plus-e4ede52b.js";import"./lodash-es-d4f5f48c.js";import"./@vueuse-dc4a31b0.js";import"./@popperjs-b78c3215.js";import"./@ctrl-91de2ec7.js";import"./dayjs-c6009091.js";import"./aplayer-5d7f43e3.js";import"./async-validator-cf877c1f.js";import"./memoize-one-63ab667a.js";import"./normalize-wheel-es-3222b0a2.js";import"./@floating-ui-36fbce82.js";import"./vxe-table-ad5101dd.js";import"./xe-utils-79f6bbe6.js";import"./dom-zindex-e3f8f991.js";import"./axios-86de682d.js";import"./vuex-7f823aa9.js";import"./vue-i18n-9a9600a9.js";import"./@intlify-b74bcea3.js";const z={class:"container w100 h100 ofa"},_={class:"main"},w={class:"img-area"},b=["title"],k=(s=>(h("data-v-63ef5bf3"),s=s(),x(),s))((()=>p("div",null,[p("div",null,"下一页"),p("div",null,"更多精彩")],-1))),A=s({__name:"details",setup(s){t();const h=a(),x=i([]);i(0);const A=i(0),C=l({type:"beauty",page:0,size:15});let D=r((()=>x.value.length>0&&x.value.length<A.value));const F=async()=>{var s,a;const t=await e(C);200==t.code&&(x.value=[...x.value,...null==(s=t.result)?void 0:s.list],A.value=null==(a=t.result)?void 0:a.total)},I=s=>{let e=[...x.value];if(0===s)return e.map((s=>s.url));let a=e.splice(s),t=e.splice(0,s);return a.concat(t).map((s=>s.url))};let P=i(null);return o((()=>{var s;P.value=h.params,C.type=null==(s=h.params)?void 0:s.type,F()})),(s,e)=>{const a=f("el-image"),t=f("DArrowRight"),i=f("el-icon");return y(),m("div",z,[p("div",_,[(y(!0),m(u,null,n(x.value,((s,e)=>(y(),m("div",{class:"item",key:e},[p("div",w,[c(a,{class:"img-sty",src:s.url,"zoom-rate":1.2,"preview-src-list":I(e),"hide-on-click-modal":!0,fit:"cover"},null,8,["src","preview-src-list"])]),p("div",{class:"name",title:s.title},g(s.title),9,b)])))),128)),v(D)?(y(),m("div",{key:0,class:"item card",onClick:e[0]||(e[0]=s=>(C.page++,void F()))},[c(i,{size:60},{default:d((()=>[c(t)])),_:1}),k])):j("",!0)])])}}},[["__scopeId","data-v-63ef5bf3"]]);export{A as default};
