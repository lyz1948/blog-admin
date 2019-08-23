import * as React from 'react'
import * as styles from './style.css'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import ContentEditable from 'react-contenteditable'
import { Form, Button } from 'react-bootstrap'
import { Notication } from '../index'
import { ArticleActions, CategoryActions, TagActions } from '@app/store/actions'
import { CategoryModel, TagModel, ArticleModel } from '@app/store/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faItalic,
  faHeading,
  faQuoteLeft,
  faListUl,
  faListOl,
  faLink,
  faImage,
  faInbox,
} from '@fortawesome/free-solid-svg-icons'

export enum IStatePublic {
  Password = 0, // 密码访问
  Public = 1, // 公开
  Secret = -1, // 隐藏
}

const STATE_VALUE = [
  { text: '密码访问', id: IStatePublic.Password },
  { text: '公开', id: IStatePublic.Public },
  { text: '私密', id: IStatePublic.Secret },
]

const PUBLISH_VALUE = [
  { text: '原创', id: 0 },
  { text: '转载', id: 1 },
  { text: '混合', id: -1 },
]

export namespace ArticleAdd {
  export interface IProps {
    tags: TagModel[]
    categories: CategoryModel[]
    getTag: typeof TagActions.getTag
    getCategory: typeof CategoryActions.getCategory
    addArticle: typeof ArticleActions.addArticle
    uploadThumb: typeof ArticleActions.uplodThumb
    selectTag: typeof TagActions.selectTag
    selectCategory: typeof CategoryActions.selectCategory
  }

  export interface IState {
    Public?: string
    Password?: string
    Secret?: string
    postContent?: string
    radioPublic?: number
    radioPublish?: number
    checkedValues?: string[]
    checkedTagValues?: string[]
    thumburl?: string
    show: boolean
    type: string
    content: string
    [propName: string]: any
  }

  export interface INotice {
    type: string
    content: string
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

export class ArticleAddComp extends React.Component<
  ArticleAdd.IProps,
  ArticleAdd.IState,
  ArticleAdd.INotice
> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputKeyword = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()
  private inputCategory = React.createRef<HTMLInputElement>()
  private inputTag = React.createRef<HTMLInputElement>()

  constructor(props: ArticleAdd.IProps, context?: any) {
    super(props, context)
    this.state = {
      postContent: '# h1 title',
      radioPublic: 0,
      radioPublish: 0,
      checkedValues: [], // 选择的分类
      checkedTagValues: [], // 选择的tag
      thumburl: '',
      show: false,
      type: 'info',
      content: '添加成功',
      formData: {},
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseTag = this.chooseTag.bind(this)
    this.processPost = this.processPost.bind(this)
    this.changeTag = this.changeTag.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeStateRadio = this.changeStateRadio.bind(this)
    this.changePublishRadio = this.changePublishRadio.bind(this)
  }

  componentWillMount() {
    this.props.getTag()
    this.props.getCategory()
  }

  chooseTag(tag: any): void {
    console.log('click tag', tag)
    tag.isSelected = !tag.isSelected
  }

  processPost(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      postContent: event.target.value,
    })
  }

  handleChange(event: any) {}

