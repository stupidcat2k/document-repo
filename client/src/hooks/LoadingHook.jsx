import { useContext } from "react";

import { LoadingContext } from "../contexts/LoadingContext";

export const useLoading = () => {
    const setLoading = useContext(LoadingContext);

    const showLoading = () => {
        setLoading(true);
    }

    const hideLoading = () => {
        setLoading(false);
    }

    return [showLoading, hideLoading];
}
