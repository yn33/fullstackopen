(this["webpackJsonp2.11-2.14"]=this["webpackJsonp2.11-2.14"]||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),o=t(14),a=t.n(o),i=(t(19),t(3)),u=t(4),l=t.n(u),s="/api/persons",d=function(){return l.a.get(s).catch((function(e){console.log("get error")})).then((function(e){return e.data}))},j=function(e){return l.a.post(s,e).catch((function(e){console.log("post error")})).then((function(e){return e.data}))},h=function(e){return l.a.delete("".concat(s,"/").concat(e)).catch((function(e){console.log("delete error")}))},f=function(e,n){return l.a.put("".concat(s,"/").concat(e),n).catch((function(e){console.log("update error")})).then((function(e){return e.data}))},b=t(0),m=function(e){var n=e.message,t=e.color;return""===n?null:"green"===t?Object(b.jsx)("div",{className:"greennotif",children:n}):"red"===t?Object(b.jsx)("div",{className:"rednotif",children:n}):null},O=function(e){var n=e.filter,t=e.handleFilterChange;return Object(b.jsxs)("div",{children:["filter shown with ",Object(b.jsx)("input",{value:n,onChange:t})]})},g=function(e){return Object(b.jsxs)("form",{onSubmit:e.addPerson,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.filtered,t=e.handleDelete;return Object(b.jsx)("div",{children:n.map((function(e){return Object(b.jsxs)("div",{children:[Object(b.jsxs)(b.Fragment,{children:[e.name," ",e.number]}),Object(b.jsx)("button",{onClick:t(e),children:"delete"},e.name)]},e.name)}))})},x=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(i.a)(o,2),u=a[0],l=a[1],s=Object(c.useState)(""),x=Object(i.a)(s,2),p=x[0],w=x[1],C=Object(c.useState)(""),N=Object(i.a)(C,2),S=N[0],k=N[1],y=Object(c.useState)(""),D=Object(i.a)(y,2),F=D[0],P=D[1],T=Object(c.useState)("green"),E=Object(i.a)(T,2),I=E[0],J=E[1];Object(c.useEffect)((function(){d().then((function(e){console.log(e),r(e)}))}),[]);var L=""===S?t:t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(m,{message:F,color:I}),Object(b.jsx)(O,{filter:S,handleFilterChange:function(e){console.log(e.target.value),k(e.target.value)}}),Object(b.jsx)("h2",{children:"add a new"}),Object(b.jsx)(g,{addPerson:function(e){e.preventDefault(),console.log(u);var n={name:u,number:p};if(t.map((function(e){return e.name})).includes(u)){if(window.confirm("".concat(u," is already added to phonebook, replace the old number with a new one?"))){var c=t.filter((function(e){return e.name===u}));f(c[0].id,n).then((function(e){r(t.map((function(n){return n.id!==c[0].id?n:e}))),l(""),w(""),P("Changed the number for ".concat(e.name)),setTimeout((function(){P("")}),3e3)})).catch((function(e){J("red"),P("Information of ".concat(n.name," has already been removed from the server")),setTimeout((function(){P(""),J("green")}),3e3)}))}}else j(n).then((function(e){r(t.concat(e)),l(""),w(""),P("Added ".concat(e.name)),setTimeout((function(){P("")}),3e3)}))},newName:u,handleNameChange:function(e){console.log(e.target.value),l(e.target.value)},newNumber:p,handleNumberChange:function(e){console.log(e.target.value),w(e.target.value)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(v,{filtered:L,handleDelete:function(e){return function(){window.confirm("Delete ".concat(e.name,"?"))&&h(e.id).then((function(){r(t.filter((function(n){return n.id!==e.id})))}))}}})]})};a.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.9f2a12f4.chunk.js.map