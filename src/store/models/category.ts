export interface CategoryDataModel {
	data: CategoryModel[]
	pagination: any
	result?: any
}

export interface CategoryModel {
	name: string
	slug: string
	description: string
	pid: object
	extends?: []
	[propName: string]: any
}

// export namespace CategoryModel {
// 	export enum Filter {
// 		SHOW_ALL = 'ALL',
// 		SHOW_PUBLISH = 'PUBLISH',
// 		SHOW_PUBLIC = 'PUBLIC',
// 	}
// }
