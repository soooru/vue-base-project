// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locales/ko.json'
import store from '@/state'

Vue.use(VueI18n)

const loadedLanguages = ['ko']

const dateTimeFormats = {
  ko: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
}

const getDefaultLangauge = () => {
  // 지원가능한 언어 가져오기
  const context = require.context('@/locales', false, /[A-z]+\.json$/i)
  const languageInUse = context.keys().map((key) => key.match(/([A-z]+)\./i)[1])

  const { language: savedLang } = store.state.app

  if (savedLang) {
    // store에 저장된 언어가 있다면 해당 언어로 반환
    if (languageInUse.includes(savedLang)) {
      if (savedLang !== 'ko') loadLanguageAsync(savedLang)
      return savedLang
    } else {
      store.commit('app/SET_LANGUAGE', null)
    }
  } else {
    // 브라우저 언어를 가져와서 적용
    let userlang = navigator.language || navigator.userLanguage
    if (userlang) userlang = userlang.substr(0, 2).toLowerCase()
    if (!languageInUse.includes(userlang)) return 'ko'
    if (userlang !== 'ko') loadLanguageAsync(userlang)
    return userlang
  }
}

export const i18n = new VueI18n({
  locale: getDefaultLangauge(),
  dateTimeFormats,
  messages: { ko: messages },
})

function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  store.commit('app/SET_LANGUAGE', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // 현재 설정된 언어와 같을 경우
  if (i18n && i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 이미 로드된 언어일 경우
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 아직 로딩된 언어가 아닐 경우
  return import(`@/locales/${lang}.json`).then((messages) => {
    i18n.setLocaleMessage(lang, messages.default)
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}
