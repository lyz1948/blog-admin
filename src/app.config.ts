import * as ENVIROMENT from './environment'

export const APP = {
  port: 3000,
  errno: 200,
  api: 'http://localhost:5381/api/',
  isProd: ENVIROMENT.isProd,
  tokenKey: 'blogKey',
}