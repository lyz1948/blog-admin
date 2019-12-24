import * as React from 'react'
import * as styles from './style.css'
import {
  Table,
  Button,
  Image,
  Form,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTags,
  faFolder,
  faEdit,
  faTrash,
  faDesktop,
  faSatelliteDish,
} from '@fortawesome/free-solid-svg-icons'
import {
  ArticleModel,
  ArticleDataModel,
  TagDataModel,
  CategoryDataModel,
} from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { formatDate } from '@app/utils'
import {
  Notication,
  ConfirmModal,
  Paging,
  Search,
  Selector,
} from '@app/components'
import { INotice } from '@app/interfaces/notice'
import * as CONFIG from '@app/config'

const STATE_LIST = [
  { name: '访问权限', _id: '' },
  { name: '公开', _id: ArticleModel.EStatePublic.Public },
  { name: '密码', _id: ArticleModel.EStatePublic.Password },
  { name: '私密', _id: ArticleModel.EStatePublic.Secret },
]

const ORIGIN_LIST = [
  { name: '状态', _id: '' },
  { name: '原创', _id: ArticleModel.EStateOrigin.Original },
  { name: '转载', _id: ArticleModel.EStateOrigin.Reprint },
  { name: '混合', _id: ArticleModel.EStateOrigin.Hybrid },
]

const PUBLISH_LIST = [
  { name: '类型', _id: '' },
  { name: '发布', _id: ArticleModel.EStatePublish.Published },
  { name: '草稿', _id: ArticleModel.EStatePublish.Draft },
  { name: '撤回', _id: ArticleModel.EStatePublish.Recycle },
]

const artHeads = [
  'ID',
  '缩略图',
  '标题',
  '描述',
  '分类',
  '标签',
  '点赞',
  '围观',
  '评论',
  '访问',
  '类型',
  '状态',
  '时间',
  '操作',
]

export namespace Article {
  export interface IProps {
    tags: TagDataModel
    articles: ArticleDataModel
    categories: CategoryDataModel
    batchArticle: typeof ArticleActions.batchArticle
    deleteArticle: typeof ArticleActions.deleteArticle
    updateArticle: typeof ArticleActions.updateArticle
    editArticle: (_id: string) => void
  }

  export interface IState {
    showModal: boolean
    articleId: string
    keyword: string
    querys: any
    currentPage: number
    show: boolean
    type: string
    content: string
    checkedValues: string[]
    deleteType: string
  }
}

