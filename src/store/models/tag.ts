export interface TagDataModel {
	data: TagModel[]
	pagination: any
	result?: any
}
export interface TagModel {
	name: string
	slug: string
	description: string
	extends?: []
	[propName: string]: any
}

// export namespace TagModel {
// 	export enum Filter {
// 		SHOW_ALL = 'ALL',
// 	}
// }
