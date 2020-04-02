import React, { memo } from 'react'
import { Table, Input } from 'antd'
import { ListContainer } from './style'
// import Table from '../Table'

const { Search } = Input

function CategoryList(props) {
  const columns = [
    {
      title: 'id',
      dataIndex: 'key',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: 'slug',
      dataIndex: 'slug',
    },
    {
      title: '时间',
      dataIndex: 'date',
    },
    {
      title: '操作',
      dataIndex: 'controls',
      render: (text, record) => (
        <div>
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
        </div>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      title: 'John Brown',
      description: 32,
      slug: 'New York No. 1 Lake Park',
      date: '2019-05-24',
    },
    {
      key: '2',
      title: 'Jim Green',
      description: 42,
      slug: 'London No. 1 Lake Park',
      date: '2019-05-24',
    },
    {
      key: '3',
      title: 'Joe Black',
      description: 32,
      slug: 'Sidney No. 1 Lake Park',
      date: '2019-05-24',
    },
    {
      key: '4',
      title: 'Jim Red',
      description: 32,
      slug: 'London No. 2 Lake Park',
      date: '2019-05-24',
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      )
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <ListContainer>
      <div className="module">
        <div className="title">分类列表</div>
        <div className="content">
          <div className="condition">
            <div className="condition-item">
              <Search
                placeholder="搜索关键字"
                enterButton="Search"
                size="medium"
                onSearch={value => console.log(value)}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      </div>
    </ListContainer>
  )
}

export default memo(CategoryList)
