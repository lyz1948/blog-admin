import * as types from '../constants/settings'
import { fromJS } from 'immutable'
import {
  fetchSite,
  updateSite,
  fetchUser,
  updateUser,
  uploadAvatar,
} from '../../api'

export const changeLoadding = data => ({
  type: types.LOADING,
  data,
})

const changeSiteInfo = data => ({
  type: types.UPDATE_SITE_INFO,
  data: fromJS(data),
})

const changeUserInfo = data => ({
  type: types.UPDATE_USER_INFO,
  data: fromJS(data),
})

const changeUserAvatar = data => ({
  type: types.UPLOAD_AVATAR,
  data,
})

export const getSiteInfo = () => {
  return dispatch => {
    fetchSite()
      .then(res => {
        dispatch(changeSiteInfo(res.result))
        dispatch(changeLoadding(false))
      })
      .catch(() => {
        console.log('获取网站信息失败')
      })
  }
}

export const updateSiteInfo = () => {
  return dispatch => {
    updateSite()
      .then(res => {
        dispatch(changeSiteInfo(res.result))
      })
      .catch(() => {
        console.log('获取网站信息失败')
      })
  }
}

export const getUserInfo = () => {
  return dispatch => {
    fetchUser()
      .then(res => {
        dispatch(changeUserInfo(res.result))
        dispatch(changeLoadding(false))
      })
      .catch(() => {
        console.log('获取管理员信息失败')
      })
  }
}

export const updateUserInfo = user => {
  return dispatch => {
    updateUser(user)
      .then(res => {
        console.log('res: ', res)
        dispatch(changeUserInfo(res.result))
      })
      .catch(() => {
        console.log('获取管理员信息失败')
      })
  }
}

export const uploadUserAvatar = (userId, file) => {
  return dispatch => {
    uploadAvatar(userId, file)
      .then(res => {
        dispatch(changeUserAvatar(res.result))
      })
      .catch(() => {
        console.log('上传头像失败')
      })
  }
}
