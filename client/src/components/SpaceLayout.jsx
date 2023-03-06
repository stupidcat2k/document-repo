import { SPACE_LIST } from '@/utils/LayoutList';
import { Form, Input, Layout, Menu, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Button from './Button';
import styles from './styles/SpaceLayout.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SpaceLayout = ({ children }) => {

  const [ showModal, setShowModal ] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOk = () => {
    setShowModal(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  };

  const [form] = Form.useForm();

  return (
    <Layout style={{ background: '#fff', minHeight: '93vh' }}>
    <Sider breakpoint='lg' style={{ background :'#fff', position: 'absolute', height:'93vh'}}>
      <div className='flex justify-center my-[8px]'>
        <Button size='normal' onClick={() => handleOpenModal()}>
          <PlusOutlined className='pb-[2px]' style={{color: '#000' , fontSize:'16px' }} /> 
          <span className='text-[16px] font-bold'> New </span>
        </Button>
      </div>
      <Menu
          theme='light'
          mode='inline'
          id='space'
          defaultSelectedKeys={'space'}
          items={SPACE_LIST}
        />
    </Sider>
      <Layout className={styles.site}>
        <Content
          className={styles.background}
          style={{
            marginLeft:     '11vw',
            paddingTop: 8,
            minHeight:  280,
          }}
        >
          {children}
        </Content>
      </Layout>
      <Modal title="New Folder" 
      open={showModal} 
      onCancel={handleCancel}
      footer={null}
      centered
      >
        <Form
        form={form}
        name="control-hooks"
        onFinish={handleOk}
        style={{
          maxWidth: 600,
        }}
        >
          <Form.Item
          name="spcNm" 
          >
            <Input defaultValue='New Folder without name' />
          </Form.Item>
          <Form.Item
          component={false}
						id="category-editor-form"
						layout="vertical"
          >
            <Button type='submit' 
            className='mt-[5px] ml-[8px] float-right'
            > Create </Button>
            <Button className='mt-[5px] float-right' 
            onClick={() => handleCancel()}> 
            Cancel </Button>
          </Form.Item>
        </Form>
      </Modal>
  </Layout>
  );
};

export default SpaceLayout;
