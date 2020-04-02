import React, { memo } from 'react'
import { Table, Input } from 'antd'
import { ListContainer } from './style'

const { Search } = Input

function ArticleList(props) {
  const columns = [
    {
      title: 'id',
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: '标题',
      dataIndex: 'title',
      sorter: (a, b) => a.title - b.title,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '分类',
      dataIndex: 'category',
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: '标签',
      dataIndex: 'tag',
    },
    {
      title: '点赞',
      dataIndex: 'like',
      sorter: (a, b) => a.like - b.like,
    },
    {
      title: '围观',
      dataIndex: 'view',
      sorter: (a, b) => a.view - b.view,
    },
    {
      title: '评论',
      dataIndex: 'comments',
      sorter: (a, b) => a.comments - b.comments,
    },
    {
      title: '公开',
      dataIndex: 'public',
    },
    {
      title: '发布',
      dataIndex: 'publish',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '时间',
      dataIndex: 'date',
      sorter: (a, b) => a.date - b.date,
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
      category: 'New York No. 1 Lake Park',
      tag: 'Vue',
      like: 12,
      view: 20,
      comments: 5,
      public: '公开',
      publish: '发布',
      type: '原创',
      date: '2019-05-24',
    },
    {
      key: '2',
      title: 'Jim Green',
      description: 42,
      category: 'London No. 1 Lake Park',
      tag: 'Vue',
      like: 12,
      view: 20,
      comments: 5,
      public: '公开',
      publish: '发布',
      type: '原创',
      date: '2019-05-24',
    },
    {
      key: '3',
      title: 'Joe Black',
      description: 32,
      category: 'Sidney No. 1 Lake Park',
      tag: 'Vue',
      like: 12,
      view: 20,
      comments: 5,
      public: '公开',
      publish: '发布',
      type: '原创',
      date: '2019-05-24',
    },
    {
      key: '4',
      title: 'Jim Red',
      description: 32,
      category: 'London No. 2 Lake Park',
      tag: 'Vue',
      like: 12,
      view: 20,
      comments: 5,
      public: '公开',
      publish: '发布',
      type: '原创',
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
        <div className="title">文章列表</div>
        <div className="content">
          <div className="flex">
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

export default memo(ArticleList)
