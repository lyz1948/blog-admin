import * as React from 'react'
import { CategoryModel } from '@app/store/models'
import { CategoryActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { INotice } from '@app/interfaces/notice'
import { formatDate } from '@app/utils'
import {
	ConfirmModal,
	Notication,
	FancyInput,
	FancyTextarea,
} from '@app/components'

export namespace CategoryManage {
	export interface IProps {
		categories: CategoryModel[]
		addCategory: typeof CategoryActions.addCategory
		deleteCategory: typeof CategoryActions.deleteCategory
		editCategory: typeof CategoryActions.editCategory
	}

	export interface IState {
		cateId: string
		showModal: boolean
		show: boolean
		type: string
		content: string
		isUpdate: boolean
	}
}

export class Category extends React.Component<
	CategoryManage.IProps,
	CategoryManage.IState
> {
	private inputName = React.createRef<HTMLInputElement>()
	private inputSlug = React.createRef<HTMLInputElement>()
	private inputDescription = React.createRef<HTMLInputElement>()

	constructor(props: CategoryManage.IProps, context?: any) {
		super(props, context)

		this.state = {
			cateId: '',
			showModal: false,
			show: false,
			type: 'info',
			content: '添加成功',
			isUpdate: false,
		}

		this._handleResize = this._handleResize.bind(this)
	}

	openModal(id: string) {
		this.setState({
			cateId: id,
			showModal: true,
		})
	}

	handleEditor(category: CategoryModel) {
		const { name, slug, description } = category

		this.inputName.current!.value = name
		this.inputSlug.current!.value = slug
		this.inputDescription.current!.value = description

		this.setState({
			isUpdate: true,
		})
	}

	handleCreate() {
		let name = this.inputName.current!.value
		let slug = this.inputSlug.current!.value
		let description = this.inputDescription.current!.value
		if (!name) {
			this.showNotice({ type: 'warn', content: '标题不能为空' })
			return
		}

		if (!slug) {
			this.showNotice({ type: 'error', content: 'slug不能为空' })
			return
		}

		if (!description) {
			this.showNotice({ type: '', content: '描述不能为空' })
			return
		}

		const cateObj = {
			name,
			slug,
			description,
			extends: [],
		}

		if (name && slug && description) {
			this.props.addCategory(cateObj)
			this.showNotice({ type: 'success', content: '添加成功' })
			this._handleResize()
		}
	}

	// 重置
	_handleResize() {
		this.inputName.current!.value = ''
		this.inputSlug.current!.value = ''
		this.inputDescription.current!.value = ''
	}

	showNotice(obj: INotice) {
		const { type, content } = obj
		this.setState({
			show: true,
			type,
			content,
		})
	}

	hideNotice() {
		this.setState({
			show: false,
		})
	}

	renderList(): JSX.Element | void {
		const { categories } = this.props
		const tableHeads = ['标题', '描述', 'slug', '时间', '操作']

		return (
			<div className="module flex1 pdl0">
				<div className="title">
					<h3>分类列表</h3>
				</div>
				<div className="content tac">
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								{tableHeads.map(h => (
									<th key={h}>{h}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{categories.map((it: any, index: number) => (
								<tr key={index}>
									<td>{it.name}</td>
									<td>{it.description}</td>
									<td>{it.slug}</td>
									<td>{formatDate(it.update_at)}</td>
									<td className="ctrl">
										<Button
											size="sm"
											variant="info"
											onClick={() => this.handleEditor(it)}>
											修改
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

	renderCreate(): JSX.Element | void {
		const { isUpdate } = this.state
		return (
			<div className="module flex50">
				<div className="title">
					<h3>添加分类</h3>
				</div>
				<div className="content">
					<div className="inputWrap">
						<span className="label">分类标题</span>
						<FancyInput ref={this.inputName} tip={'分类标题'} />
					</div>
					<div className="inputWrap">
						<span className="label">分类slug</span>
						<FancyInput ref={this.inputSlug} tip={'分类slug'} />
					</div>
					<div className="inputWrap">
						<span className="label">分类描述</span>
						<FancyTextarea ref={this.inputDescription} tip={'分类描述'} />
					</div>
					<div className="inputWrap">
						<span className="label"></span>
						<Button variant="primary" onClick={() => this.handleCreate()}>
							{isUpdate ? '更新分类' : '创建分类'}
						</Button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { showModal, show, type, content } = this.state

		return (
			<div className="category">
				<Notication
					show={show}
					type={type}
					content={content}
					onClose={() => {
						this.setState({ show: false })
					}}
					autohide
				/>
				<ConfirmModal
					show={showModal}
					onHide={() => this.setState({ showModal: false })}
					onClose={() => {
						this.props.deleteCategory(this.state.cateId)
						this.setState({ showModal: false })
					}}
				/>
				<div className="flex">
					{this.renderCreate()}
					{this.renderList()}
				</div>
			</div>
		)
	}
}
