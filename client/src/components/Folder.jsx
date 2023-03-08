import React from 'react';
import PropTypes from 'prop-types';
import {
  FolderOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useRouter } from 'next/router';
const Folder = ({id, name, clicked, handleClickFolder , type}) => {   
  const router = useRouter();

  const handleDoubleClick= () => {
    if (type === 'folder') {
      router.push(`/folder/${id}`);
    } else {
      router.push(`/file/${id}`);
    }
  };

  return  (
    <div className={`card-panel folder hover:bg-[#EFF0F0] flex ${clicked ? 'bg-[#EFF0F0]': 'bg-white'} `} 
    id={id} 
    onClick={() => handleClickFolder(id)}
    onDoubleClick={handleDoubleClick}>
       {type === 'folder' ? <FolderOutlined className='text-[24px]'/>  : <FileTextOutlined className='text-[24px]'/>} 
        <Tooltip title={name} placement="bottom">
          <span className='pt-[2px] pl-2 text-[14px] line-clamp-1'> {name} </span>
        </Tooltip>
    </div>
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
