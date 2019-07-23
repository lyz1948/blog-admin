export interface IResponseData {
  data: any
  message?: string
  result?: any
  status?: string
}

// 公开状态
export enum IStatePublic {
  Password = 0, // 密码访问
  Public = 1, // 公开
  Secret = -1, // 隐藏
}

export interface IFatchData<T = any> {
  message: string
  result: T
  status: string
}