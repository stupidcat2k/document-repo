import { deleteDoc, getAllDocBySpcId, updateDocName } from '@/api/docApi';
import { SpaceLayout, Button, Folder, MoreMenu} from '@/components';
import { STATUS_TYPE } from '@/core/Constants';
import { useLoading } from '@/hooks/LoadingHook';
import { useNotify } from '@/hooks/NotificationHook';
import {
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';
import { Breadcrumb, Form, Modal, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FolderComp() {

  const [ icon , setIcon ] = useState(false);
  const [ lstFile, setLstFile] = useState([]);
  const [ disable , setDisable ] = useState(false);
  const [ condition, setCondition ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ hdrId, setHdrId ] = useState('');

  const notify = useNotify();
  const [showLoading, hideLoading] = useLoading();
  const router = useRouter();
  const id = router.query.id;
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSpace = async () => {
      if (!router.isReady) return;
      const {data, success, message} = await getAllDocBySpcId(`${id}/${true}`);
      if (success) {
        setLstFile(data);
      } else {
        return notify(STATUS_TYPE.ERROR, message);
      }
    };
    fetchSpace();
  }, [ condition, router.isReady ]);

  const handleSort = () => {
    setIcon(!icon);
    if (icon) {
      lstFile.sort((a, b) => {
        if (a.hdrNm < b.hdrNm) {
          return -1;
        }
        if (a.hdrNm > b.hdrNm) {
          return 1;
        }
        return 0;
      });
      setLstFile(lstFile);
    } else {
      lstFile.sort((a, b) => {
        if (a.hdrNm < b.hdrNm) {
          return 1;
        }
        if (a.hdrNm > b.hdrNm) {
          return -1;
        }
        return 0;
      });
      setLstFile(lstFile);
    }
  }
 
  const handleCondition = () => {
    setCondition(!condition);
  }

  const handleClickFolder = (id) => {
    const newLstFile = lstFile.map((header) => {
      if ( header.hdrId === id && header.clicked !== true) {
        header.clicked = true;
        return header;
      } else {
        header.clicked = false;
        return header;
      }
    });
    setLstFile(newLstFile);
  }

  const handleMenuClick = async (key, name, id) => {
    if ( key === 'edit') {
      setShowEditModal(true);
      form.setFieldValue('hdrNm',name);
      setHdrId(id);
    } else {
      try {
        showLoading();
        const { message, success} = await deleteDoc(id);
        if ( success ) {
          handleCondition();
          notify(STATUS_TYPE.SUCCESS, 'Delete file sucessfully!');
        } else {
          notify(STATUS_TYPE.WARNING, message);
        }
      } finally {
        hideLoading();
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setShowEditModal(false);
    setDisable(false);
  };

  const handleInput = (data) => {
    if(data.trim() === ''){
      return setDisable(true);
    }
    return setDisable(false);
  }

  const handleOk = async () => {
    const {hdrNm} = form.getFieldsValue();
    try {
      showLoading();
      const { message, success} = await updateDocName({hdrNm, hdrId});
      if ( success ) {
        handleCondition();
        notify(STATUS_TYPE.SUCCESS, 'Update file sucessfully!')
      } else {
        notify(STATUS_TYPE.WARNING, message);
      }
    } finally {
      form.resetFields();
      setShowEditModal(false);
      hideLoading();
    }
  };
  return (
    <SpaceLayout handleCondition = {handleCondition}>
        <div className='container-fluid pl-12'>
          <div className='flex w-full justify-between'>
          <Breadcrumb separator='>'>
            <Breadcrumb.Item onClick={() => router.push('/')} className='cursor-pointer'>Space</Breadcrumb.Item>
            <Breadcrumb.Item href=''>{lstFile && lstFile.length ? lstFile[0].spcNm : lstFile.spcNm}</Breadcrumb.Item>
          </Breadcrumb>
            <div className='flex'>
              <p className='mr-[10px] pt-1'>Name</p>
              <Button size='small' variant='icon' onClick={handleSort} >{!icon ? <DownOutlined /> : <UpOutlined />}</Button>
            </div>
          </div>
          <div>
            <Button onClick={() =>router.push(`/edit/${id}`)}>New Document</Button>
          </div>
          <div className='grid grid-cols-6'>
            {lstFile && lstFile.length ? 
              lstFile.map(header => (
                <div className='flex'>
                <Folder key={header.hdrId} id={header.hdrId} name={header.hdrNm} 
                handleClickFolder={handleClickFolder} 
                clicked={header.clicked}
                >
                  <MoreMenu onClick={(key) =>handleMenuClick(key, header.hdrNm, header.hdrId)}/>
                </Folder> 
                </div>
              ))
            : <p className='text-[20px]'> No space created !</p>}
           </div>
        </div>     
        <Modal title='Edit Name' 
            open={showEditModal} 
            onCancel={handleCancel}
            footer={null}
            centered
            >
              <Form
              form={form}
              name='control-hooks'
              onFinish={handleOk}
              style={{
                maxWidth: 600,
              }}
              >
                <Form.Item name='hdrNm'>
                  <Input onChange={(e) => handleInput(e.target.value)} showCount maxLength={60}/>
                </Form.Item>
                <Form.Item component={false} id='category-editor-form' layout='vertical'>
                  <Button type='submit' className='mt-[5px] ml-[8px] float-right' disabled={disable}> Change </Button>
                  <Button className='mt-[5px] float-right' onClick={() => handleCancel()}> Cancel </Button>
                </Form.Item>
            </Form>
          </Modal>
    </SpaceLayout>
  )
}
