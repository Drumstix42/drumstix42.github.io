import"./style.79205ed0.js";import{r,o as m,i as v,e as c,a as i,j as N,N as g,b as I,d as $,c as T,w as x,h as y,k,l as C,m as E,n as b,p as B,q as A,s as P,t as S,v as w,x as H,y as R,z as V,A as L,B as O,C as q,D,E as G,g as j,F as z}from"./vendor.ebafb8a8.js";const F="modulepreload",d={},M="/",W=function(a,e){return!e||e.length===0?a():Promise.all(e.map(t=>{if(t=`${M}${t}`,t in d)return;d[t]=!0;const n=t.endsWith(".css"),_=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${_}`))return;const s=document.createElement("link");if(s.rel=n?"stylesheet":F,n||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),n)return new Promise((p,u)=>{s.addEventListener("load",p),s.addEventListener("error",u)})})).then(()=>a())};var h=(o,a)=>{const e=o.__vccOpts||o;for(const[t,n]of a)e[t]=n;return e};const J={name:"Header",components:{},props:[],data(){return{}},computed:{routeItems(){const o=[];return(this.$router.options.routes||[]).forEach(e=>{e.title&&o.push(e)}),o}}},K={class:"header"},Q={class:"navbar"},U={class:"inner px-2"},X={class:"mx-2 title flex align-items-center"},Y=c("span",{class:"px-2"},"Icarus Crafting Calculator",-1);function Z(o,a,e,t,n,_){const s=r("n-image");return m(),v("header",K,[c("div",Q,[c("div",U,[c("div",X,[i(s,{class:"icon",width:"24",src:"/icarus-game/ItemIcons/Tools/ITEM_Building_RepairTool.ITEM_Building_RepairTool.png","preview-disabled":!0},null,8,["src"]),Y])])])])}var ee=h(J,[["render",Z]]);const te=N(()=>W(()=>import("./Icarus.cd75d7c7.js"),["assets/Icarus.cd75d7c7.js","assets/Icarus.b4de3c6e.css","assets/vendor.ebafb8a8.js","assets/style.79205ed0.js","assets/style.17d70d55.css"])),se={name:"App",components:{Icarus:te,NConfigProvider:g,NGlobalStyle:I,Header:ee},props:{},data(){return{darkTheme:$}},computed:{},methods:{}};function ne(o,a,e,t,n,_){const s=r("Header"),p=r("Icarus"),u=r("n-global-style"),f=r("n-config-provider");return m(),T(f,{theme:n.darkTheme},{default:x(()=>[c("div",null,[i(s),i(p)]),i(u)]),_:1},8,["theme"])}var oe=h(se,[["render",ne]]);const ae=y({components:[k,C,E,b,B,A,P,S,w,H,R,V,L,O,q,D]}),re=G(),l=j(oe);l.use(ae);l.use(re);l.use(z);l.mount("#app");export{h as _};