import React, { useState } from "react";
import {
  SaveOutlined
} from '@ant-design/icons';
import dynamic from 'next/dynamic';

const CKEditorComponent = dynamic(() => import('@/components/CKEditor'), {
  ssr: false
});

function Editor() {
  const [editorValue, setEditorValue] = useState('');

  const handleEditorChange = (data) => {
    setEditorValue(data);
  };
  return (
      <div>
        <h1>CKEditor example</h1>
        <CKEditorComponent onChange={handleEditorChange} initialValue={editorValue} />
        <div className='ant-back-top bottom-24'>
          <div className='ant-back-top-content bg-blue-500'>
            <div className='ant-back-top-icon flex justify-center pt-[8px]'>
              <SaveOutlined className='anticon anticon-vertical-align-top'/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Editor;