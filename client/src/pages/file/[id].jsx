import React, { useEffect, useState } from 'react';
import {
  SaveOutlined
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { FloatButton, Form, Input } from 'antd';
import { useNotify } from '@/hooks/NotificationHook';
import { STATUS_TYPE } from '@/core/Constants';
import { createDoc, getDocDetailsByHdrId, updateDocDetails } from '@/api/docApi';
import { useLoading } from '@/hooks/LoadingHook';
import { useRouter } from 'next/router';
import { UploadComponent } from '@/components';
import { deleteFile, uploadFile } from '@/api/fileApi';
import { useSelector } from 'react-redux';
import { selectUserId } from '@/redux/authSelectors';

const CKEditorComponent = dynamic(() => import('@/components/CKEditor'), {
  ssr: false
});

function Editor() {

  const [form] = Form.useForm();
  const notify = useNotify();
  const [showLoading, hideLoading] = useLoading();
  const [editorValue, setEditorValue] = useState('New document without content');
  const router = useRouter();
  const userId = useSelector(selectUserId);
  const { id } = router.query;
  const [lstFile, setLstFile] = useState([]);
  const [newLstFile, setNewLstFile] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    if (id.substring(0, 3) === 'HDR') {
      const fetchData = async () => {
        if (!router.isReady) return;
        const {data, success, message} = await getDocDetailsByHdrId(`${id}`);
        if (success) {
            form.setFieldsValue({
            hdrNm: data.docs.hdrNm,
          });
          setEditorValue(data.docs.hdrCtnt);
          setLstFile(data.files);
        } else {
          return notify(STATUS_TYPE.ERROR, message);
        }

      };
      fetchData();
    }
  }, [id]);

  const handleSave = async () => {
    const blankSpace = '<br data-cke-filler="true">';
    const { hdrNm } = form.getFieldsValue();
    const txtCtnt = document.getElementsByClassName('ck-content')[0].innerHTML;
    if (hdrNm.trim() === '') {
       notify(STATUS_TYPE.WARNING, `Title can't be null`);
    }
    else if (txtCtnt.substring(3,30) === blankSpace) {
       notify(STATUS_TYPE.WARNING, `Content can't be null`);
    } else {
      if (id.substring(0,3) === 'SPC') {
        newFile(hdrNm, txtCtnt);
      } else {
        updateDoc(hdrNm, txtCtnt);
      }
    }
  };

  const newFile = async (hdrNm, txtCtnt) => {
    try {
      showLoading();
      const ro = {
        spcId: id,
        txtCtnt: txtCtnt,
        hdrNm: hdrNm
      }
      const { message, success, data} = await createDoc(ro);
      if ( success ) {
        const status = await handleSaveFile(); 
          if (status === 201) {
          notify(STATUS_TYPE.SUCCESS, 'Create successfully!');
          router.push(`/file/${data}`);
        }
      } else {
        notify(STATUS_TYPE.WARNING, message);
      }
    } finally {
      hideLoading();
    }
  }

  const updateDoc = async (hdrNm, txtCtnt) => {
    try {
      showLoading();
      const ro = {
        hdrId: id,
        txtCtnt: txtCtnt,
        hdrNm: hdrNm
      }
      const { message, success} = await updateDocDetails(ro);
      if ( success ) {
         const status = await handleSaveFile(); 
          if (status === 201) {
            notify(STATUS_TYPE.SUCCESS, 'Update successfully!');
            router.push(`/file/${id}`);
        }
      } else {
        notify(STATUS_TYPE.WARNING, message);
      }
    } finally {
      hideLoading();
    }
  }

  const handleSaveFile = async () => {
    if (deleteFiles.length !== 0) {
      for (const file of deleteFiles) {
        await deleteFile(file.uid);
      }
    }
    let formData = new FormData();
    formData.append("objId", id);
    formData.append("bizFolder", id); 
    formData.append("userId", userId);
    for (const file of newLstFile) {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    }
    const { status } = await uploadFile(formData);
    return status;
  }

  const handleNewListFile = (newLstFile) => {
    setNewLstFile(newLstFile);
  }

  const handleRemoveFile = (file) => {
    setDeleteFiles(prevDeleteFiles => [...prevDeleteFiles, file]);
  }
  

  if (!router.isReady) return;
  if (id.substring(0,3) === 'SPC') {
    return (
      <div>
        <h1>New Document</h1>
        <Form
        form={form}
        name='control-hooks'
        className='px-[6px]'
        >
          <Form.Item
          name='hdrNm' 
          label='Title'
          initialValue='Title without name'
          className='mt-[5px]'
          >
            <Input
            showCount
            maxLength={50}/>
          </Form.Item>
          <Form.Item>
          <CKEditorComponent initialValue={editorValue}/>
          </Form.Item>
          <Form.Item name="files" label="Files">
            <UploadComponent maxCount={8} />
          </Form.Item>
        </Form>
        <FloatButton
          onClick={handleSave}
          icon={<SaveOutlined className='text-[18px]'/>}
          type="primary"
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Edit Document</h1>
        <Form
          form={form}
          name='control-hooks'
          className='px-[6px]'
        >
          <Form.Item
            name='hdrNm' 
            label='Title'
            className='mt-[5px]'
          >
            <Input
              showCount
              maxLength={50}
            />
          </Form.Item>
          <Form.Item>
            <CKEditorComponent initialValue={editorValue}/>
          </Form.Item>
          <Form.Item label="Files">
            <UploadComponent maxCount={8} files={lstFile} onChange={handleNewListFile} handleRemoveFile={handleRemoveFile}/>
          </Form.Item>
        </Form>
        <FloatButton
          onClick={handleSave}
          icon={<SaveOutlined className='text-[18px]'/>}
          type="primary"
        />
      </div>
    );
  }
}

export default Editor;