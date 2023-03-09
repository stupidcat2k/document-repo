import React, { useState } from 'react';
import {
  SaveOutlined
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { Form, Input } from 'antd';
import { useNotify } from '@/hooks/NotificationHook';
import { STATUS_TYPE } from '@/core/Constants';
import { createDoc } from '@/api/docApi';
import { useLoading } from '@/hooks/LoadingHook';
import { useRouter } from 'next/router';

const CKEditorComponent = dynamic(() => import('@/components/CKEditor'), {
  ssr: false
});

function Editor() {

  const [form] = Form.useForm();
  const notify = useNotify();
  const [showLoading, hideLoading] = useLoading();
  const [editorValue, setEditorValue] = useState('New document without content');
  const router = useRouter();

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
      try {
        showLoading();
        const ro = {
          spcId: router.query.id,
          txtCtnt: txtCtnt,
          hdrNm: hdrNm
        }
        const { message, success, data} = await createDoc(ro);
        if ( success ) {
          notify(STATUS_TYPE.SUCCESS, 'Create successfully!');
          router.push(`/file/${data}`);
        } else {
          notify(STATUS_TYPE.WARNING, message);
        }
      } finally {
        hideLoading();
      }
    }
  }

  return (
      <div>
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
        </Form>
        <div className='ant-back-top bottom-24'>
          <div className='ant-back-top-content bg-blue-500'>
            <div className='ant-back-top-icon flex justify-center pt-[8px]'  onClick={() => handleSave()}>
              <SaveOutlined className='anticon anticon-vertical-align-top'/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Editor;