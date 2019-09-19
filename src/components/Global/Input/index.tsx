import * as React from 'react'

export const FancyInput = React.forwardRef((props: any, ref: any) => {
  const { type } = props || 'text'
  return (
    <input
      type={type}
      ref={ref}
      className="formInput"
      placeholder={props.tip}
      onKeyDown={props.onPress}
    />
  )
})

export const FancyTextarea = React.forwardRef((props: any, ref: any) => {
  return <textarea ref={ref} className="formTextarea" placeholder={props.tip} />
})
