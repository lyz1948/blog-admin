import * as React from 'react'
import { Pagination } from 'react-bootstrap'

export function Paging(props: any) {
  let items = []
  const len = Math.ceil((props.total || 1) / 10)
  for (let number = 1; number <= len; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.active}
        onClick={() => props.handlePage(number)}>
        {number}
      </Pagination.Item>,
    )
  }

  return (
    <Pagination className="flex-end">
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}
