import React from 'react';
import PropTypes from 'prop-types';
import {
  FolderOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { useRouter } from 'next/router';
const Folder = ({id, name, clicked, handleClickFolder , type, children}) => {   
  const router = useRouter();

  const handleDoubleClick= () => {
    if (type === 'folder') {
      router.push(`/folder/${id}`);
    } else {
      router.push(`/file/${id}`);
    }
  };

  return  (
    <Row>
      <div className={`card-panel folder hover:bg-[#EFF0F0] flex ${clicked ? 'bg-[#EFF0F0]': 'bg-white'} `} 
      id={id} 
      onClick={() => handleClickFolder(id)}
      onDoubleClick={handleDoubleClick}>
        <Col span={4}>{type === 'folder' ? <FolderOutlined className='text-[24px]'/>  : <FileTextOutlined className='text-[24px]'/>}</Col>
        <Col span={19}> 
          <Tooltip title={name} placement="bottom">
            <span className='pt-[2px] pl-2 text-[14px] line-clamp-1'> {name} </span>
          </Tooltip>
        </Col>
        <Col span={1}>
          {children}
        </Col>
      </div>
    </Row>
  );
};

Folder.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  clicked: PropTypes.bool,
  handleClickFolder: PropTypes.func,
  type: PropTypes.string
};

export default Folder;
