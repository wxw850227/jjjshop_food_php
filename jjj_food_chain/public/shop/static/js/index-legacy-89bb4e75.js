System.register(["./element-plus-legacy-9a8d946d.js","./setting-legacy-c18f3dbb.js","./service-legacy-aa392c8f.js","./privacy-legacy-4e75bb07.js","./@vue-legacy-74f2101e.js","./index-legacy-e51438e5.js","./@vueuse-legacy-3cbb5e93.js","./lodash-es-legacy-3f73cadd.js","./async-validator-legacy-aa1fd2de.js","./@element-plus-legacy-f0b22bff.js","./dayjs-legacy-4b173016.js","./call-bind-legacy-a7650b66.js","./get-intrinsic-legacy-675d089b.js","./has-symbols-legacy-afcc0593.js","./has-proto-legacy-d280ab1e.js","./function-bind-legacy-b76e1749.js","./has-legacy-06d86c07.js","./escape-html-legacy-ae962a8c.js","./normalize-wheel-es-legacy-13d39621.js","./@ctrl-legacy-33dbca08.js","./UE-legacy-3dbfabd9.js","./Upload-legacy-9c715279.js","./vue-router-legacy-d0b0f0e5.js","./pinia-legacy-b10a086a.js","./vue-demi-legacy-97cfbb01.js","./axios-legacy-40880ebd.js","./qs-legacy-a87a5df5.js","./side-channel-legacy-9446be19.js","./object-inspect-legacy-b9938498.js","./vue-ueditor-wrap-legacy-087787de.js"],(function(e,l){"use strict";var a,n,t,c,s,u,i,r,g,o,y,j,d,v;return{setters:[function(e){a=e.u,n=e.w},function(e){t=e.S},function(e){c=e.default},function(e){s=e.default},function(e){u=e.aj,i=e.o,r=e.c,g=e.P,o=e.S,y=e.$,j=e.a0,d=e.Y},function(e){v=e._},null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){var l={key:0,class:"product-add"};e("default",v({components:{Service:c,Privacy:s},data:function(){return{activeName:"service",loading:!0,form:{service:"",privacy:""}}},mounted:function(){this.getParams()},methods:{getParams:function(){var e=this;t.protocolDetail({},!0).then((function(l){var a=l.data.vars;e.settingData=a,e.loading=!1})).catch((function(l){e.loading=!1}))}}},[["render",function(e,t,c,s,v,m){var f=a,p=n,h=u("Service"),D=u("Privacy");return v.loading?d("",!0):(i(),r("div",l,[g(p,{modelValue:v.activeName,"onUpdate:modelValue":t[0]||(t[0]=function(e){return v.activeName=e}),type:"card"},{default:o((function(){return[g(f,{label:"用户协议",name:"service"}),g(f,{label:"隐私协议",name:"privacy"})]})),_:1},8,["modelValue"]),y(g(h,{settingData:e.settingData},null,8,["settingData"]),[[j,"service"==v.activeName]]),y(g(D,{settingData:e.settingData},null,8,["settingData"]),[[j,"privacy"==v.activeName]])]))}]]))}}}));
