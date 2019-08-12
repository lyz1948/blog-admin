import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { TagActions } from '../store/actions'
import { TagComp } from '../components'
import { TagModel } from '../store/models'
// import { TagAddApp } from './tagAdd'

export namespace Tag {
  export interface IProps extends RouteComponentProps<void> {
    tags: RootState.TagState
    actions: TagActions
    filter: TagModel.Filter
  }
}

@connect(
  (state: RootState, ownProps): Pick<Tag.IProps, 'tags'> => {
    return { tags: state.tags }
  },
  (dispatch: Dispatch): Pick<Tag.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(TagActions, 'Type'), dispatch),
  }),
)
export class TagApp extends React.Component<Tag.IProps> {
  static defaultProps: Partial<Tag.IProps> = {
    filter: TagModel.Filter.SHOW_ALL,
  }

  constructor(props: Tag.IProps, context?: any) {
    super(props, context)
    this.handleEdit = this.handleEdit.bind(this)
  }
  
  handleEdit(): void {
    this.props.history.push('#TAG_ADD')
  }

  render() {
    const { tags, actions } = this.props
    return (<TagComp
      tags={tags} 
      getTag={actions.getTag}
      onClickFilter={this.handleEdit}
      deleteTag={actions.deleteTag}
    />)
  }
}
