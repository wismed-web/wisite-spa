(function(e){function n(n){for(var r,o,u=n[0],i=n[1],l=n[2],f=0,d=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&d.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(n);while(d.length)d.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,o=1;o<t.length;o++){var u=t[o];0!==c[u]&&(r=!1)}r&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},c={app:0},a=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-4085b2bd":"83c0d779","chunk-746de099":"ca2153e1","chunk-c9ef7658":"703afb7c","chunk-1b1f9edc":"9c479983","chunk-76d04a02":"46d790b7","chunk-e582b1aa":"d02dbff0"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-746de099":1,"chunk-1b1f9edc":1,"chunk-76d04a02":1,"chunk-e582b1aa":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-4085b2bd":"31d6cfe0","chunk-746de099":"9d6b29c0","chunk-c9ef7658":"31d6cfe0","chunk-1b1f9edc":"fa9ba6d7","chunk-76d04a02":"cec7d30a","chunk-e582b1aa":"2ef487dc"}[e]+".css",c=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===c))return n()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){l=d[u],f=l.getAttribute("data-href");if(f===r||f===c)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var r=n&&n.target&&n.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],s.parentNode.removeChild(s),t(a)},s.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(s)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=a);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var d=new Error;l=function(n){f.onerror=f.onload=null,clearTimeout(s);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,t[1](d)}c[e]=void 0}};var s=setTimeout((function(){l({type:"timeout",target:f})}),12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=n,l=l.slice();for(var d=0;d<l.length;d++)n(l[d]);var s=f;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("d3b7");var r=t("7a23");function o(e,n){var t=Object(r["resolveComponent"])("router-view");return Object(r["openBlock"])(),Object(r["createBlock"])(t)}var c={name:"App"};t("64be");c.render=o;var a=c,u=t("c3a1"),i=(t("7437"),t("a18c")),l=t("5502"),f=Object(l["a"])({state:{user:{},token:null},mutations:{setToken:function(e,n){e.token=n},clearToken:function(e){e.token=null}},actions:{setToken:function(e,n){console.log("token:"+n),e.commit("setToken",n)},clearToken:function(e){e.commit("clearToken")}}}),d=f;Object(r["createApp"])(a).use(d).use(u["a"]).use(i["a"]).mount("#app"),i["a"].beforeEach((function(e,n,t){e.matched.some((function(e){return e.meta.requireAuth}))?(console.log("需要登录"),localStorage.getItem("accessToken")?t():t({path:"/",query:{redirect:e.fullPath}})):t()}))},"64be":function(e,n,t){"use strict";t("c894")},a18c:function(e,n,t){"use strict";t("d3b7"),t("3ca3"),t("ddb0");var r=t("6c02"),o=function(){return Promise.all([t.e("chunk-4085b2bd"),t.e("chunk-746de099")]).then(t.bind(null,"578a"))},c=function(){return Promise.all([t.e("chunk-4085b2bd"),t.e("chunk-c9ef7658"),t.e("chunk-76d04a02")]).then(t.bind(null,"57da"))},a=function(){return Promise.all([t.e("chunk-4085b2bd"),t.e("chunk-e582b1aa")]).then(t.bind(null,"1feb"))},u=function(){return Promise.all([t.e("chunk-4085b2bd"),t.e("chunk-c9ef7658"),t.e("chunk-1b1f9edc")]).then(t.bind(null,"66aa"))},i=[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:o},{path:"/register",name:"register",component:a},{path:"/home",name:"home",component:c,meta:{requireAuth:!0},children:[{name:"profile",path:"profile",component:u}]}],l=Object(r["a"])({history:Object(r["b"])(),routes:i});n["a"]=l},c894:function(e,n,t){}});
//# sourceMappingURL=app.ef3fe488.js.map