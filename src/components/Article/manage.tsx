import * as React from 'react'
import { ArticleModel, TagModel } from '../../store/models'
import { ArticleActions } from '../../store/actions'
import { Table, Button, Image, Pagination } from 'react-bootstrap'
import { ConfirmModal } from '../index'
import { formatDate } from '../../utils'
import * as CONFIG from '../../config'

export namespace Article {
  export interface IProps {
    tags: TagModel[]
    articles: ArticleModel[]
    getArticleList: typeof ArticleActions.getArticleList
    deleteArticle: typeof ArticleActions.deleteArticle
    editArticle: (id: number) => void
  }

  export interface IState {
    showModal: boolean
    articleId: string
  }
}

export class Article extends React.Component<Article.IProps, Article.IState> {
  constructor(props: Article.IProps, context?: any) {
    super(props, context)

    this.state = {
      showModal: false,
      articleId: '',
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  openModal(id: string) {
    this.setState({
      articleId: id,
      showModal: true,
    })
  }
  
  handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    this.props.deleteArticle(this.state.articleId)
    this.setState({
      articleId: '',
      showModal: false,
    })
  }

  handleUpdate(id: number) {
    this.props.editArticle(id)
  }

  render() {
    const { articles } = this.props
    const { showModal } = this.state
    const artHeads = ['缩略图', '标题', '描述', '标签', '所属分类', '关键字', '类型', '时间', '操作']
    
    if (articles.length === 1) {
      return <div className="pos-center">暂无数据</div>
    }

    let active = 1;
    let items = [];
    for (let number = 1; number <= articles.length; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <div className="module">
        <ConfirmModal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
          onClose={(e: any) => this.handleDelete(e)}
        />
        <div className="flex1">
          <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {artHeads.map((header, i) => (
                <th key={i}>{header}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((it: any) => (
              <tr key={it._id}>
                <td className="thumb-box">
                  <Image src={CONFIG.APP.baseUrl + it.thumb} alt="用户头像" thumbnail />
                </td>
                <td>{it.title}</td>
                <td>{it.description}</td>
                <td>{it.tag.length > 0 && it.tag.join(',')}</td>
                <td>{it.category.length > 0 && it.category.reduce((acc: string, val: any) => (acc + val.name), '')}</td>
                <td>{it.keywords.join(' ')}</td>
                <td>
                  {it.origin === ArticleModel.EStateOrigin.Original ? '原创' : it.origin === ArticleModel.EStateOrigin.Reprint ? '转载' : '混合'}
                </td>
                <td>{formatDate(it.create_at)}</td>
                <td>
                  <Button 
                    size="sm" 
                    variant="info" 
                    style={{marginRight: '5px'}} 
                    onClick={() => this.handleUpdate(it.id)}>修改</Button>
                  <Button size="sm" variant="danger" onClick={() => this.openModal(it._id)}>删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Pagination className="flex-center">{items}</Pagination>       */}
        </div>
      </div>
    )
  }
}
