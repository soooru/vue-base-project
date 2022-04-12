<template>
  <div class="fill-height fill-width mx-auto text-center">
    <v-tabs
      v-model="tab"
      centered
      class="my-info-tab fill-width"
      active-class="active-tab"
      slider-color="accent"
      background-color="transparent"
      @change="changeTab"
    >
      <v-tab v-for="item in tabItems" :key="item" class="font-weight-bold">{{
        item
      }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pb-md-10">
      <router-view></router-view>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    let tab
    switch (this.$route.name) {
      case 'my-password':
        tab = 2
        break
      case 'my-cart':
        tab = 1
        break
      default:
        tab = 0
    }
    return {
      tab,
      tabItems: ['회원 정보', '장바구니'],
    }
  },
  methods: {
    changeTab(val) {
      let routeName = 'my-read'
      if (val == 1) {
        routeName = 'my-cart'
      } else if (val == 2) {
        routeName = 'my-password'
      }
      this.$router.push({ name: routeName })
    },
  },
}
</script>

<style lang="scss" scoped>
$border-color: rgba(21, 34, 50, 0.08);
$accent-color: #0065cb;
.my-info-tab {
  border-bottom: thin solid $border-color !important;
  .active-tab {
    color: $accent-color;
  }
}
</style>
