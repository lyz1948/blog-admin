import * as React from 'react'
import { ArticleModel, TagModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { ConfirmModal } from '../index'

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

  componentWillMount() {
    const { articles } = this.props
    if (articles.length < 2) {
      this.props.getArticleList()
    }
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
    const artHeads = ['标题', '内容', '描述', '关键字', '类型', '时间', '操作']
    
    if (articles.length === 0) {
      return <div className="pos-center">暂无数据</div>
    }

    return (
      <div className="module">
        <ConfirmModal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
          onClose={(e: any) => this.handleDelete(e)}
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {artHeads.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((it: any, index: number) => (
              <tr key={it._id}>
                <td>{it.title}</td>
                <td>{it.content.substring(20)}</td>
                <td>{it.description}</td>
                <td>{it.keywords.join(' ')}</td>
                <td>
                  {it.origin === 1 ? '原创' : it.origin === 0 ? '转载' : '混合'}
                </td>
                <td>{it.create_at}</td>
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
      </div>
    )
  }
}
