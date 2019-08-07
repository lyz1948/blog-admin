export * from './token'
import * as CONFIG from '../app.config'

export const getStatus = (response: any) => !!response.status && response.data && Object.is(response.status, CONFIG.APP.ERR_NO)

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
