import React, { memo, useState, useRef } from 'react'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadWrap } from './style'
import classNames from 'classnames'
import MarkdownEditor from '../Editor'

const RELEASE_STATE = [
  { text: '公开', label: 'Public' },
  { text: '密码访问', label: 'Password' },
  { text: '私密', label: 'Secret' },
]

const PUBLISH_STATE = [
  { text: '原创', label: 'Original' },
  { text: '转载', label: 'Reprint' },
  { text: '混合', label: 'Hybrid' },
]

function ArticleAdd(props) {
  const [size] = useState('medium')
  const [releaseState, setReleaseState] = useState('Public')
  const [publishState, setPublishState] = useState('Original')
  const [thumb, setThumb] = useState(null)
  const fd = useRef(null)

  const handleRelaseState = e => {
    e.persist()
    setReleaseState(e.target.value)
  }

  const handlePublishState = e => {
    e.persist()
    setPublishState(e.target.value)
  }

  const uploadThumb = () => {
    fd.current = new FormData()
    const fileEl = document.getElementById('articleThumb')

    if (fileEl.files) {
      setThumb(URL.createObjectURL(fileEl.files[0]))

      fd.current.append('image', fileEl.files[0])
    }
  }

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
    <div className="flex">
      <div className="flex-60">
        <div className="module">
          <div className="title">记录生活-文章添加</div>

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
              <div className="label">文章关键字</div>
              <input className="form-input" type="text" placeholder="关键字" />
            </div>

            <div className="input-wrapper">
              <div className="label">文章描述</div>
              <textarea
                className="text-area"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="文章描述"
              ></textarea>
            </div>

            <div className="input-wrapper">
              <div className="label">文章编辑</div>
              <MarkdownEditor />
            </div>

            <div className="input-wrapper">
              <div className="label"></div>
              <Button type="primary" size={size}>
                发布
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="module">
          <div className="title">文章分类</div>
          <div className="content">
            <Button type="primary" size={size}>
              Primary
            </Button>
          </div>
        </div>

        <div className="module">
          <div className="title">文章标签</div>
          <div className="content">
            <Button type="primary" size={size}>
              Primary
            </Button>
          </div>
        </div>

        <div className="module">
          <div className="title">文章状态</div>

          <div className="content">
            <p>发布状态</p>
            <div className="input-wrapper">
              {RELEASE_STATE.map((v, i) => (
                <div
                  key={i}
                  className={classNames({
                    'radio-box': true,
                    info: releaseState === v.label,
                  })}
                >
                  <input
                    type="radio"
                    name="releaseState"
                    id={v.label}
                    value={v.label}
                    defaultChecked={releaseState === v.label}
                    onChange={handleRelaseState}
                  />
                  <label htmlFor={v.label}>{v.text}</label>
                </div>
              ))}
            </div>

            <p>发布状态</p>
            <div className="input-wrapper">
              {PUBLISH_STATE.map((v, i) => (
                <div
                  key={i}
                  className={classNames({
                    'radio-box': true,
                    info: publishState === v.label,
                  })}
                >
                  <input
                    type="radio"
                    name="releaseState"
                    id={v.label}
                    value={v.label}
                    defaultChecked={publishState === v.label}
                    onChange={handlePublishState}
                  />
                  <label htmlFor={v.label}>{v.text}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="module">
          <div className="title">文章缩略图</div>
          <div className="content">
            <UploadWrap>
              <input type="file" id="articleThumb" onChange={uploadThumb} />
              {renderThumb()}
            </UploadWrap>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ArticleAdd)
