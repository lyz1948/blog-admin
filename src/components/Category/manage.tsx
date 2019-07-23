import * as React from 'react'
import * as styles from './style.css'
import { CategoryModel } from '@app/store/models'
import { CategoryActions } from '@app/store/actions'

export namespace CategoryManage {
  export interface IProps {
    categories: CategoryModel[]
    getCategory: typeof CategoryActions.getCategory
    // addCategory: typeof CategoryActions.addCategory
    deleteCategory: typeof CategoryActions.deleteCategory
    editCategory: typeof CategoryActions.editCategory
  }
}

export class CategoryManageComp extends React.Component<CategoryManage.IProps> {
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
    console.log('categories', categories)
    return (
    <div className={styles.module}>
      { categories.map((cat, idx) => (
        <div key={idx}>
          <div onClick={(e: any) => this.handleDelete(cat._id, e)}>{cat.name}</div>
          <div onClick={(e: any) => this.handleEditor(cat._id, e)}>{cat.description}</div>
        </div>
      ))}
    </div>)
  }
}
