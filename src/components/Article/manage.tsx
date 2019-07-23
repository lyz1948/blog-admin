import * as React from 'react'
import * as styles from './style.css'
import { ArticleModel } from '@app/store/models'
import { ArticleActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'

export namespace Article {
  export interface IProps {
    articles: ArticleModel[]
    getArticle: typeof ArticleActions.getArticle
    deleteArticle: typeof ArticleActions.deleteArticle
    editArticle: typeof ArticleActions.editArticle
  }
}

export class ArticleComp extends React.Component<Article.IProps> {
  constructor(props: Article.IProps, context?: any) {
    super(props, context)
    this.getArticles = this.getArticles.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillMount() {
    this.getArticles()
  }

  getArticles() {
    this.props.getArticle()
  }

  handleDelete(id: string, event: React.MouseEvent<HTMLButtonElement>) {
    this.props.deleteArticle(id)
  }

  handleUpdate() {

  }

  render() {
    const { articles } = this.props
    const artHeads = ['标题', '内容', '描述', '关键字', '类型', '时间', '操作']
    if (articles.length === 0) {
      return <div>暂无数据</div>
    }
    return (
      <div className={styles.module}>
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
                  <Button size="sm" variant="info" style={{marginRight: '5px'}}>查看</Button>
                  <Button size="sm" variant="primary" style={{marginRight: '5px'}} onClick={this.handleUpdate}>修改</Button>
                  <Button size="sm" variant="danger" onClick={(e: any) => this.handleDelete(it._id, e)}>删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
