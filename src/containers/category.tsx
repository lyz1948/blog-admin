import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { CategoryActions } from '../store/actions'
import { Category } from '../components'
import { CategoryModel } from '../store/models'

export namespace Category {
  export interface IProps extends RouteComponentProps<void> {
    categories: RootState.CategoryState
    actions: CategoryActions
    filter: CategoryModel.Filter
  }
}

@connect(
  (state: RootState): Pick<Category.IProps, 'categories'> => {
    return { categories: state.categories }
  },
  (dispatch: Dispatch): Pick<Category.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(CategoryActions, 'Type'), dispatch),
  }),
)
export class CategoryApp extends React.Component<Category.IProps> {
  static defaultProps: Partial<Category.IProps> = {
    filter: CategoryModel.Filter.SHOW_ALL,
  }

  constructor(props: Category.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { categories, actions } = this.props
    return (
    <Category
      categories={categories}
      getCategory={actions.getCategory}
      addCategory={actions.addCategory}
      deleteCategory={actions.deleteCategory}
      editCategory={actions.editCategory}
    />)
  }
}
