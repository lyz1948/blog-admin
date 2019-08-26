import * as React from 'react'
// import { Form } from 'react-bootstrap'
// import { FancyInput } from '../index'

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
    const text = event.target.value
    this.setState({ text })
    this.props
  }

  handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const text = event.target.value.trim()
    this.setState({ text })
  }

  render() {
    return (
      <input
        type={this.state.type}
        value={this.state.text}
        onBlur={this.handleBlur}
        placeholder={this.props.placeholder}
        onChange={(e: any) => this.handleChange(e)}
      />
      // <Form.Control
      //   type={this.state.type}
      //   value={this.state.text}
      //   onBlur={this.handleBlur}
      //   placeholder={this.props.placeholder}
      //   onChange={(e: any) => this.handleChange(e)}
      // />
    )
  }
}
