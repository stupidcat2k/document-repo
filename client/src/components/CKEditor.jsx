import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CKEditorComponent = ({ onChange, initialValue }) => {
  console.log(ClassicEditor);
  return (
    <div>
    <CKEditor
      editor={ClassicEditor}
      config={{
        ckfinder: {
          uploadUrl: 'http://localhost:4050/api/file/upload' 
        },
        imageUpload: (file, successCallback, failureCallback) => {
          formData.append('files', file);
          formData.append('docFolder', 'ckeditor');
          fetch(config.ckfinder.uploadUrl, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(result => {
            successCallback(result.url);
          })
          .catch(error => {
            failureCallback(error.message);
          });
        },
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data })
      }}
    />
    </div>
  );
};

export default CKEditorComponent;