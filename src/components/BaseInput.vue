<template>
  <v-text-field
    v-model="inputVal"
    :type="inputType"
    :label="label"
    :placeholder="placeHolder"
    :persistent-placeholder="fixPlaceholder"
    :autocomplete="autoComplete"
    :maxLength="max"
    :error-messages="errMsg"
    :outlined="isOutlined"
    hide-details="auto"
    :append-icon="useAppendIcon"
    :prepend-icon="prependIcon"
    :prepend-inner-icon="prependInnerIcon"
    @click:append="pwdShow = !pwdShow"
    @input="updateValue"
    @blur="$emit('blur')"
    @keyup.enter="$emit('enter')"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    //기존에 값이 있을 경우 props
    preValue: {
      type: [String, Number],
      default: '',
    },
    //input type 설정
    type: {
      type: String,
      default: 'text',
    },
    //input label 설정
    label: String,
    //placeholder 설정
    placeHolder: String,
    //placeholder를 고정할지 여부 설정
    fixPlaceholder: {
      type: Boolean,
      default: true,
    },
    //자동완성 설정
    autoComplete: {
      type: String,
      default: 'off',
    },
    //max 길이 설정
    max: Number,
    //errMsg 표기 설정
    errMsg: [Array],
    //outline 설정
    isOutlined: {
      type: Boolean,
      default: false,
    },
    isAppendIcon: {
      type: Boolean,
      default: false,
    },
    prependIcon: {
      type: String,
      default: undefined,
    },
    prependInnerIcon: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      inputVal: '',
      pwdShow: false,
    }
  },
  created() {
    if (this.preValue !== '') {
      this.inputVal = this.preValue
    }
  },
  computed: {
    useAppendIcon() {
      if (this.isAppendIcon) {
        if (this.pwdShow) {
          return 'mdi-eye'
        } else {
          return 'mdi-eye-off'
        }
      } else {
        return undefined
      }
    },
    inputType() {
      if (this.type === 'password') {
        if (this.pwdShow) {
          return 'text'
        } else {
          return 'password'
        }
      } else {
        return this.type
      }
    },
  },
  methods: {
    updateValue() {
      this.$emit('input', this.inputVal)
    },
  },
}
</script>

<style lang="scss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  //box-shadow: 0 0 0 30px #121212 inset;
  box-shadow: none !important;
  transition: background-color 9999s;
}
input:-webkit-autofill {
  -webkit-text-fill-color: #fff !important;
}
.theme--dark.v-input input,
.theme--dark.v-input textarea {
  color: #fff;
}
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
