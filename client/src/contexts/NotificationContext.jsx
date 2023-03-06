import { createContext } from "react";
import { notification } from "antd";
import { NOTIFICATION_COLOR, STATUS_TYPE } from "../core/Constants";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notifyApi, contextHolder] = notification.useNotification();

  const notify = (type, message = "Something went wrong") => {
    type = Object.values(STATUS_TYPE).includes(type)
      ? type
      : STATUS_TYPE.WARNING;
    notifyApi[type]({
      message,
      className: NOTIFICATION_COLOR[type],
      duration: 3,
    });
  };

  return (
    <NotificationContext.Provider value={notify}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