  changeStateRadio(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      radioPublic: Number(event.target.value),
    })
  }

  changePublishRadio(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      radioPublish: Number(event.target.value),
    })
  }

  changeTag(tag: any, event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    const { checkedTagValues } = this.state

    if (
      checked &&
      checkedTagValues!.filter((item: any) => item._id !== tag._id)
    ) {
      checkedTagValues!.push(tag)
    }
    this.setState(() => {
      let temp = checkedTagValues!.filter((item: any) => item._id !== tag._id)
      return { checkedTagValues: temp }
    })
    this.setState({
      checkedTagValues,
    })
    this.props.selectTag({ _id: tag._id })
  }

  changeCategory(cate: any, event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    const { checkedValues } = this.state

    if (
      checked &&
      checkedValues!.filter((item: any) => item._id !== cate._id)
    ) {
      checkedValues!.push(cate)
    }
    this.setState(() => {
      let temp = checkedValues!.filter((item: any) => item._id !== cate._id)
      return { checkedValues: temp }
    })
    this.setState({
      checkedValues,
    })
    this.props.selectCategory({ _id: cate._id })
  }

  async changeFile(event: React.ChangeEvent<HTMLInputElement>) {
    const fd = new FormData()
    const fileEl = document.getElementById('file') as HTMLInputElement

    if (fileEl.files) {
      const thumburl = URL.createObjectURL(fileEl.files[0])

      fd.append('image', fileEl.files[0])
      this.setState({
        thumburl,
        formData: fd,
      })
      this.props.uploadThumb(fd)
    }
  }

  handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const title = this.inputTitle.current!.value
    const content = this.state.postContent!
    const description = this.inputDescription.current!.value
    const slug = this.inputSlug.current!.value
    const { thumburl } = this.state
    const { radioPublic, radioPublish, checkedValues, checkedTagValues } = this.state

    if (!title) {
      this.showNotice({ type: 'warn', content: '标题不能为空！' })
      return
    }
    if (!content) {
      this.showNotice({ type: 'warn', content: '内容不能为空！' })
      return
    }
    if (!description) {
      this.showNotice({ type: 'warn', content: '描述不能为空！' })
      return
    }
    if (!slug) {
      this.showNotice({ type: 'warn', content: 'slug不能为空！' })
      return
    }
    if (!thumburl) {
      this.showNotice({ type: 'warn', content: '文章缩略图不能为空！' })
      return
    }
    if (!checkedValues || checkedValues!.length <= 0) {
      this.showNotice({ type: 'warn', content: '请选择分类！' })
      return
    }

    const article: ArticleModel = {
      title: this.inputTitle.current!.value,
      content: this.state.postContent!,
      description: this.inputDescription.current!.value,
      slug: this.inputSlug.current!.value,
      tag: [...checkedTagValues!],
      category: [...checkedValues!],
      keywords: [...this.inputKeyword.current!.value.split(',')],
      public: Number(radioPublish),
      origin: Number(radioPublish),
      state: Number(radioPublic),
      author: 'admin',
      password: '',
      extends: [],
      thumb: thumburl,
    }
    // this.props.uploadThumb(this.state.formData)
    this.props.addArticle(article)
    this.showNotice({ type: 'success', content: '添加成功！' })
  }

  showNotice(obj: ArticleAdd.INotice) {
    const { type, content } = obj
    this.setState({
      show: true,
      type,
      content,
    })
  }

  renderThumb(): JSX.Element | void {
    const { thumburl } = this.state
    return thumburl ? (
      <div className={styles.thumb}>
        <img src={thumburl} alt="缩略图" />
      </div>
    ) : (
      <div className={styles.thumb}>
        <FontAwesomeIcon icon={faInbox} />
      </div>
    )
  }

  renderMdEditor(): JSX.Element | void {
    return (
      <ContentEditable
        innerRef={React.createRef()}
        html={this.state.postContent!}
        disabled={false}
        onChange={this.handleChange}
        tagName="article"
      />
    )
  }

  renderMdView(): JSX.Element | void {
    return (
      <div className={styles.markdownPreview}>
        <ReactMarkdown source={this.state.postContent} />
      </div>
    )
  }

  renderMain(): JSX.Element | void {
    // const tagType = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
    const { show, type, content } = this.state
    return (
      <div className={styles.articleMain}>
        <Notication
          show={show}
          type={type}
          content={content}
          onClose={() => {
            this.setState({ show: false })
          }}
          autohide
        />

        <div className={styles.title}>
          <h3>记录生活-发布文章</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.field}>
            <p>文章标题</p>
            <FancyInput ref={this.inputTitle} tip={'文章标题'} />
          </div>
          <div className={styles.field}>
            <p>文章关键字</p>
            <FancyInput ref={this.inputKeyword} tip={'文章关键字'} />
          </div>
          <div className={styles.field}>
            <p>文章slug</p>
            <FancyInput ref={this.inputSlug} tip={'文章slug'} />
          </div>
          <div className={styles.field}>
            <p>文章描述</p>
            <FancyTextarea ref={this.inputDescription} tip={'文章描述'} />
          </div>

          <div className={styles.field}>
            <p>文章编辑</p>
            <div className={styles.markdownBar}>
              <a title="blod">
                <FontAwesomeIcon icon={faBold} />
              </a>
              <a title="italic">
                <FontAwesomeIcon icon={faItalic} />
              </a>
              <a title="heading">
                <FontAwesomeIcon icon={faHeading} />
              </a>
              <i className={styles.separator}>|</i>
              <a title="Quote">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </a>
              <a title="eneric List">
                <FontAwesomeIcon icon={faListUl} />
              </a>
              <a title="Numbered List">
                <FontAwesomeIcon icon={faListOl} />
              </a>
              <i className={styles.separator}>|</i>
              <a title="Create Link">
                <FontAwesomeIcon icon={faLink} />
              </a>
              <a title="Insert Image">
                <FontAwesomeIcon icon={faImage} />
              </a>
            </div>

            <div className={styles.markdownBox}>
              <div className={styles.markdowInput}>
                <Form.Control
                  as="textarea"
                  rows="10"
                  className={styles.formControl}
                  placeholder="文章内容"
                  value={this.state.postContent}
                  onChange={(e: any) => this.processPost(e)}
                />
              </div>
              {this.renderMdView()}
            </div>
          </div>
          <div className={styles.field}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              onClick={(e: any) => this.handleSubmit(e)}
            >
              创建文章
            </Button>
          </div>
        </div>
      </div>
    )
  }

  renderSide(): JSX.Element | void {
    const { categories } = this.props
    const { tags } = this.props

    return (
      <div className={styles.articleSide}>
        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章分类</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <div className={styles.inputWrap}>
                {categories.map((cate: any, index: number) => (
                  <div
                    className={classNames({
                      [styles.labelBox]: true,
                      [styles.info]: cate.isSelected,
                    })}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      id={cate._id}
                      name={cate.name}
                      onChange={(e: any) => this.changeCategory(cate, e)}
                      ref={this.inputCategory}
                    />
                    <label className={styles.labelName} htmlFor={cate._id}>
                      {cate.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章状态</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <p>访问状态 </p>
              <div className={styles.inputWrap}>
                {STATE_VALUE.map((type, idx) => (
                  <div className={styles.radioBox} key={idx}>
                    <input
                      type="radio"
                      id={type.text}
                      value={type.id}
                      name="formstate"
                      checked={this.state.radioPublic === type.id}
                      onChange={(e: any) => this.changeStateRadio(e)}
                    />
                    <label htmlFor={type.text}>{type.text}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.field}>
              <p>发布状态</p>
              <div className={styles.inputWrap}>
                {PUBLISH_VALUE.map((type, idx) => (
                  <div className={styles.radioBox} key={idx}>
                    <input
                      type="radio"
                      id={type.text}
                      value={type.id}
                      name="formpublish"
                      checked={this.state.radioPublish === type.id}
                      onChange={(e: any) => this.changePublishRadio(e)}
                    />
                    <label htmlFor={type.text}>{type.text}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章标签</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.inputWrap}>
              {tags.map((tag: any, index: number) => (
                <div
                  className={classNames({
                    [styles.labelBox]: true,
                    [styles.info]: tag.isSelected,
                  })}
                  key={index}
                >
                  <input
                    type="checkbox"
                    id={tag._id}
                    name={tag.name}
                    onChange={(e: any) => this.changeTag(tag, e)}
                    ref={this.inputTag}
                  />
                  <label className={styles.labelName} htmlFor={tag._id}>
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章缩略图</h3>
          </div>
          <div className={styles.content}>
            <div className={styles.inputWrap}>
              <input
                type="file"
                id="file"
                onChange={this.changeFile.bind(this)}
              />
            </div>
            {this.renderThumb()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.module}>
        {this.renderMain()}
        {this.renderSide()}
      </div>
    )
  }
}
