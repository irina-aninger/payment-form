<template lang="pug">
  ul.pay-security
    li(v-for="image in imgSecurity")
      img(:src="require(`@/assets/images/${image}`)" :key="image.id")
</template>

<script>
export default {
  name: 'PaySecurity',
  data: function () {
    return {
      imgSecurity: [
        'visa.jpg',
        'mastercard.jpg',
        'mir.jpg',
        'pci.jpg'
      ]
    }
  }
}
</script>
