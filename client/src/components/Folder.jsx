import React from 'react';
import PropTypes from 'prop-types';
import {
  FolderOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';

const Folder = ({id, name}) => {   
  return  (
    <div className="card-panel folder hover:bg-[#EFF0F0] flex bg-white" key={id}><FolderOutlined style={{ fontSize: '24px' }} /> 
      <Tooltip title={name} placement="bottom">
        <span className='pt-[2px] pl-2 text-[14px] line-clamp-1'> {name} </span>
      </Tooltip>
    </div>
  );
};

Folder.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};

export default Folder;
