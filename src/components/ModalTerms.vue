<template>
  <v-dialog v-model="dialog" width="500">
    <v-card class="modal-card">
      <v-card-title class="text-h5">
        <h5>{{ modalTitle }}</h5>
        <v-spacer></v-spacer>
        <v-icon @click="dialog = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="pa-6">
        <pre v-html="useTerms"></pre>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import useTerms from '!!raw-loader!../assets/texts/useTerms.txt'
export default {
  name: 'ModalTerms',
  props: {
    modalTitle: {
      type: String,
      default: '',
    },
    modalState: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modalState() {
      if (this.modalState) this.dialog = true
    },
    dialog(val) {
      if (!val) {
        this.$emit('close')
      }
    },
  },
  data() {
    return {
      dialog: false,
      useTerms,
    }
  },
}
</script>
