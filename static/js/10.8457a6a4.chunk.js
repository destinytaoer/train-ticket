(this["webpackJsonptrain-ticket"]=this["webpackJsonptrain-ticket"]||[]).push([[10],{21:function(e,t,a){"use strict";e.exports=function(e,t,a){if((t-=(e+="").length)<=0)return e;a||0===a||(a=" ");if(" "===(a+="")&&t<10)return n[t]+e;var i="";for(;1&t&&(i+=a),t>>=1;)a+=a;return i+e};var n=[""," ","  ","   ","    ","     ","      ","       ","        ","         "]},73:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(4),i=a(0),r=a.n(i),s=a(21),o=a.n(s),c=a(8),l=a.n(c),m=a(5),v=a.n(m),S=(a(73),Object(i.memo)((function(e){var t=e.index,a=e.station,n=e.arriveTime,i=e.leaveTime,s=e.stay,c=e.isStartStation,l=e.isEndStation,m=e.isLeaveStation,v=e.isArriveStation,S=e.beforeLeaveStation,f=e.afterArriveStation;return r.a.createElement("li",null,r.a.createElement("div",{className:["icon",m||v?"icon-red":""].filter(Boolean).join(" ")},m?"\u51fa":v?"\u5230":o()(t,2,0)),r.a.createElement("div",{className:["row",S||f?"grey":""].filter(Boolean).join(" ")},r.a.createElement("span",{className:["station",v||m?"red":""].filter(Boolean).join(" ")},a),r.a.createElement("span",{className:["arrtime",v?"red":""].filter(Boolean).join(" ")},c?"\u59cb\u53d1\u7ad9":n),r.a.createElement("span",{className:["deptime",m?"red":""].filter(Boolean).join(" ")},l?" \u7ec8\u5230\u7ad9":i),r.a.createElement("span",{className:"stoptime"},c||l?"-":s+"\u5206")))})));t.default=function(e){var t=e.date,a=e.trainNumber,s=e.leaveStation,o=e.arriveStation,c=Object(i.useState)([]),m=Object(n.a)(c,2),f=m[0],u=m[1];return Object(i.useEffect)((function(){var e=new l.a("/rest/schedule").setSearch("trainNumber",a).setSearch("departStaion",s).setSearch("arriveStation",o).setSearch("date",v()(t).format("YYYY-MM-DD")).toString();fetch(e).then((function(e){return e.json()})).then((function(e){for(var t,a,n=0;n<e.length;n++)t?a?Object.assign(e[n],{beforeLeaveStation:!1,isLeaveStation:!1,afterArriveStation:!0,isArriveStation:!1}):e[n].station===o?a=Object.assign(e[n],{beforeLeaveStation:!1,isLeaveStation:!1,afterArriveStation:!1,isArriveStation:!0}):Object.assign(e[n],{beforeLeaveStation:!1,isLeaveStation:!1,afterArriveStation:!1,isArriveStation:!1}):e[n].station===s?t=Object.assign(e[n],{beforeLeaveStation:!1,isLeaveStation:!0,afterArriveStation:!1,isArriveStation:!1}):Object.assign(e[n],{beforeLeaveStation:!0,isLeaveStation:!1,afterArriveStation:!1,isArriveStation:!1}),Object.assign(e[n],{isStartStation:0===n,isEndStation:n===e.length-1,leaveTime:e[n].departTime});u(e)}))}),[t,a,s,o]),r.a.createElement("div",{className:"schedule"},r.a.createElement("div",{className:"dialog"},r.a.createElement("h1",null,"\u5217\u8f66\u65f6\u523b\u8868"),r.a.createElement("div",{className:"head"},r.a.createElement("span",{className:"station"},"\u8f66\u7ad9"),r.a.createElement("span",{className:"deptime"},"\u5230\u8fbe"),r.a.createElement("span",{className:"arrtime"},"\u53d1\u8f66"),r.a.createElement("span",{className:"stoptime"},"\u505c\u7559\u65f6\u95f4")),r.a.createElement("ul",null,f.map((function(e,t){return r.a.createElement(S,Object.assign({index:t+1,key:e.station},e))})))))}}}]);
//# sourceMappingURL=10.8457a6a4.chunk.js.map