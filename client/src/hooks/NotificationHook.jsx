import { useContext } from "react";

import { NotificationContext } from "../contexts/NotificationContext";

export const useNotify = () => {
    return useContext(NotificationContext);
}
