(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),a=t(6),o=t(3),u=t(1),i=t(0),s=function(e){return Object(i.jsxs)("div",{children:[e.name,": ",e.number,Object(i.jsx)("button",{onClick:e.deletePerson,children:"delete"})]})},d=function(e){return Object(i.jsxs)("div",{children:["Filter: ",Object(i.jsx)("input",{value:e.filter,onChange:e.handleChange})]})},b=function(e){return Object(i.jsxs)("form",{onSubmit:e.addName,children:[Object(i.jsxs)("div",{children:["Name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(i.jsxs)("div",{children:["Number: ",Object(i.jsx)("input",{value:e.newNum,onChange:e.handleNumChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.message,t=e.isError;if(null===n)return null;var r={color:t?"red":"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return Object(i.jsx)("div",{style:r,children:n})},j=t(4),h=t.n(j),m="https://aqueous-chamber-29253.herokuapp.com/api/persons",f=function(){return h.a.get(m).then((function(e){return e.data}))},O=function(e){return h.a.post(m,e).then((function(e){return e.data}))},v=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return h.a.delete("".concat(m,"/").concat(e))},g=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)(""),j=Object(o.a)(c,2),h=j[0],m=j[1],g=Object(u.useState)(""),x=Object(o.a)(g,2),w=x[0],N=x[1],C=Object(u.useState)(""),k=Object(o.a)(C,2),S=k[0],y=k[1],E=Object(u.useState)(null),P=Object(o.a)(E,2),T=P[0],A=P[1],B=Object(u.useState)(null),D=Object(o.a)(B,2),J=D[0],L=D[1];Object(u.useEffect)((function(){f().then((function(e){r(e)}))}),[]);var q=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(l,{message:T,isError:!1}),Object(i.jsx)(l,{message:J,isError:!0}),Object(i.jsx)(d,{value:S,handleChange:function(e){y(e.target.value)}}),Object(i.jsx)("h2",{children:"Add a New Number"}),Object(i.jsx)(b,{addName:function(e){e.preventDefault();for(var n=0;n<t.length;n++)if(t[n].name===h){var c=function(){var e=t[n],c=Object(a.a)(Object(a.a)({},e),{},{number:w});return window.confirm("".concat(h," is already in the phonebook - replace the old number with a new one?"))?(v(c.id,c).then((function(e){r(t.map((function(n){return n.id!==e.id?n:e}))),m(""),N(""),A("Modified ".concat(c.name,"'s number to ").concat(c.number)),setTimeout((function(){return A(null)}),5e3)})),{v:void 0}):{v:void 0}}();if("object"===typeof c)return c.v}var o={name:h,number:w};O(o).then((function(e){r(t.concat(e)),m(""),N(""),A("Added ".concat(o.name)),setTimeout((function(){return A(null)}),5e3)}))},newName:h,handleNameChange:function(e){m(e.target.value)},newNum:w,handleNumChange:function(e){N(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),q.map((function(e){return Object(i.jsx)(s,{name:e.name,number:e.number,deletePerson:function(){return n=e.id,c=e.name,void(window.confirm("Delete ".concat(c,"?"))&&(p(n).catch((function(e){L("".concat(c," is not in the phonebook")),setTimeout((function(){return L(null)}),5e3)})),r(t.filter((function(e){return e.id!==n})))));var n,c}},e.id)}))]})};c.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.8be461b0.chunk.js.map