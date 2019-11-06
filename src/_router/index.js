import Vue from 'vue'
import Router from 'vue-router'
import Form from '../components/Form'
import App from '../App'

Vue.use(Router)

export default new Router({
  components: [
    {App: App},
    {Form: Form}
  ]
})
