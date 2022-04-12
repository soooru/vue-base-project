<template>
  <v-alert
    class="notification-bar"
    :type="notification.type"
    dense
    colored-border
    border="left"
    elevation="2"
  >
    {{ notification.message }}
  </v-alert>
</template>

<script>
import { call } from 'vuex-pathify'

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 4000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
    this.remove(this.notification)
  },
  methods: call('notification', ['remove']),
}
</script>

<style scoped>
.notification-bar {
  word-break: keep-all;
}
</style>
