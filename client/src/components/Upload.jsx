import React, { useState } from 'react';
import { Upload, Modal, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNotify } from '@/hooks/NotificationHook';
import { FILE_TYPE, STATUS_TYPE } from '@/core/Constants';
import docIcon from '../images/ico-doc.png';

function UploadComponent(props) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileLst, setFileList] = useState([]);
  const notify = useNotify();

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj);
    }
    
    if (file.type.startsWith('image/')) {
      setPreviewImage(URL.createObjectURL(file.originFileObj));
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }
  };

  const handleChange = ({ fileList }) => {
    const allowedFileTypes = FILE_TYPE;
    const filteredFileList = fileList.filter(file => allowedFileTypes.includes(file.type));
    setFileList(filteredFileList);
    props.onChange(filteredFileList);
  };

  const beforeUpload = file => {
    const allowedFileTypes = FILE_TYPE;
    const isAllowedFileType = allowedFileTypes.includes(file.type);
    const fileSize = file.size / 1024 / 1024 < 100;
    if (!isAllowedFileType) {
        notify(STATUS_TYPE.ERROR,'You can only upload image, word, or pdf files!');
      }
    if (!fileSize) {
        notify(STATUS_TYPE.ERROR,'File must be smaller than 100MB!');
    }
    return isAllowedFileType && fileSize;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name={props.name || 'files'}
        listType="picture-card"
        fileList={fileLst}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {fileLst.length >= props.maxCount ? null : uploadButton}
      </Upload>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {previewImage && <img alt="example" style={{ width: '100%' }} src={previewImage} />}
      </Modal>
    </>
  );
}
export default UploadComponent;