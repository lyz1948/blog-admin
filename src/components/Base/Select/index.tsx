import * as React from 'react'
import { Form } from 'react-bootstrap'

export interface SelectorProps<T> {
  list: T[]
  onChange: (e: React.MouseEvent) => void
  // renderItem: (item: T, index: number) => React.ReactNode
}

export function Selector<T>(props: SelectorProps<T>) {
  return (
    <Form.Control as="select" onChange={props.onChange}>
      {props.list.map((it: any) => (
        <option key={it._id} value={it._id}>
          {it.name}
        </option>
      ))}
    </Form.Control>
  )
}
