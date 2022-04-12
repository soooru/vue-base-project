<template>
  <v-card max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4" data-testid="category">
          {{ item.category }}
        </div>
        <v-list-item-title class="text-h5 mb-1" data-testid="title">
          {{ item.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="mt-1" data-testid="price"
          >USD: {{ item.price }}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="item.thumbnail" width="100%" height="100%">
          <template v-slot:placeholder>
            <BaseLoading mode="img" class="mt-6" />
          </template>
        </v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined small @click="insertItem(item)"
        ><v-icon class="mr-1">mdi-wheel-barrow</v-icon> 장바구니 담기</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { call } from 'vuex-pathify'
export default {
  name: 'ShopItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: call('cart', ['insertItem']),
}
</script>
