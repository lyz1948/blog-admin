import * as types from '../constants/auth'
import { fromJS } from 'immutable'

export const changeSignin = data => ({
  type: types.SIGNIN,
  data: fromJS(data),
})

export const changeLoading = data => ({
  type: types.LOADING,
  data,
})