//libarary
import { isISO8601 } from 'validator'
import Cookies from 'js-cookie'
import moment from 'moment-timezone'
import { isNullOrUndefined } from '@/utils/type'

export const getCookie = (cookieName) => {
  return Cookies.get(cookieName)
}

export const setCookie = (cookieName, data, expiresType) => {
  try {
    if (isNullOrUndefined(cookieName) || isNullOrUndefined(data)) {
      throw new Error('invalid required params')
    }
    const cookiesOpt = {
      sameSite: 'none',
      secure: true,
    }
    const expireData = convertExpiresType(expiresType)
    if (expireData) {
      cookiesOpt['expires'] = expireData
    }
    if (process.env.VUE_APP_COOKIE_DOMAIN) {
      cookiesOpt['domain'] = process.env.VUE_APP_COOKIE_DOMAIN
    }
    if (Object.keys(cookiesOpt).length > 0) {
      Cookies.set(cookieName, data, cookiesOpt)
    } else {
      Cookies.set(cookieName, data)
    }
  } catch (err) {
    console.error(err)
  }
}

export const delCookie = (cookieName, isExpiresDate) => {
  try {
    if (cookieName === undefined || cookieName === '')
      throw new Error('cookieName empty')
    const cookiesOpt = {
      sameSite: 'none',
      secure: true,
    }
    if (isExpiresDate) {
      cookiesOpt['expires'] = ''
    }
    if (process.env.VUE_APP_COOKIE_DOMAIN) {
      cookiesOpt['domain'] = process.env.VUE_APP_COOKIE_DOMAIN
    }
    if (Object.keys(cookiesOpt).length > 0) {
      Cookies.remove(cookieName, cookiesOpt)
    } else {
      Cookies.remove(cookieName)
    }
  } catch (err) {
    console.error(err)
  }
}

const convertExpiresType = (val) => {
  try {
    if (val && isISO8601(val)) {
      const nowUtc = moment.utc()
      const paramUtc = moment.utc(val)
      const remainTime = moment.duration(paramUtc.diff(nowUtc))
      let num = remainTime.humanize().split(' ')[0]
      if (isNullOrUndefined(num)) {
        throw new Error('invalid_time_number_value')
      }
      num = Number(num)
      const timeType = remainTime.humanize().split(' ')[1]
      if (timeType.includes('day')) {
        return num
      } else if (timeType.includes('hour')) {
        return (1 / 24) * num
      } else if (timeType.includes('minute')) {
        return (1 / 1440) * num
      } else if (timeType.includes('second')) {
        return (1 / 86400) * num
      } else {
        throw new Error('time_type_is_milliseconds')
      }
    } else {
      switch (val) {
        case '30s':
          return 1 / 2880
        case '1m':
          return 1 / 1440
        case '5m':
          return 1 / 288
        case '12h':
          return 1 / 2
        case '30d':
          return 30
        default:
          return undefined
      }
    }
  } catch (err) {
    console.error(err)
  }
}
