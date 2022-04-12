<template>
  <div class="my-wrap fill-height mx-auto text-center">
    <section class="py-5 px-3 px-sm-0 text-left">
      <h3 class="mb-2">장바구니</h3>
      {{ cart }}
      <v-row>
        <v-col cols="12" sm="8">
          <v-simple-table v-if="Number(cartLength) > 0" class="fill-width">
            <template v-slot:default>
              <colgroup>
                <col width="10%" />
                <col />
                <col width="25%" />
                <col width="15%" />
                <col width="5%" />
              </colgroup>
              <thead>
                <tr>
                  <th />
                  <th class="text-left">ID</th>
                  <th class="text-left">수량</th>
                  <th class="text-left">가격</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartItems" :key="item.id">
                  <td>
                    <v-img
                      :src="item.thumbnail"
                      width="100"
                      height="100"
                      contain
                    >
                      <template v-slot:placeholder>
                        <Loading mode="img" />
                      </template>
                    </v-img>
                  </td>
                  <td>{{ item.name }}</td>
                  <td class="px-5">
                    <div
                      class="quantity-control-area d-flex align-center justify-space-between"
                    >
                      <v-btn tile large icon @click="substractItem(item)"
                        ><v-icon>mdi-minus</v-icon></v-btn
                      >
                      {{ item.quantity }}
                      <v-btn tile large icon @click="addItem(item)"
                        ><v-icon>mdi-plus</v-icon></v-btn
                      >
                    </div>
                  </td>
                  <td>
                    {{ getTotalByItem(item.quantity, item.price) }}
                  </td>
                  <td>
                    <v-btn
                      tile
                      outlined
                      width="30px"
                      color="grey darken-2"
                      @click="deleteItem(item)"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p v-else class="pa-12 text-center">장바구니가 비어있습니다.</p>
        </v-col>
        <v-col cols="12" sm="4" class="cart-aside">
          <v-list>
            <v-list-item>
              <v-list-item-content>총 상품 금액</v-list-item-content>
              <v-list-item-action>{{
                totalPrice | toFixedTwo | prependCurrency
              }}</v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>총 배송비</v-list-item-content>
              <v-list-item-action>{{
                expectDelivery | toFixedTwo | prependCurrency
              }}</v-list-item-action>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>예상 결제 금액</v-list-item-content>
              <v-list-item-action>{{
                expectTotal | toFixedTwo | prependCurrency
              }}</v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify'

export default {
  name: 'MyCart',
  data() {
    return {}
  },
  filters: {
    toFixedTwo(val) {
      return val.toFixed(2)
    },
    prependCurrency(val) {
      return `USD ${val}`
    },
  },
  computed: {
    cartItems: get('cart/cart'),
    ...get('cart', ['cartLength', 'totalPrice']),
    expectDelivery() {
      if (this.cartItems.length > 0) {
        return 12
      } else {
        return 0
      }
    },
    expectTotal() {
      return this.totalPrice + this.expectDelivery
    },
  },
  methods: {
    ...call('cart', ['addItem', 'substractItem', 'deleteItem']),
    getTotalByItem(quantity, price) {
      // const splitPrice = price.split('.')
      const sum = Number(price) * quantity
      return `USD ${sum.toFixed(2)}`
    },
  },
}
</script>

<style lang="scss" scoped>
.my-wrap {
  width: 100%;
  max-width: 1920px;
  .quantity-control-area {
    max-width: 200px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .cart-aside {
    background-color: #ccc;
  }
}
</style>
