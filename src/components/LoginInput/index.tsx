import * as React from 'react'
import { Form } from 'react-bootstrap'
export namespace LoginInput {
  export interface IProps {
    text?: string
    type?: string
    placeholder?: string
  }

  export interface IState {
    text: string
    type: string
  }
}

export class LoginInputComp extends React.Component<
  LoginInput.IProps,
  LoginInput.IState
> {
  constructor(props: LoginInput.IProps, context?: any) {
    super(props, context)
    this.state = { 
      text: this.props.text || '',
      type: this.props.type || 'text'

    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.target.value })
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim()
    console.log(text)

    this.setState({ text })
  }

  render() {
    return (
      <Form.Control
        type={this.state.type}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={(e: any) => this.handleChange(e)}
        placeholder={this.props.placeholder}
      />
    )
  }
}
