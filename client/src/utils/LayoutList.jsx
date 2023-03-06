import React from 'react';
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Link from 'next/link';

export const UI_KEY = {
    SPACE:               'space',
    Trash:    'trash',
};

export const SPACE_LIST = [
    {
        key:   UI_KEY.SPACE,
        label: <Link href='/'>Space</Link>,
        icon:  <FolderOutlined />
    },
    {
        key:   UI_KEY.Trash,
        label: <Link href='/404'>Trash</Link>,
        icon:  <DeleteOutlined />
    },
];
