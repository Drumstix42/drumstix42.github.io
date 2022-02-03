var J=Object.defineProperty,K=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var M=(e,t,n)=>t in e?J(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,T=(e,t)=>{for(var n in t||(t={}))Z.call(t,n)&&M(e,n,t[n]);if(j)for(var n of j(t))ee.call(t,n)&&M(e,n,t[n]);return e},V=(e,t)=>K(e,X(t));import{L as O,o as p,d as x,e as a,M as te,O as ne,P as R,Q as B,r as c,c as v,a as i,w as l,t as S,f as w,R as N,S as U,T as H,b as z,F as L,U as se,V as oe,u as ae}from"./vendor.bc05a8e9.js";import{_ as A}from"./index.58b033d3.js";const ie={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 576 512"},ce=a("path",{d:"M571.31 193.94l-22.63-22.63c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31l-28.9-28.9c5.63-21.31.36-44.9-16.35-61.61l-45.25-45.25c-62.48-62.48-163.79-62.48-226.28 0l90.51 45.25v18.75c0 16.97 6.74 33.25 18.75 45.25l49.14 49.14c16.71 16.71 40.3 21.98 61.61 16.35l28.9 28.9l-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0l90.51-90.51c6.23-6.24 6.23-16.37-.02-22.62zm-286.72-15.2c-3.7-3.7-6.84-7.79-9.85-11.95L19.64 404.96c-25.57 23.88-26.26 64.19-1.53 88.93s65.05 24.05 88.93-1.53l238.13-255.07c-3.96-2.91-7.9-5.87-11.44-9.41l-49.14-49.14z",fill:"currentColor"},null,-1);var le=O({name:"Hammer",render:function(t,n){return p(),x("svg",ie,[ce])}});const re={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 448 512"},de=a("path",{d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",fill:"currentColor"},null,-1);var ue=O({name:"Plus",render:function(t,n){return p(),x("svg",re,[de])}});const _e={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 448 512"},pe=a("path",{d:"M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z",fill:"currentColor"},null,-1);var me=O({name:"SortAlphaDown",render:function(t,n){return p(),x("svg",_e,[pe])}});const he={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 352 512"},be=a("path",{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28L75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256L9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",fill:"currentColor"},null,-1);var Q=O({name:"Times",render:function(t,n){return p(),x("svg",he,[be])}});function P(e,t,n){var s,o,r,b,h;t==null&&(t=100);function m(){var d=Date.now()-b;d<t&&d>=0?s=setTimeout(m,t-d):(s=null,n||(h=e.apply(r,o),r=o=null))}var _=function(){r=this,o=arguments,b=Date.now();var d=n&&!s;return s||(s=setTimeout(m,t)),d&&(h=e.apply(r,o),r=o=null),h};return _.clear=function(){s&&(clearTimeout(s),s=null)},_.flush=function(){s&&(h=e.apply(r,o),r=o=null,clearTimeout(s),s=null)},_}P.debounce=P;var F=P;Object.freeze({1:"1"});function fe(e=[]){const t={};return e.forEach(n=>{const s=n.Name;t[s]={label:s,id:s,inputs:[],sources:[],preferredSource:null,quantity:1},(n.Inputs||[]).forEach(o=>{t[s].inputs.push({id:o.Element.RowName,quantity:o.Count})}),(n.RecipeSets||[]).forEach(o=>{t[s].sources.push(o.RowName)}),t[s].preferredSource=t[s].sources[0],(n.Outputs||[]).forEach(o=>{(s===o.Element.RowName||s.includes(o.Element.RowName))&&(t[s].quantity=o.Count)})}),t}const ve=()=>Date.now(),G=()=>te({id:ve(),title:"Planning",items:[]}),W=(e,t)=>t.findIndex(n=>n.id===e),Y=G(),ge=Y.id,I=ne("icarus",{state:()=>({activeTabId:ge,tabs:[Y],recipeData:{},recipeOptions:[],isLoadingRecipes:!1,recipeSearch:""}),getters:{activeTab:e=>e.tabs.find(t=>t.id===e.activeTabId),tabCount(){return this.tabs.length},sortedRecipeOptions(e){return e.recipeOptions.sort((t,n)=>t.label.localeCompare(n.label))},filteredRecipeOptions(e){if(e.recipeSearch){const t=e.recipeSearch.toLowerCase();return this.sortedRecipeOptions.filter(n=>n.label.toLowerCase().includes(t))}return this.sortedRecipeOptions}},actions:{addTab(){const e=G();return this.tabs.push(e),e},removeTab(e){const t=W(e,this.tabs);if(t!==-1)this.tabs.splice(t,1);else{console.error(`Could not find tab with id ${e}`,this.tabs);return}const n=Math.min(t,this.tabs.length-1),s=this.tabs[n];this.activeTabId=s.id},setActiveTab(e){this.activeTabId=e},setTabTitle(e,t){const n=W(e,this.tabs);n!==-1&&(this.tabs[n].title=t)},addItem(e,t=1){const n=this.activeTab;if(n){const s=n.items.find(o=>o.id===e);s?s.quantity+=t:n.items.push({id:e,quantity:t})}else console.error(`Could not find tab with id ${this.activeTabId}`,this.tabs)},removeItem(e){const t=this.activeTab;if(t){const n=t.items.findIndex(s=>s.id===e);t.items.splice(n,1)}else console.error(`Could not find tab with id ${this.activeTabId}`,this.tabs)},async loadRecipeData(){this.isLoadingRecipes=!0;const t=await(await fetch("/Icarus/Data/Recipes.json",{method:"GET",headers:{"Content-Type":"application/json"}})).json(),n=fe(t==null?void 0:t.Rows);console.log(n),this.recipeData=n,this.recipeOptions=Object.values(n),this.isLoadingRecipes=!1}}});const Ce=I(),Ie={name:"CraftingToolItemSelector",components:{Plus:ue},props:{},data(){return{searchValue:null}},computed:T({},R(I,["isLoadingRecipes","filteredRecipeOptions"])),methods:V(T({},B(I,["addItem"])),{onSearch:F.debounce(e=>{Ce.recipeSearch=e},100)})},ye={class:"mb-3"},we=["onClick"],Te={class:"flex-shrink",style:{"min-width":"0"}},xe={class:"label text-overflow-ellipsis"},Se=w(" Add to list ");function ke(e,t,n,s,o,r){const b=c("n-input"),h=c("n-image"),m=c("Plus"),_=c("n-icon"),d=c("n-button"),g=c("n-tooltip"),f=c("RecycleScroller"),$=c("n-card"),k=c("n-spin");return p(),v("div",null,[i("div",ye,[a(b,{type:"text",value:o.searchValue,"onUpdate:value":t[0]||(t[0]=C=>o.searchValue=C),placeholder:"Search...",clearable:"",onInput:r.onSearch},null,8,["value","onInput"])]),a(k,{show:e.isLoadingRecipes},{default:l(()=>[a($,{class:"scroll-wrap","content-style":"padding: 0;"},{default:l(()=>[a(f,{class:"scroller",items:e.filteredRecipeOptions,"item-size":40,"key-field":"id"},{default:l(({index:C,item:u})=>[i("div",{class:"recipe-item flex align-items-center",onClick:y=>e.addItem(u.id)},[a(h,{class:"icon",width:"32",src:`/Icarus/ItemIcons/ITEM_${u.id}.png`,"fallback-src":"/Icarus/Images/question-mark.png","preview-disabled":!0},null,8,["src"]),i("div",Te,[i("div",xe,S(u.label),1)]),a(g,{trigger:"hover"},{trigger:l(()=>[a(d,{class:"hover-button ml-auto",secondary:"",type:"default",size:"small"},{default:l(()=>[a(_,{size:"13"},{default:l(()=>[a(m)]),_:1})]),_:1})]),default:l(()=>[Se]),_:1})],8,we)]),_:1},8,["items"])]),_:1})]),_:1},8,["show"])])}var $e=A(Ie,[["render",ke],["__scopeId","data-v-909d7692"]]);const qe={name:"CraftingToolManageTab",components:{Times:Q},props:{tab:{type:Object,required:!0}},emits:["removeTab"],data(){return{}},computed:T({},R(I,["tabs","tabCount"])),methods:{removeTab(){this.$emit("removeTab",{tabId:this.tab.id})}}},De=e=>(U("data-v-42d8af9e"),e=e(),H(),e),Re={class:"manage-tab flex align-items-center"},ze={class:"flex-grow-1 flex align-items-center"},Le={class:"flex align-items-center"},Ae=De(()=>i("span",{class:"flex-shrink-0 mr-3"},"List Name:",-1)),Oe=w(" Delete Tab ");function Ee(e,t,n,s,o,r){const b=c("n-input"),h=c("Times"),m=c("n-icon"),_=c("n-button"),d=c("n-tooltip");return p(),v("div",Re,[i("div",ze,[i("div",Le,[Ae,a(b,{type:"text",value:n.tab.title,"onUpdate:value":t[0]||(t[0]=g=>n.tab.title=g),placeholder:"Name"},null,8,["value"])])]),e.tabCount>1?(p(),x(d,{key:0,trigger:"hover"},{trigger:l(()=>[a(_,{class:"",secondary:"",type:"error",onClick:r.removeTab},{default:l(()=>[a(m,{size:"20"},{default:l(()=>[a(h)]),_:1})]),_:1},8,["onClick"])]),default:l(()=>[Oe]),_:1})):N("",!0)])}var Ve=A(qe,[["render",Ee],["__scopeId","data-v-42d8af9e"]]);const Pe={name:"CraftingToolComponentSourcePicker",components:{},props:{componentId:{type:String,required:!0}},data(){return{}},computed:T({},R(I,["recipeData"])),methods:{setComponentPreferredSource(e,t){this.recipeData[e].preferredSource=t,this.$emit("change")}}};function je(e,t,n,s,o,r){const b=c("n-button"),h=c("n-button-group");return e.recipeData[n.componentId]?(p(),x(h,{key:0,size:"small"},{default:l(()=>[(p(!0),v(L,null,z(e.recipeData[n.componentId].sources,(m,_)=>(p(),x(b,{key:m,class:"mx-1",size:"tiny",ghost:"",type:"info",style:se([e.recipeData[n.componentId].preferredSource===m?null:"--n-border: 1px solid rgba(255, 255, 255, 0.2); --n-text-color: #bbb"]),onClick:d=>r.setComponentPreferredSource(n.componentId,m)},{default:l(()=>{var d,g;return[i("span",null,S((g=(d=e.recipeData[m])==null?void 0:d.label)!=null?g:m),1)]}),_:2},1032,["style","onClick"]))),128))]),_:1})):N("",!0)}var Me=A(Pe,[["render",je]]);const Be={name:"CraftingToolCalculator",components:{ComponentSourcePicker:Me,SortAlphaDown:me,Times:Q},props:{tab:{type:Object,required:!0}},data(){return{requiredItemData:{},requiredCraftingStations:[],requiredComponents:[],includeSubComponents:!1,includeCraftingStations:!1}},watch:{includeSubComponents(e){e||(this.includeCraftingStations=!1),this.triggerCalc()},includeCraftingStations(e){e&&(this.includeSubComponents=!0),this.triggerCalc()}},computed:T({},R(I,["recipeData"])),methods:{sortInputs(){this.tab.items.sort((e,t)=>{const n=this.recipeData[e.id].label,s=this.recipeData[t.id].label;return n.localeCompare(s)})},onQuantityChange(e){e.quantity<1?this.$nextTick(()=>{this.removeItem(e),this.triggerCalc()}):this.$nextTick(()=>{this.triggerCalc()})},validateQuantity(e){return Number.isInteger(e)},removeItem(e){const t=(this.tab.items||[]).findIndex(n=>n.id===e.id);t>-1&&this.tab.items.splice(t,1)},triggerCalc:F.debounce(function(){this.calculateRequiredItems()},100),calculateRequiredItems(){const e=this.recipeData,t=this.includeSubComponents,n=this.includeCraftingStations,s={},o=new Set([]);function r(_=[],d={}){return _.forEach(g=>{var k;const f=e[g.id];if(!f)return;const $=(k=g.quantity)!=null?k:1;(f.inputs||[]).forEach(C=>{var D;const u=(D=d[C.id])!=null?D:0;d[C.id]=u+C.quantity*$;const y=e[C.id];t&&y&&r([{id:C.id,quantity:C.quantity*$}],d)})}),d}function b(){Object.keys(s).forEach(_=>{const d=e[_];(d==null?void 0:d.preferredSource)&&o.add(d.preferredSource)})}r(this.tab.items,s),b(),n&&r([...o].map(_=>({id:_})),s),b();const m=Object.keys(s).map(_=>({id:_,quantity:s[_]})).sort((_,d)=>d.quantity-_.quantity);console.log(o),this.requiredCraftingStations=[...o],this.requiredItemData=s,this.requiredComponents=m}}},q=e=>(U("data-v-b7fdd59e"),e=e(),H(),e),Ne={key:0},Ue={class:"flex align-items-center"},He=q(()=>i("h3",null,"Items",-1)),Qe=w(" Sort items alphabetically "),Fe={class:"flex-shrink",style:{"min-width":"0"}},Ge={class:"label text-overflow-ellipsis"},We=w(" Remove from list "),Ye=q(()=>i("div",{class:"flex align-items-center mt-3"},[i("h3",null,"Components")],-1)),Je={class:"p-1"},Ke={class:"flex align-items-center mb-1"},Xe=q(()=>i("span",null,"Include sub-components",-1)),Ze={class:"flex align-items-center mb-3 ml-3"},et=q(()=>i("span",null,"Include station components",-1)),tt={class:"label"},nt=q(()=>i("div",{class:"flex align-items-center"},[i("h3",null,"Crafting Stations")],-1)),st={class:""},ot={class:"recipe-item pl-0 flex align-items-center"},at={class:"flex align-items-center"},it={class:"label"},ct={key:1,class:"mb-3"},lt=q(()=>i("h3",null,"No Items",-1)),rt=w("You haven't added any items to this list yet.");function dt(e,t,n,s,o,r){const b=c("SortAlphaDown"),h=c("n-icon"),m=c("n-button"),_=c("n-tooltip"),d=c("n-input-number"),g=c("n-image"),f=c("component-source-picker"),$=c("Times"),k=c("n-switch"),C=c("n-text");return p(),v("div",null,[n.tab.items.length>0?(p(),v("div",Ne,[i("div",Ue,[He,a(_,{trigger:"hover"},{trigger:l(()=>[a(m,{class:"ml-3",size:"tiny",secondary:"",circle:"",type:"default",onClick:r.sortInputs},{default:l(()=>[a(h,{size:"13"},{default:l(()=>[a(b)]),_:1})]),_:1},8,["onClick"])]),default:l(()=>[Qe]),_:1})]),a(oe,{"x-appear":"",name:"list",tag:"div"},{default:l(()=>[(p(!0),v(L,null,z(n.tab.items,u=>(p(),v("div",{class:"recipe-item flex align-items-center",key:u.id},[a(d,{class:"input-quantity flex-shrink-0",value:u.quantity,"onUpdate:value":y=>u.quantity=y,placeholder:"Quantity",min:0,max:1e5,validator:r.validateQuantity,"on-update-value":r.onQuantityChange(u)},null,8,["value","onUpdate:value","validator","on-update-value"]),a(g,{class:"icon",width:"32",src:`/Icarus/ItemIcons/ITEM_${e.recipeData[u.id].id}.png`,"fallback-src":"/Icarus/Images/question-mark.png","preview-disabled":!1},null,8,["src"]),i("div",Fe,[i("div",Ge,S(e.recipeData[u.id].label),1)]),a(f,{"component-id":u.id,onChange:t[0]||(t[0]=y=>r.triggerCalc())},null,8,["component-id"]),a(_,{trigger:"hover"},{trigger:l(()=>[a(m,{class:"hover-button ml-auto",secondary:"",type:"error",size:"small",onClick:y=>r.removeItem(u)},{default:l(()=>[a(h,{size:"13"},{default:l(()=>[a($)]),_:1})]),_:2},1032,["onClick"])]),default:l(()=>[We]),_:2},1024)]))),128))]),_:1}),Ye,i("div",Je,[i("div",Ke,[a(k,{class:"mr-2",value:o.includeSubComponents,"onUpdate:value":t[1]||(t[1]=u=>o.includeSubComponents=u),size:"small"},null,8,["value"]),Xe]),i("div",Ze,[a(k,{class:"mr-2",value:o.includeCraftingStations,"onUpdate:value":t[2]||(t[2]=u=>o.includeCraftingStations=u),size:"small"},null,8,["value"]),et]),i("div",null,[(p(!0),v(L,null,z(o.requiredComponents,u=>{var y,D;return p(),v("div",{key:u.id,class:"component-row flex align-items-center"},[i("div",tt,S(u.quantity)+" "+S((D=(y=e.recipeData[u.id])==null?void 0:y.label)!=null?D:u.id),1),a(f,{"component-id":u.id,onChange:t[3]||(t[3]=Tt=>r.triggerCalc())},null,8,["component-id"])])}),128))])]),nt,i("div",st,[(p(!0),v(L,null,z(o.requiredCraftingStations,u=>(p(),v("div",ot,[i("div",at,[a(g,{class:"icon",width:"32",src:`/Icarus/ItemIcons/ITEM_${e.recipeData[u].id}.png`,"fallback-src":"/Icarus/Images/question-mark.png","preview-disabled":!1},null,8,["src"]),i("div",it,S(u),1)])]))),256))])])):(p(),v("div",ct,[lt,a(C,{type:"info"},{default:l(()=>[rt]),_:1})]))])}var ut=A(Be,[["render",dt],["__scopeId","data-v-b7fdd59e"]]);const E=I(),_t={name:"CraftingToolTabView",components:{ManageTab:Ve,CraftingCalculator:ut},props:[],data(){return{activeTabId:E.activeTabId,maxTabCount:20,addable:!0,closable:!0}},watch:{activeTabId:function(e){this.setActiveTab(e)}},computed:T({},R(I,["tabs","tabCount","activeTab"])),methods:V(T({},B(I,["setActiveTab"])),{handleAdd(){},handleClose(){},addTab(){const e=E.addTab();this.setActiveTab(e.id),this.syncSelectedTab()},removeTab({tabId:e}={}){E.removeTab(e),this.syncSelectedTab()},syncSelectedTab(){this.activeTabId=E.activeTabId,this.$nextTick(()=>{var e;(e=this.$refs.tabsInstRef)==null||e.syncBarPosition()})}})},pt={class:"flex align-items-center mb-3"},mt={class:"flex align-items-center ml-auto"},ht={class:"mr-3"},bt=i("span",null,"Add Tab",-1);function ft(e,t,n,s,o,r){const b=c("n-button"),h=c("manage-tab"),m=c("crafting-calculator"),_=c("n-tab-pane"),d=c("n-tabs"),g=c("n-card");return p(),v("div",null,[i("div",pt,[i("div",mt,[i("div",ht,S(e.tabCount)+" / "+S(o.maxTabCount),1),a(b,{class:"",strong:"",secondary:"",type:"primary",onClick:r.addTab,disabled:e.tabCount===o.maxTabCount},{default:l(()=>[bt]),_:1},8,["onClick","disabled"])])]),a(g,null,{default:l(()=>[a(d,{ref:"tabsInstRef",value:o.activeTabId,"onUpdate:value":t[0]||(t[0]=f=>o.activeTabId=f),type:"bar",addable:o.addable,closable:o.closable,"tab-style":""},{default:l(()=>[(p(!0),v(L,null,z(e.tabs,f=>(p(),x(_,{tab:f.title,name:f.id,key:f.id},{default:l(()=>[a(h,{tab:f,onRemoveTab:r.removeTab},null,8,["tab","onRemoveTab"]),a(m,{tab:f},null,8,["tab"])]),_:2},1032,["tab","name"]))),128))]),_:1},8,["value","addable","closable"])]),_:1})])}var vt=A(_t,[["render",ft]]);const gt={class:"icarus-wrap"},Ct=w(" Search and add items from the list below to add them to your to-do list, which will calculate your item requirements. "),It={class:"flex flex-wrap"},yt=i("ul",null,[i("li",null,"Improved item labels"),i("li",null,"Resolve item icon matches"),i("li",null,"Save tab data in localStorage to support session restoration"),i("li",null,"Implement talent options logic to impact component output")],-1),wt=i("div",{class:"m-2"},[w(" This page/site is not affiliated with "),i("a",{class:"text-primary",href:"https://store.steampowered.com/app/1149460/ICARUS/",target:"_blank"},"Icarus"),w(", "),i("a",{class:"text-primary",href:"https://rocketwerkz.com/",target:"_blank"},"RocketWerkz"),w(", or any of its subsidiaries. ")],-1),$t={setup(e){return I().loadRecipeData(),(n,s)=>{const o=c("n-alert"),r=c("n-icon");return p(),v("div",gt,[a(o,{class:"m-2 mb-4",title:"Crafting Calculator",type:"info",closable:""},{default:l(()=>[Ct]),_:1}),i("div",It,[a($e,{class:"item-selector"}),a(vt,{class:"tab-view flex-1"})]),a(o,{class:"m-2 mt-4 mb-4",title:"Calculator Todo List",type:"default",closable:""},{icon:l(()=>[a(r,{size:"20"},{default:l(()=>[a(ae(le))]),_:1})]),default:l(()=>[yt]),_:1}),wt])}}};export{$t as default};
