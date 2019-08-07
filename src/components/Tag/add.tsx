import * as React from 'react'
import * as styles from './style.css'

export namespace TagAdd {
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

export class TagAddComp extends React.Component<TagAdd.IProps> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputKeyword = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: TagAdd.IProps, context?: any) {
    super(props, context)
  }

  render() {
    return (<div className={styles.module}>
      <div className={styles.main}>
        <div className={styles.title}>
          <h3>添加标签</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <p>标签名</p>
            <FancyInput ref={this.inputTitle} tip={'标签标题'} />
          </div>
          <div className={styles.field}>
            <p>关键字</p>
            <FancyInput ref={this.inputKeyword} tip={'标签关键字'} />
          </div>
          <div className={styles.field}>
            <p>slug</p>
            <FancyInput ref={this.inputSlug} tip={'标签slug'} />
          </div>
          <div className={styles.field}>
            <p>描述</p>
            <FancyTextarea ref={this.inputDescription} tip={'标签描述'} />
          </div>
        </div>
      </div>
    </div>)
  }
}
