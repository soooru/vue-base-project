<template>
  <div>
    <v-row
      v-if="mode === 'img'"
      class="fill-height fill-width ma-0"
      align="center"
      justify="center"
    >
      <v-progress-circular indeterminate :color="color"></v-progress-circular>
    </v-row>
    <v-container
      v-else
      fluid
      style="height: 70vh"
      class="d-flex align-center justify-center"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-progress-circular
          indeterminate
          :color="color"
          :size="size"
        ></v-progress-circular>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    mode: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 64,
    },
    color: {
      type: String,
      default() {
        return this.$vuetify.theme.dark ? 'grey lighten-5' : 'grey lighten-2'
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
