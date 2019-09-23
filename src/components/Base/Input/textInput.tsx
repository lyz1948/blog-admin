import * as React from 'react'

export namespace TextInput {
	export interface IProps {
		name?: string
		text?: string
		type?: string
		placeholder?: string
		newTodo?: boolean
		editing?: boolean
		valueChange: (name: string, e: React.ChangeEvent) => void
	}

	export interface IState {
		name: string
		text: string
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
		this.handleBlur = this.handleBlur.bind(this)
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ text: event.target.value })
		this.props.valueChange(this.props.name!, event)
	}

	handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		// const text = event.target.value.trim()
		
	}

	render() {
		return (
			<input
				className="formInput"
				type={this.state.type}
				autoFocus
				placeholder={this.props.placeholder}
				name={this.props.name}
				value={this.state.text}
				onBlur={this.handleBlur}
				onChange={(e: any) => this.handleChange(e)}
			/>
		)
	}
}
