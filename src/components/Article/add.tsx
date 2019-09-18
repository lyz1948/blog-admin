import * as React from 'react'
import * as styles from './style.css'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import ContentEditable from 'react-contenteditable'
import { Form, Button } from 'react-bootstrap'
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
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  ArticleActions,
  CategoryActions,
  TagActions,
} from '../../store/actions'
import { CategoryModel, TagModel, ArticleModel } from '../../store/models'
import { Notication, FancyInput, FancyTextarea } from '../index'
import { INotice } from '../../interfaces/notice'

const STATE_VALUE = [
  { text: '公开', id: ArticleModel.EStatePublic.Public },
  { text: '密码访问', id: ArticleModel.EStatePublic.Password },
  { text: '私密', id: ArticleModel.EStatePublic.Secret },
]

const PUBLISH_VALUE = [
  { text: '原创', id: ArticleModel.EStateOrigin.Original },
  { text: '转载', id: ArticleModel.EStateOrigin.Reprint },
  { text: '混合', id: ArticleModel.EStateOrigin.Hybrid },
]

export namespace ArticleAdd {
  export interface IProps {
    article: ArticleModel
    tags: TagModel[]
    categories: CategoryModel[]
    getArticle: typeof ArticleActions.getArticle
    addArticle: typeof ArticleActions.addArticle
    updateArticle: typeof ArticleActions.updateArticle
    uploadThumb: typeof ArticleActions.uplodThumb
    selectTag: typeof TagActions.selectTag
    selectCategory: typeof CategoryActions.selectCategory
  }

  export interface IState {
    isUpdate?: boolean
    postContent?: string
    radioPublic?: number
    radioPublish?: number
    checkedValues?: string[]
    checkedTagValues?: string[]
    thumb?: string
    show: boolean
    type: string
    content: string
    [propName: string]: any
  }
}

export class ArticleAdd extends React.Component<
  ArticleAdd.IProps,
  ArticleAdd.IState
