import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button } from "ant-design-vue";
import "ant-design-vue/dist/antd";
import "./AntDesign";
import { ajaxSend } from "@/assets/js/http"; //axios请求

//引入code mirror
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

// 引入模板
// import {
//   KFormDesign,
//   KFormBuild,
//   setFormDesignConfig
// } from "../packages/index";
// import Cmp from "./components/CustomComponent/index.vue";

// setFormDesignConfig({
//   title: "测试自定义字段",
//   list: [
//     {
//       type: "demo", // 表单类型
//       label: "自定义组件", // 标题文字
//       icon: "icon-gallery",
//       component: Cmp,
//       options: {
//         defaultValue: undefined,
//         multiple: false,
//         disabled: false,
//         width: "100%",
//         clearable: true,
//         placeholder: "请选择",
//         showSearch: false
//       },
//       model: "",
//       key: "",
//       rules: [
//         {
//           required: false,
//           message: "必填项"
//         }
//       ]
//     }
//   ],
//   uploadFile: "",
//   uploadImage: ""
// });
// Vue.use(KFormDesign);
// Vue.use(KFormBuild);
import KFormDesign from 'k-form-design'
Vue.use(KFormDesign)

Vue.prototype.$ajaxSend = ajaxSend;

Vue.component(Button.name, Button);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
