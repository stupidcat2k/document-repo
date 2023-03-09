import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ initialValue }) => {
  return (
    <div id='ckeditor5'>
      <CKEditor
        className='h-[420px]'
        editor={ClassicEditor}
        data={initialValue}
        config={{
          simpleUpload: {
            uploadUrl: 'http://localhost:4050/api/file/ckeditor',
            setHeaders: function(xhr) {
              xhr.setRequestHeader('X-Image-Id', new Date().getTime());
            },
          },
        }}
      />
    </div>
  );
};

export default CKEditorComponent;