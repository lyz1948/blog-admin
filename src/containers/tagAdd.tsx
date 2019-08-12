import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { TagActions } from '../store/actions'
import { TagAddComp } from '../components'
import { TagModel } from '../store/models'

export namespace Tag {
  export interface IProps extends RouteComponentProps<void> {
    categories: RootState.TagState
    actions: TagActions
    filter: TagModel.Filter
  }
}

@connect(
  (state: RootState): Pick<Tag.IProps, 'categories'> => {
    return { categories: state.categories }
  },
  (dispatch: Dispatch): Pick<Tag.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(TagActions, 'Type'), dispatch),
  }),
)
export class TagAddApp extends React.Component<Tag.IProps> {
  static defaultProps: Partial<Tag.IProps> = {
    filter: TagModel.Filter.SHOW_ALL,
  }

  constructor(props: Tag.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { actions } = this.props
    return <TagAddComp addTag={actions.addTag} />
  }
}
