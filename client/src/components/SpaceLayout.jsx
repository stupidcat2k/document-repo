import { SPACE_LIST } from '@/utils/LayoutList';
import PropTypes from 'prop-types';
import { Form, Input, Layout, Menu, Modal } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import Button from './Button';
import styles from './styles/SpaceLayout.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useLoading } from '@/hooks/LoadingHook';
import { createSpace } from '@/api/spaceApi';
import { useNotify } from '@/hooks/NotificationHook';
import { STATUS_TYPE } from '@/core/Constants';

const SpaceLayout = ({ children, handleCondition, handleClickOutSide }) => {

  const [ showModal, setShowModal ] = useState(false);
  const [ disable , setDisable ] = useState(false);
  const [showLoading, hideLoading] = useLoading();
  const notify = useNotify();

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOk = async () => {
    
    const values = form.getFieldsValue();
    try {
      showLoading();
      const { message, success} = await createSpace(values);
      if ( success ) {
        handleCondition();
      } else {
        notify(STATUS_TYPE.WARNING, message);
      }
    } finally {
      form.resetFields();
      setShowModal(false);
      hideLoading();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setDisable(false);
    form.resetFields();
  };

  const [form] = Form.useForm();

  const handleInput = (data) => {
      if(data.trim() === ''){
        return setDisable(true);
      }
      return setDisable(false);
  }

  return (
    <Layout style={{ background: '#fff', minHeight: '93vh' }}>
    <Sider breakpoint='lg' style={{ background :'#fff', position: 'absolute', height:'93vh'}}>
      <div className='flex justify-center my-[8px]'>
        <Button size='normal' onClick={() => handleOpenModal()}>
          <div className='flex justify-items-center'>
            <PlusOutlined className='pt-[2px] pr-[2px] text-[#000] text-[16px]'  /> 
            <span>New</span> 
          </div>
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
          initialValue='New Folder without name'
          >
            <Input onChange={(e) => handleInput(e.target.value)} 
            showCount
            maxLength={50}/>
          </Form.Item>
          <Form.Item
          component={false}
						id="category-editor-form"
						layout="vertical"
          >
            <Button type='submit' 
            className='mt-[5px] ml-[8px] float-right' disabled={disable}
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

SpaceLayout.propTypes = {
  children: PropTypes.node.isRequired,
  handleCondition: PropTypes.func
};

export default SpaceLayout;
