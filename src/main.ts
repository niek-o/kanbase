import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

import "./assets/main.css";
import { firebaseConfig } from "./firebase_config";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
