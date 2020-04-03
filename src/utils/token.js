
import * as CONFIG from '../config/app.config'

export function getToken() {
  let token = localStorage.getItem(CONFIG.APP.tokenKey)
  
  try {
    token = JSON.parse(token)
  } catch (error) {
    // DO NOTHING
  }

  if (token) {
    return token.access_token
  }
}
