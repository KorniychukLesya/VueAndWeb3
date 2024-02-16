import { createApp } from 'vue';
import './style.css';
import "./utils/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue';

const app = createApp(App);
app.use(ToastPlugin);
app.mount('#app');