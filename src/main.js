import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

Vue.config.productionTip = false;
//Vue.use(firestorePlugin)

  // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCBGb1e6vB1DOwi6KvbpH8lwRb0N7R6hpE",
  //   authDomain: "umedev-2edfe.firebaseapp.com",
  //   databaseURL: "https://umedev-2edfe.firebaseio.com",
  //   projectId: "umedev-2edfe",
  //   storageBucket: "",
  //   messagingSenderId: "921144031224",
  //   appId: "1:921144031224:web:5fae69164f53ef4d84c80d",
  //   measurementId: "G-ZKMBEJEM3X"
  // };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
