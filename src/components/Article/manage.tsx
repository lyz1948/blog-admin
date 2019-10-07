import * as React from 'react'
import * as styles from './style.css'
import { Table, Button, Image, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTags,
	faFolder,
	faEdit,
	faTrash,
	faDesktop,
	faSatelliteDish,
} from '@fortawesome/free-solid-svg-icons'
import { ArticleModel, ArticleDataModel, TagDataModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { formatDate } from '@app/utils'
import { ConfirmModal, Paging, Search } from '@app/components'
import * as CONFIG from '@app/config'

export namespace Article {
	export interface IProps {
		tags: TagDataModel
		articles: ArticleDataModel
		getArticleList: typeof ArticleActions.getArticleList
		deleteArticle: typeof ArticleActions.deleteArticle
		updateArticle: typeof ArticleActions.updateArticle
		editArticle: (_id: string) => void
	}

	export interface IState {
		showModal: boolean
		articleId: string
		keyword: string
		currentPage: number
	}
}

const artHeads = [
	'缩略图',
	'标题',
	'描述',
	'标签',
	'所属分类',
	'关键字',
	'类型',
	'时间',
	'操作',
]

export class Article extends React.Component<Article.IProps, Article.IState> {
	constructor(props: Article.IProps, context?: any) {
		super(props, context)

		this.state = {
			showModal: false,
			articleId: '',
			keyword: '',
			currentPage: 1,
		}

		this.handlePagination = this.handlePagination.bind(this)
		this.handleKeywordSearch = this.handleKeywordSearch.bind(this)
	}

	openModal(id: string) {
		this.setState({
			articleId: id,
			showModal: true,
		})
	}

	handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
		this.props.deleteArticle(this.state.articleId)
		this.setState({
			articleId: '',
			showModal: false,
		})
	}
	// 更新
	handleUpdate(_id: string) {
		this.props.editArticle(_id)
	}
	// 预览
	handleView(_id: string) {
		window.open(`${CONFIG.APP.baseUrl}article/${_id}`)
	}
	// 发布
	handlePublish(article: ArticleModel) {
		const { _id } = article
		this.props.updateArticle(_id, article)
	}

	// 关键字输入
	keywordChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
		const keyword = event.target.value
		this.setState({ keyword })
	}

	// 关键字搜索
	handleKeywordSearch() {
		const { keyword, currentPage } = this.state
		this.props.getArticleList({ page: currentPage, keyword })
	}

	// 分页
	handlePagination(currentPage: number) {
		this.setState({
			currentPage,
		})
		this.props.getArticleList({ page: currentPage })
	}

	renderHeaderBar(): JSX.Element | void {
		const { pagination } = this.props.articles
		const { currentPage } = this.state
		return (
			<div className="flex pdb10 pdt10">
				<div className="flex flex30">
					<Search
						placeholder="搜索关键字"
						handleChange={(name: string, val: any) =>
							this.keywordChange(name, val)
						}
						handleSearch={this.handleKeywordSearch}
					/>
				</div>
				<div className="flex flex1 flex-end">
					<div className={styles.filterBox}>
						<Form.Control as="select">
							<option>所有分类</option>
							<option>测试</option>
						</Form.Control>
						<Form.Control as="select">
							<option>所有标签</option>
							<option>测试</option>
						</Form.Control>
						<Form.Control as="select">
							<option>来源</option>
							<option>原创</option>
							<option>装载</option>
							<option>混合</option>
						</Form.Control>
						<Form.Control as="select">
							<option>公开</option>
							<option>密码访问</option>
							<option>私密</option>
						</Form.Control>
					</div>
					<Paging
						total={pagination.total}
						active={currentPage}
						handlePage={this.handlePagination}
					/>
				</div>
			</div>
		)
	}

	renderTableHeader(): JSX.Element | void {
		return (
			<thead>
				<tr>
					{artHeads.map((header, i) => (
						<th key={i}>{header}</th>
					))}
				</tr>
			</thead>
		)
	}

	renderList(): JSX.Element | void {
		const { data } = this.props.articles
		if (!data || data.length === 0) {
			return (
				<tbody>
					<tr>
						<td colSpan={artHeads.length}>搜索不到任何相关的文章</td>
					</tr>
				</tbody>
			)
		}
		return (
			<tbody>
				{data.map((it: any) => (
					<tr key={it._id}>
						<td className={styles.thumbnail}>
							<Image
								src={`${CONFIG.APP.baseUrl}${it.thumb}`}
								alt="用户头像"
								thumbnail
							/>
						</td>
						<td>{it.title}</td>
						<td>{it.description}</td>
						<td>
							{it.tag.length > 0 &&
								it.tag.map((it: any, idx: number) => (
									<div key={it._id}>
										<FontAwesomeIcon icon={faTags} size="1x" />
										<span> {it.name} </span>
									</div>
								))}
						</td>
						<td>
							{it.category.length > 0 &&
								it.category.map((cate: any, idx: number) => (
									<div key={cate._id}>
										<FontAwesomeIcon icon={faFolder} size="1x" />
										<span> {cate.name} </span>
									</div>
								))}
						</td>
						<td>{it.keywords.join(' ')}</td>
						<td>
							{it.origin === ArticleModel.EStateOrigin.Original
								? '原创'
								: it.origin === ArticleModel.EStateOrigin.Reprint
								? '转载'
								: '混合'}
						</td>
						<td>{formatDate(it.create_at)}</td>
						<td className={styles.btnGroup}>
							<Button
								size="sm"
								variant="secondary"
								onClick={() => this.handleView(it._id)}>
								<FontAwesomeIcon
									icon={faDesktop}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								查看文章
							</Button>

							<Button
								size="sm"
								variant="info"
								onClick={() => this.handleUpdate(it._id)}>
								<FontAwesomeIcon
									icon={faEdit}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								修改文章
							</Button>

							<Button
								size="sm"
								variant="success"
								onClick={() => this.handlePublish(it)}>
								<FontAwesomeIcon
									icon={faSatelliteDish}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								发布文章
							</Button>

							<Button
								size="sm"
								variant="danger"
								onClick={() => this.openModal(it._id)}>
								<FontAwesomeIcon
									icon={faTrash}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								删除文章
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	renderArticleList(): JSX.Element | void {
		return (
			<div>
				<div className="title">
					<h3>文章列表</h3>
				</div>
				{this.renderHeaderBar()}
				<div className="flex1 tac">
					<Table striped bordered hover variant="dark" className={styles.table}>
						{this.renderTableHeader()}
						{this.renderList()}
					</Table>
				</div>
			</div>
		)
	}

	render() {
		const { showModal } = this.state
		return (
			<div className="module">
				<ConfirmModal
					show={showModal}
					onHide={() => this.setState({ showModal: false })}
					onClose={(e: any) => this.handleDelete(e)}
				/>
				{this.renderArticleList()}
			</div>
		)
	}
}
