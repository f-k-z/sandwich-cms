// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueFire from 'vuefire'
import router from './router'
import moment from 'moment'

import VueHtml5Editor from 'vue-html5-editor'

var editorOptions = { 
    // global component name
    name: "vue-html5-editor",
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // config image module
    image: {
        // max file size
        sizeLimit: 512 * 1024,
        // upload config,default null and convert image to base64
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // the modules you don't want
    hiddenModules: ["font-name"],
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        // "color",
        //"font",
        "align",
        "list",
        "link",
        "unlink",
        //"tabulation",
        //"image",
        //"hr",
        "eraser",
        "undo",
        //"full-screen",
        //"info",
    ],
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
  }

Vue.use(VueHtml5Editor,editorOptions);

Vue.config.productionTip = false
Vue.use(VueFire)

//custom filter for date format
Vue.filter('timestampToDate', function (value) {
  return moment(value, "x").format("DD/MM/YYYY - HH:mm")
})

/* eslint-disable no-new */
var app =new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
