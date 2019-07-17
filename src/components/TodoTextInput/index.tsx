import * as React from 'react'
import classNames from 'classnames';
import * as styles from './style.css'

export namespace TodoTextInput {
  export interface IProps {
    text?: string
    placeholder?: string
    newTodo?: boolean
    editing?: boolean
    onSave: (text: string) => void
  }

  export interface State {
    text: string
  }
}

export class TodoTextInput extends React.Component<
  TodoTextInput.IProps,
  TodoTextInput.State
> {
  constructor(props: TodoTextInput.IProps, context?: any) {
    super(props, context)
    this.state = { text: this.props.text || '' }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim()
    if (!this.props.newTodo) {
      this.props.onSave(text)
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value })
  }

  handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
    const text = event.currentTarget.value.trim()
    if (event.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  render() {
    const classes = classNames({
      [styles.edit]: this.props.editing,
      [styles.new]: this.props.newTodo,
    })
    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
