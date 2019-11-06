<template lang="pug">
  .payment-wrapper#app
    Form
    PaySecurity
</template>

<script>
import Form from './components/Form'
import PaySecurity from './components/PaySecurity'
export default {
  name: 'App',
  components: { Form, PaySecurity }
}
</script>

<style lang="stylus">
@import "./assets/stylus/main.styl"
</style>
