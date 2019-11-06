<template lang="pug">
  .form-section
    form.form-row#payment(@change="isDisabled(error)")
      .form-group
        .total-price
          | К оплате:
          span  270 BYN
        .name Годовая подписка на сервис
        label Ваш email
          input(
            v-model="email"
            @input="$v.email.$touch()"
            :class="{'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid}"
            type="email"
            name="email"
            placeholder="mail@mail.com")
        .error(v-if="$v.email.$error")
          template(v-if="!$v.email.email || !$v.email.required")
            | Введите действительный адрес электронной почты
        label Номер телефона
        vue-tel-input#tel(
          v-mask="'+375 (##) ### ## ##'"
          v-model="tel"
          @input="$v.tel.$touch()"
          :class="{'is-invalid':$v.tel.$error, 'is-valid':!$v.tel.$invalid}"
          v-bind="bindProps")
        .error(v-if="$v.tel.$error")
          template(v-if="!$v.tel.alpha || !$v.tel.required")
          | Проверьте выбранную страну, формат записи номера и количество символов
      .form-group
        PayMethod
        label Номер карты
          input(
            v-mask="'#### #### #### ####'"
            v-model="cardNumber"
            @input="$v.cardNumber.$touch()"
            :class="{'is-invalid':$v.cardNumber.$error, 'is-valid':!$v.cardNumber.$invalid}"
            type="text"
            name="card-number"
            placeholder="XXXX XXXX XXXX XXXX")
        .error(v-if="$v.cardNumber.$error")
          template(v-if="!$v.cardNumber.minLength || !$v.cardNumber.maxLength || !$v.cardNumber.required")
          | Номер карты должен состоять из 16-19 цифр
        label имя владельца карты
          input(
            v-model="name"
            @input="$v.name.$touch()"
            :class="{'is-invalid':$v.name.$error, 'is-valid':!$v.name.$invalid}"
            type="text"
            name="name"
            placeholder="YOUR NAME")
        .error(v-if="$v.name.$error")
          template(v-if="!$v.name.alpha || !$v.name.required")
          | Имя должно быть написано латиницей без знаков препинания
        .input-wrapper
          label Срок действия
            .input-group
              input(
                v-mask="'##  /  ##'"
                v-model="date"
                @input="checkForm"
                :class="{'is-invalid':error, 'is-valid':!error&&date.length!==0}"
                type="text"
                name="date"
                placeholder="11  /  12")
              div.info
                .info-block Срок действия вашей карты написанна лицевой стороне карты. Запишите срок дейсвия в формате Месяц / 2 последние цифры года.
          label CVV/CVC
            .input-group
              input(
                v-mask="'###'"
                v-model="security"
                @input="$v.security.$touch()"
                :class="{'is-invalid':$v.security.$error, 'is-valid':!$v.security.$invalid}"
                type="text"
                name="security"
                placeholder="XXX")
              div.info
                .info-block CVV/CVC – код это последние 3 цифры на оборотной стороне карты.
                  img(:src="require(`@/assets/images/cv-info.jpg`)")
          .error(v-if="error") {{ error }}
          .error(v-if="$v.security.$error")
            template(v-if="!$v.security.minLength || !$v.security.maxLength || !$v.security.required")
              | CVV/CVC: Должен стостоять из 3 символов
        .notification-info Нажимая кнопку "Оплатить", Вы соглашаетесь на обработку данных в соответствии с
          a  Пользовательским соглашением
        button(:disabled="disabled" type="submit") Оплатить
          span  270 Byn
        .security-info Безопасность работы подтверждена
          a  сертификатом PCI DSS
</template>

<script>
import PayMethod from './PayMethod'
// eslint-disable-next-line standard/object-curly-even-spacing
import {required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  components: { PayMethod },
  data () {
    return {
      email: '',
      tel: '',
      bindProps: {
        placeholder: '+375 (XX) XXX XX XX',
        name: 'tel'
        // inputOptions: {
        //   showDialCode: true
        // }
      },
      cardNumber: '',
      name: '',
      date: '',
      security: '',
      error: '',
      disabled: true
    }
  },
  validations: {
    email: {
      required,
      email
    },
    tel: {
      required,
      // eslint-disable-next-line no-useless-escape
      alpha: val => /(?:\+|\d)[\d\-\(\) ]{9,}\d/g.test(val)
    },
    cardNumber: {
      required,
      minLength: minLength(16),
      maxLength: maxLength(19)
    },
    name: {
      required,
      alpha: val => /^[a-z\s]*$/i.test(val)
    },
    security: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(3)
    }
  },
  methods: {
    isDisabled () {
      console.log(this.error.length)
      if (!this.$v.$invalid && this.error.length === 0 && this.date.length !== 0) {
        this.disabled = false
      }
    },
    checkForm: function (e) {
      const date = new Date()
      const currYear = date.getFullYear().toString().substr(-2)
      const currMonth = date.getMonth().toString().substr(0, 2)

      if (this.date === '' || this.date.length < 7 || this.date.substr(-2) < currYear || (this.date.substr(-2) === currYear && this.date.substr(0, 2) - 1 < currMonth)) {
        this.error = 'Срок действия: Дата не может быть раньше, чем сегодняшняя'
      } else {
        this.error = ''
        return true
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
