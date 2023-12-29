import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/style/app.css";
import AOS from "./plugins/aos";
import "aos/dist/aos.css";
import Lottie from "vue-lottie";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueToast);
Vue.component("Lottie", Lottie);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

// Function to check and clear localStorage
const checkAndClearLocalStorage = () => {
  var hours = 24; // Set the time in hours
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("setupTime");
  if (setupTime == null || now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.removeItem("username");
    localStorage.removeItem("level");
    localStorage.removeItem("setupTime");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.setItem("setupTime", now);
  }
};

// Call the function to check and clear localStorage when the app is loaded
checkAndClearLocalStorage();

new Vue({
  router,
  store,
  vuetify,
  AOS,
  Lottie,
  render: (h) => h(App),
}).$mount("#app");
