import { Middleware } from 'redux'
import { IResponseData } from '@app/store/types'

export const request: Middleware = (store) => (next) => (action) => {
  const { payload, type, ...rest } = action

  if (!payload) {
    return next(action)
  }

  return payload.then(
    (res: IResponseData) => {
      console.log('request', res)
      next({...rest, ...res, type: 'SUCCESS' })
    },
    (error: any) => {
      next({ ...rest, error, type: 'FAILED'})
    })
}