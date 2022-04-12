<template>
  <article v-if="contents">
    <v-img
      :aspect-ratio="16 / 9"
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
    </v-img>
    <div class="d-flex align-top mt-2">
      <div class="mr-4"><v-avatar color="primary" size="36"></v-avatar></div>
      <div>
        <div>{{ contents.date }}</div>
        <div class="text-h7">{{ contents.title }}</div>
        <div>{{ contents.author }} &#183; {{ contents.likes }}</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BaseMediaCard',
  props: {
    contents: [Object],
  },
}
</script>

<style lang="scss" scoped></style>
