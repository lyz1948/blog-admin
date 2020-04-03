import React, { memo } from 'react'
import { Spin } from 'antd'
import { Container } from './style'

function SpinLoading({ size = 'large' }) {
  return (
    <Container>
      <Spin size={size} />
    </Container>
  )
}

export default memo(SpinLoading)
