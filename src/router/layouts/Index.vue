<template>
  <v-app class="overflow-hidden">
    <AppHeader />
    <AppView />
    <AppNotification />
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    AppHeader: () => import('./AppHeader'),
    AppView: () => import('./View'),
    AppFooter: () => import('./AppFooter'),
    AppNotification: () => import('@/components/NotificationContainer'),
  },
}
</script>
