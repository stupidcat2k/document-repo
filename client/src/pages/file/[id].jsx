import React, { useState } from 'react';
import {
  SaveOutlined
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { Form, Input } from 'antd';

const CKEditorComponent = dynamic(() => import('@/components/CKEditor'), {
  ssr: false
});

function Editor() {

  const [form] = Form.useForm();

  const [editorValue, setEditorValue] = useState('New document without content');

  const handleEditorChange = (data) => {
    setEditorValue(data);
  };

  const handleSave = () => {
    const { hdrNm, txtCtnt} = form.getFieldsValue();
    console.log(txtCtnt);
  }

  return (
      <div>
        <Form
        form={form}
        name='control-hooks'
        className='pl-[4px]'
        >
          <Form.Item
          name='hdrNm' 
          label='Title'
          initialValue='Title without name'
          >
            <Input
            showCount
            maxLength={50}/>
          </Form.Item>
          <Form.Item
          name='txtCtnt'
          >
          <CKEditorComponent onChange={handleEditorChange} initialValue={editorValue} />
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