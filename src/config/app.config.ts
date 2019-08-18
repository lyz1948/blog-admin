// import { argv } from 'yargs'
import * as ENVIROMENT from '../environment'

export const APP = {
  PORT: 3000,
  ERR_NO: 200,
  API: 'http://localhost:5381/api/',
  IS_PROD: ENVIROMENT.isProd,
  TOKEN_KEY: 'blogKey',
}

export const QINIU = {
  AK: 'YV3OuTyQEJlyHxJxT_IP9wUSQqn4kCVHW0JTv8d2',
  SK: 'hdddzEji_2UDWTlj7gd5Q6BNItme5lsxoC32zwCt',
  BUCKET: 'ykpine',
}