import * as React from 'react'
import { InputGroup, Button } from 'react-bootstrap'
import { TextInput } from '@app/components'

export function Search(props: any) {
	return (
		<InputGroup>
			<TextInput
				name={props.name}
				text={props.value}
				placeholder={props.placeholder}
				valueChange={props.handleChange}
				onSave={props.handleSearch}
			/>
			<Button variant="info" onClick={props.handleSearch}>
				搜索
			</Button>
		</InputGroup>
	)
}
