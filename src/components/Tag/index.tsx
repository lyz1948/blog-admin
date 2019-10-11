import * as React from 'react'
import { TagModel, TagDataModel } from '@app/store/models'
import { TagActions } from '@app/store/actions'
import { Table, Button, Form } from 'react-bootstrap'
import { INotice } from '@app/interfaces/notice'
import { formatDate } from '@app/utils'
import {
	Notication,
	ConfirmModal,
	FancyInput,
	FancyTextarea,
	Paging,
	Search,
} from '@app/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export namespace TagComp {
	export interface IProps {
		tags: TagDataModel
		createTag: typeof TagActions.createTag
		batchTag: typeof TagActions.batchTag
		updateTag: typeof TagActions.updateTag
		deleteTag: typeof TagActions.deleteTag
	}

	export interface IState {
		tagId: string
		currentPage: number
		keyword: string
		showModal: boolean
		isUpdate: boolean
		show: boolean
		type: string
		content: string
		checkedValues: string[]
	}
}

const tableHeads = ['标题', '描述', 'slug', '时间', '操作']

export class Tag extends React.Component<TagComp.IProps, TagComp.IState> {
	private inputName = React.createRef<HTMLInputElement>()
	private inputSlug = React.createRef<HTMLInputElement>()
	private inputDescription = React.createRef<HTMLInputElement>()

	constructor(props: TagComp.IProps, context?: any) {
		super(props, context)

		this.state = {
			tagId: '',
			currentPage: 1,
			keyword: '',
			show: false,
			showModal: false,
			isUpdate: false,
			type: 'info',
			content: '添加成功',
			checkedValues: [],
		}
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleKeywordSearch = this.handleKeywordSearch.bind(this)
	}

	openModal(id: string) {
		this.setState({
			showModal: true,
			tagId: id,
		})
	}

	showNotice(obj: INotice) {
		const { type, content } = obj
		this.setState({
			show: true,
			type,
			content,
		})
	}

	handleEdit(tag: any, e: React.MouseEvent<HTMLButtonElement>) {
		const { _id, name, slug, description } = tag
		this.inputName.current!.value = name
		this.inputSlug.current!.value = slug
		this.inputDescription.current!.value = description
		this.setState({
			tagId: _id!,
			isUpdate: true,
		})
	}

	handleDelete() {
		this.props.deleteTag(this.state.tagId)
		this.setState({
			showModal: !this.state.showModal,
		})
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
		console.log('checked', checkedValues)
		this.setState({ checkedValues })
	}

	handleSave() {
		let name = this.inputName.current!.value
		let slug = this.inputSlug.current!.value
		let description = this.inputDescription.current!.value

		if (!name) {
			this.showNotice({ type: 'warn', content: '标题不能为空！' })
			return
		}

		if (!slug) {
			this.showNotice({ type: 'warn', content: 'slug不能为空！' })
			return
		}

		if (!description) {
			this.showNotice({ type: 'warn', content: '描述不能为空！' })
			return
		}

		const { isUpdate, tagId } = this.state
		let tagObj = {
			name,
			slug,
			description,
			extends: [],
		}
		if (isUpdate) {
			tagObj = Object.assign(tagObj, { _id: tagId })
			this.props.updateTag(tagObj as TagModel)

			this.showNotice({ type: 'success', content: '更新成功！' })

			this.setState({
				tagId: '',
				isUpdate: false,
			})
		} else {
			this.props.createTag(tagObj)
			this.showNotice({ type: 'success', content: '添加成功！' })
		}
		this.handleResize()
	}

	// 重置
	handleResize() {
		this.inputName.current!.value = ''
		this.inputSlug.current!.value = ''
		this.inputDescription.current!.value = ''
	}

	keywordChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		this.setState({ keyword: value })
	}

	// 搜索
	handleKeywordSearch() {
		const { currentPage, keyword } = this.state
		this.props.batchTag({ page: currentPage, keyword })
	}

	// 分页
	handlePagination(page: number) {
		this.setState({
			currentPage: page,
		})
		this.props.batchTag({ page })
	}

	renderHeaderBar(): JSX.Element | void {
		const { pagination } = this.props.tags
		const { currentPage, keyword } = this.state

		return (
			<div className="flex pdb10">
				<div className="flex flex30">
					<Search
						placeholder="搜索关键字"
						name="keyword"
						value={keyword}
						handleChange={(name: string, val: any) =>
							this.keywordChange(name, val)
						}
						handleSearch={this.handleKeywordSearch}
					/>
				</div>
				<div className="flex1">
					<Paging
						total={pagination.total}
						active={currentPage}
						handlePage={() => this.handlePagination}
					/>
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
		const { data } = this.props.tags
		if (!data || data.length === 0) {
			return (
				<tbody>
					<tr className="tac">
						<td colSpan={tableHeads.length}>搜索不到任何相关的标签</td>
					</tr>
				</tbody>
			)
		}
		return (
			<tbody>
				{data.map((it: any, index: number) => (
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
						<td className="ctrl-btn-group">
							<Button
								size="sm"
								variant="info"
								onClick={(e: any) => this.handleEdit(it, e)}>
								<FontAwesomeIcon
									icon={faEdit}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								编辑标签
							</Button>
							<Button
								size="sm"
								variant="warning"
								onClick={() => this.openModal(it._id)}>
								<FontAwesomeIcon
									icon={faTrash}
									size="1x"
									style={{ marginRight: '2px' }}
								/>
								删除标签
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		)
	}

	renderTagList(): JSX.Element | void {
		return (
			<div className="module flex1 pdl0">
				<div className="title">
					<h3>标签列表</h3>
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

	renderCreated(): JSX.Element | void {
		const { isUpdate } = this.state
		return (
			<div className="module flex50">
				<div className="title">
					<h3>添加标签</h3>
				</div>
				<div className="content">
					<div className="inputWrap">
						<span className="label">标签名</span>
						<FancyInput ref={this.inputName} tip={'标签标题'} />
					</div>
					<div className="inputWrap">
						<span className="label">slug</span>
						<FancyInput ref={this.inputSlug} tip={'标签slug'} />
					</div>
					<div className="inputWrap">
						<span className="label">描述</span>
						<FancyTextarea ref={this.inputDescription} tip={'标签描述'} />
					</div>
					<div className="inputWrap">
						<span className="label"></span>
						<Button variant="info" onClick={() => this.handleSave()}>
							{isUpdate ? '更新标签' : '创建标签'}
						</Button>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { showModal, show, type, content } = this.state
		return (
			<div className="tag">
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
						this.props.deleteTag(this.state.tagId)
						this.setState({ showModal: false })
					}}
				/>
				<div className="flex">
					{this.renderCreated()}
					{this.renderTagList()}
				</div>
			</div>
		)
	}
}