export class Article extends React.Component<Article.IProps, Article.IState> {
  constructor(props: Article.IProps, context?: any) {
    super(props, context)

    this.state = {
      showModal: false,
      articleId: '',
      keyword: '',
      querys: {},
      currentPage: 1,
      show: false,
      type: 'info',
      content: '添加成功',
      checkedValues: [],
      deleteType: 'single',
    }

    this.closeModal = this.closeModal.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this)
  }

  showNotice(obj: INotice) {
    const { type, content } = obj
    this.setState({
      show: true,
      type,
      content,
    })
  }

  openModal() {
    this.setState({
      showModal: true,
    })
  }

  closeModal() {
    this.setState({
      showModal: false,
      deleteType: 'single',
    })
  }

  // 删除
  handleConfirm() {
    const { deleteType } = this.state

    if (deleteType === 'single') {
      // 单个删除
      this.props.deleteArticle(this.state.articleId)
    }
    if (deleteType === 'batchPublish') {
      // 批量发布
      console.log('batch publish', this.state.checkedValues)
    }
    if (deleteType === 'batchDelete') {
      // 批量删除
      console.log('batch delete', this.state.checkedValues)
    }

    this.setState({
      showModal: false,
      deleteType: 'single',
    })
    // this.showNotice({ type: 'success', content: '删除成功！' })
  }

  // 更新
  handleUpdate(_id: string) {
    this.props.editArticle(_id)
  }

  // 预览
  handleView(_id: string) {
    window.open(`${CONFIG.APP.baseUrl}article/${_id}`)
  }

  // 发布
  handlePublish(article: ArticleModel) {
    const { _id } = article
    this.props.updateArticle(_id, article)
  }

  // 关键字输入
  keywordChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
    const keyword = event.target.value
    this.setState({ keyword })
  }

  // 关键字搜索
  handleKeywordSearch() {
    const { keyword, currentPage } = this.state
    this.props.batchArticle({ page: currentPage, keyword })
  }

  // 分页
  handlePagination(currentPage: number) {
    this.setState({
      currentPage,
    })
    this.props.batchArticle({ page: currentPage })
  }

  // 分类/tag/state/public 查询
  handleCategory(event: any, type: string) {
    const value = event.currentTarget.value
    const { keyword, currentPage, querys } = this.state

    querys['keyword'] = keyword
    querys['page'] = currentPage
    querys['isAuthenticated'] = true

    if (value !== '') {
      querys[type] = value
    } else {
      delete querys[type]
    }

    this.setState({
      querys,
    })

    this.props.batchArticle(querys)
  }

  // 复选框选择
  handleChecked(_id: any, event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    let { checkedValues } = this.state

    if (checked && checkedValues!.filter((item: any) => item !== _id)) {
      checkedValues!.push(_id)
    } else {
      checkedValues = checkedValues!.filter((item: any) => item !== _id)
    }
    console.log('checked', checkedValues)
    this.setState({ checkedValues })
  }

  // 单个删除
  handleDelete(id: string, event: React.ChangeEvent<HTMLButtonElement>) {
    this.openModal()

    this.setState({
      articleId: id,
    })
  }

  // 批量操作
  handleBatch(name: string, event: React.ChangeEvent<HTMLButtonElement>) {
    this.openModal()

    this.setState({
      deleteType: name,
    })
  }

  renderHeaderBar(): JSX.Element | void {
    const { categories, tags, articles } = this.props
    const { currentPage } = this.state
    const catSelectList = [{ _id: '', name: '分类不限' }, ...categories.data]
    const tagSelectList = [{ _id: '', name: '标签不限' }, ...tags.data]

    return (
      <div className="flex pdb10 pdt10">
        <div className="flex flex30">
          <Search
            placeholder="搜索关键字"
            handleChange={(name: string, val: any) =>
              this.keywordChange(name, val)
            }
            handleSearch={this.handleKeywordSearch}
          />
          <span className="mr10"></span>
          <DropdownButton
            id="dropdown-basic-button"
            variant="warning"
            title="批量操作">
            <Dropdown.Item
              onClick={(e: any) => this.handleBatch('batchPublish', e)}>
              发布
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e: any) => this.handleBatch('batchDelete', e)}>
              删除
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="flex flex1 flex-end">
          <div className={styles.filterBox}>
            <Selector
              list={catSelectList}
              onChange={(e: any) => this.handleCategory(e, 'category')}
            />
            <Selector
              list={tagSelectList}
              onChange={(e: any) => this.handleCategory(e, 'tag')}
            />
            <Selector
              list={STATE_LIST}
              onChange={(e: any) => this.handleCategory(e, 'state')}
            />
            <Selector
              list={ORIGIN_LIST}
              onChange={(e: any) => this.handleCategory(e, 'origin')}
            />
            <Selector
              list={PUBLISH_LIST}
              onChange={(e: any) => this.handleCategory(e, 'public')}
            />
          </div>
          <Paging
            total={articles.pagination && articles.pagination.total}
            active={currentPage}
            handlePage={this.handlePagination}
          />
        </div>
      </div>
    )
  }

  renderTableHeader(): JSX.Element | void {
    return (
      <thead>
        <tr>
          {artHeads.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
    )
  }

  renderTableBody(): JSX.Element | void {
    const { data } = this.props.articles
    if (!data || data.length === 0) {
      return (
        <tbody>
          <tr className="tac">
            <td colSpan={artHeads.length}>搜索不到任何相关的文章</td>
          </tr>
        </tbody>
      )
    }
    return (
      <tbody>
        {data.map((it: any) => (
          <tr key={it._id}>
            <td>
              <Form.Check
                type="checkbox"
                label={it.id}
                onChange={(e: any) => this.handleChecked(it._id, e)}
              />
            </td>
            <td className={styles.thumbnail}>
              <Image
                src={`${CONFIG.APP.baseUrl}${it.thumb}`}
                alt="用户头像"
                thumbnail
              />
            </td>
            <td>{it.title}</td>
            <td>{it.description}</td>
            <td>
              {it.category.length > 0 &&
                it.category.map((cate: any, idx: number) => (
                  <div key={cate._id}>
                    <FontAwesomeIcon
                      icon={faFolder}
                      size="1x"
                      color="#727374"
                    />
                    <span> {cate.name} </span>
                  </div>
                ))}
            </td>
            <td>
              {it.tag.length > 0 &&
                it.tag.map((it: any, idx: number) => (
                  <div key={it._id}>
                    <FontAwesomeIcon icon={faTags} size="1x" color="#727374" />
                    <span> {it.name} </span>
                  </div>
                ))}
            </td>
            <td>{it.meta.likes === 0 ? '无人鼓励' : it.meta.likes + '个赞'}</td>
            <td>{it.meta.views === 0 ? '无人围观' : it.meta.views + '围观'}</td>
            <td>
              {it.meta.comments === 0
                ? '无人说话'
                : it.meta.comments + '条评论'}
            </td>
            <td>
              {it.state === ArticleModel.EStatePublic.Public
                ? '公开'
                : it.state === ArticleModel.EStatePublic.Password
                ? '密码'
                : '私密'}
            </td>
            <td>
              {it.public === ArticleModel.EStatePublish.Draft
                ? '草稿'
                : it.public === ArticleModel.EStatePublish.Published
                ? '发布'
                : '回收'}
            </td>
            <td>
              {it.origin === ArticleModel.EStateOrigin.Original
                ? '原创'
                : it.origin === ArticleModel.EStateOrigin.Reprint
                ? '转载'
                : '混合'}
            </td>
            <td className={styles.dateTime}>{formatDate(it.create_at)}</td>
            <td className={styles.btnGroup}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => this.handleView(it._id)}>
                <FontAwesomeIcon
                  icon={faDesktop}
                  size="1x"
                  style={{ marginRight: '2px' }}
                />
                查看文章
              </Button>

              <Button
                size="sm"
                variant="info"
                onClick={() => this.handleUpdate(it._id)}>
                <FontAwesomeIcon
                  icon={faEdit}
                  size="1x"
                  style={{ marginRight: '2px' }}
                />
                修改文章
              </Button>

              {it.origin !== ArticleModel.EStateOrigin.Reprint ? (
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => this.handlePublish(it)}>
                  <FontAwesomeIcon
                    icon={faSatelliteDish}
                    size="1x"
                    style={{ marginRight: '2px' }}
                  />
                  发布文章
                </Button>
              ) : null}

              <Button
                size="sm"
                variant="warning"
                onClick={(e: any) => this.handleDelete(it._id, e)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="1x"
                  style={{ marginRight: '2px' }}
                />
                删除文章
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  renderArticleList(): JSX.Element | void {
    return (
      <div>
        <div className="title">
          <h3>文章列表</h3>
        </div>
        {this.renderHeaderBar()}
        <div className="flex1">
          <Table striped bordered hover variant="dark" className={styles.table}>
            {this.renderTableHeader()}
            {this.renderTableBody()}
          </Table>
        </div>
      </div>
    )
  }

  render() {
    const { showModal, show, type, content } = this.state
    return (
      <div className="module">
        <Notication
          show={show}
          type={type}
          content={content}
          onClose={() => {
            this.setState({ show: false })
          }}
          autohide
        />
        <ConfirmModal
          show={showModal}
          onHide={this.closeModal}
          onClose={this.handleConfirm}
        />
        {this.renderArticleList()}
      </div>
    )
  }
}
