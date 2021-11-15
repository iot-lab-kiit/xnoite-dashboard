import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

import axios from 'axios'


const token = localStorage.getItem('token');
axios.defaults.headers.common["auth-token"] = token;
axios.defaults.baseURL = "http://localhost:3000/api";
// axios.defaults.baseURL = "http://40.87.85.131/api";

const app = createApp(App)
app.use(store).use(ArgonDashboard).use(router, axios).mount('#app')