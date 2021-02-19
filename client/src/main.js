import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import Home from './components/Home.vue'
import Calendar from './components/Calendar.vue'


Vue.config.productionTip = false

//Router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home},
    { path: '/calendar', component: Calendar}
  ]
})

Vue.use(VueRouter)


//Vuex
Vue.use(Vuex)
import { store } from './store/store'

//Vue Meta
Vue.use(VueMeta)

// Install BootstrapVue 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'


Vue.use(VueAxios, axios)


export const eventBus = new Vue();


new Vue({
  render: h => h(App),
  store: store,
  router,
}).$mount('#app')
