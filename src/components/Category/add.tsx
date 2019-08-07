import * as React from 'react'
import * as styles from './style.css'

export namespace CategoryAdd {
  export interface IProps {

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

export class CategoryAddComp extends React.Component<CategoryAdd.IProps> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputKeyword = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: CategoryAdd.IProps, context?: any) {
    super(props, context)
  }

  render() {
    return (<div className={styles.module}>
      <div className={styles.main}>
        <div className={styles.title}>
          <h3>添加分类</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <p>分类标题</p>
            <FancyInput ref={this.inputTitle} tip={'分类标题'} />
          </div>
          <div className={styles.field}>
            <p>分类关键字</p>
            <FancyInput ref={this.inputKeyword} tip={'分类关键字'} />
          </div>
          <div className={styles.field}>
            <p>分类slug</p>
            <FancyInput ref={this.inputSlug} tip={'分类slug'} />
          </div>
          <div className={styles.field}>
            <p>分类描述</p>
            <FancyTextarea ref={this.inputDescription} tip={'分类描述'} />
          </div>
        </div>
      </div>
    </div>)
  }
}
