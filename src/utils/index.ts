export * from './token'
import * as CONFIG from '../config/app.config'

export const getStatus = (response: any) => !!response.status && response.data && Object.is(response.status, CONFIG.APP.errno)

export const formatDate = (d: Date) => {
  const myDate = new Date(d);
  const year = myDate.getUTCFullYear()
  const month = myDate.getUTCMonth()
  const date = myDate.getUTCDate()
  const h = myDate.getUTCHours()

  return `${year}-${month + 1}-${date} ${h > 12 ? '下午' : '上午'}`
}

export function omit<T extends object, K extends keyof T>(target: T, ...names: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!names.includes(key)) {
        res[key] = target[key]
      }
      return res
    },
    {} as any
  )
}
