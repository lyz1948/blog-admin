import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { omit } from '../utils'
import { RootState } from '../store/reducers'
import { TagActions } from '../store/actions'
import { Tag } from '../components'
import { TagModel } from '../store/models'

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
    return (<Tag
      tags={tags} 
      getTag={actions.getTag}
      onClickFilter={this.handleEdit}
      addTag={actions.addTag}
      deleteTag={actions.deleteTag}
    />)
  }
}