> {
  private inputTitle = React.createRef<HTMLInputElement>()
  private inputKeyword = React.createRef<HTMLInputElement>()
  private inputPassword = React.createRef<HTMLInputElement>()
  private inputDescription = React.createRef<HTMLInputElement>()
  private inputCategory = React.createRef<HTMLInputElement>()
  private inputTag = React.createRef<HTMLInputElement>()

  constructor(props: ArticleAdd.IProps, context?: any) {
    super(props, context)
    this.state = {
      isUpdate: false,
      postContent: '',
      radioPublic: 1,
      radioPublish: 0,
      checkedValues: [], // 选择的分类
      checkedTagValues: [], // 选择的tag
      thumb: '',
      show: false,
      type: 'info',
      content: '添加成功',
      formData: {},
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.processPost = this.processPost.bind(this)
    this.changeTag = this.changeTag.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
    this.changeStateRadio = this.changeStateRadio.bind(this)
    this.changePublishRadio = this.changePublishRadio.bind(this)
  }

  componentDidMount() {
    const hash = window.location.hash
    const id = hash.split('?')[1]

    if (id) {
      this._processArticle()
    }
  }

  _processArticle() {
    const { article, categories, tags } = this.props

    if (article) {
      const {
        title,
        keywords,
        description,
        content,
        thumb,
        state,
        category,
        tag,
      } = article
      this.inputTitle.current!.value = title
      this.inputKeyword.current!.value = keywords.join(' ')
      this.inputDescription.current!.value = description
      this.inputDescription.current!.value = description

      const cateList: any[] = []
      const tagList: any[] = []
      categories.forEach(it => {
        category.forEach((cate: any) => {
          if (cate._id === it._id) {
            cateList.push(it._id)
            this.props.selectCategory({ _id: it._id })
          }
        })
      })
      tags.forEach(it => {
        tag.forEach((t: any) => {
          if (t._id === it._id) {
            tagList.push(it._id)
            this.props.selectTag({ _id: t._id })
          }
        })
      })

      this.setState({
        thumb,
        isUpdate: true,
        postContent: content,
        radioPublish: state,
        checkedValues: cateList,
        checkedTagValues: tagList,
      })
    }
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
    let { checkedTagValues } = this.state
    if (
      checked &&
      checkedTagValues!.filter((item: any) => item._id !== tag._id)
    ) {
      checkedTagValues!.push(tag)
    } else {
      checkedTagValues = checkedTagValues!.filter(
        (item: any) => item._id !== tag._id,
      )
    }

    this.props.selectTag({ _id: tag._id })
  }

  changeCategory(cate: any, event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    let { checkedValues } = this.state

    if (checked && checkedValues!.filter((item: any) => item !== cate._id)) {
      checkedValues!.push(cate._id)
    } else {
      checkedValues = checkedValues!.filter((item: any) => item !== cate._id)
    }
    this.props.selectCategory({ _id: cate._id })
  }

  async changeFile(event: React.ChangeEvent<HTMLInputElement>) {
    const fd = new FormData()
    const fileEl = document.getElementById('file') as HTMLInputElement

    if (fileEl.files) {
      const thumb = URL.createObjectURL(fileEl.files[0])

      fd.append('image', fileEl.files[0])
      this.setState({
        thumb,
        formData: fd,
      })
      // const res = await this.props.uploadThumb(fd)
    }
  }

  async handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const title = this.inputTitle.current!.value
    const description = this.inputDescription.current!.value

    const {
      thumb,
      isUpdate,
      postContent,
      radioPublic,
      radioPublish,
      checkedValues,
      checkedTagValues,
    } = this.state

    if (!title) {
      this.showNotice({ type: 'warn', content: '标题不能为空！' })
      return
    }
    if (!postContent) {
      this.showNotice({ type: 'warn', content: '内容不能为空！' })
      return
    }
    if (!description) {
      this.showNotice({ type: 'warn', content: '描述不能为空！' })
      return
    }
    if (!thumb) {
      this.showNotice({ type: 'warn', content: '文章缩略图不能为空！' })
      return
    }
    if (!checkedValues || checkedValues!.length <= 0) {
      this.showNotice({ type: 'warn', content: '请选择分类！' })
      return
    }

    let password = ''
    if (radioPublic === 0) {
      if (!password || password === '') {
        this.showNotice({ type: 'warn', content: '请填写访问密码！' })
        return
      } else {
        if (this.inputPassword.current) {
          password = this.inputPassword.current!.value
        }
      }
    }

    const article: ArticleModel = {
      title: this.inputTitle.current!.value,
      content: this.state.postContent!,
      description: this.inputDescription.current!.value,
      tag: [...checkedTagValues!],
      category: [...checkedValues!],
      keywords: [...this.inputKeyword.current!.value.split(',')],
      public: Number(radioPublish),
      origin: Number(radioPublish),
      state: Number(radioPublic),
      author: 'admin',
      extends: [],
      password,
      thumb,
    }
    if (isUpdate) {
      // 更新
      const { _id } = this.props.article
      this.props.updateArticle(_id, article)
      this.showNotice({ type: 'success', content: '更新成功！' })
    } else {
      // 先上传缩略图
      const res = await this.props.uploadThumb(this.state.formData)
      if (res && res.payload && res.payload.result) {
        article.thumb = res.payload.result
        // 添加
        this.props.addArticle(article)
        this.showNotice({ type: 'success', content: '添加成功！' })
      }
    }
  }

  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      show: true,
      type,
      content,
    })
  }

  renderPassword() {
    const { radioPublic } = this.state
    if (radioPublic !== 0) {
      return null
    }
    return (
      <div className="mt10">
        <FancyInput ref={this.inputPassword} tip={'文章访问密码'} />
      </div>
    )
  }

  renderThumb(): JSX.Element | void {
    const { thumb } = this.state
    return thumb ? (
      <div className={styles.thumb}>
        <img src={thumb} alt="缩略图" />
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
    const { show, type, content, isUpdate } = this.state
    return (
      <div className="module flex70">
        <Notication
          show={show}
          type={type}
          content={content}
          onClose={() => {
            this.setState({ show: false })
          }}
          autohide
        />

        <div className="title">
          <h3>记录生活-发布文章</h3>
        </div>
        <div className="content">
          <div className="inputWrap">
            <span className="label">文章标题</span>
            <FancyInput ref={this.inputTitle} tip={'文章标题'} />
          </div>
          <div className="inputWrap">
            <span className="label">文章关键字</span>
            <FancyInput ref={this.inputKeyword} tip={'文章关键字'} />
          </div>
          <div className="inputWrap">
            <span className="label">文章描述</span>
            <FancyTextarea ref={this.inputDescription} tip={'文章描述'} />
          </div>

          <div className="inputWrap">
            <span className="label">文章编辑</span>
            <div className={styles.markdownWrap}>
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
                    className={styles.formTextarea}
                    placeholder="文章内容"
                    value={this.state.postContent}
                    onChange={(e: any) => this.processPost(e)}
                  />
                </div>
                {/* {this.renderMdView()} */}
              </div>
            </div>
          </div>
          <div className="inputWrap">
            <span className="label"></span>
            <Button
              type="submit"
              variant="primary"
              onClick={(e: any) => this.handleSubmit(e)}
            >
              {isUpdate ? '更新文章' : '创建文章'}
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
      <div className="module flex1 pdl0">
        <div className={styles.sideBox}>
          <div className="title">
            <h3>文章分类</h3>
          </div>
          <div className="content">
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

              <div className={styles.labelBox}>
                <input type="checkbox" id="newCategory" name="newCategory" />
                <label className={styles.labelName} htmlFor="newCategory">
                  <FontAwesomeIcon icon={faPlus} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideBox}>
          <div className="title">
            <h3>文章标签</h3>
          </div>
          <div className="content">
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

              <div className={styles.labelBox}>
                <input type="checkbox" id="newTag" name="newtag" />
                <label className={styles.labelName} htmlFor="newTag">
                  <FontAwesomeIcon icon={faPlus} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideBox}>
          <div className="title">
            <h3>文章状态</h3>
          </div>
          <div className="content">
            <p>访问状态 </p>
            <div className={styles.inputWrap}>
              {STATE_VALUE.map((type, idx) => (
                <div
                  className={classNames({
                    [styles.radioBox]: true,
                    [styles.info]: this.state.radioPublic === type.id,
                  })}
                  key={idx}
                >
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
            {this.renderPassword()}
            <p className="mt10">发布状态</p>
            <div className={styles.inputWrap}>
              {PUBLISH_VALUE.map((type, idx) => (
                <div
                  className={classNames({
                    [styles.radioBox]: true,
                    [styles.info]: this.state.radioPublish === type.id,
                  })}
                  key={idx}
                >
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

        <div className={styles.sideBox}>
          <div className="title">
            <h3>文章缩略图</h3>
          </div>
          <div className={classNames('content', styles.thumbBox)}>
            <input
              type="file"
              id="file"
              onChange={this.changeFile.bind(this)}
            />
            {this.renderThumb()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.articleAdd}>
        <div className="flex">
          {this.renderMain()}
          {this.renderSide()}
        </div>
      </div>
    )
  }
}
