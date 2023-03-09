import { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const MoreMenu = ({ onClick, type }) => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    e.domEvent.preventDefault();
    onClick(e.key);
    setVisible(false);
  };

  const menu = () => {
    if (type === 'trash') {
      return (    
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="restore">Restore</Menu.Item>
          <Menu.Item key="delete">Delete Permanently</Menu.Item>
        </Menu>
      );
    } else {
      return (    
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="edit">Edit</Menu.Item>
          <Menu.Item key="delete">Delete</Menu.Item>
        </Menu>
      );
    }
  }


  const handleMoreClick = () => {
    setVisible(true);
  };

  return (
    <div className='relative z-50 cursor-pointer'>
      <div onClick={handleMoreClick}>
        <MoreOutlined className='text-[20px]' />
      </div>
      <Dropdown
        open={visible}
        onOpenChange={(v) => setVisible(v)}
        overlay={menu}
      >
        <span></span>
      </Dropdown>
    </div>
  );
};

export default MoreMenu;
