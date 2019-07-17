export interface UserModel {
  username: string
  password: string
  access_token?: string
  expires_in?: number
  [prosName: string]: any
}

export namespace UserModel {
  export enum Filter {
    SHOW_USER = 'USER'
  }
}