import React, { memo } from 'react'

function markdownEditor(props) {
  return (
    <textarea className="text-area" name="editor" id="editor" cols="30" rows="10"></textarea>
  )
}

export default memo(markdownEditor)
