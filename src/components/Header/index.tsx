import * as React from 'react'
import { TodoActions } from '../../store/actions/todos'
import { TodoTextInput } from '../TodoTextInput'

export namespace Header {
  export interface IProps {
    addTodo: typeof TodoActions.addTodo
  }
}

export class Header extends React.Component<Header.IProps> {
  constructor(props: Header.IProps, context?: any) {
    super(props, context)
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addTodo({ text })
    }
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="enter new todo!!"
        />
      </header>
    )
  }
}
