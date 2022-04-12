<template>
  <v-app>
    <transition
      :name="exclusionList.includes($route.name) ? '' : 'router-fade'"
      mode="out-in"
    >
      <router-view :key="$route.fullPath" />
    </transition>
  </v-app>
</template>

<script>
let resizeTimeout

export default {
  name: 'App',
  data() {
    return {
      exclusionList: ['board-task', 'board'],
    }
  },
  created() {
    this.$store.commit('app/SET_WINDOW_SIZE', window.innerWidth)
  },
  mounted() {
    window.addEventListener('resize', this.resizeThrottler, {
      passive: true,
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeThrottler)
  },
  methods: {
    resizeThrottler() {
      // 브라우저 창 너비 쓰로틀링
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null
          this.$store.commit('app/SET_WINDOW_SIZE', window.innerWidth)
          if (window.innerWidth > 959) {
            this.$store.commit('app/SET_DRAWER', true)
          }
        }, 66)
      }
    },
  },
}
</script>

<style scoped>
/* transition */
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.router-fade-enter,
.router-fade-leave-to {
  opacity: 0;
}
.app-spacing {
  padding: 0px 16px;
}
</style>
