import { Table, Button } from 'antd';
import React from 'react'
const data = [
    {
      key: '1',
      title: 'Item 1',
      description: 'This is a description of item 1',
      icon: 'file',
    },
    {
      key: '2',
      title: 'Item 2',
      description: 'This is a description of item 2',
      icon: 'folder',
    },
  ];

const LogoTable = () => {
    
    const columns = [
        {
          title: '',
          dataIndex: 'content',
          key: 'content',
          render: (text, record) => (
            <div>
              <h3>{record.title}</h3>
              <p>{record.description}</p>
              <Button type="primary">Upload</Button>
            </div>
          ),
        },
      ];

    return (
         <Table className='mt-5' columns={columns} dataSource={data}  
            showHeader={false} 
            pagination={{
            position: ['none'],}}/>
    );
}

export default LogoTable