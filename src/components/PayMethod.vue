<template lang="pug">
  ul.pay-method
    li(v-for="image in imgMethod")
      img(:src="require(`@/assets/images/${image}`)" :key="image.id")
</template>

<script>
export default {
  name: 'PayMethod',
  data: function () {
    return {
      imgMethod: [
        'visa-card.jpg',
        'mastercard-card.jpg',
        'maestro-card.jpg',
        'mir-card.jpg'
      ]
    }
  }
}
</script>
