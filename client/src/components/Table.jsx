import { Table, Button, Row, Col } from 'antd';
import React from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const data = [
  {
    key: '1',
    code: '001',
    name: 'Item 1',
    prefix: 'ABC',
    backColor: '#ffffff',
    fontColor: '#000000',
  },
  {
    key: '2',
    code: '002',
    name: 'Item 2',
    prefix: 'DEF',
    backColor: '#000000',
    fontColor: '#ffffff',
  },
];

const TableType = ({title, type}) => {
    
const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: type === 'OP' ? 'Prefix' : 'In TML',
      dataIndex: type === 'OP' ? 'prefix' : 'tml',
      key: type === 'OP' ? 'prefix' : 'tml',
    },
    {
      title: 'Back Color',
      dataIndex: 'backColor',
      key: 'backColor',
    },
    {
      title: 'Font Color',
      dataIndex: 'fontColor',
      key: 'fontColor',
    },
  ];

    return (
        <div>
            <Row gutter={24}>
                <Col span={12}>
                    <h1 className='px-2'>{title}</h1>
                </Col>
                <Col span={12}>
                    <div className='float-right'>
                        <Button><ArrowUpOutlined /></Button>
                        <Button><ArrowDownOutlined twoToneColor='#73d8ff'/></Button>
                    </div>
                </Col>
            <Table  columns={columns} 
                    dataSource={data} 
                    pagination={{
                        position: ['none']}}
                    className='mx-2 pt-2 w-[750px]'
            />
            </Row>
        </div>
    )
}

TableType.propTypes = {
    title:     PropTypes.string,
    type:      PropTypes.string
};

export default TableType