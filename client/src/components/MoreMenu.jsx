import { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const MoreMenu = ({ onClick }) => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    e.domEvent.preventDefault();
    onClick(e.key);
    setVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  const handleMoreClick = () => {
    setVisible(true);
  };

  return (
    <div className='relative z-50 cursor-pointer'>
      <div onClick={handleMoreClick}>
        <MoreOutlined className='text-[20px]' />
      </div>
      <Dropdown
        visible={visible}
        onVisibleChange={(v) => setVisible(v)}
        overlay={menu}
      >
        <span></span>
      </Dropdown>
    </div>
  );
};

export default MoreMenu;
