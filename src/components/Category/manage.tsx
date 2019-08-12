import * as React from 'react'
import * as styles from './style.css'
import { CategoryModel } from '@app/store/models'
import { CategoryActions } from '@app/store/actions'
import { Table, Button } from 'react-bootstrap'
import { ConfirmModal } from '../index'

export namespace CategoryManage {
  export interface IProps {
    categories: CategoryModel[]
    getCategory: typeof CategoryActions.getCategory
    deleteCategory: typeof CategoryActions.deleteCategory
    editCategory: typeof CategoryActions.editCategory
  }

  export interface IState {
    cateId: string
    showModal: boolean
  }
}

export class CategoryComp extends React.Component<CategoryManage.IProps, CategoryManage.IState> {
  constructor(props: CategoryManage.IProps, context?: any) {
    super(props, context)
    this.state = {
      cateId: '',
      showModal: false,
    }
    this.handleEditor = this.handleEditor.bind(this)
  }

  componentWillMount() {
    this.props.getCategory()
  }

  openModal(id: string) {
    this.setState({
      cateId: id,
      showModal: true,
    })
  }

  handleEditor(id: any) {
    this.props.editCategory(id)
  }

  render() {
    const { categories } = this.props
    const { showModal } = this.state
    const tableHeads = ['标题', '描述', 'slug', '时间', '操作']
    
    return (
    <div className={styles.module}>
      <ConfirmModal 
        show={showModal} 
        onHide={() => this.setState({ showModal: false })}
        onClose={() => {
          this.props.deleteCategory(this.state.cateId)
          this.setState({ showModal: false })
        }}
      />
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
                  <Button size="sm" variant="primary" style={{marginRight: '5px'}} onClick={() => this.handleEditor(it._id)}>修改</Button>
                  <Button size="sm" variant="danger" onClick={() => this.openModal(it._id)}>删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>)
  }
}
