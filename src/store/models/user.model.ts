export interface UserModel {
  username: string
  password: string
  name?: string
  slogan?: string
  avatar?: string
  access_token?: string
  expires_in?: number
  data?: any
}

export namespace UserModel {
  export enum Filter {
    SHOW_USER = 'USER'
  }
}