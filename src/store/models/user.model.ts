export interface UserModel {
  username: string
  password: string
  slogan?: string
  avatar?: string
  password_new?: string
  password_new_rep?: string
  access_token?: string
  expires_in?: number
  [propName: string]: any
}

export namespace UserModel {
  export enum Filter {
    SHOW_USER = 'USER',
  }
}
