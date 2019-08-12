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
    deleteTag: typeof TagActions.deleteTag
    // editTag: (id: any) => void
    onClickFilter: () => void
  }

  export interface IState {
    showModal: boolean
    tagId: string
  }
}

export class TagComp extends React.Component<TagManage.IProps, TagManage.IState> {
  constructor(props: TagManage.IProps, context?: any) {
    super(props, context)

    this.state = {
      tagId: '',
      showModal: false
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
      tagId: id
    })
  }
  
  handleDelete() {
    this.props.deleteTag(this.state.tagId)
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // handleEditor(id: any, event: React.MouseEvent<HTMLButtonElement>) {
  //   // this.props.editTag(id)
  // }

  render() {
    const { tags } = this.props
    const { showModal } = this.state
    const tableHeads = ['标题', '描述', 'slug', '时间', '操作']

    return (
    <div className={styles.module}>
      <ConfirmModal 
        show={showModal} 
        onHide={() => this.setState({ showModal: false })}
        onClose={() => {
          this.props.deleteTag(this.state.tagId)
          this.setState({ showModal: false })
        }}
      />
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
                  <Button size="sm" variant="info" style={{marginRight: '5px'}}>查看</Button>
                  <a href={`/#TAG_ADD?id=${it._id}`}>
                    <Button size="sm" variant="primary" style={{marginRight: '5px'}}>修改</Button>
                  </a>
                  <Button size="sm" variant="danger" onClick={() => this.openModal(it._id)}>删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>)
  }
}
