import * as types from '../constants/auth'
import { fromJS } from 'immutable'
import { signIn } from '../../api'

export const changeSignin = data => ({
  type: types.SIGNIN,
  data: fromJS(data),
})

export const changeLoadding = data => ({
  type: types.LOADING,
  data,
})

export const handleSignin = user => {
  return dispatch => {
    signIn(user).then(res => {
      dispatch(changeSignin(res.result))
      dispatch(changeLoadding(true))
    })
  }
}