(this.webpackJsonphackathon=this.webpackJsonphackathon||[]).push([[0],{110:function(e,t,n){e.exports={user:"User_user__-bJlS",editorButton:"User_editorButton__XCQJ6"}},139:function(e,t,n){e.exports={content:"DefaultLayout_content__3epWu",footer:"DefaultLayout_footer__2qlk-",logo:"DefaultLayout_logo__3goRY"}},155:function(e,t,n){e.exports={app:"App_app__1kX79",router:"App_router__3W9nN"}},156:function(e,t,n){e.exports={spinnerWrapper:"PageSpinner_spinnerWrapper__2Kwx6",indicator:"PageSpinner_indicator__1MURC"}},197:function(e,t,n){e.exports={loginWrapper:"Login_loginWrapper__2rzG3"}},237:function(e,t,n){},238:function(e,t,n){},41:function(e,t,n){e.exports={removeButton:"Create_removeButton__1mZ_X",container:"Create_container__1yu4s",title:"Create_title__ZXhrt",description:"Create_description__2Smnj",preview:"Create_preview__2PFoA",paragraph:"Create_paragraph__KTCat",languges:"Create_languges__134fL",langugesTitle:"Create_langugesTitle__AMecW",selectLanguages:"Create_selectLanguages__38_Df",file:"Create_file__26DrL",fileName:"Create_fileName__3Rrmi",testHide:"Create_testHide__32DBf",addButton:"Create_addButton__1RMIv",saveButtonBlock:"Create_saveButtonBlock__PczEz",test:"Create_test__1p6Hi"}},429:function(e,t,n){"use strict";n.r(t);var a,r=n(5),s=n(35),i=n(0),c=n(31),u=n.n(c),o=(n(237),n(155)),l=n.n(o),d=(n(238),n(58)),h=n(34),j=n(8),p=n.n(j),f=n(1),b=n(15),O=n(197),v=n.n(O),x=n(439),m=n(434),g=n(438),k=n(46),_=n(11),w=n(14),y=n(42),N=n.n(y),C=function(e){return new Promise((function(t){setTimeout(t,e)}))},S=function(e,t){try{return JSON.parse(e,t)}catch(n){return null}},I=function(e,t,n){try{return JSON.stringify(e,t,n)||""}catch(a){return""}},T=function(e){try{var t=localStorage.getItem(e);return null===t?t:S(t)}catch(n){return null}},L=function(e,t){try{localStorage.setItem(e,I(t))}catch(n){}},E=function(){function e(t){Object(_.a)(this,e),this.isLoading=!0,this.isLoaded=!1,this.hasError=!1,this.isConsumerInitialized=!1,this.updateTimeoutId=null,this.interval=3e3,this.data=void 0,this.action=void 0,this.action=t,Object(s.d)(this)}return Object(w.a)(e,[{key:"load",value:function(){var e=Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,e.next=4,this.action();case 4:this.data=e.sent,this.hasError=!1,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0),this.hasError=!0;case 12:return e.prev=12,this.isLoaded=!0,this.isLoading=!1,e.finish(12);case 16:case"end":return e.stop()}}),e,this,[[0,8,12,16]])})));return function(){return e.apply(this,arguments)}}()},{key:"loadWithSavingState",value:function(){var e=Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.action();case 3:this.data=e.sent,this.hasError=!1,e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0),this.hasError=!0;case 11:return e.prev=11,this.isLoaded=!0,this.isLoading=!1,e.finish(11);case 15:case"end":return e.stop()}}),e,this,[[0,7,11,15]])})));return function(){return e.apply(this,arguments)}}()},{key:"loadIfNotLoaded",value:function(){var e=Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.isLoaded){e.next=3;break}return e.next=3,this.load();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addConsumer",value:function(){var e=Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.isConsumerInitialized){e.next=2;break}return e.abrupt("return");case 2:return this.isConsumerInitialized=!0,e.next=5,this.tick(this.loadWithSavingState.bind(this));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"removeConsumer",value:function(){this.isConsumerInitialized=!1,this.updateTimeoutId&&window.clearTimeout(this.updateTimeoutId)}},{key:"tick",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t();case 2:if(this.updateTimeoutId&&window.clearTimeout(this.updateTimeoutId),this.isConsumerInitialized){e.next=5;break}return e.abrupt("return");case 5:this.updateTimeoutId=window.setTimeout((function(){return n.tick(t)}),this.interval);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();!function(e){e.student="student",e.teacher="teacher"}(a||(a={}));var P=function(e){return"".concat(e.first_name," ").concat(e.last_name)},F=new(function(){function e(){Object(_.a)(this,e),this.api={login:function(e){return Object(b.a)(p.a.mark((function t(){var n,a,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.login,a=e.password,t.next=3,N.a.post("/api/login/",{login:n,password:a});case 3:return r=t.sent,t.abrupt("return",r.data);case 5:case"end":return t.stop()}}),t)})))()},loadList:function(){return Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.get("/api/users/");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},editorStatus:function(e){return Object(b.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N.a.get("/tasks/editor/".concat(e,"/status/"));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},startEditor:function(e){var t=this;return Object(b.a)(p.a.mark((function n(){var a,r;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,N.a.post("/tasks/editor/".concat(e,"/start/"));case 2:return n.next=4,t.editorStatus(e);case 4:a=n.sent;case 5:if("running"===(null===(r=a)||void 0===r?void 0:r.status)){n.next=13;break}return n.next=8,C(1e3);case 8:return n.next=10,t.editorStatus(e);case 10:a=n.sent,n.next=5;break;case 13:return n.abrupt("return",a);case 14:case"end":return n.stop()}}),n)})))()},stopEditor:function(e){var t=this;return Object(b.a)(p.a.mark((function n(){var a,r;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,N.a.post("/tasks/editor/".concat(e,"/stop/"));case 2:return n.next=4,t.editorStatus(e);case 4:a=n.sent;case 5:if("exited"===(null===(r=a)||void 0===r?void 0:r.status)){n.next=13;break}return n.next=8,C(1e3);case 8:return n.next=10,t.editorStatus(e);case 10:a=n.sent,n.next=5;break;case 13:return n.abrupt("return",a);case 14:case"end":return n.stop()}}),n)})))()}},this.checkLogin=!1,this.user=null,this.editor=null,this.list=new E(this.api.loadList),Object(s.d)(this)}return Object(w.a)(e,[{key:"setUser",value:function(e){this.user=e,L("user",this.user)}},{key:"setEditor",value:function(e){this.editor=e}},{key:"setCheckLogin",value:function(){this.checkLogin=!0}},{key:"login",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.login,a=t.password,e.next=3,this.api.login({login:n,password:a});case 3:r=e.sent,this.setUser(r);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"editorStatus",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.api.editorStatus(t);case 2:n=e.sent,this.setEditor(n);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"startEditor",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.editor&&this.setEditor(Object(f.a)(Object(f.a)({},this.editor),{},{isLoading:!0})),e.next=3,this.api.startEditor(t);case 3:n=e.sent,this.setEditor(n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"stopEditor",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.editor&&this.setEditor(Object(f.a)(Object(f.a)({},this.editor),{},{isLoading:!0})),e.next=3,this.api.stopEditor(t);case 3:n=e.sent,this.setEditor(n);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}());var M=Object(h.a)((function(){function e(){return(e=Object(b.a)(p.a.mark((function e(t){var n,a,r,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F.login(t);case 3:e.next=11;break;case 5:e.prev=5,e.t0=e.catch(0),console.info(e.t0),r=null===(n=e.t0.response)||void 0===n?void 0:n.statusText,s=401===(null===(a=e.t0.response)||void 0===a?void 0:a.status)?"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d":r||e.t0.message,x.b.error("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0432\u043e\u0439\u0442\u0438. ".concat(s));case 11:case"end":return e.stop()}}),e,null,[[0,5]])})))).apply(this,arguments)}return Object(i.useEffect)((function(){F.user&&Object(d.c)("/")}),[F.user]),Object(r.jsx)("div",{className:v.a.loginWrapper,children:Object(r.jsxs)(m.a,Object(f.a)(Object(f.a)({},{labelCol:{span:8},wrapperCol:{span:16}}),{},{name:"basic",onFinish:function(t){return e.apply(this,arguments)},children:[Object(r.jsx)(m.a.Item,{label:"Login",name:"login",rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 login"}],children:Object(r.jsx)(g.a,{})}),Object(r.jsx)(m.a.Item,{label:"\u041f\u0430\u0440\u043e\u043b\u044c",name:"password",rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"}],children:Object(r.jsx)(g.a.Password,{})}),Object(r.jsx)(m.a.Item,Object(f.a)(Object(f.a)({},{wrapperCol:{offset:8,span:16}}),{},{children:Object(r.jsx)(k.a,{type:"primary",htmlType:"submit",children:"\u0412\u043e\u0439\u0442\u0438"})}))]}))})})),B=n(7),A=n(156),z=n.n(A),D=n(442),W=n(134);function G(){return Object(r.jsx)("div",{className:z.a.spinnerWrapper,children:Object(r.jsx)(W.a,{indicator:Object(r.jsx)(D.a,{className:z.a.indicator,spin:!0})})})}var H=Object(h.a)((function(){var e=Object(i.useState)(!1),t=Object(B.a)(e,2),n=t[0],a=t[1],s=Object(i.useRef)(!1);return Object(i.useEffect)((function(){s.current=!0,setTimeout((function(){s.current&&a(!0)}),5e3)}),[]),Object(i.useEffect)((function(){return function(){s.current=!1}}),[]),n?Object(r.jsx)(r.Fragment,{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}):Object(r.jsx)(G,{})}));var q=Object(h.a)((function(e){var t=e.children;return F.checkLogin?F.checkLogin&&!F.user?Object(r.jsx)(d.a,{to:"/login",noThrow:!0}):t:Object(r.jsx)(W.a,{})})),K=n(431),R=n(63),U=n(110),J=n.n(U);var V=Object(h.a)((function(){var e=F.user,t=F.editor,n="running"===(null===t||void 0===t?void 0:t.status),a=n?"\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440":"\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440",s=null===t||void 0===t?void 0:t.isLoading;return Object(i.useEffect)((function(){e&&F.editorStatus(e.id)}),[]),Object(r.jsxs)("div",{className:J.a.user,children:[Object(r.jsx)("div",{className:J.a.email,children:null===e||void 0===e?void 0:e.email}),Object(r.jsx)(k.a,{className:J.a.editorButton,onClick:n?function(){e&&F.stopEditor(e.id)}:function(){e&&F.startEditor(e.id)},danger:n,loading:s,children:a}),Object(r.jsx)(k.a,{className:J.a.logOutButton,onClick:function(){F.setUser(null),Object(d.c)("/")},children:"\u0412\u044b\u0439\u0442\u0438"})]})})),X=n.p+"static/media/logo.c8be1847.png",Q=n(139),Z=n.n(Q),Y=K.a.Header,$=K.a.Content,ee=K.a.Footer;function te(e){var t=e.children,n=e.indexMenuItem,a=e.menuItems,s=e.setIndexMenuItem;return Object(r.jsxs)(K.a,{children:[Object(r.jsx)(Y,{children:Object(r.jsxs)(R.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["".concat(n)],children:[Object(r.jsx)(R.a.Item,{children:Object(r.jsx)("img",{alt:"logo",className:Z.a.logo,src:X})},"logo"),a.map((function(e,t){return Object(r.jsx)(R.a.Item,{onClick:function(){s(t),Object(d.c)(e.path)},children:e.title},"".concat(t))})),Object(r.jsx)(V,{})]})}),Object(r.jsx)($,{className:Z.a.content,children:t}),Object(r.jsx)(ee,{className:Z.a.footer,children:"Pseudocoders \xa92020"})]})}var ne=function(e){return e.filter(Boolean)};var ae=Object(h.a)((function(e){var t=e.path,n=e.children,a=function(){var e;return ne([{title:"\u0417\u0430\u0434\u0430\u0447\u0438",path:"tasks"},{title:"\u0423\u0447\u0435\u043d\u0438\u043a\u0438",path:"students"},{title:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440",path:"monitoring"},"running"===(null===(e=F.editor)||void 0===e?void 0:e.status)&&{title:"\u0420\u0435\u0434\u0430\u043a\u0442\u043e\u0440",path:"http://api.pseudocoders.online:".concat(F.editor.port)}])}(),s=a.findIndex((function(e){return e.path===t}));if(-1===s)throw new Error("invalid path");var c=Object(i.useState)(s),u=Object(B.a)(c,2),o=u[0],l=u[1];return Object(r.jsx)(te,{menuItems:a,indexMenuItem:o,setIndexMenuItem:l,children:n})})),re=n(10),se=n(41),ie=n.n(se),ce=n(206),ue=n.n(ce);var oe=new(function(){function e(){Object(_.a)(this,e),this.api={loadLanguages:function(){return Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.get("/api/languages/");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},saveTask:function(e){return Object(b.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N.a.post("/api/tasks/create/",Object(f.a)(Object(f.a)({},e),{},{slug:ue()(e.name)}));case 2:return n=t.sent,t.abrupt("return",n.status);case 4:case"end":return t.stop()}}),t)})))()}},this.languages=[],this.saveProcess=!1,this.saveStatus=0,Object(s.d)(this)}return Object(w.a)(e,[{key:"setLanguages",value:function(e){this.languages=e}},{key:"getLanguages",value:function(){var e=Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.api.loadLanguages();case 2:t=e.sent,this.setLanguages(t);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"saveTask",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.saveProcess=!0,e.next=3,this.api.saveTask(t);case 3:n=e.sent,this.saveProcess=!1,this.saveStatus=n;case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}()),le=n(207),de=n.n(le),he=n(108),je=n(444),pe=n(445),fe=(n(195),n(432)),be=n(443),Oe=g.a.TextArea,ve=function(e){var t=e.input,n=e.output,a=e.idx,s=e.onChangeTests,c=e.onDelete,u=Object(i.useCallback)((function(e){return function(t){s(t.target.value,a,e)}}),[]);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("p",{className:ie.a.testHide,children:["\u0422\u0435\u0441\u0442 ",a+1,Object(r.jsx)(k.a,{className:ie.a.removeButton,onClick:c,icon:Object(r.jsx)(be.a,{}),shape:"circle",danger:!0})]}),Object(r.jsxs)("div",{className:ie.a.test,children:[Object(r.jsxs)("div",{className:ie.a.file,children:[Object(r.jsx)("p",{className:ie.a.fileName,children:"input.txt"}),Object(r.jsx)(Oe,{value:t,rows:4,onChange:u("input")})]}),Object(r.jsxs)("div",{className:ie.a.file,children:[Object(r.jsx)("p",{className:ie.a.fileName,children:"output.txt"}),Object(r.jsx)(Oe,{value:n,rows:4,onChange:u("output")})]})]})]})},xe=he.a.Option,me={toolbar:[[{header:[1,2,!1]}],[{color:["#FFFFFF","#000000","#3072C4","#228007","#CE0014","#D97E00","#7A1871","#F2F2F2","#808080","#1D85D0","#3F9726","#D70C17","#F69C00","#B254AA"]},"bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","code"],["clean"]]},ge=["header","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","code","color"],ke="TASK_NAME",_e="TASK_DESCRIPTION",we="TASK_LANGUAGES",ye="TASK_TESTS",Ne="IS_SAVE",Ce=function(e,t){localStorage.setItem(e,JSON.stringify(t))},Se=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=localStorage.getItem(e);return n?JSON.parse(n):t};var Ie=Object(h.a)((function(){Object(i.useEffect)((function(){Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe.getLanguages();case 2:case"end":return e.stop()}}),e)})))()}),[]);var e=Object(i.useCallback)((function(){oe.saveTask({name:Se(ke),languages:Se(we),description:Se(_e),tests:Se(ye)}),Ce(Ne,"on")}),[]);Object(i.useEffect)((function(){"on"===Se(Ne)&&(oe.saveProcess||200!==oe.saveStatus?console.log("error",oe.saveStatus):[ke,_e,we,ye,Ne].forEach((function(e){localStorage.removeItem(e)})))}),[oe.saveProcess,oe.saveStatus]);var t=Object(i.useState)(Se(_e)),n=Object(B.a)(t,2),a=n[0],s=n[1],c=Object(i.useState)(Se(ye,[{input:"",output:""}])),u=Object(B.a)(c,2),o=u[0],l=u[1],d=Object(i.useState)(Se(ke)),h=Object(B.a)(d,2),j=h[0],O=h[1],v=Object(i.useState)(Se(we,[])),x=Object(B.a)(v,2),m=x[0],_=x[1],w=Object(fe.a)((function(e,t){Ce(e,t)}),300),y=Object(i.useCallback)((function(e){var t=e.target.value;O(t),w.callback(ke,t)}),[O]),N=Object(i.useCallback)((function(e){s(e),w.callback(_e,e)}),[s]),C=Object(i.useCallback)((function(e){_(e),w.callback(we,e)}),[]),S=Object(i.useCallback)((function(e,t,n){var a=Object(re.a)(o);a[t][n]=e,l(a),w.callback(ye,a)}),[o]),I=Object(i.useCallback)((function(){l([].concat(Object(re.a)(o),[{input:"",output:""}]))}),[l,o]),T=function(e){return function(){var t=o.filter((function(t,n){return n!==e}));l(t),w.callback(ye,t)}},L=Object(i.useMemo)((function(){return oe.languages.map((function(e){return Object(r.jsx)(xe,{value:e.slug,children:e.name},e.slug)}))}),[oe.languages]);return Object(r.jsx)("div",{className:ie.a.createTask,children:Object(r.jsxs)("div",{className:ie.a.container,children:[Object(r.jsx)("h1",{className:ie.a.title,children:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438"}),Object(r.jsx)("p",{className:ie.a.description,children:"\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0438 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438. \u0414\u043b\u044f \u043a\u0440\u0430\u0441\u043e\u0447\u043d\u043e\u0441\u0442\u0438 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0440\u0430\u0437\u043d\u044b\u0435 \u0446\u0432\u0435\u0442\u0430, \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438, \u0441\u043f\u0438\u0441\u043a\u0438 \u0438 \u043a\u043e\u0434."}),Object(r.jsxs)("div",{className:ie.a.languges,children:[Object(r.jsx)("div",{className:ie.a.langugesTitle,children:"\u042f\u0417\u042b\u041a\u0418 \u041f\u0420\u041e\u0413\u0420\u0410\u041c\u041c\u0418\u0420\u041e\u0412\u0410\u041d\u0418\u042f"}),Object(r.jsx)(he.a,{className:ie.a.selectLanguages,mode:"tags",size:"middle",placeholder:"Please select",defaultValue:m,onChange:C,style:{minWidth:"200px"},children:L})]}),Object(r.jsx)("div",{style:{marginBottom:16},children:Object(r.jsx)(g.a,{value:j,onChange:y,addonBefore:"\u041d\u0410\u0417\u0412\u0410\u041d\u0418\u0415 \u0417\u0410\u0414\u0410\u0427\u0418",placeholder:"\u0411\u0438\u0444\u0448\u0442\u0435\u043a\u0441\u044b..."})}),Object(r.jsx)("div",{className:"text-editor",children:Object(r.jsx)(de.a,{theme:"snow",modules:me,formats:ge,value:a,onChange:N})}),(a||j)&&Object(r.jsxs)("div",{className:ie.a.preview,children:[Object(r.jsx)("h3",{className:ie.a.paragraph,children:"\u041f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440"}),Object(r.jsx)("h2",{children:j}),Object(r.jsx)("div",{style:{padding:0},className:"ql-editor",dangerouslySetInnerHTML:{__html:a}})]}),Object(r.jsx)("h3",{className:ie.a.paragraph,children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0435\u0441\u0442\u044b"}),o.map((function(e,t){return Object(r.jsx)(ve,Object(f.a)(Object(f.a)({idx:t},e),{},{onChangeTests:S,onDelete:T(t)}),t)})),Object(r.jsx)(k.a,{className:ie.a.addButton,onClick:I,icon:Object(r.jsx)(je.a,{}),children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0435\u0441\u0442"}),Object(r.jsx)("div",{className:ie.a.saveButtonBlock,children:Object(r.jsx)(k.a,{type:"primary",onClick:e,icon:Object(r.jsx)(pe.a,{}),children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443"})})]})})}));var Te=Object(h.a)((function(){return Object(r.jsx)(q,{children:Object(r.jsx)(ae,{path:"tasks",children:Object(r.jsx)(Ie,{})})})}));var Le=Object(h.a)((function(){return Object(r.jsx)(q,{children:Object(r.jsx)(ae,{path:"tasks",children:Object(r.jsx)("div",{style:{margin:20},children:Object(r.jsx)("a",{href:"/create",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443"})})})})}));var Ee=new(function(){function e(){Object(_.a)(this,e),this.api={loadList:function(){return Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.get("api/groups/");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()},createGroup:function(e){return Object(b.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N.a.post("api/groups/",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},editGroup:function(e,t){return Object(b.a)(p.a.mark((function n(){var a;return p.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,N.a.patch("api/groups/".concat(e,"/"),t);case 2:return a=n.sent,n.abrupt("return",a.data);case 4:case"end":return n.stop()}}),n)})))()}},this.list=new E(this.api.loadList),this.isLoading=!1,Object(s.d)(this)}return Object(w.a)(e,[{key:"createGroup",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isLoading=!0,e.next=3,this.api.createGroup(t);case 3:return n=e.sent,e.next=6,this.list.loadWithSavingState();case 6:return this.isLoading=!1,e.abrupt("return",n);case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"editGroup",value:function(){var e=Object(b.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.isLoading=!0,e.next=3,this.api.editGroup(t,n);case 3:return a=e.sent,e.next=6,this.list.loadWithSavingState();case 6:return this.isLoading=!1,e.abrupt("return",a);case 8:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}()),Pe=n(85),Fe=n.n(Pe),Me=n(437),Be=n(440),Ae=n(435);var ze=new(function(){function e(){Object(_.a)(this,e),this.api={loadTask:function(e){return Object(b.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N.a.get("/api/tasks/".concat(e));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})))()},loadList:function(){return Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.get("/api/tasks/");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))()}},this.task=null,this.list=new E(this.api.loadList),Object(s.d)(this)}return Object(w.a)(e,[{key:"getTask",value:function(){var e=Object(b.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.api.loadTask(t);case 2:n=e.sent,this.task=n;case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}()),De=he.a.Option;var We=Object(h.a)((function(){var e="currentGroupId",t=Object(i.useState)(),n=Object(B.a)(t,2),a=n[0],s=n[1],c=Object(i.useState)(!1),u=Object(B.a)(c,2),o=u[0],l=u[1],d=Object(i.useState)(!1),h=Object(B.a)(d,2),j=h[0],f=h[1],O=j,v=Object(i.useRef)(!1);function _(){return(_=Object(b.a)(p.a.mark((function t(){var n,a,r,i;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=T(e),(r=null===(n=Ee.list.data)||void 0===n?void 0:n.find((function(e){return e.id===a})))&&s(r),t.next=5,Ee.list.loadWithSavingState();case 5:return t.next=7,F.list.loadWithSavingState();case 7:return t.next=9,ze.list.loadWithSavingState();case 9:r||(r=a?Ee.list.data.find((function(e){return e.id===a})):null===(i=Ee.list.data)||void 0===i?void 0:i[0]),v.current&&s(r);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}if(Object(i.useEffect)((function(){return v.current=!0,function(){_.apply(this,arguments)}(),function(){v.current=!1}}),[]),Ee.list.isLoading||F.list.isLoading||ze.list.isLoading||!a)return Object(r.jsx)(G,{});if(Ee.list.hasError)return Object(r.jsx)(r.Fragment,{children:"\u0413\u0440\u0443\u043f\u043f\u044b \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b"});function w(t){var n=Ee.list.data.find((function(e){return e.id===t}));s(n),L(e,null===n||void 0===n?void 0:n.id)}function y(e){return N.apply(this,arguments)}function N(){return(N=Object(b.a)(p.a.mark((function e(t){var n,r,i,c,u,o,d,h,j;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.name,r=t.studentIds,i=t.taskIds,e.prev=1,c=null,!O){e.next=9;break}return e.next=6,Ee.editGroup(a.id,{name:n,users:r,tasks:i});case 6:c=e.sent,e.next=12;break;case 9:return e.next=11,Ee.createGroup({name:n,users:r,tasks:i,owner:F.user.id,slug:n+Math.random()});case 11:c=e.sent;case 12:l(!1),f(!1),c&&s(c),u="\u0413\u0440\u0443\u043f\u043f\u0430 ".concat(n,O?" \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0430!":" \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0430!"),x.b.success(u),e.next=25;break;case 19:e.prev=19,e.t0=e.catch(1),console.info(e.t0),h=null===(o=e.t0.response)||void 0===o?void 0:o.statusText,j=401===(null===(d=e.t0.response)||void 0===d?void 0:d.status)?"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d":h||e.t0.message,x.b.error("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c ".concat(O?"\u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c":"\u0441\u043e\u0437\u0434\u0430\u0442\u044c"," \u0433\u0440\u0443\u043f\u043f\u0443. ").concat(j));case 25:case"end":return e.stop()}}),e,null,[[1,19]])})))).apply(this,arguments)}function C(){l(!1),f(!1)}return Object(r.jsxs)("div",{className:Fe.a.groups,children:[function(){var e=O?"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u044b ".concat(null===a||void 0===a?void 0:a.name):"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u044b",t=O&&a?{name:a.name,taskIds:a.tasks,studentIds:a.users}:void 0;return Object(r.jsx)(Me.a,{onCancel:C,title:e,footer:null,visible:o||j,destroyOnClose:!0,children:Object(r.jsxs)(m.a,{name:"basic",initialValues:t,onFinish:y,children:[Object(r.jsx)(m.a.Item,{label:"\u0418\u043c\u044f \u0433\u0440\u0443\u043f\u043f\u044b",name:"name",rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u0433\u0440\u0443\u043f\u043f\u044b"}],children:Object(r.jsx)(g.a,{})}),Object(r.jsx)(m.a.Item,{name:"studentIds",label:"\u0423\u0447\u0435\u043d\u0438\u043a\u0438",rules:[{required:!0,message:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u043e\u0433\u043e \u0443\u0447\u0435\u043d\u0438\u043a\u0430"}],children:Object(r.jsx)(he.a,{placeholder:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432",mode:"multiple",children:F.list.data.map((function(e){return Object(r.jsx)(De,{value:e.id,children:P(e)},e.id)}))})}),Object(r.jsx)(m.a.Item,{name:"taskIds",label:"\u0417\u0430\u0434\u0430\u0447\u0438",rules:[{required:!0,message:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u0443 \u0437\u0430\u0434\u0430\u0447\u0443"}],children:Object(r.jsx)(he.a,{placeholder:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",mode:"multiple",children:ze.list.data.map((function(e){return Object(r.jsx)(De,{value:e.id,children:e.name},e.id)}))})}),Object(r.jsxs)("div",{className:Fe.a.footer,children:[Object(r.jsx)(m.a.Item,{children:Object(r.jsx)(k.a,{loading:Ee.isLoading,type:"primary",htmlType:"submit",children:O?"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c":"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})}),Object(r.jsx)(m.a.Item,{children:Object(r.jsx)(k.a,{onClick:C,children:"\u041e\u0442\u043c\u0435\u043d\u0430"})})]})]})})}(),Object(r.jsxs)("div",{className:Fe.a.subHeader,children:[function(){var e=Ee.list.data.map((function(e){return Object(r.jsx)(De,{value:e.id,children:e.name},e.id)}));return Object(r.jsx)(m.a.Item,{label:"\u0413\u0440\u0443\u043f\u043f\u0430 \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432",children:Object(r.jsx)(he.a,{value:null===a||void 0===a?void 0:a.id,style:{width:300},onChange:w,children:e})})}(),Object(r.jsx)(k.a,{onClick:function(){return f(!0)},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443"}),Object(r.jsx)(k.a,{type:"primary",onClick:function(){return l(!0)},children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443"})]}),Object(r.jsxs)("div",{className:Fe.a.studentsAndTasks,children:[Object(r.jsx)(Be.b,{locale:{emptyText:"\u0412 \u044d\u0442\u043e\u0439 \u0433\u0440\u0443\u043f\u043f\u0435 \u043d\u0435\u0442 \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432"},header:Object(r.jsx)(Ae.a,{title:"\u0421\u043f\u0438\u0441\u043e\u043a \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432 \u0432 \u0433\u0440\u0443\u043f\u043f\u0435"}),className:Fe.a.students,itemLayout:"horizontal",dataSource:F.list.data.filter((function(e){return a.users.includes(e.id)})),renderItem:function(e){return Object(r.jsx)(Be.b.Item,{children:P(e)})}}),Object(r.jsx)(Be.b,{locale:{emptyText:"\u0412 \u044d\u0442\u043e\u0439 \u0433\u0440\u0443\u043f\u043f\u0435 \u043d\u0435\u0442 \u0437\u0430\u0434\u0430\u0447"},header:Object(r.jsx)(Ae.a,{title:"\u0417\u0430\u0434\u0430\u0447\u0438 \u0432 \u0433\u0440\u0443\u043f\u043f\u0435"}),className:Fe.a.tasks,itemLayout:"horizontal",dataSource:ze.list.data.filter((function(e){return a.tasks.includes(e.id)})),renderItem:function(e){return Object(r.jsx)(Be.b.Item,{children:e.name})}})]})]})}));var Ge,He=Object(h.a)((function(){return Object(r.jsx)(q,{children:Object(r.jsx)(ae,{path:"students",children:Object(r.jsx)(We,{})})})})),qe=n(79),Ke=n.n(qe);!function(e){e.running="running",e.stopped="stopped",e.ce="ce",e.re="re",e.tle="tle",e.wa="wa",e.ok="ok"}(Ge||(Ge={}));var Re=new function e(){Object(_.a)(this,e),this.api={loadList:function(){return Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.a.get("api/task_checks/");case 2:return t=e.sent,e.abrupt("return",t.data.sort((function(e,t){return t.date-e.date})));case 4:case"end":return e.stop()}}),e)})))()}},this.list=new E(this.api.loadList)},Ue=n(436),Je=n(441),Ve=n(433),Xe=n(217),Qe=n.n(Xe),Ze=n(446);var Ye=Object(h.a)((function(){var e=Object(i.useState)(""),t=Object(B.a)(e,2),n=t[0],a=t[1],s=Object(i.useState)(""),c=Object(B.a)(s,2),u=c[0],o=c[1],l=Object(i.useRef)();if(Object(i.useEffect)((function(){return Re.list.addConsumer(),function(){Re.list.removeConsumer()}}),[]),Re.list.isLoading)return Object(r.jsx)(G,{});if(Re.list.hasError)return Object(r.jsx)(r.Fragment,{children:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d"});function d(e){return function(t,n){return String(t[e]).localeCompare(String(n[e]))}}function h(e,t){return e<100&&t!==Ge.running?"exception":100===e?"success":"active"}function j(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,s=t.selectedKeys,i=t.confirm,c=t.clearFilters;return Object(r.jsxs)("div",{style:{padding:8},children:[Object(r.jsx)(g.a,{ref:l,placeholder:"\u041f\u043e\u0438\u0441\u043a \u043f\u043e ".concat(e),value:s[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return p(s,i,e)},className:Ke.a.searchInput}),Object(r.jsxs)(Je.b,{children:[Object(r.jsx)(k.a,{type:"primary",onClick:function(){return p(s,i,e)},icon:Object(r.jsx)(Ze.a,{}),size:"small",className:Ke.a.searchButton,children:"\u041f\u043e\u0438\u0441\u043a"}),Object(r.jsx)(k.a,{onClick:function(){return function(e){e(),a("")}(c)},size:"small",className:Ke.a.searchButton,children:"\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c"})]})]})},filterIcon:function(e){return Object(r.jsx)(Ze.a,{style:{color:e?"#1890ff":void 0}})},onFilter:function(t,n){return n[e]?n[e].toString().toLowerCase().includes(t.toLowerCase()):""},onFilterDropdownVisibleChange:function(e){e&&setTimeout((function(){var e;return null===(e=l.current)||void 0===e?void 0:e.select()}),100)},render:function(t){return u===e?Object(r.jsx)(Qe.a,{highlightClassName:Ke.a.highlight,searchWords:[n],autoEscape:!0,textToHighlight:t?t.toString():""}):t}}}function p(e,t,n){t(),a(e[0]),o(n)}return Object(r.jsx)("div",{className:Ke.a.courses,children:Object(r.jsx)(Ve.a,{dataSource:Re.list.data.map((function(e){var t=e.date,n=e.user,a=e.task,s=e.language,i=e.id,c=e.passed_tests_count,u=e.tests_count,o=e.status,l=new Date(t),d=Math.round(100*c/u);return{key:i,dateObj:l,date:"".concat(l.toLocaleDateString()," ").concat(l.toLocaleTimeString()),userName:P(n),taskName:a.name,language:s.name,testCount:"".concat(c,"/").concat(u),status:Object(r.jsxs)("div",{className:Ke.a.status,children:[Object(r.jsx)("div",{className:Ke.a[o],children:o}),Object(r.jsx)(Ue.a,{type:"circle",width:30,percent:d,status:h(d,o)})]})}})),columns:[{title:"\u0414\u0430\u0442\u0430",dataIndex:"date",sorter:function(e,t){return Number(e.dateObj)-Number(t.dateObj)}},Object(f.a)({title:"\u0423\u0447\u0435\u043d\u0438\u043a",dataIndex:"userName",sorter:d("userName")},j("userName")),Object(f.a)({title:"\u0417\u0430\u0434\u0430\u0447\u0430",dataIndex:"taskName",sorter:d("taskName")},j("taskName")),Object(f.a)({title:"\u042f\u0437\u044b\u043a",dataIndex:"language",sorter:d("language")},j("language")),{title:"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442",dataIndex:"status",sorter:d("status")},{title:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u0440\u043e\u0439\u0434\u0435\u043d\u043d\u044b\u0445 \u0442\u0435\u0441\u0442\u043e\u0432",dataIndex:"testCount"}]})})}));var $e=Object(h.a)((function(){return Object(r.jsx)(q,{children:Object(r.jsx)(ae,{path:"monitoring",children:Object(r.jsx)(Ye,{})})})})),et=[{title:"\u0417\u0430\u0434\u0430\u0447\u0438",path:"tasks"},{title:"\u041c\u043e\u043d\u0438\u0442\u043e\u0440",path:"monitoring"}];function tt(e){var t=e.path,n=e.children,a=et.findIndex((function(e){return e.path===t}));if(-1===a)throw new Error("invalid path");var s=Object(i.useState)(a),c=Object(B.a)(s,2),u=c[0],o=c[1];return Object(r.jsx)(te,{menuItems:et,indexMenuItem:u,setIndexMenuItem:o,children:n})}var nt=n(45),at=n.n(nt);var rt=Object(h.a)((function(){var e;Object(i.useEffect)((function(){Object(b.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ze.getTask("Uralskie-bifshteksy");case 2:case"end":return e.stop()}}),e)})))()}),[]);var t=(null===(e=F.user)||void 0===e?void 0:e.type)===a.teacher?ae:tt;return console.log(ze.task),Object(r.jsx)(t,{path:"tasks",children:ze.task?Object(r.jsxs)("div",{className:at.a.container,children:[ze.task.name&&Object(r.jsx)("h1",{className:at.a.title,children:ze.task.name}),Object(r.jsxs)("div",{className:at.a.authorBlock,children:[ze.task.author&&Object(r.jsxs)("p",{className:at.a.author,children:[ze.task.author.first_name," ",ze.task.author.first_name," (",ze.task.author.login,")"]}),ze.task.languages&&Object(r.jsx)("div",{className:at.a.languages,children:ze.task.languages.map((function(e,t){return Object(r.jsx)("div",{className:at.a.languageItem,children:e.name},t)}))})]}),ze.task.description&&Object(r.jsx)("div",{style:{padding:"30px 0"},className:"ql-editor",dangerouslySetInnerHTML:{__html:ze.task.description}}),ze.task.tests&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{className:at.a.paragraph,children:"\u041f\u0420\u0418\u041c\u0415\u0420\u042b \u0422\u0415\u0421\u0422\u041e\u0412:"}),ze.task.tests.slice(0,3).map((function(e,t){var n=e.input,a=e.output;return Object(r.jsxs)("div",{className:at.a.test,children:[Object(r.jsxs)("div",{className:at.a.file,children:[Object(r.jsx)("p",{className:at.a.fileTitle,children:"input.txt"}),Object(r.jsx)("div",{className:at.a.fileContent,dangerouslySetInnerHTML:{__html:n}})]}),Object(r.jsxs)("div",{className:at.a.file,children:[Object(r.jsx)("p",{className:at.a.fileTitle,children:"output.txt"}),Object(r.jsx)("div",{className:at.a.fileContent,dangerouslySetInnerHTML:{__html:a}})]})]},t)}))]})]}):Object(r.jsx)(G,{})})}));var st=Object(h.a)((function(){var e;Object(i.useEffect)((function(){var e=T("user");e?F.setUser(e):Object(d.c)("/login"),F.setCheckLogin()}),[]);var t=Le;return Object(r.jsx)("div",{className:l.a.app,children:Object(r.jsxs)(d.b,{className:l.a.router,children:[(null===(e=F.user)||void 0===e?void 0:e.type)===a.teacher&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(Te,{path:"create"}),Object(r.jsx)(Le,{path:"tasks"}),Object(r.jsx)(He,{path:"students"}),Object(r.jsx)($e,{path:"monitoring"})]}),Object(r.jsx)(t,{path:"/"}),Object(r.jsx)(M,{path:"login"}),Object(r.jsx)(rt,{path:"task/:id"}),Object(r.jsx)(H,{default:!0})]})})}));(function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,447)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))})(),Object(s.b)({reactionScheduler:function(e){setTimeout(e)},enforceActions:"never"}),N.a.defaults.baseURL="https://api.pseudocoders.online/",u.a.render(Object(r.jsx)(st,{}),document.querySelector("#root"))},45:function(e,t,n){e.exports={container:"Task_container__fnxTo",title:"Task_title__17f2i",author:"Task_author__2QMIz",languages:"Task_languages__1y38Q",languageItem:"Task_languageItem__1OLhj",paragraph:"Task_paragraph__2nomt",file:"Task_file__3zvTt",fileTitle:"Task_fileTitle__ooVfH",fileContent:"Task_fileContent__3rXow",test:"Task_test__Olo7V",authorBlock:"Task_authorBlock__1QHzF"}},79:function(e,t,n){e.exports={monitorPage:"MonitorPage_monitorPage__12FYi",searchInput:"MonitorPage_searchInput__1A7eQ",searchButton:"MonitorPage_searchButton__2_Llr",highlight:"MonitorPage_highlight__y6A5c",status:"MonitorPage_status__2uZhn",running:"MonitorPage_running__2CRRc",stopped:"MonitorPage_stopped__3v1aX",ce:"MonitorPage_ce__3ZOUM",re:"MonitorPage_re__2KimH",tle:"MonitorPage_tle__3z8cp",wa:"MonitorPage_wa__1lIF6",ok:"MonitorPage_ok__LAKh8"}},85:function(e,t,n){e.exports={groups:"GroupsPage_groups__LjNlr",studentsAndTasks:"GroupsPage_studentsAndTasks__2zGq8",subHeader:"GroupsPage_subHeader__2qgjy",footer:"GroupsPage_footer__3XtVy"}}},[[429,1,2]]]);
//# sourceMappingURL=main.6321fcf2.chunk.js.map