export interface UserModel {
	name: string
	slogan?: string
	avatar?: string
	password?: string
	password_new?: string
	password_new_rep?: string
	access_token?: string
	[propName: string]: any
}

export namespace UserModel {
	export enum Filter {
		SHOW_USER = 'USER',
	}
}
