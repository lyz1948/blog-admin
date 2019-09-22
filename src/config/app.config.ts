// import { argv } from 'yargs'
import { isProd } from '../environment'
import {
	faToolbox,
	faTachometerAlt,
	faCalendarPlus,
	faSlidersH,
	faMailBulk,
	faWrench,
	faCogs,
} from '@fortawesome/free-solid-svg-icons'
import { NavModel } from '../store/models'

export const APP = {
	port: 3000,
	errno: 200,
	isProd,
	tokenKey: 'blogKey',
	baseUrl: 'http://localhost:5381/',
	apiUrl: 'http://localhost:5381/api',
	viewUrl: isProd ? 'https://ykpine.com' : 'http://localhost:3000',
}

export const SIDER_MENU = [
	{
		text: '仪表盘',
		name: NavModel.Filter.DASHBOARD,
		icon: faTachometerAlt,
	},
	{
		text: '文章',
		name: NavModel.Filter.ARTICLE,
		icon: faMailBulk,
		child: [
			{
				name: NavModel.Filter.ARTICLE_ADD,
				text: '发布文章',
				icon: faCalendarPlus,
			},
			{
				name: NavModel.Filter.ARTICLE_LIST,
				text: '管理文章',
				icon: faSlidersH,
			},
			{
				name: NavModel.Filter.ARTICLE_CATEGORY,
				text: '文章分类',
				icon: faToolbox,
			},
			{ name: NavModel.Filter.ARTICLE_TAG, text: '文章标签', icon: faWrench },
		],
	},
	{
		text: '全局设置',
		name: NavModel.Filter.SETTINGS,
		icon: faCogs,
	},
]
