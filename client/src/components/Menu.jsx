/** @format */

import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "@/redux/authAction";
import { useLoading } from "@/hooks/LoadingHook";
import {
  selectUsername,
} from "@/redux/authSelectors";  
import { MenuContainer, LogoutButton } from "./styles/Menu.style";
import { MENU_LIST } from "@/utils/MenuList";
import { Router } from "next/router";

const MenuApp = ({ theme = "dark" }) => {
  const dispatch = useDispatch();
  const currentUsername = useSelector(selectUsername);
  const [showLoading, hideLoading] = useLoading();

  const handleLogout = async () => {
      try {
      showLoading();
      await dispatch(logoutAction());
    } finally {
      hideLoading();
      Router.push('/login');
    }
  };

  const login = Object.values({
    LOGIN: {
      key: "login",
      label: currentUsername,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <LogoutButton onClick={handleLogout}>
              <p>Logout</p>
            </LogoutButton>
          ),
          key: "logout",
        },
      ],
    },
  });

  return (
    <>
      <MenuContainer>
        <Menu
          theme={theme}
          mode="horizontal"
          items={MENU_LIST}
          id="menu"
        />
        <div className="right-container">
          <Menu
            theme={theme}
            mode="horizontal"
            items={login}
            id="user"
          />
        </div>
      </MenuContainer>
    </>
  );
};

export default MenuApp;
