import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ onChange, initialValue }) => {
  return (
    <div>
      <CKEditor
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
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;