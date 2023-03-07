import React, { useEffect, useRef, useState } from "react";
import {
  SaveOutlined
} from '@ant-design/icons';

function Editor() {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
  }, []);

  return (
    <div>
      {editorLoaded ? (
        <div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            ckfinder: {
              // Upload the images to the server using the CKFinder QuickUpload command
              // You have to change this address to your server that has the ckfinder php connector
              uploadUrl: '/upload/ckeditor' //Enter your upload url
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data })
          }}
          
        />
          <div className='ant-back-top bottom-24'>
            <div className='ant-back-top-content bg-blue-500'>
              <div className='ant-back-top-icon flex justify-center pt-[8px]'>
                <SaveOutlined className='anticon anticon-vertical-align-top'/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;