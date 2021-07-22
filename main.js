import Vue from 'vue'
import App from './App'

import { myRequest } from './util/api.js'

//挂载Vuex
import store from './store'  
Vue.prototype.$store = store  
Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
