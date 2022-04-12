<template>
  <transition-group
    name="notification-fade"
    tag="div"
    appear
    class="notification-container"
  >
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </transition-group>
</template>

<script>
import { get } from 'vuex-pathify'
// components
import NotificationBar from '@/components/NotificationBar'

export default {
  components: { NotificationBar },
  computed: {
    ...get('notification', ['notifications']),
  },
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  left: 50%;
  width: 320px;
  margin-left: -160px;
  bottom: 0;
  z-index: 1;
}
/* transition */
.notification-fade-enter-active {
  transition: all 0.5s ease;
}
.notification-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.notification-fade-enter,
.notification-fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* start 10px down*/
}
</style>
