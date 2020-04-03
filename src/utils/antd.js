import { message } from 'antd'


export const Tips = {
  info: msg => {
    message.info(msg)
  },
  
  success: msg => {
    message.success(msg)
  },
  
  error: msg => {
    message.error(msg)
  },
  
  warning: msg => {
    message.warning(msg)
  },
}