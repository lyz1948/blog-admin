export interface IResponseData {
  message?: string
  result?: any
  status?: string
}

export interface IFatchData<T = any> {
  message: string
  result: T
  status: string
}
