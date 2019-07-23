import * as React from 'react'
import * as styles from './style.css'
import { CategoryModel, TagModel } from '../../store/models'
import ReactMarkdown from 'react-markdown'
import ContentEditable from 'react-contenteditable'
import { Form, Badge } from 'react-bootstrap'
import { ArticleActions, CategoryActions, TagActions } from '@app/store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold, faItalic, faHeading, faQuoteLeft, faListUl, faListOl, faLink, faImage
} from '@fortawesome/free-solid-svg-icons'

const STATE_VALUE = [
  { text: '公开', id: 0 },
  { text: '密码访问', id: 1 },
  { text: '私密', id: -1 },
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
    postValue?: string
    contentEditable?: any
  }
}

export class ArticleAddComp extends React.Component<
  ArticleAdd.IProps,
  ArticleAdd.IState
> {
  constructor(props: ArticleAdd.IProps, context?: any) {
    super(props, context)
    this.state = {
      postValue: '# h1 title',
    }
    this.chooseTag = this.chooseTag.bind(this)
    this.processPost = this.processPost.bind(this)
  }

  componentWillMount() {
    this.props.getTag()
    this.props.getCategory()
  }

  chooseTag(name: TagModel, event: React.MouseEvent<HTMLButtonElement>) {}

  processPost(event: React.FocusEvent<HTMLInputElement>) {

    this.setState({
      postValue: event.target.value,
    })
  }

  handleChange(event: any) {
    console.log('event', event)
  };

  renderMdEditor(): JSX.Element | void {
    return (
      <ContentEditable innerRef={React.createRef()} html={this.state.postValue!} disabled={false} onChange={this.handleChange} tagName="article"/>
    )
  }

  renderMdView(): JSX.Element | void {
    return (
      <div className={styles.markdownPreview}>
        <ReactMarkdown source={this.state.postValue} />
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
          <Form.Group controlId="formBasicEmail">
            <Form.Label>文章标题</Form.Label>
            <Form.Control className={styles.formControl} type="text" placeholder="文章标题" />
          </Form.Group>
          <Form.Group>
            <Form.Label>文章关键字</Form.Label>
            <Form.Control className={styles.formControl} type="text" placeholder="文章关键字" />
          </Form.Group>
          <Form.Group>
            <Form.Label>文章描述</Form.Label>
            <Form.Control className={styles.formControl} as="textarea" rows="3" placeholder="文章描述" />
          </Form.Group>
          <Form.Group>
            <Form.Label>文章编辑</Form.Label>
            <div className={styles.markdownBar}>
              <a title="blod"><FontAwesomeIcon icon={faBold} /></a>
              <a title="italic"><FontAwesomeIcon icon={faItalic} /></a>
              <a title="heading"><FontAwesomeIcon icon={faHeading} /></a>
              <i className={styles.separator}>|</i>
              <a title="Quote"><FontAwesomeIcon icon={faQuoteLeft} /></a>
              <a title="eneric List"><FontAwesomeIcon icon={faListUl} /></a>
              <a title="Numbered List"><FontAwesomeIcon icon={faListOl} /></a>
              <i className={styles.separator}>|</i>
              <a title="Create Link"><FontAwesomeIcon icon={faLink} /></a>
              <a title="Insert Image"><FontAwesomeIcon icon={faImage} /></a>
            </div>
            <div className={styles.markdownBox}>
              <div className={styles.markdowInput}>
                <Form.Control
                  as="textarea"
                  rows="10"
                  className={styles.formControl}
                  placeholder="文章内容"
                  value={this.state.postValue}
                  onChange={(e: any) => this.processPost(e)}
                />
              </div>
              {this.renderMdView()}
            </div>
          </Form.Group>

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
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>归属分类</Form.Label>
              <div>
                {categories.map((cate: any) => (
                  <Form.Check
                    key={cate._id}
                    type="checkbox"
                    inline
                    label={cate.name}
                  />
                ))}
              </div>
            </Form.Group>
          </div>
        </div>
        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章状态</h3>
          </div>
          <div className={styles.content}>
            <Form>
              <Form.Group>
                <Form.Label>文章状态: </Form.Label>
                {STATE_VALUE.map((type, idx) => (
                  <Form.Check
                    key={idx}
                    type="radio"
                    inline
                    name="formstate"
                    id={String(type.id)}
                    label={type.text}
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>发布状态: </Form.Label>
                {PUBLISH_VALUE.map((type, idx) => (
                  <Form.Check
                    key={idx}
                    type="radio"
                    inline
                    name="formpublish"
                    id={String(type.id)}
                    label={type.text}
                  />
                ))}
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章标签</h3>
          </div>
          <div className={styles.content}>
            <h5>
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
            </h5>
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
