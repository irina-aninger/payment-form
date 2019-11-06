// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import VueTelInput from 'vue-tel-input'
import App from './App'

Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VueTelInput)

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  render: h => h(App)
}).$mount('#app')
