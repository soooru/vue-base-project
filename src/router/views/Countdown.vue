<template>
  <div>
    this view state :{{ state }}
    <Timer @end="timeEnd" />
    <div v-if="state === 'ready'">준비 중 UI</div>
    <div v-else-if="state === 'start'">시작 UI</div>
  </div>
</template>

<script>
import Timer from '@/components/Timer'

export default {
  name: 'Countdown',
  components: {
    Timer,
  },
  data() {
    return {
      state: 'ready', // ready, start, end
    }
  },
  methods: {
    timeEnd() {
      this.state = 'start'
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
