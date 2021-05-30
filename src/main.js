import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import './registerServiceWorker'
import firebase from "firebase/app";
import vuetify from './plugins/vuetify'

// This is ok, we can expose this on the client side
const firebaseConfig = {
  apiKey: "AIzaSyCib4HhPZkKF0d5KV7SLypMe9Jx8ZUiVU8",
  authDomain: "oneroof-fd1d5.firebaseapp.com",
  databaseURL: "https://oneroof-fd1d5-default-rtdb.firebaseio.com",
  projectId: "oneroof-fd1d5",
  storageBucket: "oneroof-fd1d5.appspot.com",
  messagingSenderId: "260349058797",
  appId: "1:260349058797:web:84b7911d3c63993316f6e4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
