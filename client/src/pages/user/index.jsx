import React, { useState, useEffect } from 'react';
import {
  Table,
  Modal,
  Space,
  Input,
  Row,
  Col,
  Form,
  Checkbox,
} from 'antd';
import { useLoading } from '@/hooks/LoadingHook';
import { useNotify } from '@/hooks/NotificationHook';
import { SAVE_SUCCESS } from '@/core/Constants';
import { Scrollbar } from './style/style';
import { createUser, getAllUser, updateUser } from '@/api/userApi';
import SearchPanel from './components/SearchBar';
import { Button } from '@/components';

export default function User() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [infoForm] = Form.useForm();
  const notify = useNotify();
  const [showLoading, hideLoading] = useLoading();
  const [dataSource, setDataSource] = useState([]);
  const [reload, setReload] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);
  const [conditions, setConditions] = useState(true);
  const [isModalInfo, setIsModalInfo] = useState(false);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'usrId',
      key: 'usrId',
      align: 'center',
      width: '25%',
      onCell: (record) => {
        return {
          onDoubleClick: () => {
            handleOpenInfoModal(record);
          },
        };
      },
    },
    {
      title: 'User Name',
      dataIndex: 'usrNm',
      key: 'usrNm',
      align: 'center',
      width: '25%',
      onCell: (record) => {
        return {
          onDoubleClick: () => {
            handleOpenInfoModal(record);
          },
        };
      },
    },
    {
      title: 'Active',
      dataIndex: 'actFlg',
      key: 'actFlg',
      render: (text, record) => (
        <Checkbox checked={text} onClick={() => confirmPopup(record)} />
      ),
      align: 'center',
      width: '25%',
    },
  ];

  useEffect(() => {
    const getUserData = async () => {
      const { success, data } = await getAllUser();
      if (success) {
        const active = data.filter((index) => index.actFlg === conditions);
        setDataSource(data);
        setDataSearch(active);
      }
    };
    getUserData();
  }, [reload]);

  const confirmPopup = async (record) => {
    Modal.confirm({
      title: 'Change status user',
      content: 'Are you sure you want to change status this user?',
      okText: 'Yes',
      okType:'default ',
      onOk: () => handleChangeStatus(record),
    });
  };

  const handleChangeStatus = async (values) => {
    try {
      showLoading();
      values.actFlg = !values.actFlg;
      const { success, message } = await updateUser(values);
      if (success) {
        notify('success', 'Update user successfully');
      } else {
        notify('error', message);
      }
    } finally {
      hideLoading();
      setReload(!reload);
    }
  };

  const handleSaveNewUser = async (values) => {
    let isDuplicateUserId = false;
    dataSource.map((element) => {
     if (element.usrId === values.usrId) {
        return (isDuplicateUserId = true);
      }
      return false;
    });
    if (isDuplicateUserId) {
      notify('waring', 'User id already taken, Try another instead!');
    } else {
      try {
        showLoading();
        const { success, message } = await createUser(values);
        if (success) {
          notify('success', 'Create user successfully!');
        } else {
          notify('error', message);
        }
      } finally {
        hideLoading();
        setIsModalVisible(false);
        setReload(!reload);
      }
    }
  };

  const handleUpdateUser = async (values) => {
      try {
        showLoading();
        const { success, message } = await updateUser(values);
        if (success) {
          notify('success', 'Update user successfully!');
        } else {
          notify('error', message);
        }
      } finally {
        hideLoading();
        setIsModalInfo(false);
        setReload(!reload);
      }
  };

  const handleCloseModal = () => {
    infoForm.resetFields();
    form.resetFields();
    setIsModalVisible(false);
    setIsModalInfo(false);
  };

  const handleOpenModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOpenInfoModal = (item) => {
    infoForm.setFieldsValue({
        usrId: item.usrId,
        usrNm: item.usrNm
    })
    setIsModalInfo(true);
  }

  const Search = async (value) => {
    let result = [];
    const isDelete = value.active;
    setConditions(isDelete);
    if (value.keyWord === '') {
      setReload(!reload);
    }
    for (let i = 0; i < dataSource.length; i++) {
        console.log(dataSource[i]);
        if (
            dataSource[i].usrName && 
            dataSource[i].usrName
              .toLocaleUpperCase()
              .includes(value.keyWord.toUpperCase())
          ) {
        if (dataSource[i].actFlg === value.active) {
          result.push(dataSource[i]);
        }
      }
    }
    setDataSearch(result);
  };

  return (
    <>
      <SearchPanel parentCallback={Search} />
      <Row justify='end' style={{ marginTop: 10, marginBottom: 10 }}>
        <Space direction='horizontal'>
          <Button type='primary' onClick={handleOpenModal}>
            New
          </Button>
        </Space>
      </Row>
      <Scrollbar>
        <Table
          columns={columns}
          dataSource={dataSearch}
          size='small'
          pagination={{
            showSizeChanger: true,
          }}
          bordered={true}
          scroll={{ y: 475 }}
          rowKey={(record) => record.usrId}
        />
      </Scrollbar>
      <Modal
        title='Create New User'
        open={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        width={500}
      >
        <Row justify='center'>
          <Col span={24}>
            <Form
              name='createUser'
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              form={form}
              scrollToFirstError
              autoComplete='off'
              onFinish={(values) => handleSaveNewUser(values)}
            >
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='User ID'
                    name='usrId'
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9]{0,20}$/,
                        message:
                          'User Id can not contain special characters and max length is 20',
                      },
                      {
                        required: true,
                        message: 'User Id can not be null',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='Password'
                    name='userPassword'
                    initialValue='1111'
                    rules={[
                      {
                        required: true,
                        message: 'Password can not be null',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='User Name'
                    name='usrNm'
                    className='justify-center'
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9_ ]{0,50}$/,
                        message:
                          'User name can not contain special characters and max length is 50',
                      },
                      {
                        required: true,
                        message: 'User name can not be null',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify='end'>
                <Space horizontal='horizontal'>
                  <Button type='submit'>
                    Save
                  </Button>
                </Space>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
      <Modal
        title='User Infomation'
        open={isModalInfo}
        footer={null}
        onCancel={handleCloseModal}
        width={500}
      >
        <Row justify='center'>
          <Col span={24}>
            <Form
              name='createUser'
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              form={infoForm}
              scrollToFirstError
              autoComplete='off'
              onFinish={(values) => handleUpdateUser(values)}
            >
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='User ID'
                    name='usrId'
                  >
                    <Input disabled={true} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='User Name'
                    name='usrNm'
                    className='justify-center'
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9_ ]{0,50}$/,
                        message:
                          'User name can not contain special characters and max length is 50',
                      },
                      {
                        required:true,
                        message: 'User name can not be null',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={19}>
                  <Form.Item
                    label='New Password'
                    name='userPassword'
                    rules={[
                      {
                        message: 'Password can not be null',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify='end'>
                <Space horizontal='horizontal'>
                  <Button type='submit'>
                    Save
                  </Button>
                </Space>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
