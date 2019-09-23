import * as React from 'react'

export namespace TextInput {
	export interface Props {
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

export class TextInput extends React.Component<
	TextInput.Props,
	TextInput.State
> {
	constructor(props: TextInput.Props, context?: any) {
		super(props, context)
		this.state = { text: this.props.text || '' }
		this.handleBlur = this.handleBlur.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
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

	handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ text: event.target.value })
	}

	handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		const text = event.target.value.trim()
		if (!this.props.newTodo) {
			this.props.onSave(text)
		}
	}

	render() {
		return (
			<input
				className="formInput"
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