import * as React from 'react'

export namespace TextInput {
  export interface IProps {
    text?: string
    name?: string
    type?: string
    placeholder?: string
    editing?: boolean
    onSave: (text: string) => void
    valueChange: (name: string, e: React.ChangeEvent) => void
  }

  export interface IState {
    text: string
    name: string
    type: string
  }
}

export class TextInput extends React.Component<
  TextInput.IProps,
  TextInput.IState
> {
  constructor(props: TextInput.IProps, context?: any) {
    super(props, context)
    this.state = {
      text: this.props.text || '',
      name: this.props.name || '',
      type: this.props.type || 'text',
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value })
    this.props.valueChange(this.props.name!, event)
  }

  handlePress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13) {
      this.props.onSave(this.state.text)
    }
  }

  render() {
    return this.state.type !== 'textarea' ? (
      <input
        // autoFocus
        type={this.state.type}
        className="formInput"
        placeholder={this.props.placeholder}
        name={this.props.name}
        value={this.state.text}
        onKeyDown={(e: any) => this.handlePress(e)}
        onBlur={(e: any) => this.handleChange(e)}
        onChange={(e: any) => this.handleChange(e)}
      />
    ) : (
      <textarea
        className="formTextarea"
        placeholder={this.props.placeholder}
        name={this.props.name}
        value={this.state.text}
        onBlur={(e: any) => this.handleChange(e)}
        onChange={(e: any) => this.handleChange(e)}
      />
    )
  }
}
