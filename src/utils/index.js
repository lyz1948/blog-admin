
import * as CONFIG from '../config/app.config'
export * from './antd'
export * from './token'

const toString = Object.prototype.toString

// 补零
const toDouble = (s) => {
  const str = s + ''
  return ('00' + str).substring(str.length)
}

export const formatQuery = (url, querys) => {
  const isObj = toString.call(querys) === '[object Object]'

  if (!isObj) return url

  // 空对象
  if (JSON.stringify(querys) === '{}') {
    return url
  }

  let str = ''
  for (let key in querys) {
    str += `&${key}=${querys[key]}`
  }
  if (url.indexOf('?') === -1) {
    return `${url}?${str.substring(1)}`
  }
  return `${url}${str}`
}

// 地址前缀
export const prefixUrl = (url) => {
  return url && ~url.indexOf('http') ? url : CONFIG.APP.baseUrl + url
}

// 请求状态
export const getStatus = (response) =>
  !!response.status &&
  response.data &&
  Object.is(response.status, CONFIG.APP.errno)

// 格式化时间
export const formatDate = (d) => {
  const myDate = new Date(d)
  const year = myDate.getUTCFullYear()
  const month = myDate.getUTCMonth()
  const date = myDate.getUTCDate()
  const h = myDate.getUTCHours()
  const min = myDate.getUTCMinutes()
  const sec = myDate.getUTCSeconds()

  return `${year}-${month + 1}-${date} ${h > 12 ? '下午' : '上午'} ${toDouble(
    h,
  )}:${toDouble(min)}:${toDouble(sec)}`
}
