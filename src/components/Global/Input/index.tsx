import * as React from 'react'

export const FancyInput = React.forwardRef((props: any, ref: any) => {
  return (
    <input
      type="text"
      ref={ref}
      className="formInput"
      placeholder={props.tip}
    />
  )
})

export const FancyTextarea = React.forwardRef((props: any, ref: any) => {
  return <textarea ref={ref} className="formTextarea" placeholder={props.tip} />
})