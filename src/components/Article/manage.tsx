import * as React from 'react'
import { Table, Button, Image, Pagination, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags, faFolder } from '@fortawesome/free-solid-svg-icons'
import { ArticleModel, ArticleDataModel, TagModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { formatDate } from '@app/utils'
import { ConfirmModal, Empty, TextInput } from '@app/components'
import * as CONFIG from '@app/config'

export namespace Article {
	export interface IProps {
		tags: TagModel[]
		articles: ArticleDataModel
		getArticleList: typeof ArticleActions.getArticleList
		deleteArticle: typeof ArticleActions.deleteArticle
		updateArticle: typeof ArticleActions.updateArticle
		editArticle: (_id: string) => void
		// pagination: (num: number) => void
	}

	export interface IState {
		showModal: boolean
		articleId: string
		active: number
	}
}

export class Article extends React.Component<Article.IProps, Article.IState> {
	constructor(props: Article.IProps, context?: any) {
		super(props, context)

		this.state = {
			showModal: false,
			articleId: '',
			active: 1,
		}
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

	inputKeyword(name: string, event: React.ChangeEvent<HTMLInputElement>) {}

	// 分页
	handlePagination(num: number, event: React.MouseEvent) {

		this.setState({
			active: num
		})
		this.props.getArticleList({ page: num })
		// this.props.pagination(num)
	}

	render() {
		const { data, pagination } = this.props.articles
		const { showModal } = this.state
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

		if (!data.length) {
			return <Empty text="沙发留给你" />
		}

		const { active } = this.state
		let items = []
		const len = Math.ceil(pagination.total / 10)
		for (let number = 1; number <= len; number++) {
			items.push(
				<Pagination.Item key={number} active={number === active} onClick={(e: any) => this.handlePagination(number, e)}>
					{number}
				</Pagination.Item>
			)
		}

		return (
			<div className="module">
				<ConfirmModal
					show={showModal}
					onHide={() => this.setState({ showModal: false })}
					onClose={(e: any) => this.handleDelete(e)}
				/>
				<div className="flex">
					<div className="flex flex30">
						{/* <div className="flex30 mr10">
							<select name="article" id="select" className="formInput">
								<option>排序</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div> */}
						<InputGroup className="mb-3">
							<TextInput
								placeholder="Recipient's username"
								valueChange={() => this.inputKeyword}
							/>
							<InputGroup.Append>
								<Button variant="primary">搜索</Button>
							</InputGroup.Append>
						</InputGroup>
					</div>
					<div className="flex1">
						<Pagination className="flex-end">
							<Pagination.First />
							<Pagination.Prev />
							{items}
							<Pagination.Next />
							<Pagination.Last />
						</Pagination>
					</div>
				</div>
				<div className="flex1 tac">
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								{artHeads.map((header, i) => (
									<th key={i}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((it: any) => (
								<tr key={it._id}>
									<td className="thumb-box">
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
									<td className="ctrl">
										<Button
											size="sm"
											variant="success"
											onClick={() => this.handleView(it._id)}>
											查看
										</Button>

										<Button
											size="sm"
											variant="info"
											onClick={() => this.handleUpdate(it._id)}>
											修改
										</Button>

										<Button
											size="sm"
											variant="warning"
											onClick={() => this.handlePublish(it)}>
											发布
										</Button>

										<Button
											size="sm"
											variant="danger"
											onClick={() => this.openModal(it._id)}>
											删除
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		)
	}
}
