(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4320"],{"0AoE":function(s,t,i){"use strict";var n=i("SXkE");i.n(n).a},Eu2M:function(s,t,i){"use strict";var n=i("s8in");i.n(n).a},SXkE:function(s,t,i){},c11S:function(s,t,i){"use strict";var n=i("gTgX");i.n(n).a},gTgX:function(s,t,i){},mxmt:function(s,t){s.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTI4Ljc2IDM3MS4xOSI+PGcgaWQ9IkViZW5lXzIiIGRhdGEtbmFtZT0iRWJlbmUgMiI+PGcgaWQ9IkViZW5lXzEtMiIgZGF0YS1uYW1lPSJFYmVuZSAxIj48cGF0aCBmaWxsPSIjNDA5ZWZmIiBkPSJNMTA2NywuMThWNDcuNDRjLTc2LjE5LTY4LjM1LTE5My4zNi02Mi0yNjEuNzEsMTQuMTlhMTg1LjM1LDE4NS4zNSwwLDAsMCwuMDcsMjQ3LjZINzE4LjU4Vi4xOEg2NTYuODdMNjE1LjY2LDYybC0yMC42LDMwLjkzTDU3NC40NSwxMjMuOGExMi4zOCwxMi4zOCwwLDAsMS0yMC4zNSwwaDBMNTMzLjUsOTIuOTIsNTEzLjE1LDYyLDQ3MS45NC4xOEg0MDkuNjNWMzA5LjIzaC04NkMzOTIsMjMyLjkyLDM4NS41MywxMTUuNjUsMzA5LjIyLDQ3LjMxUzExNS42NS0xNC41Nyw0Ny4zMSw2MS43NGExODUuNDksMTg1LjQ5LDAsMCwwLDAsMjQ3LjQ5SC4wNVYzNzFIMTIzLjY3di03OC40YTEyMy42MiwxMjMuNjIsMCwxLDEsMTIzLjYyLDBWMzcxSDQwOS42M2E2MS44Miw2MS44MiwwLDAsMCw2MS44MS02MS44MWgwVjEwOC4xM0w0OTIsMTM5LjA2bDQxLjIxLDYxLjgxLDIwLjgsMjkuNGExMi4zLDEyLjMsMCwwLDAsMjAuMzUsMGwyMC44MS0yOS40LDQxLjIxLTYxLjgxTDY1NywxMDguMTN2MjAxLjFhNjEuNjcsNjEuNjcsMCwwLDAsNy40MywyOS40NWMxLDEuNzMsMiwzLjQ2LDMuMSw1LjA5YTYyLjczLDYyLjczLDAsMCwwLDcuNTgsOS4xNiw2MSw2MSwwLDAsMCwxNC4yNCwxMC42Myw1Ni40LDU2LjQsMCwwLDAsMTEsNC42OCw2MS41LDYxLjUsMCwwLDAsMTguNDIsMi44aDIyNC43YTE4NS41NSwxODUuNTUsMCwwLDAsNjEuODEtMTAuNTMsMTgwLjI3LDE4MC4yNywwLDAsMCwzMC45My0xNC4zVjI2Ny4zNmExMjMuNTUsMTIzLjU1LDAsMCwxLTMwLjkzLDI1LjQzLDEyMiwxMjIsMCwwLDEtNjEuODEsMTYuNTloMEExMjMuNjIsMTIzLjYyLDAsMSwxLDEwNTAuMzcsMTI0LDEyMi4xLDEyMi4xLDAsMCwxLDEwNjcsMTg1Ljc2VjM3MS4xOWg2MS44MVYuMzNaIi8+PC9nPjwvZz48L3N2Zz4K"},ntYl:function(s,t,i){"use strict";i.r(t);var n=i("Yfch"),a={name:"Login",components:{NavBar:i("zrg5").a},data:function(){return{loginForm:{username:"admin",password:"admin"},loginRules:{username:[{required:!0,trigger:"blur",validator:function(s,t,i){Object(n.b)(t)?i():i(new Error("请输入正确的用户名"))}}],password:[{required:!0,trigger:"blur",validator:function(s,t,i){t.length<5?i(new Error("密码不能小于5位")):i()}}]},loading:!1,pwdType:"password",redirect:void 0}},watch:{$route:{handler:function(s){this.redirect=s.query&&s.query.redirect},immediate:!0}},methods:{showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var s=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;s.loading=!0,s.$store.dispatch("Login",s.loginForm).then(function(){s.loading=!1,s.$router.push({path:s.redirect||"/"})}).catch(function(){s.loading=!1})})}}},e=(i("c11S"),i("Eu2M"),i("KHd+")),o=Object(e.a)(a,function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"login"},[i("nav-bar"),s._v(" "),i("div",{staticClass:"login-container"},[i("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:s.loginForm,rules:s.loginRules,"auto-complete":"on","label-position":"left"}},[i("h3",{staticClass:"title"},[s._v("Admin Land")]),s._v(" "),i("p",[s._v("Create your shop and organise it.")]),s._v(" "),i("el-form-item",{attrs:{prop:"username"}},[i("span",{staticClass:"svg-container"},[i("svg-icon",{attrs:{"icon-class":"user"}})],1),s._v(" "),i("el-input",{attrs:{name:"username",type:"text","auto-complete":"on",placeholder:"username"},model:{value:s.loginForm.username,callback:function(t){s.$set(s.loginForm,"username",t)},expression:"loginForm.username"}})],1),s._v(" "),i("el-form-item",{attrs:{prop:"password"}},[i("span",{staticClass:"svg-container"},[i("svg-icon",{attrs:{"icon-class":"password"}})],1),s._v(" "),i("el-input",{attrs:{type:s.pwdType,name:"password","auto-complete":"on",placeholder:"password"},nativeOn:{keyup:function(t){return"button"in t||!s._k(t.keyCode,"enter",13,t.key,"Enter")?s.handleLogin(t):null}},model:{value:s.loginForm.password,callback:function(t){s.$set(s.loginForm,"password",t)},expression:"loginForm.password"}}),s._v(" "),i("span",{staticClass:"show-pwd",on:{click:s.showPwd}},[i("svg-icon",{attrs:{"icon-class":"password"===s.pwdType?"eye":"eye-open"}})],1)],1),s._v(" "),i("el-form-item",[i("el-button",{staticStyle:{width:"100%"},attrs:{loading:s.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),s.handleLogin(t)}}},[s._v("\n          Sign in\n        ")])],1),s._v(" "),i("div",{staticClass:"tips"},[i("span",{staticStyle:{"margin-right":"20px"}},[s._v("Demo username: admin")]),s._v(" "),i("span",[s._v(" password: admin")])])],1)],1)],1)},[],!1,null,"e9662a86",null);o.options.__file="index.vue";t.default=o.exports},s8in:function(s,t,i){},zrg5:function(s,t,i){"use strict";var n={},a=(i("0AoE"),i("KHd+")),e=Object(a.a)(n,function(){var s=this.$createElement,t=this._self._c||s;return t("nav",{staticClass:"main-nav"},[t("router-link",{staticClass:"nav-item nav-item--logo",attrs:{to:"/","exact-active-class":"active"}},[t("div",{staticClass:"logo"}),this._v(" "),t("div",{staticClass:"logo-wrapper"},[t("img",{staticClass:"logo",attrs:{alt:"online marketplace app",src:i("mxmt")}})])]),this._v(" "),t("div",{staticClass:"nav-menu"},[t("router-link",{staticClass:"nav-item",attrs:{to:"/login","active-class":"active"}},[t("span",[this._v("Demo Login")])])],1)],1)},[],!1,null,null,null);e.options.__file="index.vue";t.a=e.exports}}]);