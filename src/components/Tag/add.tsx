import * as React from 'react'
import * as styles from './style.css'
import { Button } from 'react-bootstrap'
import { TagActions } from '@app/store/actions'

export namespace TagAdd {
  export interface IProps {
    addTag: typeof TagActions.addTag
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
  private inputName = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()

  constructor(props: TagAdd.IProps, context?: any) {
    super(props, context)
    this.handleNewTag = this.handleNewTag.bind(this)
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

  render() {
    return (
      <div className={styles.module}>
        <div className={styles.main}>
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
              <Button variant="primary" onClick={(e: any) => this.handleNewTag(e)}>创建</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
