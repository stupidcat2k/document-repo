import { deleteSpace, getAllSpace, updateSpace } from "@/api/spaceApi";
import { SpaceLayout, Folder, Button, MoreMenu } from "@/components";
import { STATUS_TYPE } from "@/core/Constants";
import { useLoading } from "@/hooks/LoadingHook";
import { useNotify } from "@/hooks/NotificationHook";
import {
  DownOutlined,
  UpOutlined
} from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [ icon , setIcon ] = useState(false);
  const [ lstSpace, setLstSpace] = useState([]);
  const [ condition, setCondition ] = useState(false);
  const [ disable , setDisable ] = useState(false);
  const [ showEditModal, setShowEditModal ] = useState(false);
  const [ spcId, setSpcId ] = useState('');

  const notify = useNotify();
  const [form] = Form.useForm();
  const [showLoading, hideLoading] = useLoading();

  useEffect(() => {
    const fetchSpace = async () => {
      const {data, success, message} = await getAllSpace(true);
      if (success) {
        setLstSpace(data);
      } else {
        return notify(STATUS_TYPE.ERROR, message);
      }
    };
    fetchSpace();
  }, [ condition ]);
  
  const handleCondition = () => {
    setCondition(!condition);
  }

  const handleInput = (data) => {
    if(data.trim() === ''){
      return setDisable(true);
    }
    return setDisable(false);
  }

  const handleClickFolder = (id) => {
    const newLstSpace = lstSpace.map((space) => {
      if ( space.spcId === id && space.clicked !== true) {
        space.clicked = true;
        return space;
      } else {
        space.clicked = false;
        return space;
      }
    });
    setLstSpace(newLstSpace);
  }

  const handleOk = async () => {
    const {spcNm} = form.getFieldsValue();
    try {
      showLoading();
      const { message, success} = await updateSpace({spcNm, spcId});
      if ( success ) {
        notify(STATUS_TYPE.SUCCESS, 'Update folder sucessfully!')
      } else {
        notify(STATUS_TYPE.WARNING, message);
      }
    } finally {
      form.resetFields();
      handleCondition();
      setShowEditModal(false);
      hideLoading();
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setShowEditModal(false);
    setDisable(false);
  };

  const handleMenuClick = async (key, name, id) => {
    if ( key === 'edit') {
      setShowEditModal(true);
      form.setFieldValue('spcNm',name);
      setSpcId(id);
    } else {
      try {
        showLoading();
        const { message, success} = await deleteSpace(id);
        if ( success ) {
          handleCondition();
          notify(STATUS_TYPE.SUCCESS, 'Delete folder sucessfully!');
        } else {
          notify(STATUS_TYPE.WARNING, message);
        }
      } finally {
        hideLoading();
      }
    }
  };

  const handleSort = () => {
    setIcon(!icon);
    if (icon) {
      lstSpace.sort((a, b) => {
        if (a.spcNm < b.spcNm) {
          return -1;
        }
        if (a.spcNm > b.spcNm) {
          return 1;
        }
        return 0;
      });
      setLstSpace(lstSpace);
    } else {
      lstSpace.sort((a, b) => {
        if (a.spcNm < b.spcNm) {
          return 1;
        }
        if (a.spcNm > b.spcNm) {
          return -1;
        }
        return 0;
      });
      setLstSpace(lstSpace);
    }
  }

  return (
    <SpaceLayout handleCondition = {handleCondition} title={'space'}>
        <div className="container-fluid pl-12">
          <div className="flex w-full justify-between">
            <p className="subheader">Space</p>
            <div className="flex">
              <p className="mr-[10px] pt-1">Name</p>
              <Button size='small' variant='icon' onClick={handleSort} >{!icon ? <DownOutlined /> : <UpOutlined />}</Button>
            </div>
          </div>
          <div className="grid grid-cols-6">
            {lstSpace && lstSpace.length !== 0 ? 
              lstSpace.map(space => (
                <div className='flex'>
                  <Folder key={space.spcId} id={space.spcId} name={space.spcNm} 
                  handleClickFolder={handleClickFolder} 
                  clicked={space.clicked}
                  type='folder'
                  >
                    <MoreMenu onClick={(key) =>handleMenuClick(key, space.spcNm, space.spcId)}/>
                  </Folder> 
                </div>
              ))
            : <p className="text-[20px]"> No space created !</p>}
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
                <Form.Item name='spcNm'>
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
