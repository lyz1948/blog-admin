import { handleActions } from 'redux-actions'
import { RootState } from './state'
import { IResponseData } from '../../interfaces/data'
import { ArticleActions } from '../actions'

const initialState: RootState.SiteState = {
	title: '',
	sub_title: '',
	description: '',
	keywords: [],
	email: '',
	domain: '',
	icp: '',
	blacklist: {
		ips: [],
		mails: [],
		keywords: [],
	},
}

export const siteReducer = handleActions<RootState.SiteState, IResponseData>(
	{
		[ArticleActions.Type.GET_SITE_INFO]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return {
					...result
				}
			}
			// return state
		},
		[ArticleActions.Type.UPDATE_SITE_INFO]: (state, action) => {
			if (action.payload && action.payload.result) {
				const { result } = action.payload
				return {
					...result
				}
			}
		},
	},
	initialState
)
