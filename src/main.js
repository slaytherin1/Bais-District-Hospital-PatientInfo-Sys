import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuefuse from 'vue-fuse'
import VueParticles from 'vue-particles'

import firebase from 'firebase/app';
import 'firebase/auth';
import './components/firebaseInit'

Vue.config.productionTip = false

Vue.use(VueParticles, Vuefuse)

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
  }
})