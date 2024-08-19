import{a as e,i as a,b as t,c as l,d as n,e as r,D as s,f as o,g as i,h as u,j as c,r as _,k as m,l as f,m as g,s as v,n as p,o as b,p as d,q as L,u as E,t as I,N as T,v as k,w as F,x as N,y as O,z as h,C as R,A as P,B as y,E as M,F as W,G as A,H as D,I as C,J as U,K as w,M as H,L as S,O as $,P as V,Q as x,R as Y,S as j,T as G,U as B}from"./@intlify-b54f8de8.js";import{d as X,ah as J,i as z,ao as q,B as Q,j as K,Y as Z,s as ee,b as ae,k as te,E as le,e as ne,F as re,D as se,U as oe,a5 as ie}from"./@vue-a48b1e2a.js";
/*!
  * vue-i18n v9.14.0
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */const ue="9.14.0";const ce=G.__EXTEND_POINT__,_e=P(ce);_e(),_e(),_e(),_e(),_e(),_e(),_e(),_e(),_e();const me=R.__EXTEND_POINT__,fe=P(me),ge={UNEXPECTED_RETURN_TYPE:me,INVALID_ARGUMENT:fe(),MUST_BE_CALL_SETUP_TOP:fe(),NOT_INSTALLED:fe(),NOT_AVAILABLE_IN_LEGACY_MODE:fe(),REQUIRED_VALUE:fe(),INVALID_VALUE:fe(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:fe(),NOT_INSTALLED_WITH_PROVIDE:fe(),UNEXPECTED_ERROR:fe(),NOT_COMPATIBLE_LEGACY_VUE_I18N:fe(),BRIDGE_SUPPORT_VUE_2_ONLY:fe(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:fe(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:fe(),__EXTEND_POINT__:fe()};function ve(e,...a){return p(e,null,void 0)}const pe=b("__translateVNode"),be=b("__datetimeParts"),de=b("__numberParts"),Le=b("__setPluralRules"),Ee=b("__injectWithOption"),Ie=b("__dispose");function Te(e){if(!l(e))return e;for(const a in e)if(L(e,a))if(a.includes(".")){const t=a.split("."),n=t.length-1;let r=e,s=!1;for(let e=0;e<n;e++){if(t[e]in r||(r[t[e]]={}),!l(r[t[e]])){s=!0;break}r=r[t[e]]}s||(r[t[n]]=e[a],delete e[a]),l(r[t[n]])&&Te(r[t[n]])}else l(e[a])&&Te(e[a]);return e}function ke(e,a){const{messages:l,__i18n:n,messageResolver:r,flatJson:s}=a,u=i(l)?l:o(n)?{}:{[e]:{}};if(o(n)&&n.forEach((e=>{if("locale"in e&&"resource"in e){const{locale:a,resource:t}=e;a?(u[a]=u[a]||{},d(t,u[a])):d(t,u)}else t(e)&&d(JSON.parse(e),u)})),null==r&&s)for(const t in u)L(u,t)&&Te(u[t]);return u}function Fe(e){return e.type}function Ne(e,a,t){let n=l(a.messages)?a.messages:{};"__i18nGlobal"in t&&(n=ke(e.locale.value,{messages:n,__i18n:t.__i18nGlobal}));const r=Object.keys(n);if(r.length&&r.forEach((a=>{e.mergeLocaleMessage(a,n[a])})),l(a.datetimeFormats)){const t=Object.keys(a.datetimeFormats);t.length&&t.forEach((t=>{e.mergeDateTimeFormat(t,a.datetimeFormats[t])}))}if(l(a.numberFormats)){const t=Object.keys(a.numberFormats);t.length&&t.forEach((t=>{e.mergeNumberFormat(t,a.numberFormats[t])}))}}function Oe(e){return oe(ie,null,e,0)}const he="__INTLIFY_META__",Re=()=>[],Pe=()=>!1;let ye=0;function Me(e){return(a,t,l,n)=>e(t,l,z()||void 0,n)}const We=()=>{const e=z();let a=null;return e&&(a=Fe(e)[he])?{[he]:a}:null};function Ae(r={},_){const{__root:m,__injectWithOption:f}=r,g=void 0===m,v=r.flatJson,p=I?ae:ee,b=!!r.translateExistCompatible;let T=!n(r.inheritLocale)||r.inheritLocale;const k=p(m&&T?m.locale.value:t(r.locale)?r.locale:s),F=p(m&&T?m.fallbackLocale.value:t(r.fallbackLocale)||o(r.fallbackLocale)||i(r.fallbackLocale)||!1===r.fallbackLocale?r.fallbackLocale:k.value),N=p(ke(k.value,r)),O=p(i(r.datetimeFormats)?r.datetimeFormats:{[k.value]:{}}),R=p(i(r.numberFormats)?r.numberFormats:{[k.value]:{}});let P=m?m.missingWarn:!n(r.missingWarn)&&!u(r.missingWarn)||r.missingWarn,G=m?m.fallbackWarn:!n(r.fallbackWarn)&&!u(r.fallbackWarn)||r.fallbackWarn,X=m?m.fallbackRoot:!n(r.fallbackRoot)||r.fallbackRoot,J=!!r.fallbackFormat,z=c(r.missing)?r.missing:null,q=c(r.missing)?Me(r.missing):null,Q=c(r.postTranslation)?r.postTranslation:null,K=m?m.warnHtmlMessage:!n(r.warnHtmlMessage)||r.warnHtmlMessage,Z=!!r.escapeParameter;const le=m?m.modifiers:i(r.modifiers)?r.modifiers:{};let re,se=r.pluralRules||m&&m.pluralRules;re=(()=>{g&&B(null);const e={version:ue,locale:k.value,fallbackLocale:F.value,messages:N.value,modifiers:le,pluralRules:se,missing:null===q?void 0:q,missingWarn:P,fallbackWarn:G,fallbackFormat:J,unresolving:!0,postTranslation:null===Q?void 0:Q,warnHtmlMessage:K,escapeParameter:Z,messageResolver:r.messageResolver,messageCompiler:r.messageCompiler,__meta:{framework:"vue"}};e.datetimeFormats=O.value,e.numberFormats=R.value,e.__datetimeFormatters=i(re)?re.__datetimeFormatters:void 0,e.__numberFormatters=i(re)?re.__numberFormatters:void 0;const a=y(e);return g&&B(a),a})(),E(re,k.value,F.value);const oe=te({get:()=>k.value,set:e=>{k.value=e,re.locale=k.value}}),ie=te({get:()=>F.value,set:e=>{F.value=e,re.fallbackLocale=F.value,E(re,k.value,e)}}),ce=te((()=>N.value)),_e=te((()=>O.value)),me=te((()=>R.value));const fe=(e,t,l,n,r,s)=>{let o;k.value,F.value,N.value,O.value,R.value;try{__INTLIFY_PROD_DEVTOOLS__&&A(We()),g||(re.fallbackContext=m?D():void 0),o=e(re)}finally{__INTLIFY_PROD_DEVTOOLS__,g||(re.fallbackContext=void 0)}if("translate exists"!==l&&a(o)&&o===C||"translate exists"===l&&!o){const[e,a]=t();return m&&X?n(m):r(e)}if(s(o))return o;throw ve(ge.UNEXPECTED_RETURN_TYPE)};function Ie(...e){return fe((a=>Reflect.apply(w,null,[a,...e])),(()=>U(...e)),"translate",(a=>Reflect.apply(a.t,a,[...e])),(e=>e),(e=>t(e)))}const Fe={normalize:function(e){return e.map((e=>t(e)||a(e)||n(e)?Oe(String(e)):e))},interpolate:e=>e,type:"vnode"};function Ne(e){return N.value[e]||{}}ye++,m&&I&&(ne(m.locale,(e=>{T&&(k.value=e,re.locale=e,E(re,k.value,F.value))})),ne(m.fallbackLocale,(e=>{T&&(F.value=e,re.fallbackLocale=e,E(re,k.value,F.value))})));const he={id:ye,locale:oe,fallbackLocale:ie,get inheritLocale(){return T},set inheritLocale(e){T=e,e&&m&&(k.value=m.locale.value,F.value=m.fallbackLocale.value,E(re,k.value,F.value))},get availableLocales(){return Object.keys(N.value).sort()},messages:ce,get modifiers(){return le},get pluralRules(){return se||{}},get isGlobal(){return g},get missingWarn(){return P},set missingWarn(e){P=e,re.missingWarn=P},get fallbackWarn(){return G},set fallbackWarn(e){G=e,re.fallbackWarn=G},get fallbackRoot(){return X},set fallbackRoot(e){X=e},get fallbackFormat(){return J},set fallbackFormat(e){J=e,re.fallbackFormat=J},get warnHtmlMessage(){return K},set warnHtmlMessage(e){K=e,re.warnHtmlMessage=e},get escapeParameter(){return Z},set escapeParameter(e){Z=e,re.escapeParameter=e},t:Ie,getLocaleMessage:Ne,setLocaleMessage:function(e,a){if(v){const t={[e]:a};for(const e in t)L(t,e)&&Te(t[e]);a=t[e]}N.value[e]=a,re.messages=N.value},mergeLocaleMessage:function(e,a){N.value[e]=N.value[e]||{};const t={[e]:a};if(v)for(const l in t)L(t,l)&&Te(t[l]);d(a=t[e],N.value[e]),re.messages=N.value},getPostTranslationHandler:function(){return c(Q)?Q:null},setPostTranslationHandler:function(e){Q=e,re.postTranslation=e},getMissingHandler:function(){return z},setMissingHandler:function(e){null!==e&&(q=Me(e)),z=e,re.missing=q},[Le]:function(e){se=e,re.pluralRules=se}};return he.datetimeFormats=_e,he.numberFormats=me,he.rt=function(...a){const[t,n,r]=a;if(r&&!l(r))throw ve(ge.INVALID_ARGUMENT);return Ie(t,n,e({resolvedMessage:!0},r||{}))},he.te=function(e,a){return fe((()=>{if(!e)return!1;const l=Ne(t(a)?a:k.value),n=re.messageResolver(l,e);return b?null!=n:Y(n)||j(n)||t(n)}),(()=>[e]),"translate exists",(t=>Reflect.apply(t.te,t,[e,a])),Pe,(e=>n(e)))},he.tm=function(e){const a=function(e){let a=null;const t=h(re,F.value,k.value);for(let l=0;l<t.length;l++){const n=N.value[t[l]]||{},r=re.messageResolver(n,e);if(null!=r){a=r;break}}return a}(e);return null!=a?a:m&&m.tm(e)||{}},he.d=function(...e){return fe((a=>Reflect.apply($,null,[a,...e])),(()=>S(...e)),"datetime format",(a=>Reflect.apply(a.d,a,[...e])),(()=>H),(e=>t(e)))},he.n=function(...e){return fe((a=>Reflect.apply(x,null,[a,...e])),(()=>V(...e)),"number format",(a=>Reflect.apply(a.n,a,[...e])),(()=>H),(e=>t(e)))},he.getDateTimeFormat=function(e){return O.value[e]||{}},he.setDateTimeFormat=function(e,a){O.value[e]=a,re.datetimeFormats=O.value,M(re,e,a)},he.mergeDateTimeFormat=function(a,t){O.value[a]=e(O.value[a]||{},t),re.datetimeFormats=O.value,M(re,a,t)},he.getNumberFormat=function(e){return R.value[e]||{}},he.setNumberFormat=function(e,a){R.value[e]=a,re.numberFormats=R.value,W(re,e,a)},he.mergeNumberFormat=function(a,t){R.value[a]=e(R.value[a]||{},t),re.numberFormats=R.value,W(re,a,t)},he[Ee]=f,he[pe]=function(...e){return fe((a=>{let t;const l=a;try{l.processor=Fe,t=Reflect.apply(w,null,[l,...e])}finally{l.processor=null}return t}),(()=>U(...e)),"translate",(a=>a[pe](...e)),(e=>[Oe(e)]),(e=>o(e)))},he[be]=function(...e){return fe((a=>Reflect.apply($,null,[a,...e])),(()=>S(...e)),"datetime format",(a=>a[be](...e)),Re,(e=>t(e)||o(e)))},he[de]=function(...e){return fe((a=>Reflect.apply(x,null,[a,...e])),(()=>V(...e)),"number format",(a=>a[de](...e)),Re,(e=>t(e)||o(e)))},he}function De(l={},r){{const r=Ae(function(a){const l=t(a.locale)?a.locale:s,r=t(a.fallbackLocale)||o(a.fallbackLocale)||i(a.fallbackLocale)||!1===a.fallbackLocale?a.fallbackLocale:l,_=c(a.missing)?a.missing:void 0,m=!n(a.silentTranslationWarn)&&!u(a.silentTranslationWarn)||!a.silentTranslationWarn,f=!n(a.silentFallbackWarn)&&!u(a.silentFallbackWarn)||!a.silentFallbackWarn,g=!n(a.fallbackRoot)||a.fallbackRoot,v=!!a.formatFallbackMessages,p=i(a.modifiers)?a.modifiers:{},b=a.pluralizationRules,d=c(a.postTranslation)?a.postTranslation:void 0,L=!t(a.warnHtmlInMessage)||"off"!==a.warnHtmlInMessage,E=!!a.escapeParameterHtml,I=!n(a.sync)||a.sync;let T=a.messages;if(i(a.sharedMessages)){const t=a.sharedMessages;T=Object.keys(t).reduce(((a,l)=>{const n=a[l]||(a[l]={});return e(n,t[l]),a}),T||{})}const{__i18n:k,__root:F,__injectWithOption:N}=a,O=a.datetimeFormats,h=a.numberFormats,R=a.flatJson,P=a.translateExistCompatible;return{locale:l,fallbackLocale:r,messages:T,flatJson:R,datetimeFormats:O,numberFormats:h,missing:_,missingWarn:m,fallbackWarn:f,fallbackRoot:g,fallbackFormat:v,modifiers:p,pluralRules:b,postTranslation:d,warnHtmlMessage:L,escapeParameter:E,messageResolver:a.messageResolver,inheritLocale:I,translateExistCompatible:P,__i18n:k,__root:F,__injectWithOption:N}}(l)),{__extender:_}=l,m={id:r.id,get locale(){return r.locale.value},set locale(e){r.locale.value=e},get fallbackLocale(){return r.fallbackLocale.value},set fallbackLocale(e){r.fallbackLocale.value=e},get messages(){return r.messages.value},get datetimeFormats(){return r.datetimeFormats.value},get numberFormats(){return r.numberFormats.value},get availableLocales(){return r.availableLocales},get formatter(){return{interpolate:()=>[]}},set formatter(e){},get missing(){return r.getMissingHandler()},set missing(e){r.setMissingHandler(e)},get silentTranslationWarn(){return n(r.missingWarn)?!r.missingWarn:r.missingWarn},set silentTranslationWarn(e){r.missingWarn=n(e)?!e:e},get silentFallbackWarn(){return n(r.fallbackWarn)?!r.fallbackWarn:r.fallbackWarn},set silentFallbackWarn(e){r.fallbackWarn=n(e)?!e:e},get modifiers(){return r.modifiers},get formatFallbackMessages(){return r.fallbackFormat},set formatFallbackMessages(e){r.fallbackFormat=e},get postTranslation(){return r.getPostTranslationHandler()},set postTranslation(e){r.setPostTranslationHandler(e)},get sync(){return r.inheritLocale},set sync(e){r.inheritLocale=e},get warnHtmlInMessage(){return r.warnHtmlMessage?"warn":"off"},set warnHtmlInMessage(e){r.warnHtmlMessage="off"!==e},get escapeParameterHtml(){return r.escapeParameter},set escapeParameterHtml(e){r.escapeParameter=e},get preserveDirectiveContent(){return!0},set preserveDirectiveContent(e){},get pluralizationRules(){return r.pluralRules||{}},__composer:r,t(...e){const[a,l,n]=e,s={};let u=null,c=null;if(!t(a))throw ve(ge.INVALID_ARGUMENT);const _=a;return t(l)?s.locale=l:o(l)?u=l:i(l)&&(c=l),o(n)?u=n:i(n)&&(c=n),Reflect.apply(r.t,r,[_,u||c||{},s])},rt:(...e)=>Reflect.apply(r.rt,r,[...e]),tc(...e){const[l,n,s]=e,u={plural:1};let c=null,_=null;if(!t(l))throw ve(ge.INVALID_ARGUMENT);const m=l;return t(n)?u.locale=n:a(n)?u.plural=n:o(n)?c=n:i(n)&&(_=n),t(s)?u.locale=s:o(s)?c=s:i(s)&&(_=s),Reflect.apply(r.t,r,[m,c||_||{},u])},te:(e,a)=>r.te(e,a),tm:e=>r.tm(e),getLocaleMessage:e=>r.getLocaleMessage(e),setLocaleMessage(e,a){r.setLocaleMessage(e,a)},mergeLocaleMessage(e,a){r.mergeLocaleMessage(e,a)},d:(...e)=>Reflect.apply(r.d,r,[...e]),getDateTimeFormat:e=>r.getDateTimeFormat(e),setDateTimeFormat(e,a){r.setDateTimeFormat(e,a)},mergeDateTimeFormat(e,a){r.mergeDateTimeFormat(e,a)},n:(...e)=>Reflect.apply(r.n,r,[...e]),getNumberFormat:e=>r.getNumberFormat(e),setNumberFormat(e,a){r.setNumberFormat(e,a)},mergeNumberFormat(e,a){r.mergeNumberFormat(e,a)},getChoiceIndex:(e,a)=>-1};return m.__extender=_,m}}const Ce={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>"parent"===e||"global"===e,default:"parent"},i18n:{type:Object}};function Ue(e){return re}const we=X({name:"i18n-t",props:e({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>a(e)||!isNaN(e)}},Ce),setup(a,n){const{slots:r,attrs:s}=n,o=a.i18n||Xe({useScope:a.scope,__useComponent:!0});return()=>{const i=Object.keys(r).filter((e=>"_"!==e)),u={};a.locale&&(u.locale=a.locale),void 0!==a.plural&&(u.plural=t(a.plural)?+a.plural:a.plural);const c=function({slots:e},a){if(1===a.length&&"default"===a[0])return(e.default?e.default():[]).reduce(((e,a)=>[...e,...a.type===re?a.children:[a]]),[]);return a.reduce(((a,t)=>{const l=e[t];return l&&(a[t]=l()),a}),{})}(n,i),_=o[pe](a.keypath,c,u),m=e({},s),f=t(a.tag)||l(a.tag)?a.tag:Ue();return J(f,m,_)}}});function He(a,n,r,s){const{slots:i,attrs:u}=n;return()=>{const n={part:!0};let c={};a.locale&&(n.locale=a.locale),t(a.format)?n.key=a.format:l(a.format)&&(t(a.format.key)&&(n.key=a.format.key),c=Object.keys(a.format).reduce(((t,l)=>r.includes(l)?e({},t,{[l]:a.format[l]}):t),{}));const _=s(a.value,n,c);let m=[n.key];o(_)?m=_.map(((e,a)=>{const l=i[e.type],n=l?l({[e.type]:e.value,index:a,parts:_}):[e.value];var r;return o(r=n)&&!t(r[0])&&(n[0].key=`${e.type}-${a}`),n})):t(_)&&(m=[_]);const f=e({},u),g=t(a.tag)||l(a.tag)?a.tag:Ue();return J(g,f,m)}}const Se=X({name:"i18n-n",props:e({value:{type:Number,required:!0},format:{type:[String,Object]}},Ce),setup(e,a){const t=e.i18n||Xe({useScope:e.scope,__useComponent:!0});return He(e,a,T,((...e)=>t[de](...e)))}}),$e=X({name:"i18n-d",props:e({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},Ce),setup(e,a){const t=e.i18n||Xe({useScope:e.scope,__useComponent:!0});return He(e,a,k,((...e)=>t[be](...e)))}});function Ve(e){if(t(e))return{path:e};if(i(e)){if(!("path"in e))throw ve(ge.REQUIRED_VALUE);return e}throw ve(ge.INVALID_VALUE)}function xe(e){const{path:l,locale:n,args:r,choice:s,plural:o}=e,i={},u=r||{};return t(n)&&(i.locale=n),a(s)&&(i.plural=s),a(o)&&(i.plural=o),[l,u,i]}function Ye(e,a,...t){const l=i(t[0])?t[0]:{},r=!!l.useI18nComponentName;(!n(l.globalInstall)||l.globalInstall)&&([r?"i18n":we.name,"I18nT"].forEach((a=>e.component(a,we))),[Se.name,"I18nN"].forEach((a=>e.component(a,Se))),[$e.name,"I18nD"].forEach((a=>e.component(a,$e)))),e.directive("t",function(e){const a=a=>{const{instance:t,modifiers:l,value:n}=a;if(!t||!t.$)throw ve(ge.UNEXPECTED_ERROR);const r=function(e,a){const t=e;if("composition"===e.mode)return t.__getInstance(a)||e.global;{const l=t.__getInstance(a);return null!=l?l.__composer:e.global.__composer}}(e,t.$),s=Ve(n);return[Reflect.apply(r.t,r,[...xe(s)]),r]};return{created:(t,l)=>{const[n,r]=a(l);I&&e.global===r&&(t.__i18nWatcher=ne(r.locale,(()=>{l.instance&&l.instance.$forceUpdate()}))),t.__composer=r,t.textContent=n},unmounted:e=>{I&&e.__i18nWatcher&&(e.__i18nWatcher(),e.__i18nWatcher=void 0,delete e.__i18nWatcher),e.__composer&&(e.__composer=void 0,delete e.__composer)},beforeUpdate:(e,{value:a})=>{if(e.__composer){const t=e.__composer,l=Ve(a);e.textContent=Reflect.apply(t.t,t,[...xe(l)])}},getSSRProps:e=>{const[t]=a(e);return{textContent:t}}}}(a))}function je(e,a){e.locale=a.locale||e.locale,e.fallbackLocale=a.fallbackLocale||e.fallbackLocale,e.missing=a.missing||e.missing,e.silentTranslationWarn=a.silentTranslationWarn||e.silentFallbackWarn,e.silentFallbackWarn=a.silentFallbackWarn||e.silentFallbackWarn,e.formatFallbackMessages=a.formatFallbackMessages||e.formatFallbackMessages,e.postTranslation=a.postTranslation||e.postTranslation,e.warnHtmlInMessage=a.warnHtmlInMessage||e.warnHtmlInMessage,e.escapeParameterHtml=a.escapeParameterHtml||e.escapeParameterHtml,e.sync=a.sync||e.sync,e.__composer[Le](a.pluralizationRules||e.pluralizationRules);const t=ke(e.locale,{messages:a.messages,__i18n:a.__i18n});return Object.keys(t).forEach((a=>e.mergeLocaleMessage(a,t[a]))),a.datetimeFormats&&Object.keys(a.datetimeFormats).forEach((t=>e.mergeDateTimeFormat(t,a.datetimeFormats[t]))),a.numberFormats&&Object.keys(a.numberFormats).forEach((t=>e.mergeNumberFormat(t,a.numberFormats[t]))),e}const Ge=b("global-vue-i18n");function Be(e={},a){const t=__VUE_I18N_LEGACY_API__&&n(e.legacy)?e.legacy:__VUE_I18N_LEGACY_API__,l=!n(e.globalInjection)||e.globalInjection,r=!__VUE_I18N_LEGACY_API__||!t||!!e.allowComposition,s=new Map,[o,u]=function(e,a){const t=q();{const l=__VUE_I18N_LEGACY_API__&&a?t.run((()=>De(e))):t.run((()=>Ae(e)));if(null==l)throw ve(ge.UNEXPECTED_ERROR);return[t,l]}}(e,t),c=b("");{const e={get mode(){return __VUE_I18N_LEGACY_API__&&t?"legacy":"composition"},get allowComposition(){return r},async install(a,...n){if(a.__VUE_I18N_SYMBOL__=c,a.provide(a.__VUE_I18N_SYMBOL__,e),i(n[0])){const a=n[0];e.__composerExtend=a.__composerExtend,e.__vueI18nExtend=a.__vueI18nExtend}let r=null;!t&&l&&(r=function(e,a){const t=Object.create(null);Je.forEach((e=>{const l=Object.getOwnPropertyDescriptor(a,e);if(!l)throw ve(ge.UNEXPECTED_ERROR);const n=se(l.value)?{get:()=>l.value.value,set(e){l.value.value=e}}:{get:()=>l.get&&l.get()};Object.defineProperty(t,e,n)})),e.config.globalProperties.$i18n=t,ze.forEach((t=>{const l=Object.getOwnPropertyDescriptor(a,t);if(!l||!l.value)throw ve(ge.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${t}`,l)}));const l=()=>{delete e.config.globalProperties.$i18n,ze.forEach((a=>{delete e.config.globalProperties[`$${a}`]}))};return l}(a,e.global)),__VUE_I18N_FULL_INSTALL__&&Ye(a,e,...n),__VUE_I18N_LEGACY_API__&&t&&a.mixin(function(e,a,t){return{beforeCreate(){const l=z();if(!l)throw ve(ge.UNEXPECTED_ERROR);const n=this.$options;if(n.i18n){const l=n.i18n;if(n.__i18n&&(l.__i18n=n.__i18n),l.__root=a,this===this.$root)this.$i18n=je(e,l);else{l.__injectWithOption=!0,l.__extender=t.__vueI18nExtend,this.$i18n=De(l);const e=this.$i18n;e.__extender&&(e.__disposer=e.__extender(this.$i18n))}}else if(n.__i18n)if(this===this.$root)this.$i18n=je(e,n);else{this.$i18n=De({__i18n:n.__i18n,__injectWithOption:!0,__extender:t.__vueI18nExtend,__root:a});const e=this.$i18n;e.__extender&&(e.__disposer=e.__extender(this.$i18n))}else this.$i18n=e;n.__i18nGlobal&&Ne(a,n,n),this.$t=(...e)=>this.$i18n.t(...e),this.$rt=(...e)=>this.$i18n.rt(...e),this.$tc=(...e)=>this.$i18n.tc(...e),this.$te=(e,a)=>this.$i18n.te(e,a),this.$d=(...e)=>this.$i18n.d(...e),this.$n=(...e)=>this.$i18n.n(...e),this.$tm=e=>this.$i18n.tm(e),t.__setInstance(l,this.$i18n)},mounted(){},unmounted(){const e=z();if(!e)throw ve(ge.UNEXPECTED_ERROR);const a=this.$i18n;delete this.$t,delete this.$rt,delete this.$tc,delete this.$te,delete this.$d,delete this.$n,delete this.$tm,a.__disposer&&(a.__disposer(),delete a.__disposer,delete a.__extender),t.__deleteInstance(e),delete this.$i18n}}}(u,u.__composer,e));const s=a.unmount;a.unmount=()=>{r&&r(),e.dispose(),s()}},get global(){return u},dispose(){o.stop()},__instances:s,__getInstance:function(e){return s.get(e)||null},__setInstance:function(e,a){s.set(e,a)},__deleteInstance:function(e){s.delete(e)}};return e}}function Xe(a={}){const l=z();if(null==l)throw ve(ge.MUST_BE_CALL_SETUP_TOP);if(!l.isCE&&null!=l.appContext.app&&!l.appContext.app.__VUE_I18N_SYMBOL__)throw ve(ge.NOT_INSTALLED);const _=function(e){{const a=Q(e.isCE?Ge:e.appContext.app.__VUE_I18N_SYMBOL__);if(!a)throw ve(e.isCE?ge.NOT_INSTALLED_WITH_PROVIDE:ge.UNEXPECTED_ERROR);return a}}(l),m=function(e){return"composition"===e.mode?e.global:e.global.__composer}(_),f=Fe(l),g=function(e,a){return r(e)?"__i18n"in a?"local":"global":e.useScope?e.useScope:"local"}(a,f);if(__VUE_I18N_LEGACY_API__&&"legacy"===_.mode&&!a.__useComponent){if(!_.allowComposition)throw ve(ge.NOT_AVAILABLE_IN_LEGACY_MODE);return function(e,a,l,r={}){const _="local"===a,m=ee(null);if(_&&e.proxy&&!e.proxy.$options.i18n&&!e.proxy.$options.__i18n)throw ve(ge.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION);const f=n(r.inheritLocale)?r.inheritLocale:!t(r.locale),g=ae(!_||f?l.locale.value:t(r.locale)?r.locale:s),v=ae(!_||f?l.fallbackLocale.value:t(r.fallbackLocale)||o(r.fallbackLocale)||i(r.fallbackLocale)||!1===r.fallbackLocale?r.fallbackLocale:g.value),p=ae(ke(g.value,r)),b=ae(i(r.datetimeFormats)?r.datetimeFormats:{[g.value]:{}}),d=ae(i(r.numberFormats)?r.numberFormats:{[g.value]:{}}),L=_?l.missingWarn:!n(r.missingWarn)&&!u(r.missingWarn)||r.missingWarn,E=_?l.fallbackWarn:!n(r.fallbackWarn)&&!u(r.fallbackWarn)||r.fallbackWarn,I=_?l.fallbackRoot:!n(r.fallbackRoot)||r.fallbackRoot,T=!!r.fallbackFormat,k=c(r.missing)?r.missing:null,F=c(r.postTranslation)?r.postTranslation:null,N=_?l.warnHtmlMessage:!n(r.warnHtmlMessage)||r.warnHtmlMessage,O=!!r.escapeParameter,h=_?l.modifiers:i(r.modifiers)?r.modifiers:{},R=r.pluralRules||_&&l.pluralRules;function P(){return[g.value,v.value,p.value,b.value,d.value]}const y=te({get:()=>m.value?m.value.locale.value:g.value,set:e=>{m.value&&(m.value.locale.value=e),g.value=e}}),M=te({get:()=>m.value?m.value.fallbackLocale.value:v.value,set:e=>{m.value&&(m.value.fallbackLocale.value=e),v.value=e}}),W=te((()=>m.value?m.value.messages.value:p.value)),A=te((()=>b.value)),D=te((()=>d.value));function C(){return m.value?m.value.getPostTranslationHandler():F}function U(e){m.value&&m.value.setPostTranslationHandler(e)}function w(){return m.value?m.value.getMissingHandler():k}function H(e){m.value&&m.value.setMissingHandler(e)}function S(e){return P(),e()}function $(...e){return m.value?S((()=>Reflect.apply(m.value.t,null,[...e]))):S((()=>""))}function V(...e){return m.value?Reflect.apply(m.value.rt,null,[...e]):""}function x(...e){return m.value?S((()=>Reflect.apply(m.value.d,null,[...e]))):S((()=>""))}function Y(...e){return m.value?S((()=>Reflect.apply(m.value.n,null,[...e]))):S((()=>""))}function j(e){return m.value?m.value.tm(e):{}}function G(e,a){return!!m.value&&m.value.te(e,a)}function B(e){return m.value?m.value.getLocaleMessage(e):{}}function X(e,a){m.value&&(m.value.setLocaleMessage(e,a),p.value[e]=a)}function J(e,a){m.value&&m.value.mergeLocaleMessage(e,a)}function z(e){return m.value?m.value.getDateTimeFormat(e):{}}function q(e,a){m.value&&(m.value.setDateTimeFormat(e,a),b.value[e]=a)}function Q(e,a){m.value&&m.value.mergeDateTimeFormat(e,a)}function K(e){return m.value?m.value.getNumberFormat(e):{}}function Z(e,a){m.value&&(m.value.setNumberFormat(e,a),d.value[e]=a)}function ne(e,a){m.value&&m.value.mergeNumberFormat(e,a)}const re={get id(){return m.value?m.value.id:-1},locale:y,fallbackLocale:M,messages:W,datetimeFormats:A,numberFormats:D,get inheritLocale(){return m.value?m.value.inheritLocale:f},set inheritLocale(e){m.value&&(m.value.inheritLocale=e)},get availableLocales(){return m.value?m.value.availableLocales:Object.keys(p.value)},get modifiers(){return m.value?m.value.modifiers:h},get pluralRules(){return m.value?m.value.pluralRules:R},get isGlobal(){return!!m.value&&m.value.isGlobal},get missingWarn(){return m.value?m.value.missingWarn:L},set missingWarn(e){m.value&&(m.value.missingWarn=e)},get fallbackWarn(){return m.value?m.value.fallbackWarn:E},set fallbackWarn(e){m.value&&(m.value.missingWarn=e)},get fallbackRoot(){return m.value?m.value.fallbackRoot:I},set fallbackRoot(e){m.value&&(m.value.fallbackRoot=e)},get fallbackFormat(){return m.value?m.value.fallbackFormat:T},set fallbackFormat(e){m.value&&(m.value.fallbackFormat=e)},get warnHtmlMessage(){return m.value?m.value.warnHtmlMessage:N},set warnHtmlMessage(e){m.value&&(m.value.warnHtmlMessage=e)},get escapeParameter(){return m.value?m.value.escapeParameter:O},set escapeParameter(e){m.value&&(m.value.escapeParameter=e)},t:$,getPostTranslationHandler:C,setPostTranslationHandler:U,getMissingHandler:w,setMissingHandler:H,rt:V,d:x,n:Y,tm:j,te:G,getLocaleMessage:B,setLocaleMessage:X,mergeLocaleMessage:J,getDateTimeFormat:z,setDateTimeFormat:q,mergeDateTimeFormat:Q,getNumberFormat:K,setNumberFormat:Z,mergeNumberFormat:ne};function se(e){e.locale.value=g.value,e.fallbackLocale.value=v.value,Object.keys(p.value).forEach((a=>{e.mergeLocaleMessage(a,p.value[a])})),Object.keys(b.value).forEach((a=>{e.mergeDateTimeFormat(a,b.value[a])})),Object.keys(d.value).forEach((a=>{e.mergeNumberFormat(a,d.value[a])})),e.escapeParameter=O,e.fallbackFormat=T,e.fallbackRoot=I,e.fallbackWarn=E,e.missingWarn=L,e.warnHtmlMessage=N}return le((()=>{if(null==e.proxy||null==e.proxy.$i18n)throw ve(ge.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);const t=m.value=e.proxy.$i18n.__composer;"global"===a?(g.value=t.locale.value,v.value=t.fallbackLocale.value,p.value=t.messages.value,b.value=t.datetimeFormats.value,d.value=t.numberFormats.value):_&&se(t)})),re}(l,g,m,a)}if("global"===g)return Ne(m,a,f),m;if("parent"===g){let e=function(e,a,t=!1){let l=null;const n=a.root;let r=function(e,a=!1){if(null==e)return null;return a&&e.vnode.ctx||e.parent}(a,t);for(;null!=r;){const a=e;if("composition"===e.mode)l=a.__getInstance(r);else if(__VUE_I18N_LEGACY_API__){const e=a.__getInstance(r);null!=e&&(l=e.__composer,t&&l&&!l[Ee]&&(l=null))}if(null!=l)break;if(n===r)break;r=r.parent}return l}(_,l,a.__useComponent);return null==e&&(e=m),e}const v=_;let p=v.__getInstance(l);if(null==p){const t=e({},a);"__i18n"in f&&(t.__i18n=f.__i18n),m&&(t.__root=m),p=Ae(t),v.__composerExtend&&(p[Ie]=v.__composerExtend(p)),function(e,a,t){K((()=>{}),a),Z((()=>{const l=t;e.__deleteInstance(a);const n=l[Ie];n&&(n(),delete l[Ie])}),a)}(v,l,p),v.__setInstance(l,p)}return p}const Je=["locale","fallbackLocale","availableLocales"],ze=["t","rt","d","n","tm","te"];if("boolean"!=typeof __VUE_I18N_FULL_INSTALL__&&(g().__VUE_I18N_FULL_INSTALL__=!0),"boolean"!=typeof __VUE_I18N_LEGACY_API__&&(g().__VUE_I18N_LEGACY_API__=!0),"boolean"!=typeof __INTLIFY_JIT_COMPILATION__&&(g().__INTLIFY_JIT_COMPILATION__=!1),"boolean"!=typeof __INTLIFY_DROP_MESSAGE_COMPILER__&&(g().__INTLIFY_DROP_MESSAGE_COMPILER__=!1),"boolean"!=typeof __INTLIFY_PROD_DEVTOOLS__&&(g().__INTLIFY_PROD_DEVTOOLS__=!1),__INTLIFY_JIT_COMPILATION__?_(F):_(N),m(O),f(h),__INTLIFY_PROD_DEVTOOLS__){const e=g();e.__INTLIFY__=!0,v(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)}export{Be as c};
