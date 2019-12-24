import * as CONFIG from '@app/config/app.config'

export function getToken(): any {
  let token = localStorage.getItem(CONFIG.APP.tokenKey) as any
  try {
    token = JSON.parse(token)
  } catch (error) {
    // DO NOTHING
  }
  if (token) {
    return token.access_token
  }
}
