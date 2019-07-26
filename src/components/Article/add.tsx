import * as React from 'react'
import * as styles from './style.css'
import { CategoryModel, TagModel, ArticleModel } from '../../store/models'
import ReactMarkdown from 'react-markdown'
import ContentEditable from 'react-contenteditable'
import { Form, Badge, Button } from 'react-bootstrap'
import { ArticleActions, CategoryActions, TagActions } from '@app/store/actions'
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
    categories: CategoryModel[]
    tags: TagModel[]
    getCategory: typeof CategoryActions.getCategory
    getTag: typeof TagActions.getTag
    addArticle: typeof ArticleActions.addArticle
  }

  export interface IState {
    Public?: string
    Password?: string
    Secret?: string
    postContent?: string
    radioPublic?: number
    radioPublish?: number
    checkedValues?: string[]
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
  ArticleAdd.IState
> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputKeyword = React.createRef<HTMLInputElement>()
  private inputSlug = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()
  private inputCategory = React.createRef<HTMLInputElement>()

  constructor(props: ArticleAdd.IProps, context?: any) {
    super(props, context)
    this.state = {
      postContent: '# h1 title',
      radioPublic: 0,
      radioPublish: 0,
      checkedValues: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.chooseTag = this.chooseTag.bind(this)
    this.processPost = this.processPost.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    this.changeStateRadio = this.changeStateRadio.bind(this)
    this.changePublishRadio = this.changePublishRadio.bind(this)
  }

  componentWillMount() {
    this.props.getTag()
    this.props.getCategory()
  }

  chooseTag(name: TagModel, event: React.MouseEvent<HTMLButtonElement>) {}

  processPost(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({
      postContent: event.target.value,
    })
  }

  handleChange(event: any) {}

  handleCheckBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target

    const { checkedValues } = this.state
    if (checked && checkedValues!.indexOf(value) === -1) {
      checkedValues!.push(value)
    } else {
      checkedValues!.filter(item => item !== value)
    }
    this.setState({
      checkedValues,
    })
  }

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
  }

  handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const { radioPublic, radioPublish, checkedValues } = this.state
    const article: ArticleModel = {
      title: this.inputTitle.current!.value,
      content: this.state.postContent!,
      description: this.inputDescription.current!.value,
      slug: this.inputSlug.current!.value,
      tag: [],
      category: [...checkedValues!],
      keywords: [...this.inputKeyword.current!.value.split(',')],
      public: Number(radioPublish),
      origin: Number(radioPublish),
      state: Number(radioPublic),
      author: 'admin',
      password: '',
      extends: [],
      thumb: 'https://avatars1.githubusercontent.com/u/15190827?s=460&v=4',
    }
    this.props.addArticle(article)
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
    return (
      <div className={styles.articleMain}>
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
              <p>归属分类</p>
              <div className={styles.inputWrap}>
                {categories.map((cate: any, index: number) => (
                  <div className={styles.labelBox} key={index}>
                    <input
                      type="checkbox"
                      id={cate._id}
                      name={cate.name}
                      onChange={(e: any) => this.changeCategory(cate, e)}
                      ref={this.inputCategory}
                    />
                    <label htmlFor={cate._id}>{cate.name}</label>
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
                  <div className={styles.labelBox} key={idx}>
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
                  <div className={styles.labelBox} key={idx}>
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
              {tags.map((tag: any) => (
                <Badge
                  style={{ marginRight: '10px' }}
                  key={tag._id}
                  variant="primary"
                  onClick={(e: any) => this.chooseTag(tag.name, e)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
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
