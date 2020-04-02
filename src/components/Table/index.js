import React, { memo } from 'react'
import Checkbox from '../Checkbox'
import { Container } from './style'

function Table(props) {
  const { columns, dataSource } = props
  return (
    <Container>
      <table>
        <colgroup>
          <col />
          {columns.map((it, i) => (
            <col key={it.title} className={`column column${i + 1}`} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <React.Fragment>
              <td></td>
              {columns.map(it => (
                <th key={it.dataIndex}>{it.title}</th>
              ))}
            </React.Fragment>
          </tr>
        </thead>
        <tbody>
          {dataSource.map(it => (
            <tr key={it.key}>
              <React.Fragment>
                <td>
                  <Checkbox />
                </td>
                {columns.map(c => (
                  <td>{it[c.dataIndex]}</td>
                ))}

                <td>
                  <div>
                    <span>查看</span>
                  </div>
                  <div>
                    <span>修改</span>
                  </div>
                  <div>
                    <span>发布</span>
                  </div>
                  <div>
                    <span>删除</span>
                  </div>
                </td>
              </React.Fragment>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default memo(Table)
