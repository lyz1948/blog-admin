import * as React from 'react'
import * as styles from './style.css'
import { CategoryModel } from '@app/store/models'
import { CategoryActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'

export namespace CategoryManage {
  export interface IProps {
    categories: CategoryModel[]
    getCategory: typeof CategoryActions.getCategory
    deleteCategory: typeof CategoryActions.deleteCategory
    editCategory: typeof CategoryActions.editCategory
  }
}

export class CategoryComp extends React.Component<CategoryManage.IProps> {
  constructor(props: CategoryManage.IProps, context?: any) {
    super(props, context)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEditor = this.handleEditor.bind(this)
  }

  componentWillMount() {
    this.props.getCategory()
  }

  handleDelete(id: string, event: React.MouseEvent<HTMLButtonElement>) {
    this.props.deleteCategory(id)
  }

  handleEditor(id: any, event: React.MouseEvent<HTMLButtonElement>) {
    this.props.editCategory(id)
  }

  render() {
    const { categories } = this.props
    const tableHeads = ['标题', '描述', 'slug', '时间', '操作']
    return (
    <div className={styles.module}>
      <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {tableHeads.map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((it: any, index: number) => (
              <tr key={index}>
                <td>{it.name}</td>
                <td>{it.description}</td>
                <td>{it.slug}</td>
                <td>{it.update_at}</td>
                <td>
                  <Button size="sm" variant="info" style={{marginRight: '5px'}}>查看</Button>
                  <Button size="sm" variant="primary" style={{marginRight: '5px'}} onClick={(e: any) => this.handleEditor(it._id, e)}>修改</Button>
                  <Button size="sm" variant="danger" onClick={(e: any) => this.handleDelete(it._id, e)}>删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>)
  }
}
