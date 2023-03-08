import { getAllDocBySpcId, updateDoc } from "@/api/docApi";
import { SpaceLayout, Button, Folder, MoreMenu} from "@/components";
import { STATUS_TYPE } from "@/core/Constants";
import { useLoading } from "@/hooks/LoadingHook";
import { useNotify } from "@/hooks/NotificationHook";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Breadcrumb, Form, Modal, Input } from 'antd';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
      const {data, success, message} = await getAllDocBySpcId(id);
      if (success) {
        setLstFile(data);
      } else {
        return notify(STATUS_TYPE.ERROR, message);
      }
    };
    fetchSpace();
  }, [ condition, router.isReady ]);
 
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

  const handleMenuClick = (key, name, id) => {
    if ( key === 'edit') {
      setShowEditModal(true);
      form.setFieldValue('hdrNm',name);
      setHdrId(id);
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
      const { message, success} = await updateDoc({hdrNm, hdrId});
      if ( success ) {
        handleCondition();
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
        <div className="container-fluid pl-12">
          <div className="flex w-full justify-between">
          <Breadcrumb separator=">">
            <Breadcrumb.Item onClick={() => router.push('/')} className='cursor-pointer'>Space</Breadcrumb.Item>
            <Breadcrumb.Item href="">{lstFile && lstFile.length !==0 ? lstFile[0].spcNm : 'undefined'}</Breadcrumb.Item>
          </Breadcrumb>
            <div className="flex">
              <p className="mr-[10px] pt-1">Name</p>
              <Button size='small' variant='icon' onClick={() => setIcon(!icon) } >{!icon ? <DownOutlined /> : <UpOutlined />}</Button>
            </div>
          </div>
          <div>
            <Button>New Document</Button>
          </div>
          <div className="grid grid-cols-6">
            {lstFile && lstFile.length !== 0 ? 
              lstFile.map(header => (
                <div>
                <MoreMenu className='float-right' onClick={(key) =>handleMenuClick(key, header.hdrNm, header.hdrId)}/>
                <Folder key={header.hdrId} id={header.hdrId} name={header.hdrNm} 
                handleClickFolder={handleClickFolder} 
                clicked={header.clicked}
                /> 
                </div>
              ))
            : <p className="text-[20px]"> No space created !</p>}
           </div>
        </div>     
        <Modal title="Edit Name" 
            open={showEditModal} 
            onCancel={handleCancel}
            footer={null}
            centered
            >
              <Form
              form={form}
              name="control-hooks"
              onFinish={(values) => handleOk(values)}
              style={{
                maxWidth: 600,
              }}
              >
                <Form.Item name="hdrNm">
                  <Input onChange={(e) => handleInput(e.target.value)} showCount maxLength={60}/>
                </Form.Item>
                <Form.Item component={false} id="category-editor-form" layout="vertical">
                  <Button type='submit' className='mt-[5px] ml-[8px] float-right' disabled={disable}> Change </Button>
                  <Button className='mt-[5px] float-right' onClick={() => handleCancel()}> Cancel </Button>
                </Form.Item>
            </Form>
          </Modal>
    </SpaceLayout>
  )
}
