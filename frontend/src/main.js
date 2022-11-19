import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "boxicons";
import "animate.css";

import router from "./router/index.js";
import store from "./store/index";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
