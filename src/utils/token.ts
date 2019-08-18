import * as CONFIG from '../config/app.config'

export function getToken(): any {
   let token = localStorage.getItem(CONFIG.APP.TOKEN_KEY) as any
   try {
     token = JSON.parse(token)
   } catch (error) {
     // DO NOTHING
   }
   if (token) {
     return token.access_token
   }
}