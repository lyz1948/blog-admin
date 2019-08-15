import * as React from 'react'
import * as styles from './style.css'
import { Button } from 'react-bootstrap'
// import Toast from 'react-bootstrap/Toast'
import { CategoryActions } from '@app/store/actions'
import { Notication } from '../index'

interface INotice {
  type: string
  content: string
}

export namespace CategoryAdd {
  export interface IProps {
    addCategory: typeof CategoryActions.addCategory
  }

  export interface IState {
    show: boolean
    type: string
    content: string
  }
}

// enum IType {
//   SUCCESS = 'success',
//   INFO = 'info',
//   WARN = 'warn',
//   ERROR = 'error',
// }

const FancyInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      type="text"
      ref={ref}
      className={styles.formInput}
      placeholder={props.tip}
    />
  )
})

const FancyTextarea = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      type="textarea"
      ref={ref}
      className={styles.formInput}
      placeholder={props.tip}
    />
  )
})

export class CategoryAddComp extends React.Component<CategoryAdd.IProps, CategoryAdd.IState> {
  private inputName = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: CategoryAdd.IProps, context?: any) {
    super(props, context)
    this.state = {
      show: false,
      type: 'info',
      content: '添加成功'
    }
    this.showNotice = this.showNotice.bind(this)
    this.hideNotice = this.hideNotice.bind(this)
    this.handleNewCate = this.handleNewCate.bind(this)
  }

  handleNewCate() {
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
      name: name,
      slug: slug,
      description: description,
      extends: []
    }

    if (name && slug && description) {
      this.props.addCategory(cateObj)
      this.showNotice({ type: 'success', content: '添加成功' })
      name = ''
      slug = ''
      description = ''
    }
  }
  
  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      show: true,
      type,
      content
    })
  }

  hideNotice() {
    this.setState({
      show: false
    })
  }

  render() {
    const { show, type, content } = this.state
    return (
      <div className={styles.module}>
        <Notication 
          show={show}
          type={type}
          content={content}
          onClose={() => { this.setState({ show: false })}}
          autohide
          />
        <div className={styles.main}>
          <div className={styles.title}>
            <h3>添加分类</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <p>分类标题</p>
              <FancyInput ref={this.inputName} tip={'分类标题'} />
            </div>
            <div className={styles.field}>
              <p>分类slug</p>
              <FancyInput ref={this.inputSlug} tip={'分类slug'} />
            </div>
            <div className={styles.field}>
              <p>分类描述</p>
              <FancyTextarea ref={this.inputDescription} tip={'分类描述'} />
            </div>
            <div className={styles.field}>
              <Button variant="primary" onClick={this.handleNewCate}>创建</Button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
