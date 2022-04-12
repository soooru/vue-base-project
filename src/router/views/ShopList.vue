<template>
  <div class="pa-md-12">
    <h2 class="mb-5">상품 목록</h2>
    <div v-if="items.length > 0" class="d-flex flex-wrap justify-start">
      <ShopItem
        v-for="(item, i) in items"
        :key="i"
        :item="item"
        class="mb-5 mr-5"
      />
    </div>
    <div v-else>
      등록된 상품이 없습니다. ( mockup API 서버를 띄웠는지 확인하시오 )
    </div>
    <BaseModal />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'ShopList',
  components: {
    ShopItem: () => import('@/components/ShopItem'),
  },
  computed: {
    ...get('shop', {
      items: 'shopItems',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
