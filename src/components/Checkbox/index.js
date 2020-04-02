import React, { memo } from 'react'
import { Container } from './style'

function Checkbox(props) {
  return (
    <Container>
      <label htmlFor="" className="checkbox-wrapper">
        <span className="checkbox">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-inner"></span>
        </span>
      </label>
    </Container>
  )
}

export default memo(Checkbox)
