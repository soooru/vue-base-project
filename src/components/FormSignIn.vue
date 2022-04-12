<template>
  <div class="fill-width">
    <v-card outlined>
      <v-card-title>{{ $t('forms.login') }}</v-card-title>
      <v-card-text>
        <v-form ref="login" @submit.prevent="submit">
          <BaseInput
            data-testid="login-userId"
            class="mb-4"
            v-model="login.userId"
            label="email"
            place-holder="abcd@example.com"
            :max="40"
            :err-msg="emailErrors"
            aria-autocomplete=""
            @input="emailValid('input')"
            @blur="emailValid"
          />
          <BaseInput
            class="mb-4"
            v-model.trim="login.password"
            type="password"
            label="Password"
            placeHolder="********"
            :max="40"
            :err-msg="pwdErrors"
            @input="pwdValid('input')"
            @blur="pwdValid"
            @enter="submit"
          />
          <v-checkbox
            class="mb-4"
            dense
            hide-details
            v-model="autoLogin"
            label="자동로그인"
          ></v-checkbox>
          <v-btn
            data-testid="login-button"
            color="primary"
            :disabled="
              $v.login.$anyError ||
              !$v.login.userId.$anyDirty ||
              !$v.login.password.$anyDirty
            "
            @click="submit"
            class="fill-width"
          >
            {{ $t('forms.login') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'FormSignIn',
  data() {
    return {
      login: {
        userId: '',
        password: '',
      },
      emailErrors: [],
      pwdErrors: [],
      autoLogin: false,
    }
  },
  validations: {
    login: {
      userId: { required, email, maxLength: maxLength(40) },
      password: { required, maxLength: maxLength(40), minLength: minLength(8) },
    },
  },
  methods: {
    emailValid(mode) {
      this.emailErrors = []
      const userId = this.$v.login.userId
      userId.$touch()
      if (mode !== 'input') {
        !userId.required && this.emailErrors.push(this.$t('valid.require'))
        !userId.email && this.emailErrors.push(this.$t('valid.err.email'))
        !userId.maxLength && this.emailErrors.push(this.$t('valid.maxLength'))
      }
    },
    pwdValid(mode) {
      this.pwdErrors = []
      const password = this.$v.login.password
      password.$touch()
      if (mode !== 'input') {
        let pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        !password.required && this.pwdErrors.push(this.$t('valid.require'))
        !password.maxLength && this.pwdErrors.push(this.$t('valid.maxLength'))
        !password.minLength && this.pwdErrors.push(this.$t('valid.minLength'))
        !pwdReg.test(password.$model) &&
          this.pwdErrors.push(this.$t('valid.strAndNum'))
      }
    },
    submit() {
      this.emailValid()
      this.pwdValid()

      if (this.emailErrors.length === 0 && this.pwdErrors.length === 0) {
        alert(this.$t('valid.success'))
      } else {
        alert(this.$t('valid.fail'))
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
