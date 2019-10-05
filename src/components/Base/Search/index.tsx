import * as React from 'react'
import { InputGroup, Button } from 'react-bootstrap'
import { TextInput } from '@app/components'

export function Search(props: any) {
	return (
    <InputGroup className="mb-3">
    <TextInput
      placeholder={props.placeholder}
      valueChange={() => props.handleSearch}
    />
    <InputGroup.Append>
      <Button variant="primary">搜索</Button>
    </InputGroup.Append>
  </InputGroup>
	)
}
