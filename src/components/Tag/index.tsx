import * as React from 'react'
import * as styles from './style.css'
import { TagModel } from '@app/store/models'
import { TagActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { Notication, ConfirmModal, FancyInput, FancyTextarea } from '../index'

export namespace TagComp {
  export interface IProps {
    tags: TagModel[]
    getTag: typeof TagActions.getTag
    addTag: typeof TagActions.addTag
    updateTag: typeof TagActions.updateTag
    deleteTag: typeof TagActions.deleteTag
  }

  export interface IState {
    tagId: string
    showModal: boolean
    isUpdate: boolean
    show: boolean
    type: string
    content: string
  }

  export interface INotice {
    type: string
    content: string
  }
}

// const FancyInput = React.forwardRef((props: any, ref: any) => {
//   return (
//     <input
//       type="text"
//       ref={ref}
//       className="formInput"
//       placeholder={props.tip}
//     />
//   )
// })

// const FancyTextarea = React.forwardRef((props: any, ref: any) => {
//   return (
//     <textarea
//       ref={ref}
//       className="formTextarea"
//       placeholder={props.tip}
//     />
//   )
// })

export class Tag extends React.Component<
  TagComp.IProps,
  TagComp.IState,
  TagComp.INotice
> {
  private inputName = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: TagComp.IProps, context?: any) {
    super(props, context)

    this.state = {
      tagId: '',
      show: false,
      showModal: false,
      isUpdate: false,
      type: 'info',
      content: '添加成功',
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentWillMount() {
    this.props.getTag()
  }

  openModal(id: string) {
    this.setState({
      showModal: true,
      tagId: id,
    })
  }

  showNotice(obj: TagComp.INotice) {
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
      isUpdate: true
    })
  }

  handleDelete() {
    this.props.deleteTag(this.state.tagId)
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleCreate() {
    let name = this.inputName.current!.value
    let slug = this.inputSlug.current!.value
    let description = this.inputDescription.current!.value

    if(!name) {
      this.showNotice({ type: 'warn', content: '标题不能为空！' })
      return
    }

    if(!slug) {
      this.showNotice({ type: 'warn', content: 'slug不能为空！' })
      return
    }

    if(!description) {
      this.showNotice({ type: 'warn', content: '描述不能为空！' })
      return
    }

    const { isUpdate, tagId } = this.state
    let tagObj = {
      name,
      slug,
      description,
      extends: []
    }
    if (isUpdate) {
      tagObj = Object.assign(tagObj, { _id: tagId })
      this.props.updateTag(tagObj as TagModel)
      
      this.showNotice({ type: 'success', content: '更新成功！' })
      
      this.setState({
        tagId: '',
        isUpdate: false
      })
    } else {
      this.props.addTag(tagObj)
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

  renderList(): JSX.Element | void {
    const { tags } = this.props
    const tableHeads = ['标题', '描述', 'slug', '时间', '操作']
    return (
      <div className={styles.tagList}>
        <div className={styles.title}>
          <h3>添加标签</h3>
        </div>
        <div className={styles.content}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                {tableHeads.map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tags.map((it: any, index: number) => (
                <tr key={index}>
                  <td>{it.name}</td>
                  <td>{it.description}</td>
                  <td>{it.slug}</td>
                  <td>{it.update_at}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      style={{ marginRight: '5px' }}
                      onClick={(e: any) => this.handleEdit(it, e)}
                    >
                      编辑
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => this.openModal(it._id)}
                    >
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

  renderCreated(): JSX.Element | void {
    const { isUpdate } = this.state
    return (
      <div className={styles.tagNew}>
        <div className={styles.title}>
          <h3>添加标签</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <p>标签名</p>
            <FancyInput ref={this.inputName} tip={'标签标题'} />
          </div>
          <div className={styles.field}>
            <p>slug</p>
            <FancyInput ref={this.inputSlug} tip={'标签slug'} />
          </div>
          <div className={styles.field}>
            <p>描述</p>
            <FancyTextarea ref={this.inputDescription} tip={'标签描述'} />
          </div>
          <div className={styles.field}>
            <Button
              variant="primary"
              onClick={this.handleCreate.bind(this)}
            >
              { isUpdate ? '更新标签' : '创建标签' }
            </Button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { showModal, show, type, content } = this.state
    return (
      <div className={styles.tag}>
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
        <div className={styles.module}>
          {this.renderCreated()}
          {this.renderList()}
        </div>
      </div>
    )
  }
}
