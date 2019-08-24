import * as React from 'react'
import * as styles from './style.css'
import { TagModel } from '@app/store/models'
import { TagActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { ConfirmModal } from '../index'

export namespace TagManage {
  export interface IProps {
    tags: TagModel[]
    getTag: typeof TagActions.getTag
    addTag: typeof TagActions.addTag
    deleteTag: typeof TagActions.deleteTag
    onClickFilter: () => void
  }

  export interface IState {
    showModal: boolean
    tagId: string
  }
}

const FancyInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      type="text"
      ref={ref}
      className="formInput"
      placeholder={props.tip}
    />
  )
})

const FancyTextarea = React.forwardRef((props: any, ref: any) => {
  return (
    <textarea
      ref={ref}
      className="formTextarea"
      placeholder={props.tip}
    />
  )
})

export class Tag extends React.Component<
  TagManage.IProps,
  TagManage.IState
> {
  private inputName = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: TagManage.IProps, context?: any) {
    super(props, context)

    this.state = {
      tagId: '',
      showModal: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    // this.handleEditor = this.handleEditor.bind(this)
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

  handleDelete() {
    this.props.deleteTag(this.state.tagId)
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleNewTag(event: React.ChangeEvent<HTMLButtonElement>) {
    const tagObj = {
      name: this.inputName.current!.value,
      slug: this.inputSlug.current!.value,
      description: this.inputDescription.current!.value,
      extends: [],
    }
    this.props.addTag(tagObj)

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
                      variant="info"
                      style={{ marginRight: '5px' }}
                    >
                      查看
                    </Button>
                    <a href={`/#TAG_ADD?id=${it._id}`}>
                      <Button
                        size="sm"
                        variant="primary"
                        style={{ marginRight: '5px' }}
                      >
                        修改
                      </Button>
                    </a>
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
              onClick={(e: any) => this.handleNewTag(e)}
            >
              创建
            </Button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { showModal } = this.state
    return (
      <div className={styles.tag}>
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
