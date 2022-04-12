<template>
  <v-main>
    <v-sheet
      id="scrolling"
      color="transparent"
      class="view-container fill-height"
      :class="{ 'overflow-y-auto': isMobile }"
      :style="isMobile ? 'max-height: 100vh;' : ''"
    >
      <v-container
        fluid
        class="pa-0 fill-height align-start"
        :style="isMobile ? 'margin-top: 46px' : ''"
      >
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-sheet>
  </v-main>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'AppView',
  computed: {
    ...get('app', ['isMobile']),
  },
}
</script>
<style scoped></style>
