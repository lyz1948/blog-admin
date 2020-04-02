import React, { memo } from 'react'
import { Button } from 'antd'

function CategoryAdd(props) {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="module">
          <div className="title">添加分类</div>
          <div className="content">
            <div className="input-wrapper">
              <div className="label">文章标题</div>
              <input
                className="form-input"
                type="text"
                placeholder="文章标题"
              />
            </div>
            <div className="input-wrapper">
              <div className="label">文章slug</div>
              <input
                className="form-input"
                type="text"
                placeholder="文章slug"
              />
            </div>
            <div className="input-wrapper">
              <div className="label">文章描述</div>
              <input
                className="form-input"
                type="text"
                placeholder="文章描述"
              />
            </div>

            <div className="input-wrapper">
              <div className="label"></div>
              <Button type="primary" size="medium">
                创建
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CategoryAdd)
