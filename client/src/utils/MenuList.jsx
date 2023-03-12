import React from 'react';
import {
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import Link from 'next/link';

export const UI_KEY = {
    HOME:               'home',
    USER_MANAGEMENT:    'user-management',
};

export const MENU_LIST = [
    {
        key:   UI_KEY.HOME,
        label: <Link href='/'>Home</Link>,
        icon:  <SettingOutlined />
    },
    {
        key:   UI_KEY.USER_MANAGEMENT,
        label: 'Management',
        icon:  <UserOutlined />,
        children: [
            {
              label: <Link href='/user'>Users</Link>,
              key: 'User',
            },
            {
              label: <Link href='/role'>Roles</Link>,
              key: 'roles',
            },
            {
              label: <Link href='/group'>Groups</Link>,
              key: 'groups',
            },
          ],
    },
];
