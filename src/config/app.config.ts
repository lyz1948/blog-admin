import { isProd } from '../environment'

const PREFIX = isProd ? 'https://www.ykpine.com/' : 'http://localhost:5381/'
const API_URL = PREFIX + 'api/'

export const APP = {
  port: 5382,
  errno: 200,
  isProd,
  tokenKey: 'blogKey',
  baseUrl: PREFIX,
  apiUrl: API_URL,
}
