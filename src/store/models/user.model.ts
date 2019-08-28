export interface UserModel {
  name: string
  password: string
  slogan?: string
  avatar?: string
  passwordNew?: string
  passwordNewConfirm?: string
  access_token?: string
  expires_in?: number
  data?: any
}

export interface UserProfileModel {
  name: string
  slogan: string
  avatar: string
  password: string
  passwordNew: string
  passwordNewConfirm: string
}

export namespace UserModel {
  export enum Filter {
    SHOW_USER = 'USER'
  }
}