<template>
  <div>
    <v-card outlined>
      <v-card-title>{{ $t('forms.chPwd') }}</v-card-title>
      <v-card-text>
        <v-form ref="login" @submit.prevent="confirm">
          <BaseInput
            class="mb-4"
            v-model.trim="changePassword.password"
            type="password"
            label="Password"
            placeHolder="********"
            :max="40"
            :err-msg="pwdErrors"
            :is-outlined="true"
            :is-required="true"
            :is-append-icon="true"
            @input="pwdValid('input')"
            @blur="pwdValid"
          />
          <BaseInput
            class="mb-4"
            v-model.trim="changePassword.confirmpwd"
            type="password"
            label="confirm password"
            placeHolder="********"
            :max="40"
            :err-msg="confirmpwdErrors"
            :is-outlined="true"
            :is-required="true"
            @input="confirmPwdValid('input')"
            @blur="confirmPwdValid"
            @enter="confirm"
          />
          <v-btn
            color="primary"
            :disabled="
              $v.changePassword.$anyError ||
              !$v.changePassword.password.$anyDirty ||
              !$v.changePassword.confirmpwd.$anyDirty
            "
            @click="confirm"
            class="fill-width"
          >
            {{ $t('forms.chPwd') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  required,
  sameAs,
  maxLength,
  minLength,
} from 'vuelidate/lib/validators'
export default {
  name: 'FormConfirmPwd',
  data() {
    return {
      changePassword: {
        password: '',
        confirmpwd: '',
      },
      pwdErrors: [],
      confirmpwdErrors: [],
    }
  },
  validations: {
    changePassword: {
      password: { required, maxLength: maxLength(40), minLength: minLength(8) },
      confirmpwd: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    pwdValid(value) {
      const password = this.$v.changePassword.password
      password.$touch()
      this.pwdErrors = []

      if (value !== 'input') {
        let pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        !password.required && this.pwdErrors.push(this.$t('valid.require'))
        !password.maxLength && this.pwdErrors.push(this.$t('valid.maxLength'))
        !password.minLength && this.pwdErrors.push(this.$t('valid.minLength'))
        !pwdReg.test(password.$model) &&
          this.pwdErrors.push(this.$t('valid.strAndNum'))
      }
    },
    confirmPwdValid(value) {
      this.$v.changePassword.confirmpwd.$touch()
      this.confirmpwdErrors = []
      if (value !== 'input') {
        !this.$v.changePassword.confirmpwd.sameAsPassword &&
          this.confirmpwdErrors.push('비밀번호와 동일한 값을 입력합니다.')
      }
    },
    confirm() {
      this.pwdValid()
      this.confirmPwdValid()
      if (this.pwdErrors.length === 0 && this.confirmpwdErrors.length === 0) {
        alert(this.$t('valid.success'))
      } else {
        alert(this.$t('valid.fail'))
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
