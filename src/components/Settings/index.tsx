import * as React from 'react'
// import * as styles from './style.css'
// import { Table, Button } from 'react-bootstrap'
// import { Notication, ConfirmModal, FancyInput, FancyTextarea } from '../index'
import { INotice } from '@app/interfaces/notication'
export namespace TagComp {
  export interface IProps {

  }

  export interface IState {
    showModal: boolean
    showNotice: boolean
    type: string
    content: string
  }
}

export class Settings extends React.Component<
  TagComp.IProps,
  TagComp.IState
> {
  private inputName = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: TagComp.IProps, context?: any) {
    super(props, context)

    this.state = {
      showNotice: false,
      showModal: false,
      type: 'info',
      content: '添加成功',
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentWillMount() {
  }

  openModal(id: string) {
    this.setState({
      showModal: true,
    })
  }

  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      showNotice: true,
      type,
      content,
    })
  }

  handleEdit(tag: any, e: React.MouseEvent<HTMLButtonElement>) {
    
  }

  handleDelete() {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleCreate() {
    // let name = this.inputName.current!.value
    // let slug = this.inputSlug.current!.value
    // let description = this.inputDescription.current!.value

    // if(!name) {
    //   this.showNotice({ type: 'warn', content: '标题不能为空！' })
    //   return
    // }

    // if(!slug) {
    //   this.showNotice({ type: 'warn', content: 'slug不能为空！' })
    //   return
    // }

    // if(!description) {
    //   this.showNotice({ type: 'warn', content: '描述不能为空！' })
    //   return
    // }
    
    // this.handleResize()
  }
  // 重置
  handleResize() {
    this.inputName.current!.value = ''
    this.inputSlug.current!.value = ''
    this.inputDescription.current!.value = ''
  }

  render() {
    return (
      <div className="module">
        <div className="site flex60">
          <div className="title">
            <h3>全局设置</h3>
          </div>
          <div className="content">
            全局设置
          </div>
        </div>
        <div className="user flex40 pdl20">
          <div className="title">
            <h3>用户设置</h3>
          </div>
          <div className="content">
            用户设置
          </div>
        </div>
      </div>
    )
  }
}
