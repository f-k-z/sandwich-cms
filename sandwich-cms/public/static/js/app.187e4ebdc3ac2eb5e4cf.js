webpackJsonp([1],{122:function(e,t,s){s(135);var a=s(1)(s(128),s(154),"data-v-01e83554",null);e.exports=a.exports},123:function(e,t,s){"use strict";var a=s(6),i=s(161),n=s(149),r=s.n(n),l=s(152),c=s.n(l);a.a.use(i.a),t.a=new i.a({routes:[{path:"/",name:"Home",component:r.a},{path:"/page/edit/:page_id",name:"PageEdit",component:c.a}]})},125:function(e,t,s){s(136);var a=s(1)(s(127),s(155),null,null);e.exports=a.exports},127:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s(3);t.default={name:"app",data:function(){return{title:"Sandwich CMS"}}}},128:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"slug-field",props:["stringToSlug"],data:function(){return{slug:""}},methods:{slugify:function(e){e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase();for(var t="àáäâèéëêìíïîòóöôùúüûñç·/_,:;",s="aaaaeeeeiiiioooouuuunc------",a=0,i=t.length;a<i;a++)e=e.replace(new RegExp(t.charAt(a),"g"),s.charAt(a));return e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}},watch:{stringToSlug:function(){this.slug=this.slugify(this.stringToSlug)},slug:function(){this.$emit("update",this.slug)}}}},129:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(150),i=s.n(a),n=s(151),r=s.n(n);t.default={name:"home",data:function(){return{msg:""}},components:{PageCreate:i.a,PageList:r.a}}},130:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(3),i=s(5),n=s.n(i),r=s(0),l=s.n(r),c=s(122),o=s.n(c);t.default={name:"page-create",firebase:{pages:a.a.db.ref("pages")},components:{SlugField:o.a},data:function(){return{newPage:{title:"",slug:"",created:"",updated:"",type:"basic",published:!1},slug:"",stringToSlug:"",title:""}},methods:{updatePageSlug:function(e){this.slug=e},addPage:function(){var e=this.newPage;e.title=this.title,e.slug=this.slug,e.created=e.updated=l()().format("x"),this.$firebaseRefs.pages.push(e),e.title=e.slug=e.created=e.updated=this.slug=this.title="",n.a.success("Page added successfully")},validate:function(){var e=this,t=!1;this.$firebaseRefs.pages.once("value").then(function(s){s.forEach(function(s){if(s.val().slug==e.slug)return n.a.error("Page slug already exists"),t=!0,!0}),t||e.addPage()})}},computed:{active:function(){return""!=this.slug}},watch:{title:{handler:function(){this.stringToSlug=this.title},sync:!0}}}},131:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(3),i=s(5),n=s.n(i);t.default={name:"page-list",firebase:{pages:a.a.db.ref("pages")},data:function(){return{msg:a.a.test}},methods:{editPage:function(e){this.$router.push("/page/edit/"+e[".key"])},removePage:function(e){this.$firebaseRefs.pages.child(e[".key"]).remove(),n.a.success("Page removed successfully")}},computed:{active:function(){return""!=this.slug}}}},132:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(3),i=s(5),n=s.n(i),r=s(0),l=s.n(r),c=s(122),o=s.n(c),u=s(153),d=s.n(u);t.default={name:"page-edit",firebase:{pages:a.a.db.ref("pages")},data:function(){return{key:this.$route.params.page_id,currentPage:a.a.emptyPage,title:"",stringToSlug:""}},components:{SlugField:o.a,SliceManager:d.a},created:function(){var e=this;n.a.info("Loading page..."),this.$firebaseRefs.pages.child(this.key).once("value").then(function(t){var s=t.val();e.currentPage=s,e.title=e.currentPage.title,e.stringToSlug=e.currentPage.slug,n.a.clear()})},methods:{updatePageSlug:function(e){this.currentPage.slug=e},editPage:function(){this.currentPage.updated=l()().format("x"),this.$firebaseRefs.pages.child(this.key).set(this.currentPage),n.a.success("Page edited successfully")},validate:function(){var e=this,t=!1;this.$firebaseRefs.pages.once("value").then(function(s){s.forEach(function(s){if(s.val().slug==e.currentPage.slug&&s.key!=e.key)return n.a.error("Page slug already exists"),t=!0,!0}),t||e.editPage()})},updatePageData:function(e){this.currentPage=e}},watch:{title:{handler:function(){this.currentPage.title=this.title,this.stringToSlug=this.title},sync:!0}}}},133:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(3),i=s(5),n=s.n(i);t.default={name:"slice-manager",props:["pageKey"],firebase:{pages:a.a.db.ref("pages")},data:function(){return{sliceKey:!1,modalTitle:"New Slice",currentSlice:{content:""},slices:[]}},methods:{saveSlice:function(){this.sliceKey?(a.a.db.ref("pages/"+this.pageKey+"/slices").child(this.sliceKey).set(this.currentSlice),n.a.success("Slice edited")):(a.a.db.ref("pages/"+this.pageKey+"/slices").push(this.currentSlice),n.a.success("Slice added")),$("#sliceModal").modal("toggle"),this.dispatchUpdatedPage(),this.resetSlice()},resetSlice:function(){this.sliceKey=!1,this.modalTitle="New Slice",this.currentSlice={content:""}},editSlice:function(e,t){this.currentSlice=e,this.sliceKey=t,this.modalTitle="Edit Slice: "+t,this.content=e.content,$("#sliceModal").modal("toggle")},removeSlice:function(e,t){a.a.db.ref("pages/"+this.pageKey+"/slices").child(t).remove(),n.a.success("Slice removed successfully"),this.dispatchUpdatedPage()},dispatchUpdatedPage:function(){var e=this;a.a.db.ref("pages/"+this.pageKey).on("value",function(t){var s=t.val();e.$emit("update",s)})},onChangeContent:function(e){this.currentSlice.content=e}},created:function(){var e=this;a.a.db.ref("pages/"+this.pageKey+"/slices").on("value",function(t){var s=t.val();e.slices=s})}}},134:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(6),i=s(125),n=s.n(i),r=s(126),l=s.n(r),c=s(123),o=s(0),u=s.n(o),d=s(124),f=s.n(d),p={name:"vue-html5-editor",showModuleName:!1,icons:{text:"fa fa-pencil",color:"fa fa-paint-brush",font:"fa fa-font",align:"fa fa-align-justify",list:"fa fa-list",link:"fa fa-chain",unlink:"fa fa-chain-broken",tabulation:"fa fa-table",image:"fa fa-file-image-o",hr:"fa fa-minus",eraser:"fa fa-eraser",undo:"fa-undo fa","full-screen":"fa fa-arrows-alt",info:"fa fa-info"},image:{sizeLimit:524288,upload:{url:null,headers:{},params:{},fieldName:{}},compress:{width:1600,height:1600,quality:80},uploadHandler:function(e){var t=JSON.parse(e);if(t.ok)return t.data;alert(t.msg)}},hiddenModules:["font-name"],visibleModules:["text","align","list","link","unlink","eraser","undo"],modules:{}};a.a.use(f.a,p),a.a.config.productionTip=!1,a.a.use(l.a),a.a.filter("timestampToDate",function(e){return u()(e,"x").format("DD/MM/YYYY - HH:mm")});new a.a({el:"#app",router:c.a,template:"<App/>",components:{App:n.a}})},135:function(e,t){},136:function(e,t){},137:function(e,t){},138:function(e,t){},139:function(e,t){},140:function(e,t){},141:function(e,t){},148:function(e,t,s){function a(e){return s(i(e))}function i(e){var t=n[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var n={"./af":7,"./af.js":7,"./ar":14,"./ar-dz":8,"./ar-dz.js":8,"./ar-kw":9,"./ar-kw.js":9,"./ar-ly":10,"./ar-ly.js":10,"./ar-ma":11,"./ar-ma.js":11,"./ar-sa":12,"./ar-sa.js":12,"./ar-tn":13,"./ar-tn.js":13,"./ar.js":14,"./az":15,"./az.js":15,"./be":16,"./be.js":16,"./bg":17,"./bg.js":17,"./bn":18,"./bn.js":18,"./bo":19,"./bo.js":19,"./br":20,"./br.js":20,"./bs":21,"./bs.js":21,"./ca":22,"./ca.js":22,"./cs":23,"./cs.js":23,"./cv":24,"./cv.js":24,"./cy":25,"./cy.js":25,"./da":26,"./da.js":26,"./de":29,"./de-at":27,"./de-at.js":27,"./de-ch":28,"./de-ch.js":28,"./de.js":29,"./dv":30,"./dv.js":30,"./el":31,"./el.js":31,"./en-au":32,"./en-au.js":32,"./en-ca":33,"./en-ca.js":33,"./en-gb":34,"./en-gb.js":34,"./en-ie":35,"./en-ie.js":35,"./en-nz":36,"./en-nz.js":36,"./eo":37,"./eo.js":37,"./es":39,"./es-do":38,"./es-do.js":38,"./es.js":39,"./et":40,"./et.js":40,"./eu":41,"./eu.js":41,"./fa":42,"./fa.js":42,"./fi":43,"./fi.js":43,"./fo":44,"./fo.js":44,"./fr":47,"./fr-ca":45,"./fr-ca.js":45,"./fr-ch":46,"./fr-ch.js":46,"./fr.js":47,"./fy":48,"./fy.js":48,"./gd":49,"./gd.js":49,"./gl":50,"./gl.js":50,"./gom-latn":51,"./gom-latn.js":51,"./he":52,"./he.js":52,"./hi":53,"./hi.js":53,"./hr":54,"./hr.js":54,"./hu":55,"./hu.js":55,"./hy-am":56,"./hy-am.js":56,"./id":57,"./id.js":57,"./is":58,"./is.js":58,"./it":59,"./it.js":59,"./ja":60,"./ja.js":60,"./jv":61,"./jv.js":61,"./ka":62,"./ka.js":62,"./kk":63,"./kk.js":63,"./km":64,"./km.js":64,"./kn":65,"./kn.js":65,"./ko":66,"./ko.js":66,"./ky":67,"./ky.js":67,"./lb":68,"./lb.js":68,"./lo":69,"./lo.js":69,"./lt":70,"./lt.js":70,"./lv":71,"./lv.js":71,"./me":72,"./me.js":72,"./mi":73,"./mi.js":73,"./mk":74,"./mk.js":74,"./ml":75,"./ml.js":75,"./mr":76,"./mr.js":76,"./ms":78,"./ms-my":77,"./ms-my.js":77,"./ms.js":78,"./my":79,"./my.js":79,"./nb":80,"./nb.js":80,"./ne":81,"./ne.js":81,"./nl":83,"./nl-be":82,"./nl-be.js":82,"./nl.js":83,"./nn":84,"./nn.js":84,"./pa-in":85,"./pa-in.js":85,"./pl":86,"./pl.js":86,"./pt":88,"./pt-br":87,"./pt-br.js":87,"./pt.js":88,"./ro":89,"./ro.js":89,"./ru":90,"./ru.js":90,"./sd":91,"./sd.js":91,"./se":92,"./se.js":92,"./si":93,"./si.js":93,"./sk":94,"./sk.js":94,"./sl":95,"./sl.js":95,"./sq":96,"./sq.js":96,"./sr":98,"./sr-cyrl":97,"./sr-cyrl.js":97,"./sr.js":98,"./ss":99,"./ss.js":99,"./sv":100,"./sv.js":100,"./sw":101,"./sw.js":101,"./ta":102,"./ta.js":102,"./te":103,"./te.js":103,"./tet":104,"./tet.js":104,"./th":105,"./th.js":105,"./tl-ph":106,"./tl-ph.js":106,"./tlh":107,"./tlh.js":107,"./tr":108,"./tr.js":108,"./tzl":109,"./tzl.js":109,"./tzm":111,"./tzm-latn":110,"./tzm-latn.js":110,"./tzm.js":111,"./uk":112,"./uk.js":112,"./ur":113,"./ur.js":113,"./uz":115,"./uz-latn":114,"./uz-latn.js":114,"./uz.js":115,"./vi":116,"./vi.js":116,"./x-pseudo":117,"./x-pseudo.js":117,"./yo":118,"./yo.js":118,"./zh-cn":119,"./zh-cn.js":119,"./zh-hk":120,"./zh-hk.js":120,"./zh-tw":121,"./zh-tw.js":121};a.keys=function(){return Object.keys(n)},a.resolve=i,e.exports=a,a.id=148},149:function(e,t,s){s(137);var a=s(1)(s(129),s(156),"data-v-308307eb",null);e.exports=a.exports},150:function(e,t,s){s(138);var a=s(1)(s(130),s(157),"data-v-65b52e77",null);e.exports=a.exports},151:function(e,t,s){s(141);var a=s(1)(s(131),s(160),"data-v-ffc70c4e",null);e.exports=a.exports},152:function(e,t,s){s(139);var a=s(1)(s(132),s(158),"data-v-8a289918",null);e.exports=a.exports},153:function(e,t,s){s(140);var a=s(1)(s(133),s(159),"data-v-e4925514",null);e.exports=a.exports},154:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"slugField"}},[e._v("Slug:")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.slug,expression:"slug"}],staticClass:"form-control",attrs:{type:"text",id:"slugField"},domProps:{value:e.slug},on:{input:function(t){t.target.composing||(e.slug=t.target.value)}}})])},staticRenderFns:[]}},155:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container",attrs:{id:"app"}},[s("span",{staticClass:"glyphicon glyphicon-tasks",attrs:{"aria-hidden":"true"}}),e._v(" "),s("h1",[s("router-link",{attrs:{to:"/"}},[e._v(e._s(e.title))])],1),e._v(" "),s("router-view")],1)},staticRenderFns:[]}},156:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home"},[s("div",{staticClass:"col col-md-3"},[s("page-create")],1),e._v(" "),s("div",{staticClass:"col col-md-9"},[s("page-list")],1)])},staticRenderFns:[]}},157:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel panel-default"},[e._m(0),e._v(" "),s("div",{staticClass:"panel-body"},[s("form",{staticClass:"form",attrs:{id:"form"},on:{submit:function(t){t.preventDefault(),e.validate(t)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"pageTitle"}},[e._v("Title:")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text",id:"pageTitle"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}})]),e._v(" "),s("slug-field",{attrs:{"string-to-slug":e.stringToSlug},on:{update:e.updatePageSlug}}),e._v(" "),s("input",{staticClass:"btn btn-primary",class:{disabled:!e.active},attrs:{type:"submit",value:"+ Create"}})],1)])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-heading"},[s("strong",[e._v("New Page")])])}]}},158:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-edit"},[s("div",{staticClass:"col col-md-4"},[s("div",{staticClass:"panel panel-default"},[s("div",{staticClass:"panel-heading"},[s("strong",[e._v(e._s(e.key))])]),e._v(" "),s("div",{staticClass:"panel-body"},[s("form",{staticClass:"form",attrs:{id:"form"},on:{submit:function(t){t.preventDefault(),e.validate(t)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"pageTitle"}},[e._v("Title:")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text",id:"pageTitle"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}})]),e._v(" "),s("slug-field",{attrs:{"string-to-slug":e.stringToSlug},on:{update:e.updatePageSlug}}),e._v(" "),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.currentPage.published,expression:"currentPage.published"}],attrs:{type:"checkbox",id:"pagePublished"},domProps:{checked:Array.isArray(e.currentPage.published)?e._i(e.currentPage.published,null)>-1:e.currentPage.published},on:{__c:function(t){var s=e.currentPage.published,a=t.target,i=!!a.checked;if(Array.isArray(s)){var n=e._i(s,null);i?n<0&&(e.currentPage.published=s.concat(null)):n>-1&&(e.currentPage.published=s.slice(0,n).concat(s.slice(n+1)))}else e.currentPage.published=i}}}),e._v(" "),s("label",{attrs:{for:"pagePublished"}},[e._v("Published")])]),e._v(" "),s("div",{staticClass:"form-group"},[s("p",[s("strong",[e._v("Created:")]),e._v(" "+e._s(e._f("timestampToDate")(e.currentPage.created)))]),e._v(" "),s("p",[s("strong",[e._v("Last update:")]),e._v("  "+e._s(e._f("timestampToDate")(e.currentPage.updated)))])]),e._v(" "),s("input",{staticClass:"btn btn-primary",attrs:{type:"submit",value:"/ Edit"}})],1)])])]),e._v(" "),s("div",{staticClass:"col col-md-8"},[s("slice-manager",{attrs:{"page-key":e.key},on:{update:e.updatePageData}})],1)])},staticRenderFns:[]}},159:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel panel-default"},[e._m(0),e._v(" "),s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-primary",attrs:{"data-toggle":"modal","data-target":"#sliceModal"},on:{click:e.resetSlice}},[e._v("+ Add Slice")]),e._v(" "),s("div",{staticClass:"modal fade",attrs:{id:"sliceModal",tabindex:"-1",role:"dialog"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[e._m(1),e._v(" "),s("h4",{staticClass:"modal-title"},[e._v(e._s(e.modalTitle))])]),e._v(" "),s("div",{staticClass:"modal-body"},[s("vue-html5-editor",{attrs:{content:e.currentSlice.content,height:200,"z-index":1e3,"auto-height":!0,"show-module-name":!1},on:{change:e.onChangeContent}})],1),e._v(" "),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")]),e._v(" "),s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.saveSlice}},[e._v("Save")])])])])]),e._v(" "),s("hr"),e._v(" "),s("div",{staticClass:"panel-group",attrs:{id:"slices"}},e._l(e.slices,function(t,a){return s("div",{staticClass:"panel panel-default"},[s("div",{staticClass:"panel-heading"},[s("h4",{staticClass:"panel-title"},[s("a",{attrs:{"data-toggle":"collapse","data-parent":"#slices",href:"#"+a}},[e._v("\n                          "+e._s(a)+"\n                        ")]),e._v(" "),s("a",{staticClass:"action",on:{click:function(s){e.removeSlice(t,a)}}},[s("i",{staticClass:"fa fa-trash",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("a",{staticClass:"action",on:{click:function(s){e.editSlice(t,a)}}},[s("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})])])]),e._v(" "),s("div",{staticClass:"panel-collapse collapse",attrs:{id:a}},[s("div",{staticClass:"panel-body"},[s("p",{domProps:{innerHTML:e._s(t.content)}})])])])})),e._v(" "),s("p")])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-heading"},[s("strong",[e._v("Slices")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])}]}},160:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel panel-default"},[e._m(0),e._v(" "),s("div",{staticClass:"panel-body"},[s("table",{staticClass:"table table-striped"},[e._m(1),e._v(" "),s("tbody",e._l(e.pages,function(t){return s("tr",[s("td",[e._v(e._s(t.title))]),e._v(" "),s("td",[e._v(e._s(t.slug))]),e._v(" "),s("td",[e._v(e._s(t.type))]),e._v(" "),s("td",{staticClass:"hidden-xs"},[e._v(e._s(e._f("timestampToDate")(t.created)))]),e._v(" "),s("td",{staticClass:"hidden-xs"},[e._v(e._s(e._f("timestampToDate")(t.updated)))]),e._v(" "),s("td",[e._v(e._s(t.published))]),e._v(" "),s("td",{staticClass:"action",on:{click:function(s){e.editPage(t)}}},[s("i",{staticClass:"fa fa-pencil",attrs:{"aria-hidden":"true"}})]),e._v(" "),s("td",{staticClass:"action",on:{click:function(s){e.removePage(t)}}},[s("i",{staticClass:"fa fa-trash",attrs:{"aria-hidden":"true"}})])])}))])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-heading"},[s("strong",[e._v("Pages")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",[s("tr",[s("th",[e._v("Title")]),e._v(" "),s("th",[e._v("Slug")]),e._v(" "),s("th",[e._v("Type")]),e._v(" "),s("th",{staticClass:"hidden-xs"},[e._v("Created")]),e._v(" "),s("th",{staticClass:"hidden-xs"},[e._v("Updated")]),e._v(" "),s("th",[e._v("Published")]),e._v(" "),s("th"),e._v(" "),s("th")])])}]}},3:function(e,t,s){"use strict";var a=s(144),i=s.n(a),n={apiKey:"AIzaSyCSVG7-XelqpFOuiIC-XmuQGT212ROCneg",authDomain:"sandwich-cms.firebaseapp.com",databaseURL:"https://sandwich-cms.firebaseio.com",storageBucket:"sandwich-cms.appspot.com",messagingSenderId:"390513086545"},r=i.a.initializeApp(n),l=r.database(),c=r.storage().ref();t.a={test:"Variable Global !!",db:l,emptyPage:{title:"",slug:"",created:"",updated:"",type:"basic",published:!1},storage:c}}},[134]);
//# sourceMappingURL=app.187e4ebdc3ac2eb5e4cf.js.map