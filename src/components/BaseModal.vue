<template>
  <!-- BaseModal  -->
  <div>
    <v-dialog
      v-model="modal"
      max-width="400"
      width="fit-content"
      @click:outside="closeModal"
      @keydown.esc="closeModal"
    >
      <v-card class="modal-card">
        <!-- 제목  -->
        <div
          v-if="modalContent.title"
          class="title text-left font-weight-bold subtitle-1 pa-2 px-4"
          :class="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'"
        >
          {{ modalContent.title }}
        </div>
        <!-- 내용  -->
        <v-card-text
          v-html="modalContent.text"
          class="body-2 py-3 py-sm-5 text-center font-word-keep"
        />
        <!-- 하단 버튼 : alert  -->
        <v-card-actions
          v-if="modalContent.mode === 'alert'"
          class="justify-center"
        >
          <v-btn max-width="180" color="primary" @click="closeModal"
            >닫기</v-btn
          >
        </v-card-actions>
        <!-- 하단 버튼 : confirm  -->
        <v-card-actions v-else-if="modalContent.mode === 'confirm'">
          <v-btn width="100" text @click="confirm">확인</v-btn>
          <v-spacer></v-spacer>
          <v-btn width="100" text @click="closeModal">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { get } from 'vuex-pathify'
export default {
  name: 'BaseModal',
  computed: {
    ...get('app', ['modal', 'modalContent']),
  },
  methods: {
    closeModal() {
      this.$store.commit('app/SET_MODAL', { active: false })
    },
    confirm() {
      if (typeof this.modalContent.action === 'function') {
        this.modalContent.action()
      }
      this.closeModal()
    },
  },
}
</script>

<style scoped>
.v-dialog > .v-card > .v-card__actions {
  margin-top: 0px !important;
}
</style>
