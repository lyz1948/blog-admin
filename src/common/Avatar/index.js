import React, { memo,  useState, useRef } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { UploadWrap } from './style'

function AvatarUpload(props) {
  const { thumb } = props
  
  const renderThumb = () => {
    return thumb ? (
      <div className="thumb">
        <img className="image" src={thumb} alt="缩略图" />
      </div>
    ) : (
      <div className="thumb">
        <UploadOutlined className="icon" />
      </div>
    )
  }

  return (
    <UploadWrap>
      <input type="file" className="articleThumb" onChange={props.uploadThumb} />
      {renderThumb()}
    </UploadWrap>
  )
}

export default memo(AvatarUpload)
