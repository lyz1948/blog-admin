// import { argv } from 'yargs'
import * as ENVIROMENT from '../environment'

export const APP = {
  PORT: 3000,
  ERR_NO: 200,
  API: 'http://localhost:5381/api/',
  IS_PROD: ENVIROMENT.isProd,
  TOKEN_KEY: 'blogKey',
}
