(function(e){function t(t){for(var a,r,i=t[0],l=t[1],u=t[2],s=0,d=[];s<i.length;s++)r=i[s],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);m&&m(t);while(d.length)d.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var i=n[r];0!==o[i]&&(a=!1)}a&&(c.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},o={app:0},c=[];function i(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-4085b2bd":"10e233d4","chunk-1ba33227":"bd58c756","chunk-0a1817b0":"009f4b27","chunk-8bcaccae":"d1fd6829","chunk-5e16d8ca":"2bf60800","chunk-773066fe":"24bcc054","chunk-c1b7a782":"84308089"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-0a1817b0":1,"chunk-8bcaccae":1,"chunk-5e16d8ca":1,"chunk-773066fe":1,"chunk-c1b7a782":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-4085b2bd":"31d6cfe0","chunk-1ba33227":"31d6cfe0","chunk-0a1817b0":"820bcb3b","chunk-8bcaccae":"6128485b","chunk-5e16d8ca":"2e67d877","chunk-773066fe":"9fa7a547","chunk-c1b7a782":"2622f745"}[e]+".css",o=l.p+a,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var u=c[i],s=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(s===a||s===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],s=u.getAttribute("data-href");if(s===a||s===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var a=t&&t.target&&t.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete r[e],m.parentNode.removeChild(m),n(c)},m.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=c);var u,s=document.createElement("script");s.charset="utf-8",s.timeout=120,l.nc&&s.setAttribute("nonce",l.nc),s.src=i(e);var d=new Error;u=function(t){s.onerror=s.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}o[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:s})}),12e4);s.onerror=s.onload=u,document.head.appendChild(s)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var m=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("d3b7");var a=n("7a23"),r={id:"changeLanguage"};function o(e,t){var n=Object(a["resolveComponent"])("el-option"),o=Object(a["resolveComponent"])("el-select"),c=Object(a["resolveComponent"])("router-view");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("div",r,[Object(a["createVNode"])(o,{size:"small",modelValue:e.locale,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.locale=t}),onChange:e.changeLanguage,style:{width:"60px",position:"absolute",right:"5px",top:"5px","z-index":"10"}},{default:Object(a["withCtx"])((function(){return[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.locales,(function(e){return Object(a["openBlock"])(),Object(a["createBlock"])(n,{key:e.event,value:e.event,label:e.text},null,8,["value","label"])})),128))]})),_:1},8,["modelValue","onChange"])]),Object(a["createVNode"])(c)],64)}var c={name:"App",data:function(){return{locales:[{event:"zh",text:"中文"},{event:"en",text:"英文"}],locale:"zh"}},mounted:function(){var e=localStorage.getItem("lang");e?(this.$i18n.locale=e,this.locale=e):(localStorage.setItem("lang","zh"),this.locale="zh")},methods:{changeLanguage:function(e){localStorage.setItem("lang",e),this.$i18n.locale=e,this.locale=e}}};n("64be");c.render=o;var i=c,l=n("c3a1"),u=(n("7437"),n("a18c")),s=n("5502"),d=Object(s["a"])({state:{user:{},token:null},mutations:{setToken:function(e,t){e.token=t},clearToken:function(e){e.token=null}},actions:{setToken:function(e,t){console.log("token:"+t),e.commit("setToken",t)},clearToken:function(e){e.commit("clearToken")}}}),m=d,p=n("47e2"),f={zh:{message:{signIn:"登录",loginNameTip:"用户名/邮箱",loginName:"用户名",password:"密码",signUp:"注册",forgetPassword:"忘记密码",hasNoAccount:"还没有帐号",email:"邮箱",realName:"真实姓名",readAccept:"阅读并接受",userAgreementPrivacyStatement:"用户协议和隐私保护",hasAccount:"已有帐号",siteName:"Wisite",userInfo:"用户信息",update:"更新",phone:"手机号",regtime:"注册时间",addr:"地址",gender:"性别",select:"--请选择--",selectFile:"选择文件",addTag:"添加标签",logout:"退出登录",official:"官方身份",emailVerify:"邮箱验证",verifyCode:"验证码",verify:"验证",loginNameRequireTip:"请输入用户名或邮箱",passwordRequireTip:"请输入密码",loginSuccess:"登录成功",registerSuccess:"注册成功",imageTypeLimit:"图片类型要求：jpeg、jpg、png",female:"女",male:"男",yes:"是",no:"否",logoutSuccess:"退出成功",logoutFail:"退出失败",updateSuccess:"登录成功",userAgreementPrivacyStatementRequired:"请同意用户协议和隐私保护",emailRequired:"请输入邮箱",loginNameRequired:"请输入用户名",nameRequired:"请输入真实姓名",sendMailVerifyTip:"我们已经向您的电子邮箱发送了验证码，您可以通过验证码激活您的帐号。请输入验证码。"}},en:{message:{signIn:"Sign in",loginNameTip:"Uname/Email",loginName:"Login name",password:"Password",signUp:"Sign up",forgetPassword:"Forget password",hasNoAccount:"Has no account",email:"Email",realName:"Real name",readAccept:"Read and accept",userAgreementPrivacyStatement:"User agreement & privacy statement",hasAccount:"Has account",siteName:"Wisite",userInfo:"User profile",update:"Update",phone:"Phone",regtime:"Register time",addr:"Address",gender:"Gender",select:"--Select--",selectFile:"Select file",addTag:"Add tag",logout:"Logout",official:"Official",emailVerify:"Email verify",verifyCode:"Verify code",verify:"Verify",loginNameRequireTip:"Please input login name or email",passwordRequireTip:"Please input password",loginSuccess:"Login success",registerSuccess:"Register success",imageTypeLimit:"Image type limit：jpeg、jpg、png",female:"Female",male:"Male",yes:"Yes",no:"No",logoutSuccess:"Logout success",logoutFail:"Logout fail",updateSuccess:"Update success",userAgreementPrivacyStatementRequired:"Please accept user agreement & privacy statement",emailRequired:"Please input email",loginNameRequired:"Please input login name",nameRequired:"Please input real name",sendMailVerifyTip:"We are sent you an e-mail with a security code so you can start activating Verification for your account. Please enter the code."}}},g=Object(p["a"])({fallbackLocale:"zh",globalInjection:!0,legacy:!1,locale:"zh",messages:f}),h=g;Object(a["createApp"])(i).use(m).use(l["a"]).use(u["a"]).use(h).mount("#app"),u["a"].beforeEach((function(e,t,n){e.matched.some((function(e){return e.meta.requireAuth}))?(console.log("需要登录"),localStorage.getItem("accessToken")?n():n({path:"/",query:{redirect:e.fullPath}})):n()}))},"64be":function(e,t,n){"use strict";n("c894")},a18c:function(e,t,n){"use strict";n("d3b7"),n("3ca3"),n("ddb0");var a=n("6c02"),r=function(){return Promise.all([n.e("chunk-4085b2bd"),n.e("chunk-773066fe")]).then(n.bind(null,"578a"))},o=function(){return Promise.all([n.e("chunk-4085b2bd"),n.e("chunk-1ba33227"),n.e("chunk-0a1817b0")]).then(n.bind(null,"57da"))},c=function(){return Promise.all([n.e("chunk-4085b2bd"),n.e("chunk-5e16d8ca")]).then(n.bind(null,"1feb"))},i=function(){return Promise.all([n.e("chunk-4085b2bd"),n.e("chunk-1ba33227"),n.e("chunk-8bcaccae")]).then(n.bind(null,"66aa"))},l=function(){return Promise.all([n.e("chunk-4085b2bd"),n.e("chunk-c1b7a782")]).then(n.bind(null,"1221"))},u=[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:r},{path:"/register",name:"register",component:c},{path:"/verify",name:"verify",component:l},{path:"/home",name:"home",component:o,meta:{requireAuth:!0},children:[{name:"profile",path:"profile",component:i}]}],s=Object(a["a"])({history:Object(a["b"])(),routes:u});t["a"]=s},c894:function(e,t,n){}});
//# sourceMappingURL=app.2303f530.js.map