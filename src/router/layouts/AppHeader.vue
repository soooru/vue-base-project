<template>
  <div>
    <v-app-bar
      :app="!isMobile"
      :absolute="isMobile"
      :hide-on-scroll="isMobile"
      scroll-target="#scrolling"
      scroll-threshold="50"
      :elevation="isMobile ? 1 : 2"
      :dense="isMobile"
    >
      <v-card
        v-if="isMobile"
        class="d-flex justify-space-between"
        flat
        width="100%"
        color="transparent"
      >
        <v-app-bar-nav-icon small @click="drawer = !drawer" />
        <h3>제목</h3>
        <div style="width: 24px" />
      </v-card>
      <v-card
        v-else
        class="d-flex align-center"
        flat
        width="100%"
        color="transparent"
      >
        <router-link to="/">
          <v-img
            alt="Logo"
            height="40"
            width="50"
            contain
            :src="require('@/assets/images/sample_logo.png')"
          />
        </router-link>
        <v-list class="d-flex" color="transparent">
          <v-list-item
            v-for="(item, i) in navItems"
            :key="`item${i}`"
            class="ml-5"
            :to="item.to"
          >
            <v-list-item-title
              v-text="item.title"
              link
              :class="
                $route.path === item.to
                  ? 'primary--text font-weight-bold'
                  : 'font-weight-normal'
              "
              class="py-5"
            />
          </v-list-item>
        </v-list>
        <v-spacer />
        <div v-if="loggedIn">
          <v-badge
            :value="cartLength != '0'"
            class="mr-5"
            color="primary"
            :content="cartLength"
            overlap
          >
            <v-btn icon depressed plain small :to="{ name: 'my-cart' }">
              <v-icon class="mr-1">mdi-wheel-barrow</v-icon>
            </v-btn>
          </v-badge>
          <v-btn
            class="mr-3"
            :color="$route.name.indexOf('my-') > -1 ? 'primary' : undefined"
            icon
            :to="{ name: 'my-page' }"
            ><v-icon>mdi-account-circle</v-icon></v-btn
          >
        </div>
        <div v-else>
          <v-btn text to="login">로그인</v-btn>
        </div>
        <v-menu bottom left offset-y rounded="lg" nudge-top="5" nudge-left="-5">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" small fab icon>
              <v-icon class="header-icon">mdi-web</v-icon>
            </v-btn>
          </template>
          <v-list class="pt-0">
            <v-list-item style="min-height: 38px">
              <v-list-item-subtitle
                class="text-center"
                v-text="$t('app.changeLang')"
              />
            </v-list-item>
            <v-divider />
            <v-list-item v-for="(lang, i) in langs" :key="i" link>
              <v-list-item-content
                v-text="lang.title"
                class="text-center body-2"
                :class="
                  $i18n.locale === lang.value
                    ? 'primary--text font-weight-bold'
                    : ''
                "
                @click="setLanguage(lang)"
              />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card>
    </v-app-bar>
    <v-navigation-drawer
      class="mobile-drawer"
      v-model="drawer"
      absolute
      temporary
    >
      <div class="d-flex justify-end mr-3">
        <v-btn small fab icon title="close" @click="drawer = !drawer">
          <v-icon class="header-icon">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-list nav dense>
        <!-- 메뉴  -->
        <v-list-item
          v-for="(item, i) in navItems"
          :key="`item${i}`"
          class="ml-5"
          :to="item.to"
        >
          <v-list-item-title
            v-text="item.title"
            link
            :class="
              $route.path === item.to
                ? 'primary--text font-weight-bold'
                : 'font-weight-normal'
            "
            class="py-5"
          />
        </v-list-item>
      </v-list>
      <v-spacer />
      <div v-if="loggedIn">
        <!-- 장바구니 -->
        <v-badge
          :value="cartLength != '0'"
          class="mr-5"
          color="primary"
          :content="cartLength"
          overlap
        >
          <v-btn
            icon
            plain
            small
            color="grey darken-3"
            :to="{ name: 'my-cart' }"
          >
            <v-icon class="mr-1">mdi-wheel-barrow</v-icon>
          </v-btn>
        </v-badge>
        <!-- 내 정보 -->
        <v-btn
          class="mr-3"
          :color="$route.name.indexOf('my-') > -1 ? 'primary' : undefined"
          icon
          :to="{ name: 'my-page' }"
          ><v-icon>mdi-account-circle</v-icon></v-btn
        >
      </div>
      <div v-else>
        <!-- 로그인 -->
        <v-btn text to="login">로그인</v-btn>
      </div>
      <!-- 언어 변경 -->
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="lang-btn-m" v-bind="attrs" v-on="on" small fab icon>
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>
        <v-list class="pt-0">
          <v-list-item style="min-height: 38px">
            <v-list-item-subtitle
              class="text-center"
              v-text="$t('app.changeLang')"
            />
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(lang, i) in langs" :key="i" link>
            <v-list-item-content
              v-text="lang.title"
              class="text-center body-2"
              :class="
                $i18n.locale === lang.value
                  ? 'primary--text font-weight-bold'
                  : ''
              "
              @click="setLanguage(lang)"
            />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { get, call } from 'vuex-pathify'
import { loadLanguageAsync } from '@/plugins/i18n'
export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
      langs: [
        { title: 'KOREAN', value: 'ko' },
        { title: 'ENGLISH', value: 'en' },
      ],
      navItems: [
        {
          title: 'home',
          to: '/',
        },
        {
          title: 'shop',
          to: '/shop',
        },
        {
          title: 'forms',
          to: '/forms',
        },

        {
          title: 'Error',
          to: '/error',
        },
      ],
    }
  },
  computed: {
    ...get('app', ['isMobile']),
    ...get('auth', ['loggedIn']),
    ...get('cart', ['cartLength']),
  },
  watch: {
    isMobile(val) {
      if (!val) this.drawer = false
    },
  },
  methods: {
    ...call('auth', ['logOut']),
    setLanguage(lang) {
      /* 사이트 언어 변경 */
      loadLanguageAsync(lang.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.lang-btn-m {
  float: right;
  margin-right: 10px;
}
</style>
