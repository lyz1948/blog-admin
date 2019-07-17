import * as React from 'react'
import * as styles from './style.css'
import { TodoActions } from '../../store/actions/todos'
import { TodoItem } from '../TodoItem'
import { TodoModel } from '../../store/models'

export namespace TodoList {
  export interface IProps {
    todos: TodoModel[]
    actions: TodoActions
  }
}

export class TodoList extends React.Component<TodoList.IProps> {

  renderToggeAll(): JSX.Element | void {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      const hasIncompleted = todos.some((todo) => !todo.completed)

      return (
        <input
          className={styles.toggleAll}
          type='checkbox'
          checked={hasIncompleted}
          onChange={actions.completeAll}
        />
      )
    }
  }

  render() {
    const { todos, actions } = this.props

    return (
    <section className={styles.main}>{this.renderToggeAll()}
      <ul className={styles.normal}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={actions.completeTodo}
            deleteTodo={actions.deleteTodo}
            editTodo={actions.editTodo}
          />
        ))}
      </ul>
    </section>)
  }
}
