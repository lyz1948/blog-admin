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
			{/* <InputGroup.Append> */}
				<Button variant="primary" onClick={props.handleSearch}>
					搜索
				</Button>
			{/* </InputGroup.Append> */}
		</InputGroup>
	)
}
