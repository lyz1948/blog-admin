import * as React from 'react'
import * as styles from './style.css'
import * as classNames from 'classnames'
import { TodoModel } from '../../store/models'

export const FILTER_TITLES = {
  [TodoModel.Filter.SHOW_ALL]: 'ALL',
  [TodoModel.Filter.SHOW_ACTIVE]: 'ACTIVE',
  [TodoModel.Filter.SHOW_COMPLETED]: 'COMPLETED'
}

export namespace Footer {
  export interface IProps {
    filter: TodoModel.Filter
    activeCount?: number
    completedCount?: number
    onClickFilter: (filter: TodoModel.Filter) => any
    onClickClearCompleted: () => any
  }
}

export class Footer extends React.Component<Footer.IProps> {
  static defaultProps: Partial<Footer.IProps> = {
    activeCount: 0,
    completedCount: 0
  }

  renderTodoCount(): JSX.Element {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'
    return (
      <span className={styles.count}>
        <strong>{activeCount || 'no' }</strong>
        {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter: TodoModel.Filter): JSX.Element {
    const { filter: selectedFilter, onClickFilter } = this.props

    return (
      <a
        className={classNames.default({ [styles.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickFilter(filter)}
        children={FILTER_TITLES[filter]}
      />
    )
  }

  renderClearButton(): JSX.Element | void {
    const { completedCount, onClickClearCompleted } = this.props
    if (completedCount! > 0) {
      return (
        <button
        className={styles.clearCompleted}
        onClick={onClickClearCompleted}
        children={'Clear completed'}
        />
      )
    }
  }

  render() {
    return (
      <footer className={styles.normal}>
        {this.renderTodoCount()}
        <ul className={styles.filters}>
          {
            (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map((key) => (
              <li key={key} children={this.renderFilterLink(TodoModel.Filter[key])} />
            ))
          }
        </ul>
        { this.renderClearButton() }
      </footer>
    )
  }
}