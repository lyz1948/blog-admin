import *  as React from 'react'
import { TagModel } from '@app/store/models'
import { TagActions } from '@app/store/actions'

export namespace Tag {
  export interface IProps {
    tags: TagModel
    actions: TagActions
  }
}

export class TagComp extends React.Component<Tag.IProps> {
  constructor(props: Tag.IProps, context?: any) {
    super(props, context)
  }

  render() {
    return (
      <div className="tag">Tags</div>
    )
  }
}
