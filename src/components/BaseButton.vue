<template>
  <v-btn :color="color" :icon="isIcon" @click="$emit('clicked')">
    <span v-if="!isIcon">{{ text }}</span>
    <v-icon v-else>{{ iconName }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
