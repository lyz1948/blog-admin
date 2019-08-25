import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'
import { RootState } from '../store/reducers'
import { TagActions } from '../store/actions'
import { TagModel } from '../store/models'
import { omit } from '../utils'
import { Tag } from '../components'

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
  }

  render() {
    const { tags, actions } = this.props

    return (
    <Tag
      tags={tags} 
      getTag={actions.getTag}
      addTag={actions.addTag}
      updateTag={actions.updateTag}
      deleteTag={actions.deleteTag}
    />
    )
  }
}
