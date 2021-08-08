import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App)
app.use(store).use(ArgonDashboard).use(router).mount('#app')