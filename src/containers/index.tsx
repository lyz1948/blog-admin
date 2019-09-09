import * as React from 'react'
import * as CONFIG from '../config/app.config'

import { connect } from 'react-redux'
import { omit } from '../utils'
import { bindActionCreators, Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { NavModel, ArticleModel } from '../store/models'
import { ArticleActions } from '../store/actions'

// component
import {
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
  }

  export interface IState {
    userinfo?: any
    editArticle?: any
  }
}

const FILTER_COMPONMENT = (Object.keys(
  NavModel.Filter
) as (keyof typeof NavModel.Filter)[]).map(comp => NavModel.Filter[comp])

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

@connect(
  (
    state: RootState,
    ownProps
  ): Pick<App.IProps, 'filter' | 'articles' | 'categories' | 'tags' | 'user'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '').split('?')[0]
    
    const filter =
      FILTER_COMPONMENT.find(value => value === hash) ||
      NavModel.Filter.DASHBOARD
    return {
      filter,
      user: state.user,
      articles: state.articles,
      categories: state.categories,
      tags: state.tags
    }
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(ArticleActions, 'Type'), dispatch)
  })
)

export class App extends React.Component<App.IProps, App.IState> {
  constructor(props: App.IProps, context?: any) {
    super(props, context)

    this.state = {
      userinfo: null,
      editArticle: null
    }
    this.logout = this.logout.bind(this)
    this.filterCompoent = this.filterCompoent.bind(this)
    this.hasPermission = this.hasPermission.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleNewArticle = this.handleNewArticle.bind(this)
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
  }

  componentWillMount() {
    const { categories, tags, articles, actions } = this.props
    
    // 如果数据小于2条则获取, 因为初始化的时候有一条默认数据
    if (articles.length < 2) {
      actions.getArticleList()
    }
    if (tags.length < 2) {
      actions.getTag()
    }
    if (categories.length < 2) {
      actions.getCategory()
    }
    // 用户信息
    actions.getUser()
    
    // 获取签名
    this.getUserTokenFromStorage()
  }
  
  componentDidMount() {
    // 是否验证通过
    this.hasPermission()
  }
  
  hasPermission() {
    const { userinfo } = this.state
     // 凭证过期
     if (!userinfo || userinfo.expires_in < Date.now()) {
      localStorage.removeItem(CONFIG.APP.tokenKey)
      this.props.history.push('/login')
      return
    }
  }
  
  // 登出
  logout() {
    localStorage.removeItem(CONFIG.APP.tokenKey)
    window.location.reload()
  }

  handleFilterChange(filter: NavModel.Filter): void {
    this.props.history.push(`#${filter}`)
  }

  handleNewArticle(article: ArticleModel): any {
    const { thumb } = this.props.articles[0];
    article.thumb = thumb
    this.props.actions.addArticle(article)
  }

  handleUpdateArticle(_id: string, article: ArticleModel): any {
    const { actions, history } = this.props
    actions.updateArticle(_id, article)
    sleep(1000).then(() => {
      history.push('#ARTICLE_LIST')
    })
  }

  handleEdit(id: number) {
    const { articles, categories, tags } = this.props
    const article = articles.find(it => it.id === id)
    if (article) {
      // 获取文章所属分类
      categories.forEach(it => {
        if (article.category.includes(it._id)) {
          it.isSelected = true
        }
      })
      // 获取文章的标签
      tags.forEach(it => {
        if (article.tag.includes(it._id!)) {
          it.isSelected = true
        }
      })
    }
    this.setState({
      editArticle: article
    })
    this.props.history.push(`#${NavModel.Filter.ARTICLE_ADD}?id=${id}`)
  }

  getUserTokenFromStorage() {
    let token = localStorage.getItem(CONFIG.APP.tokenKey) as any
    try {
      token = JSON.parse(token)
    } catch (error) {
      throw new Error(error)
    }
    this.setState({
      userinfo: token
    })
  }


  filterCompoent(): JSX.Element | void {
    this.hasPermission()
    
    const { filter, articles, categories, tags, user, actions } = this.props
    const { editArticle } = this.state
        
    switch (filter) {
      case 'ARTICLE':
      case 'ARTICLE_LIST':
        return <Article
          tags={tags}
          articles={articles}
          getArticleList={actions.getArticleList}
          deleteArticle={actions.deleteArticle}
          editArticle={this.handleEdit.bind(this)}
        />
      case 'ARTICLE_ADD':
        return <ArticleAdd
          tags={tags}
          article={editArticle}
          categories={categories}
          uploadThumb={actions.uplodThumb}
          selectTag={actions.selectTag}
          selectCategory={actions.selectCategory}
          addArticle={this.handleNewArticle}
          updateArticle={this.handleUpdateArticle}
        />
      case 'ARTICLE_CATEGORY':
        return <Category
          categories={categories}
          addCategory={actions.addCategory}
          deleteCategory={actions.deleteCategory}
          editCategory={actions.editCategory}
        />
      case 'ARTICLE_TAG':
        return <Tag
          tags={tags} 
          addTag={actions.addTag}
          updateTag={actions.updateTag}
          deleteTag={actions.deleteTag}
        />
      case 'SETTINGS':
        return <Settings user={user} updateUser={actions.updateUser}/>
      default:
        return <Dashboard />
    }
  }

  render() {
    const { user } = this.props
    return (
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
