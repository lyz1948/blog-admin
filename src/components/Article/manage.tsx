import * as React from 'react'
import * as styles from './style.css'
import { ArticleModel, TagModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { ConfirmModal } from '../index'

export namespace Article {
  export interface IProps {
    tags: TagModel[]
    articles: ArticleModel[]
    getArticle: typeof ArticleActions.getArticle
    deleteArticle: typeof ArticleActions.deleteArticle
    editArticle: typeof ArticleActions.editArticle
  }

  export interface IState {
    showModal: boolean
    articleId: string
  }
}

export class ArticleComp extends React.Component<Article.IProps, Article.IState> {
  constructor(props: Article.IProps, context?: any) {
    super(props, context)

    this.state = {
      showModal: false,
      articleId: '',
    }
    this.getArticles = this.getArticles.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillMount() {
    this.getArticles()
  }

  getArticles() {
    this.props.getArticle()
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

  handleUpdate() {

  }

  render() {
    const { articles } = this.props
    const { showModal } = this.state
    const artHeads = ['标题', '内容', '描述', '关键字', '类型', '时间', '操作']
    if (articles.length === 0) {
      return <div className="pos-center">暂无数据</div>
    }

    return (
      <div className={styles.module}>
        <ConfirmModal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
          onClose={(e: any) => this.handleDelete(e)}
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {artHeads.map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((it: any, index: number) => (
              <tr key={index}>
                <td>{it.title}</td>
                <td>{it.content.substring(20)}</td>
                <td>{it.description}</td>
                <td>{it.keywords.join(' ')}</td>
                <td>
                  {it.origin === 1 ? '原创' : it.origin === 0 ? '转载' : '混合'}
                </td>
                <td>{it.create_at}</td>
                <td>
                  <a href={'http://localhost:3000/article/' + it._id} target="_blank">
                    <Button size="sm" variant="info" style={{marginRight: '5px'}}>
                    查看
                    </Button>
                  </a>
                  <Button size="sm" variant="primary" style={{marginRight: '5px'}} onClick={this.handleUpdate}>修改</Button>
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
