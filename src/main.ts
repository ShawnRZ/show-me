import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const pinia = createPinia();

app.use(pinia)

app.mount("#app");


