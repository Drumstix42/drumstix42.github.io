import"./style.79205ed0.js";import{r as o,o as d,i as v,e as c,a as i,j as N,N as g,b as I,d as $,c as x,w as y,k,g as C,p as T,h as b,l as E,m as B,n as A,q as P,s as S,t as w,v as H,x as j,y as V,z as L,A as O,B as q,C as D,D as G,E as R,F as z}from"./vendor.5478e00f.js";const F="modulepreload",m={},U="/",W=function(a,e){return!e||e.length===0?a():Promise.all(e.map(t=>{if(t=`${U}${t}`,t in m)return;m[t]=!0;const n=t.endsWith(".css"),u=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${u}`))return;const s=document.createElement("link");if(s.rel=n?"stylesheet":F,n||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),n)return new Promise((_,p)=>{s.addEventListener("load",_),s.addEventListener("error",p)})})).then(()=>a())};var h=(r,a)=>{const e=r.__vccOpts||r;for(const[t,n]of a)e[t]=n;return e};const J={name:"Header",components:{},props:[],data(){return{}},computed:{routeItems(){const r=[];return(this.$router.options.routes||[]).forEach(e=>{e.title&&r.push(e)}),r}}},K={class:"header"},M={class:"navbar"},Q={class:"inner px-2"},X={class:"mx-2 title flex align-items-center"},Y=c("span",{class:"px-2"},"Icarus Crafting Calculator",-1);function Z(r,a,e,t,n,u){const s=o("n-image");return d(),v("header",K,[c("div",M,[c("div",Q,[c("div",X,[i(s,{class:"icon",width:"24",src:"/icarus-game/ItemIcons/ITEM_Building_UpgradeTool.png","preview-disabled":!0},null,8,["src"]),Y])])])])}var ee=h(J,[["render",Z]]);const te=N(()=>W(()=>import("./Icarus.d5e0df7c.js"),["assets/Icarus.d5e0df7c.js","assets/Icarus.042f5066.css","assets/vendor.5478e00f.js","assets/style.79205ed0.js","assets/style.4b8ad964.css"])),se={name:"App",components:{Icarus:te,NConfigProvider:g,NGlobalStyle:I,Header:ee},props:{},data(){return{darkTheme:$}},computed:{},methods:{}};function ne(r,a,e,t,n,u){const s=o("Header"),_=o("Icarus"),p=o("n-global-style"),f=o("n-config-provider");return d(),x(f,{theme:n.darkTheme},{default:y(()=>[c("div",null,[i(s),i(_)]),i(p)]),_:1},8,["theme"])}var re=h(se,[["render",ne]]);const ae=b({components:[E,B,A,P,S,w,H,j,V,L,O,q,D,G,R,z]}),oe=k(),l=C(re);l.use(ae);l.use(oe);l.use(T);l.mount("#app");export{h as _};
