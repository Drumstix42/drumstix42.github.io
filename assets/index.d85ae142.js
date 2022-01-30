import{r as p,o as i,c as _,a as h,F as O,b as C,d as v,w as f,e as u,f as I,t as L,u as m,g as $,N as x,h as A,i as H,j as S,k as R,l as T,m as w,n as j,p as B,q as V,s as q,v as D,x as F,y as G}from"./vendor.e412ec85.js";const z=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};z();var M=(a,n)=>{const o=a.__vccOpts||a;for(const[t,e]of n)o[t]=e;return o};const U={name:"Header",components:{},props:[],data(){return{}},computed:{routeItems(){const a=[];return(this.$router.options.routes||[]).forEach(o=>{o.title&&a.push(o)}),a}}},W={class:"navbar"};function K(a,n,o,t,e,r){const s=p("n-button"),d=p("router-link");return i(),_("header",null,[h("div",W,[(i(!0),_(O,null,C(r.routeItems,c=>(i(),v(d,{custom:"",to:c.path},{default:f(({href:E,route:oe,navigate:k,isActive:b,isExactActive:P})=>[u(s,{quaternary:"",size:"large",type:b||P?"info":"default",href:E,onClick:k},{default:f(()=>[I(L(c.title),1)]),_:2},1032,["type","href","onClick"])]),_:2},1032,["to"]))),256))])])}var J=M(U,[["render",K]]);const Q={class:"p-4"},X={setup(a){return(n,o)=>{const t=p("router-view");return i(),v(m(x),{theme:m($)},{default:f(()=>[u(J),h("div",Q,[u(t)]),u(m(A))]),_:1},8,["theme"])}}},Y="modulepreload",y={},Z="/",g=function(n,o){return!o||o.length===0?n():Promise.all(o.map(t=>{if(t=`${Z}${t}`,t in y)return;y[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const s=document.createElement("link");if(s.rel=e?"stylesheet":Y,e||(s.as="script",s.crossOrigin=""),s.href=t,document.head.appendChild(s),e)return new Promise((d,c)=>{s.addEventListener("load",d),s.addEventListener("error",c)})})).then(()=>n())},N=Object.freeze({HOMEPAGE:"homepage",ICARUS:"icarus"}),ee=[{name:N.HOMEPAGE,path:"/",title:"Home",component:()=>g(()=>import("./Home.d11845a0.js"),["assets/Home.d11845a0.js","assets/vendor.e412ec85.js"])},{name:N.ICARUS,path:"/icarus",title:"Icarus",component:()=>g(()=>import("./Icarus.9707d67d.js"),["assets/Icarus.9707d67d.js","assets/Icarus.4c970597.css","assets/vendor.e412ec85.js"])}],te=H({history:S(),routes:ee}),re=w({components:[j,B,V,q,D,F,G]}),l=R(X);l.use(re);l.use(T());l.use(te);l.mount("#app");export{M as _};