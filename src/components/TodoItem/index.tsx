import * as React from 'react'
import { TodoModel } from '@app/store/models'
import { TodoActions } from '@app/store/actions'
import { TodoTextInput } from '../TodoTextInput'
import classNames from 'classnames';
import * as styles from './style.css'

export namespace TodoItem {
  export interface IProps {
    todo: TodoModel
    editTodo: typeof TodoActions.editTodo
    deleteTodo: typeof TodoActions.deleteTodo
    completeTodo: typeof TodoActions.completeTodo
  }

  export interface IState {
    editing: boolean
  }
}

export class TodoItem extends React.Component<
  TodoItem.IProps,
  TodoItem.IState
> {
  constructor(props: TodoItem.IProps, context?: any) {
    super(props, context)
    this.state = { editing: false }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({ id, text })
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props
    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => todo.id && this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div>
          <input
            className={styles.toggle}
            type='checkbox'
            checked={todo.completed}
            onChange={() => todo.id && completeTodo(todo.id)}
          />
          <label onDoubleClick={() => this.handleDoubleClick()}>
            {todo.text}
          </label>
          <button
            className={styles.destroy}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id)
            }}
          />
        </div>
      )
    }

    const classes = classNames({
      [styles.completed]: todo.completed,
      [styles.editiong]: this.state.editing,
      [styles.normal]: !this.state.editing,
    })

    return <li className={classes}>{element}</li>
  }
}
