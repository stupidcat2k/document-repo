import React from 'react';
import PropTypes from 'prop-types';
import {
  FolderOutlined
} from '@ant-design/icons';

const Folder = ({id, name}) => {   
  return  (
    <div className="card-panel folder hover:bg-gray-300 flex bg-white" key={id}><FolderOutlined style={{ fontSize: '24px' }} /> 
      <span className='text-center pt-[2px] pl-2 text-[16px] line-clamp-1'> {name} </span>
    </div>
  );
};

Folder.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};

export default Folder;
