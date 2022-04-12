<template>
  <v-card outlined>
    <v-card-title>내 정보</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="changeName">
        <div class="d-flex align-center">
          <BaseInput
            class="mb-4"
            v-model.trim="userName"
            :pre-value="userName"
            label="nickname"
            :fix-placeholder="false"
            prepend-icon="mdi-account"
            :max="40"
            :err-msg="nameErrors"
            @input="userNameValid('input')"
            @blur="userNameValid"
          />
          <v-btn
            small
            depressed
            :disabled="
              $v.userName.$anyError ||
              !$v.userName.$anyDirty ||
              !$v.userName.$anyDirty
            "
            @click="changeName"
            >변경</v-btn
          >
        </div>
      </v-form>
      <v-form @submit.prevent="changePhone">
        <div class="d-flex align-center">
          <BaseInput
            class="mb-4"
            v-model.trim="phone"
            type="number"
            prepend-inner-icon="mdi-phone-outline"
            label="휴대폰 번호"
            :fix-placeholder="false"
            place-holder="휴대폰 번호를 숫자로 입력해 주세요."
            :max="40"
            :err-msg="phoneErrors"
            @input="phoneValid('input')"
            @blur="phoneValid"
          />
          <v-btn
            small
            depressed
            :disabled="
              $v.phone.$anyError || !$v.phone.$anyDirty || !$v.phone.$anyDirty
            "
            @click="changePhone"
            >변경</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'
export default {
  name: 'FormMyInfo',
  data() {
    return {
      userName: '기존 닉네임',
      phone: '01012341234',
      nameErrors: [],
      phoneErrors: [],
    }
  },
  validations: {
    userName: { required, maxLength: maxLength(40), minLength: minLength(3) },
    phone: { numeric },
  },
  methods: {
    userNameValid(mode) {
      this.nameErrors = []
      const userName = this.$v.userName

      userName.$touch()
      if (mode !== 'input') {
        !userName.required && this.nameErrors.push(this.$t('valid.require'))
        !userName.maxLength && this.nameErrors.push('30글자 이하 입력')
        !userName.minLength && this.nameErrors.push('3글자 이상 입력')
      }
    },
    phoneValid(mode) {
      this.phoneErrors = []
      const phone = this.$v.phone
      phone.$touch()
      if (mode !== 'input') {
        !phone.numeric && this.phoneErrors.push('숫자만 입력할 수 있습니다.')
        // const pattern = /(\d{3})(\d{4})(\d{4})$/
        // console.log(pattern.test(this.my.phone))
        // this.$v.phone.$model = '010-1234-1234'
      }
    },
    changeName() {
      this.userNameValid()
      if (this.nameErrors.length === 0) {
        alert('유효성 검사 통과')
      } else {
        alert('유효성 검사 실패')
      }
    },
    changePhone() {
      this.phoneValid()
      if (this.phoneErrors.length === 0) {
        alert('유효성 검사 통과')
      } else {
        alert('유효성 검사 실패')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
