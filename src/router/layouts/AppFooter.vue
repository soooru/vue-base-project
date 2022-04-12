<template>
  <section>
    <v-footer class="app-spacing justify-space-between">
      <section class="py-4">
        <ol class="d-flex company-info">
          <li
            v-for="link in AppFooterLink"
            :key="link"
            class="pointer"
            @click="termModalOpen(link)"
          >
            {{ link }}
          </li>
        </ol>
        <div class="caption">
          Copyright &copy; CompanyName Co.,Ltd<br class="hidden-sm-and-up" />
          All Rights Reserved.
        </div>
      </section>
    </v-footer>
    <ModalTerms
      :modal-title="modalTitle"
      :modal-state="ModalTerms"
      @close="ModalTerms = false"
    />
  </section>
</template>

<script>
import ModalTerms from '@/components/ModalTerms'
// component
export default {
  name: 'AppFooter',
  components: { ModalTerms },
  data() {
    return {
      AppFooterLink: [
        '이용약관',
        '개인정보처리방침',
        '청소년보호정책',
        '유료서비스이용약관',
        '법적고지',
      ],
      ModalTerms: false,
      modalTitle: '',
    }
  },
  methods: {
    termModalOpen(val) {
      this.modalTitle = val
      this.ModalTerms = true
    },
  },
}
</script>

<style lang="scss" scoped>
.company-info {
  list-style-type: none;
  font-size: 0.875rem;
  color: #666;
  padding: 0px;
  flex-wrap: wrap;
}
.company-info li {
  margin-right: 12px;
}
.pointer:hover {
  cursor: pointer;
}
</style>
