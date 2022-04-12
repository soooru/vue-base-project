<template>
  <div
    class="page-wrap d-flex align-center justify-center fill-height fill-width"
  >
    <v-card outlined min-width="500">
      <v-card-title>{{ $t('forms.login') }}</v-card-title>
      <v-card-text>
        <v-form ref="login" @submit.prevent="submit">
          <BaseInput
            class="mb-4"
            v-model="userId"
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
            v-model.trim="password"
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
            v-model="autoLogin"
            class="mb-4"
            dense
            hide-details
            label="자동로그인"
          ></v-checkbox>
          <v-btn
            color="primary"
            :disabled="
              $v.$anyError || !$v.userId.$anyDirty || !$v.password.$anyDirty
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
import { sync, call } from 'vuex-pathify'
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'FormSignIn',
  data() {
    return {
      userId: '',
      password: '',
      emailErrors: [],
      pwdErrors: [],
    }
  },
  validations: {
    userId: { required, email, maxLength: maxLength(40) },
    password: { required, maxLength: maxLength(40), minLength: minLength(8) },
  },
  computed: {
    autoLogin: sync('auth/autoLogin'),
  },
  methods: {
    ...call('auth', ['logIn']),
    emailValid(mode) {
      this.emailErrors = []
      const userId = this.$v.userId
      userId.$touch()
      if (mode !== 'input') {
        !userId.required && this.emailErrors.push(this.$t('valid.require'))
        !userId.email && this.emailErrors.push(this.$t('valid.err.email'))
        !userId.maxLength && this.emailErrors.push(this.$t('valid.maxLength'))
      }
    },
    pwdValid(mode) {
      this.pwdErrors = []
      const password = this.$v.password
      password.$touch()
      // if (mode !== 'input') {
      //   let pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      //   !password.required && this.pwdErrors.push(this.$t('valid.require'))
      //   !password.maxLength && this.pwdErrors.push(this.$t('valid.maxLength'))
      //   !password.minLength && this.pwdErrors.push(this.$t('valid.minLength'))
      //   !pwdReg.test(password.$model) &&
      //     this.pwdErrors.push(this.$t('valid.strAndNum'))
      // }
    },
    submit() {
      this.emailValid()
      this.pwdValid()

      if (
        this.emailErrors.length > 0 ||
        this.pwdErrors.length > 0 ||
        this.isLoadingSubmit
      )
        return

      this.isLoadingSubmit = true
      const { userId, password } = this.$data
      this.logIn({ userId, password }).then(() => {
        const redirectPath = this.$route.query?.redirectFrom
        this.$router.push(redirectPath ? redirectPath : '/')
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
