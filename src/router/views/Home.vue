<template>
  <div class="fill-width fill-height d-flex align-center">
    <v-card class="mx-auto text-center py-8 px-12" min-width="500" dark>
      <v-card-title class="mb-5 pl-0">{{ $t('menu.home') }}</v-card-title>
      <v-cart-subtitle class="justify-start d-flex"
        >Notification test</v-cart-subtitle
      >
      <v-form @submit.prevent>
        <v-text-field
          v-model="name"
          placeholder="알림을 띄울 글자를 입력하세요."
          append-icon="mdi-send"
          @keypress.enter="addItem()"
          @click:append="addItem()"
        />
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { call } from 'vuex-pathify'

export default {
  name: 'Home',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    ...call('notification', ['add']),
    addItem() {
      const name = this.name
      this.name = ''
      if (!name || name == '') {
        return alert('입력된 값이 없음')
      }
      this.add({
        type: 'info',
        message: name,
      })
    },
  },
}
</script>
