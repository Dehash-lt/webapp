(this.webpackJsonppage=this.webpackJsonppage||[]).push([[0],{64:function(e,t,s){},66:function(e,t,s){},77:function(e,t,s){},99:function(e,t,s){"use strict";s.r(t);var a=s(0),c=s.n(a),n=s(8),i=s.n(n),r=(s(64),s(43)),l=s(12),j=s(13),d=s(17),o=s(15),b=s(23),h=(s(65),s(66),s(58)),x=s(105),O=s(106),m=s(57),u=s(110),f=s(113),p=s(111),v=s(109),g=s(112),y=s(107),N=s(108),w=s(28),C=s(32),k=s(34),L=(s(77),s(1)),E=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(){return Object(l.a)(this,s),t.apply(this,arguments)}return Object(j.a)(s,[{key:"render",value:function(){var e=this;return Object(L.jsx)("div",{className:"ballWrapper",children:Object(L.jsx)("div",{className:"ballBouncer",style:{marginLeft:this.props.marginLeft,animation:this.props.animation,animationDelay:this.props.animationDelay},onAnimationEnd:function(){e.props.animationEnd&&e.props.animationEnd()},children:Object(L.jsx)("div",{className:"ball"})})})}}]),s}(c.a.Component),S=function(e){return Object(L.jsxs)("div",{className:"overflow",children:[Object(L.jsx)(E,{marginLeft:"-15vh",animationDelay:"0s",animation:"bounce linear 1.5s "+e.repeat+" forwards"}),Object(L.jsx)(E,{marginLeft:"-5vh",animationDelay:"0.2s",animation:"bounce linear 1.5s "+e.repeat+" forwards"}),Object(L.jsx)(E,{marginLeft:"5vh",animationDelay:"0.4s",animation:"bounce linear 1.5s "+e.repeat+" forwards",animationEnd:e.animationEnd})]})},P=s(56),D=s.n(P),B=s(42),I=s.n(B);s(97);function M(){var e=Object(a.useState)("light"),t=Object(b.a)(e,2),s=t[0],c=t[1];return Object(a.useEffect)((function(){document.addEventListener("scroll",(function(){var e=window.scrollY<60?"light":"light-tr";c(e)}))})),Object(L.jsx)(L.Fragment,{children:Object(L.jsx)(f.a,{fixed:"top",className:"justify-content-end",bg:s,variant:"light",expand:"lg",children:Object(L.jsxs)(x.a,{children:[Object(L.jsx)(f.a.Brand,{href:"#home",children:"Dehash.lt"}),Object(L.jsx)(w.a,{"aria-controls":"responsive-navbar-nav"}),Object(L.jsx)(C.a,{id:"responsive-navbar-nav",className:"justify-content-end",children:Object(L.jsxs)(p.a,{className:"mr-auto justify-content-end",children:[Object(L.jsx)(p.a.Link,{children:Object(L.jsx)(k.Link,{to:"section",href:"#home",children:"Home"})}),Object(L.jsx)(p.a.Link,{children:Object(L.jsx)(k.Link,{to:"section1",href:"#about",children:"About Us"})}),Object(L.jsx)(p.a.Link,{children:Object(L.jsx)(k.Link,{to:"section2",href:"#data",children:"Data Sources"})})]})})]})})})}var A=["Hash","Password","Future"],F=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).interval=void 0,a.state={textIdx:0},a}return Object(j.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){return e.setState({textIdx:(1+e.state.textIdx)%A.length})}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return Object(L.jsxs)("div",{className:"text",children:[Object(L.jsx)("h1",{children:"Dehash"}),Object(L.jsx)("span",{className:"words-wrapper",children:Object(L.jsx)("b",{children:A[this.state.textIdx%3]})})]})}}]),s}(a.Component),T=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={isPopoverVisible:!1},a}return Object(j.a)(s,[{key:"render",value:function(){var e=this;return Object(L.jsx)(v.a,{placement:"auto",show:this.state.isPopoverVisible,delay:{show:200,hide:400},overlay:Object(L.jsx)(g.a,{className:"overflow-hidden",id:"Supported_Types_Popover",style:{maxWidth:"50rem"},onMouseLeave:function(){e.setState({isPopoverVisible:!1})},children:Object(L.jsx)("div",{className:"responsive-popover",style:{overflow:"scroll"},children:Object(L.jsxs)(y.a,{striped:!0,bordered:!0,hover:!0,variant:"dark",className:"mb-0",style:{maxWidth:"10rem"},children:[Object(L.jsx)("thead",{children:Object(L.jsxs)("tr",{children:[Object(L.jsx)("th",{children:"Supported Types"}),Object(L.jsx)("th",{children:"Dataset Size"}),Object(L.jsx)("th",{children:"Example"})]})}),Object(L.jsxs)("tbody",{children:[Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"MD5"}),Object(L.jsx)("td",{children:"1.7B + 1 external API"}),Object(L.jsx)("td",{children:"32 symbol hex"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"SHA1"}),Object(L.jsx)("td",{children:"1.7B"}),Object(L.jsx)("td",{children:"40 symbol hex"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"SHA256"}),Object(L.jsx)("td",{children:"1.2B"}),Object(L.jsx)("td",{children:"64 symbol hex"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"SHA384"}),Object(L.jsx)("td",{children:"1.2B"}),Object(L.jsx)("td",{children:"96 symbol hex"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"SHA512"}),Object(L.jsx)("td",{children:"1.2B"}),Object(L.jsx)("td",{children:"128 symbol hex"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"BCRYPT"}),Object(L.jsx)("td",{children:"33M"}),Object(L.jsx)("td",{children:"E.g: $2a$12$...3PG8cvRWd6wZxo2uvzeLIu3NscRMsCe3i7xl1HgnxwxIqe2./a"})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"VBULLETIN"}),Object(L.jsx)("td",{children:"45M"}),Object(L.jsxs)("td",{children:["E.g.: 01707f8ad07045fa34da944f4b4b11e1:560826 OR",Object(L.jsx)("br",{}),"01707f8ad07045fa34da944f4b4b11e1"]})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"         "}),Object(L.jsx)("td",{children:"    "}),Object(L.jsx)("td",{children:" "})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"         "}),Object(L.jsx)("td",{children:"    "}),Object(L.jsx)("td",{children:" "})]})]}),Object(L.jsx)("thead",{children:Object(L.jsxs)("tr",{children:[Object(L.jsx)("th",{children:"Other Types"}),Object(L.jsx)("td",{children:"Dataset Size"}),Object(L.jsx)("th",{children:"Explanation"})]})}),Object(L.jsxs)("tbody",{children:[Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"EMAIL"}),Object(L.jsx)("td",{children:"3.2B"}),Object(L.jsxs)("td",{children:["Email:Password pair lookup.",Object(L.jsx)("br",{}),"E.g: example@example.com"]})]}),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{children:"EMAIL:BCRYPT"}),Object(L.jsx)("td",{children:"3.2B"}),Object(L.jsxs)("td",{children:["Password Reusal Attack.",Object(L.jsx)("br",{}),"E.g: example@example.com:$2a$12$...Z4.I.M.fpaViXoXE3q.F20CCG62mkviJPPeXu1mMgXxbIIGcne"]})]})]})]})})}),children:Object(L.jsx)("i",{className:"fas fa-lg fa-info-circle text-muted align-self-center mt-2 mx-1",onMouseEnter:function(){e.setState({isPopoverVisible:!0})},onClick:function(){1==e.state.isPopoverVisible?e.setState({isPopoverVisible:!1}):e.setState({isPopoverVisible:!0})}})})}}]),s}(a.Component),R=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={isPopoverVisible:!1},a}return Object(j.a)(s,[{key:"componentDidMount",value:function(){I.a.init({duration:2e3})}},{key:"render",value:function(){return Object(L.jsxs)("section",{className:"overflow-hidden p-5",children:[Object(L.jsx)("h1",{children:"About Us"}),Object(L.jsx)(O.a,{className:" gx-5 justify-content-center",children:Object(L.jsx)(m.a,{className:"col-lg-6",children:Object(L.jsx)("div",{className:"text-center",children:Object(L.jsx)("h5",{className:"mb-5 mt-2",children:"We are Cybersecurity Enthusiasts - Dehash Team"})})})}),Object(L.jsxs)(O.a,{className:"gx-5 justify-content-center",children:[Object(L.jsx)(m.a,{className:"col-lg-3 col-md-6 mb-5","data-aos":"fade-right",children:Object(L.jsx)("div",{className:"card text-center text-decoration-none h-100 lift",children:Object(L.jsxs)("div",{className:"card-body ",children:[Object(L.jsx)("img",{className:"icon-bubble icon-lg border border-dark border-dashed",src:"/img/Eimantas.jpeg"}),Object(L.jsx)("p",{className:"font-weight-bold small mt-1",children:"Eimantas Reb\u017edys"}),Object(L.jsx)("p",{className:"small mt-1",children:"Front-End Engineer"}),Object(L.jsx)("a",{className:"fab fa-linkedin-in mx-1",onClick:function(){return window.open("https://lt.linkedin.com/in/eimantas-reb\u017edys-8b130616a","_blank")}}),Object(L.jsx)("a",{className:"fab fa-github-square mx-1",onClick:function(){return window.open("https://github.com/EimantasRebzdys","_blank")}})]})})}),Object(L.jsx)(m.a,{className:"col-lg-3 col-md-6 mb-5","data-aos":"fade-left","data-aos-delay":"100",children:Object(L.jsx)("div",{className:"card text-center text-decoration-none h-100 lift",children:Object(L.jsxs)("div",{className:"card-body ",children:[Object(L.jsx)("img",{className:"icon-bubble icon-lg border border-dark border-dashed",src:"/img/TomasV.jpg"}),Object(L.jsx)("p",{className:"font-weight-bold small mt-1",children:"Tomas Vanagas"}),Object(L.jsx)("p",{className:"small mt-1",children:"Back-End Engineer"}),Object(L.jsx)("a",{className:"fab fa-linkedin-in mx-1",onClick:function(){return window.open("https://lt.linkedin.com/in/tomas-vanagas-147332120","_blank")}}),Object(L.jsx)("a",{className:"fab fa-github-square mx-1",onClick:function(){return window.open("https://github.com/tomasvanagas","_blank")}})]})})})]})]})}}]),s}(a.Component),V=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(e){return Object(l.a)(this,s),t.call(this,e)}return Object(j.a)(s,[{key:"componentDidMount",value:function(){I.a.init({duration:900})}},{key:"render",value:function(){return Object(L.jsxs)(x.a,{children:[Object(L.jsx)("h1",{children:"Data Sources"}),Object(L.jsx)("p",{children:"We are using pubicly available data from data leaks like Collection #1-5 and wordlists like Crackstation."}),Object(L.jsxs)(O.a,{className:"mt-5",children:[Object(L.jsxs)(m.a,{children:[Object(L.jsx)(v.a,{placement:"auto",delay:{show:200,hide:400},overlay:W("Data submited by our users e.g. hashes"),children:Object(L.jsx)("div",{className:"icon icon-bubble bg-dark","data-aos":"zoom-in-right",children:Object(L.jsx)("i",{className:"fas fa-book text-light"})})}),Object(L.jsx)("p",{children:"Research"})]}),Object(L.jsxs)(m.a,{children:[Object(L.jsx)(v.a,{placement:"auto",delay:{show:200,hide:400},overlay:W("Data Leaks and breaches publicly available on the internet"),children:Object(L.jsx)("div",{className:"icon icon-bubble bg-dark","data-aos":"zoom-in",children:Object(L.jsx)("i",{className:"fas fa-database text-light"})})}),Object(L.jsx)("p",{children:"Data Leaks"})]}),Object(L.jsxs)(m.a,{children:[Object(L.jsx)(v.a,{placement:"auto",delay:{show:200,hide:400},overlay:W("Publicly available information hashtables and other information from different sources like Crackstation"),children:Object(L.jsx)("div",{className:"icon icon-bubble bg-dark","data-aos":"zoom-in-left",children:Object(L.jsx)("i",{className:"fas fa-server text-light"})})}),Object(L.jsx)("p",{children:"Public information"})]})]})]})}}]),s}(a.Component),H=function(e){Object(d.a)(s,e);var t=Object(o.a)(s);function s(){return Object(l.a)(this,s),t.apply(this,arguments)}return Object(j.a)(s,[{key:"render",value:function(){return Object(L.jsx)(x.a,{fluid:!0,className:"bg-dark text-white ",children:Object(L.jsx)(O.a,{children:Object(L.jsxs)(m.a,{className:"d-inline-flex justify-content-center",children:[Object(L.jsxs)("p",{className:"mb-0 pb-2",children:["\xa9 Tomas & Eimantas",Object(L.jsx)("br",{}),"Lithuania, Kaunas"]}),Object(L.jsx)("i",{className:"fab fa-lg fa-github-square mx-3 text-white align-self-center",onClick:function(){return window.open("https://github.com/Dehash-lt","_blank")}})]})})})}}]),s}(a.Component),W=function(e){return Object(L.jsx)(N.a,Object(r.a)(Object(r.a)({id:"button-tooltip"},e),{},{children:e}))},_=function(e,t){if(0===Object.keys(e).length)return 0!==t?Object(L.jsxs)(L.Fragment,{children:[" ",Object(L.jsx)("p",{style:{color:"white"},children:"No Results"})," "]}):Object(L.jsx)(L.Fragment,{});try{return Object(L.jsx)("div",{className:"pt-3 text-light border border-light rounded ",style:{backgroundColor:"rgba(255, 255, 255, 0.32)"},children:Object(L.jsx)(y.a,{striped:!0,bordered:!0,hover:!0,variant:"dark",children:e?Object.keys(e).map((function(t,s){return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)("thead",{children:Object(L.jsxs)("tr",{children:[Object(L.jsx)("th",{children:t}),Object(L.jsx)("th",{children:"Results"})]})}),Object(L.jsx)("tbody",{children:e[t].results.map((function(e){return console.log(e),Object(L.jsxs)("tr",{className:"",children:[Object(L.jsx)("td",{}),Object(L.jsx)("td",{children:e})]})}))})]})})):Object(L.jsx)(L.Fragment,{})})})}catch(s){console.log("Error while parsing. Unable to display"),console.log(s)}},z=function(){var e=Object(a.useState)(!1),t=Object(b.a)(e,2),s=t[0],c=t[1],n=Object(a.useState)(JSON.parse("{}")),i=Object(b.a)(n,2),r=i[0],l=i[1],j=Object(a.useState)(0),d=Object(b.a)(j,2),o=d[0],f=d[1];return Object(L.jsxs)("div",{className:"App bg-light",children:[!0===s?Object(L.jsx)(S,{repeat:"3",animationEnd:function(){c(!1)}}):Object(L.jsx)(L.Fragment,{}),Object(L.jsx)(M,{}),Object(L.jsx)(x.a,{id:"section",fluid:!0,className:"pt-5 bg-dark-light ",children:Object(L.jsx)(O.a,{className:"mt-5",children:Object(L.jsxs)(m.a,{className:"d-inline-flex justify-content-center",children:[Object(L.jsx)("div",{className:"pr-3 mt-5 pt-5 text-light d-inline-flex",children:Object(L.jsx)(F,{})}),Object(L.jsx)("img",{className:"lock",alt:"",src:"/img/lock_white.png"})]})})}),Object(L.jsxs)("div",{className:"bg-dark pt-3 overflow-hidden",children:[Object(L.jsx)(O.a,{children:Object(L.jsx)("div",{className:"width-full",children:Object(L.jsxs)(u.a,{onSubmit:function(e){c(!0),e.preventDefault(),e.stopPropagation(),D.a.get("https://api.dehash.lt/api.php?json=1&search="+e.target[0].value).then((function(e){return console.log(e),e})).then((function(e){"Error"===e.data?l(JSON.parse('{"Error":"Unsupported data format"}')):(l(e.data),f(o+1))})).then((function(){return c(!1)}))},children:[Object(L.jsxs)(u.a.Row,{className:"d-flex",children:[Object(L.jsxs)(m.a,{xs:"auto",className:"flex-fill",children:[Object(L.jsx)(u.a.Label,{children:"Hash"}),Object(L.jsx)(u.a.Control,{type:"hash",placeholder:"Email, Hash or Email:Hash"}),Object(L.jsx)(u.a.Text,{className:"text-muted",children:"We collect your submited data (IP, User Agent, Query)."})]}),Object(L.jsx)(T,{})]}),Object(L.jsx)(h.a,{className:"mt-2",variant:"primary",type:"submit",children:"Search"})]})})}),Object(L.jsx)(O.a,{className:"p-5",children:_(r,o)})]}),Object(L.jsx)("svg",{id:"section1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320",children:Object(L.jsx)("path",{fill:"#212529","fill-opacity":"1",d:"M0,224L48,197.3C96,171,192,117,288,101.3C384,85,480,107,576,122.7C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"})}),Object(L.jsx)(x.a,{fluid:!0,children:Object(L.jsx)(R,{})}),Object(L.jsx)("svg",{id:"section2",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320",children:Object(L.jsx)("path",{fill:"var(--gray-transp)","fill-opacity":"1",d:"M0,160L48,154.7C96,149,192,139,288,128C384,117,480,107,576,117.3C672,128,768,160,864,154.7C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})}),Object(L.jsx)(x.a,{fluid:!0,className:"bg-gray overflow-hidden",children:Object(L.jsx)(V,{})}),Object(L.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 320",children:Object(L.jsx)("path",{fill:"var(--gray-transp)","fill-opacity":"1",d:"M0,224L48,197.3C96,171,192,117,288,122.7C384,128,480,192,576,192C672,192,768,128,864,122.7C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"})}),Object(L.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1420 193",children:Object(L.jsx)("path",{fill:"#212529","fill-opacity":"1",d:"M0,128L60,117.3C120,107,240,85,360,74.7C480,64,600,64,720,85.3C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"})}),Object(L.jsx)(H,{})]})},U=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,114)).then((function(t){var s=t.getCLS,a=t.getFID,c=t.getFCP,n=t.getLCP,i=t.getTTFB;s(e),a(e),c(e),n(e),i(e)}))};i.a.render(Object(L.jsx)(c.a.StrictMode,{children:Object(L.jsx)(z,{})}),document.getElementById("root")),U()}},[[99,1,2]]]);
//# sourceMappingURL=main.234af801.chunk.js.map