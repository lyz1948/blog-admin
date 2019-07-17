import * as React from 'react'
import * as styles from './style.css'
// import ReactMarkdown from 'react-markdown'
import { Form, Badge } from 'react-bootstrap'

export class ArticleAddComp extends React.Component {
  renderMain(): JSX.Element | void {
    return (
      <div className={styles.articleMain}>
        <div className={styles.title}>
          <h3>记录生活-发布文章</h3>
        </div>
        <div className={styles.content}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>文章标题</Form.Label>
            <Form.Control type="text" placeholder="文章标题" />
          </Form.Group>
          <Form.Group>
            <Form.Label>文章关键字</Form.Label>
            <Form.Control type="text" placeholder="文章关键字" />
          </Form.Group>
          <Form.Group>
            <Form.Label>文章描述</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="文章描述" />
          </Form.Group>

          <div className={styles.tags}>
            <h5>标签</h5>
            <h5>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="light">Light</Badge>
              <Badge variant="dark">Dark</Badge>
            </h5>
          </div>
        </div>
      </div>
    )
  }

  renderSide(): JSX.Element | void {
    return (
      <div className={styles.articleSide}>
        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章分类</h3>
          </div>
          <div className={styles.content}>这里是文章分类</div>
        </div>
        <div className={styles.sideBox}>
          <div className={styles.title}>
            <h3>文章状态</h3>
          </div>
          <div className={styles.content}>这里是文章发布状态</div>
        </div>
      </div>
    )
  }

  render() {
    // const input = '# This is a header\n\nAnd this is a paragraph'
    // return (<ReactMarkdown source={input} />)
    return (
      <div className={styles.module}>
        {this.renderMain()}
        {this.renderSide()}
      </div>
    )
  }
}
