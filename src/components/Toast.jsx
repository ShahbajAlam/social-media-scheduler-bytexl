import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../redux/toastSlice";

const Toast = () => {
    const toast = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!toast) return;

        const timeout = setTimeout(() => {
            dispatch(clearToast());
        }, 3000);

        return () => clearTimeout(timeout);
    }, [toast, dispatch]);

    if (!toast) return null;

    return (
        <div className={`toast toast-${toast.type} show`}>{toast.message}</div>
    );
};

export default Toast;
