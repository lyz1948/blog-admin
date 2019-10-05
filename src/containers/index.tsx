import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '@app/store/reducers'
import { NavModel, ArticleModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'

import { omit } from '@app/utils'
import * as CONFIG from '@app/config/app.config'

// component
import {
	LoadingRandCircle as Loading,
	Tag,
	TopNav,
	SideBar,
	Article,
	Category,
	Settings,
	Dashboard,
	ArticleAdd,
} from '../components'

export namespace App {
	export interface IProps extends RouteComponentProps<void> {
		filter: NavModel.Filter
		actions: ArticleActions
		articles: RootState.ArticleState
		categories: RootState.CategoryState
		tags: RootState.TagState
		user: RootState.UserState
		site: RootState.SiteState
	}

	export interface IState {
		loading: boolean
		token?: any
		editArticle?: any
	}
}

const FILTER_COMPONMENT = (Object.keys(
	NavModel.Filter
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time))

@connect(
	(
		state: RootState,
		ownProps
	): Pick<
		App.IProps,
		'filter' | 'articles' | 'categories' | 'tags' | 'user' | 'site'
	> => {
		const hash =
			ownProps.location && ownProps.location.hash.replace('#', '').split('?')[0]

		const filter =
			FILTER_COMPONMENT.find(value => value === hash) ||
			NavModel.Filter.DASHBOARD
		return {
			filter,
			user: state.user,
			articles: state.articles,
			categories: state.categories,
			tags: state.tags,
			site: state.site,
		}
	},
	(dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
		actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch),
	})
)
export class App extends React.Component<App.IProps, App.IState> {
	constructor(props: App.IProps, context?: any) {
		super(props, context)

		this.state = {
			loading: true,
			token: null,
			editArticle: null,
		}
		this.logout = this.logout.bind(this)
		this.filterCompoent = this.filterCompoent.bind(this)
		this.hasPermission = this.hasPermission.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.handleNewArticle = this.handleNewArticle.bind(this)
		this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
	}

	componentWillMount() {
		const { articles, tags, actions } = this.props
		// 获取签名
		this.getUserTokenFromStorage()

		// if (!this.hasPermission()) { return }
		// 用户信息
		actions.getUser()

		// 站点信息
		actions.getSiteInfo()

		// 如果数据小于2条则获取, 因为初始化的时候有一条默认数据
		if (!articles.data.length) {
			actions.getArticleList({})
		}

		if (!tags.data.length) {
			actions.getTag()
		}

		// if (!categories.data.length) {
			actions.getCategory()
		// }
	}

	componentDidMount() {
		const { articles, actions } = this.props
		const id = window.location.hash.split('=')[1]

		// 修改文章，刷新页面处理
		if (id) {
			actions.getArticle(id)
			articles.data.map((article: any) => {
				if (id == article._id) {
					this.setState({
						editArticle: article,
					})
				}
			})
		}
		sleep(10).then(() => {
			this.setState({ loading: false })
		})
	}

	// 过滤组件
	handleFilterChange(filter: NavModel.Filter): void {
		this.props.history.push(`#${filter}`)
	}

	// 添加文章
	handleNewArticle(article: ArticleModel): any {
		// const { thumb } = this.props.articles[0]
		const { actions, history } = this.props

		// article.thumb = thumb
		actions.addArticle(article)
		actions.getArticleList({})

		sleep(1000).then(() => {
			history.push('#ARTICLE_LIST')
		})
	}

	// 更新文章
	handleUpdateArticle(_id: string, article: ArticleModel): any {
		const { actions, history } = this.props

		actions.updateArticle(_id, article)
		actions.getArticleList({})

		sleep(1000).then(() => {
			history.push('#ARTICLE_LIST')
		})
	}

	// 获取修改的文章
	handleEdit(_id: string) {
		const { articles, categories, tags } = this.props
		const article = articles.data.find(it => it._id === _id)

		if (article) {
			// 获取文章所属分类
			categories.data.forEach(it => {
				if (article.category.includes(it._id)) {
					it.isSelected = true
				}
			})
			// 获取文章的标签
			tags.data.forEach(it => {
				if (article.tag && article.tag.includes(it._id!)) {
					it.isSelected = true
				}
			})
		}
		this.setState({
			editArticle: article,
		})
		this.props.history.push(`#${NavModel.Filter.ARTICLE_ADD}?id=${_id}`)
	}

	// handlePagination(num: any) {
	// 	const { actions } = this.props
	// 	actions.getArticleList({ page: num })
	// }

	// 校验token
	hasPermission() {
		const { token } = this.state
		// 凭证过期
		if (!token || token.expires_in < Date.now()) {
			localStorage.removeItem(CONFIG.APP.tokenKey)
			this.props.history.push('/login')
			return false
		}
		return true
	}

	// 获取Storage 中的 token
	getUserTokenFromStorage() {
		let token = localStorage.getItem(CONFIG.APP.tokenKey) as any
		try {
			token = JSON.parse(token)
		} catch (error) {
			throw new Error(error)
		}
		this.setState({
			token,
		})
	}

	// 登出
	logout() {
		localStorage.removeItem(CONFIG.APP.tokenKey)
		window.location.reload()
	}

	filterCompoent(): JSX.Element | void {
		this.hasPermission()

		const {
			filter,
			articles,
			categories,
			tags,
			user,
			site,
			actions,
		} = this.props
		const { editArticle } = this.state

		switch (filter) {
			case 'ARTICLE':
			case 'ARTICLE_LIST':
				return (
					<Article
						tags={tags}
						articles={articles}
						getArticleList={actions.getArticleList}
						deleteArticle={actions.deleteArticle}
						updateArticle={actions.updateArticle}
						editArticle={this.handleEdit.bind(this)}
						// pagination={this.handlePagination.bind(this)}
					/>
				)
			case 'ARTICLE_ADD':
				return (
					<ArticleAdd
						tags={tags}
						article={editArticle}
						categories={categories}
						uploadThumb={actions.uplodThumb}
						selectTag={actions.selectTag}
						selectCategory={actions.selectCategory}
						getArticle={actions.getArticle}
						addArticle={this.handleNewArticle}
						updateArticle={this.handleUpdateArticle}
					/>
				)
			case 'ARTICLE_CATEGORY':
				return (
					<Category
						categories={categories}
						addCategory={actions.addCategory}
						deleteCategory={actions.deleteCategory}
						editCategory={actions.editCategory}
					/>
				)
			case 'ARTICLE_TAG':
				return (
					<Tag
						tags={tags}
						addTag={actions.addTag}
						updateTag={actions.updateTag}
						deleteTag={actions.deleteTag}
					/>
				)
			case 'SETTINGS':
				return (
					<Settings
						user={user}
						site={site}
						updateSite={actions.updateSiteInfo}
						updateUser={actions.updateUser}
						uploadAvatar={actions.uploadAvatar}
					/>
				)
			default:
				return <Dashboard />
		}
	}

	render() {
		const { user } = this.props
		const { loading } = this.state
		return loading ? (
			<Loading />
		) : (
			<div className="home">
				<SideBar user={user} onClickFilter={this.handleFilterChange} />
				<div className="main">
					<TopNav user={user} logout={this.logout} />
					{this.filterCompoent()}
				</div>
			</div>
		)
	}
}
