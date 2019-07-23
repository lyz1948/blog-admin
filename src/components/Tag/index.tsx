import *  as React from 'react'
import { TagModel } from '@app/store/models'

export namespace Tag {
  export interface IProps {
    tags: TagModel[]
  }
}

export class TagComp extends React.Component<Tag.IProps> {
  constructor(props: Tag.IProps, context?: any) {
    super(props, context)
  }

  render() {
    const { tags } = this.props
    return (
      <div className="tag">
        { tags.map(tag => (
          <div key={tag._id}>{tag.name}</div>
        ))}
      </div>
    )
  }
}
