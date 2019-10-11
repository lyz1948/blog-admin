import * as React from 'react'
import { CategoryModel, CategoryDataModel } from '@app/store/models'
import { CategoryActions } from '@app/store/actions'
import { Table, Button, Form } from 'react-bootstrap'
import { INotice } from '@app/interfaces/notice'
import { formatDate } from '@app/utils'
import {
	ConfirmModal,
	Notication,
	FancyInput,
	FancyTextarea,
	Search,
} from '@app/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export namespace CategoryManage {
	export interface IProps {
		categories: CategoryDataModel
		batchCategory: typeof CategoryActions.batchCategory
		createCategory: typeof CategoryActions.createCategory
		deleteCategory: typeof CategoryActions.deleteCategory
		updateCategory: typeof CategoryActions.updateCategory
	}

	export interface IState {
		cateId: string
		keyword: string
		type: string
		content: string
		currentPage: number
		show: boolean
		showModal: boolean
		isUpdate: boolean
		curCategory?: any
		checkedValues: string[]
	}
}
const tableHeads = ['ID', '标题', '描述', 'slug', '时间', '操作']

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
			keyword: '',
			type: 'info',
			content: '添加成功',
			currentPage: 1,
			show: false,
			showModal: false,
			isUpdate: false,
			curCategory: null,
			checkedValues: [],
		}

		this.batchDelete = this.batchDelete.bind(this)
		this.handleResize = this.handleResize.bind(this)
		this.handleKeywordSearch = this.handleKeywordSearch.bind(this)
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
			curCategory: category,
		})
	}

	keywordChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		this.setState({ keyword: value })
	}

	// 搜索
	handleKeywordSearch() {
		const { currentPage, keyword } = this.state
		this.props.batchCategory({ page: currentPage, keyword })
	}

	// 复选框选择
	handleChecked(_id: any, event: React.ChangeEvent<HTMLInputElement>) {
		const { checked } = event.target
		let { checkedValues } = this.state

		if (checked && checkedValues!.filter((item: any) => item !== _id)) {
			checkedValues!.push(_id)
		} else {
			checkedValues = checkedValues!.filter((item: any) => item !== _id)
		}
		this.setState({ checkedValues })
	}

	// 批量删除
	batchDelete() {
		const { checkedValues } = this.state
		if (!checkedValues.length) {
			this.showNotice({ type: 'warn', content: '请选择要删除的分类' })
		}
	}

	// 新增或更新
	handleSave() {
		let name = this.inputName.current!.value
		let slug = this.inputSlug.current!.value
		let description = this.inputDescription.current!.value
		const { isUpdate, curCategory } = this.state

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

		const category = {
			id: '',
			name,
			slug,
			description,
			extends: [],
		}

		if (isUpdate) {
			category.id = curCategory._id
			this.props.updateCategory(category)
		} else {
			this.props.createCategory(category)
		}
		const message = isUpdate ? '更新成功' : '添加成功'

		this.showNotice({ type: 'success', content: message })
		this.handleResize()
	}

	// 重置
	handleResize() {
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

	renderHeaderBar(): JSX.Element | void {
		const { keyword } = this.state

		return (
			<div className="flex pdb10">
				<div className="flex flex50">
					<Search
						placeholder="搜索关键字"
						name="keyword"
						value={keyword}
						handleChange={(name: string, val: any) =>
							this.keywordChange(name, val)
						}
						handleSearch={this.handleKeywordSearch}
					/>
					<span className="mr10"></span>
					<Button
						size="sm"
						variant="warning"
						style={{ width: '120px' }}
						onClick={this.batchDelete}>
						<FontAwesomeIcon icon={faEdit} size="1x" />
						批量删除
					</Button>
				</div>
			</div>
		)
	}

	renderTableHeader(): JSX.Element | void {
		return (
			<thead>
				<tr>
					{tableHeads.map(h => (
						<th key={h}>{h}</th>
					))}
				</tr>
			</thead>
		)
	}

	renderTableBody(): JSX.Element | void {
		const { categories } = this.props

		if (categories.data.length === 0) {
			return (
				<tbody>
					<tr className="tac">
						<td colSpan={tableHeads.length}>搜索不到任何相关的分类</td>
					</tr>
				</tbody>
			)
		}

		return (
			<tbody>
				{categories.data.map((it: any, index: number) => (
					<tr key={index}>
						<td>
							<Form.Check
								type="checkbox"
								label={it.id}
								onChange={(e: any) => this.handleChecked(it._id, e)}
							/>
						</td>
						<td>{it.name}</td>
						<td>{it.description}</td>
						<td>{it.slug}</td>
						<td>{formatDate(it.update_at)}</td>
						<td className="ctrl">
							<Button
								size="sm"
								variant="info"
								onClick={() => this.handleEditor(it)}>
								<FontAwesomeIcon
									icon={faEdit}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								编辑分类
							</Button>
							<Button
								size="sm"
								variant="warning"
								onClick={() => this.openModal(it._id)}>
								<FontAwesomeIcon
									icon={faTrash}
									size="1x"
									style={{ marginRight: '2px' }}
								/>{' '}
								删除分类
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	renderList(): JSX.Element | void {
		return (
			<div className="module flex1 pdl0">
				<div className="title">
					<h3>分类列表</h3>
				</div>
				<div className="content">
					{this.renderHeaderBar()}
					<Table striped bordered hover variant="dark">
						{this.renderTableHeader()}
						{this.renderTableBody()}
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
						<Button variant="info" onClick={() => this.handleSave()}>
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
