<template>
  <div class="alert">
    <p>Timer</p>
    <p>Time left {{ timeLeft }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: undefined,
      counter: 0,
      timer: 5,
    }
  },

  computed: {
    timeLeft() {
      return this.timer - this.counter
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.counter++
      if (this.counter == this.timer) {
        this.$emit('end')
        this.$destroy()
      }
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },
  destroyed() {
    this.$el.remove()
  },
}
</script>
