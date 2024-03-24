import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.mount("#app");
