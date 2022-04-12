<template>
  <img
    class="logo"
    @click="clicked"
    src="../assets/images/sample_logo.png"
    alt="logo"
  />
</template>

<script>
export default {
  name: 'BaseLogo',
  methods: {
    clicked() {
      this.$emit('clicked')
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  max-height: 48px;
}
</style>
