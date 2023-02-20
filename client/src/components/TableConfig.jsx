import { Table } from 'antd';
import React from 'react'

const data = [
    {
      key: '1',
      no: '1',
      group: 'Group A',
      item: 'Item 1',
      description: 'Description 1',
      valueType: 'Type 1',
      value1: 'Value 1',
      value2: 'Value 2',
    },
    {
      key: '2',
      no: '2',
      group: 'Group B',
      item: 'Item 2',
      description: 'Description 2',
      valueType: 'Type 2',
      value1: 'Value 3',
      value2: 'Value 4',
    },
  ];  

const col = [
    {
        title:'No.',
        dataIndex:'no',
        key:'no'
    },
    {
        title:'Group',
        dataIndex:'group',
        key:'group'
    },
    {
        title:'Item',
        dataIndex:'item',
        key:'item'
    },
    {
        title:'Description',
        dataIndex:'desc',
        key:'desc'
    },
    {
        title:'Value Type',
        dataIndex:'valTp',
        key:'valTp'
    },
    {
        title:'Value 1',
        dataIndex:'val1',
        key:'val1'
    },
    {
        title:'Value 2',
        dataIndex:'val2',
        key:'val2'
    },
];

const TableConfig = () => {
  return (
    <Table columns={col} dataSource={data}
        pagination={{
            position: ['none']}}
    />
  )
}

export default TableConfig