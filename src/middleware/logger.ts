import { Middleware } from 'redux'

export const logger: Middleware = store => next => action => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action)
  }
  if (action.payload.error) {
    console.log('登录超时了')
  }
  return next(action)
}
