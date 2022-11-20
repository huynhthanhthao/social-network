import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "boxicons";
import "animate.css";

import router from "./router/index.js";
import store from "./store/index";
import vClickOutside from "click-outside-vue3";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vClickOutside);

app.mount("#app");
