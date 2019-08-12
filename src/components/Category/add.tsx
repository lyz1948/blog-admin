import * as React from 'react'
import * as styles from './style.css'
import { Button } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import { CategoryActions } from '@app/store/actions'
// import { Notication } from '../index'

export namespace CategoryAdd {
  export interface IProps {
    addCategory: typeof CategoryActions.addCategory
  }
  export interface IState {
    show: boolean
  }
}

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
      show: true
    }
    this.hideNotice = this.hideNotice.bind(this)
    this.handleNewCate = this.handleNewCate.bind(this)
  }

  handleNewCate() {
    const cateObj = {
      name: this.inputName.current!.value,
      slug: this.inputSlug.current!.value,
      description: this.inputDescription.current!.value,
      extends: []
    }
    this.props.addCategory(cateObj)

    this.inputName.current!.value = ''
    this.inputSlug.current!.value = ''
    this.inputDescription.current!.value = ''
  }

  hideNotice() {
    this.setState({
      show: false
    })
    console.log('ada')
  }

  render() {
    const { show } = this.state
    return (
      <div className={styles.module}>
        <Toast transition={false} show={show} onClose={() => this.hideNotice()}>
          <Toast.Header>
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
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
