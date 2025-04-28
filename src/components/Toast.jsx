import React, { useEffect } from "react";
import { usePosts } from "../context/PostContext";

const Toast = () => {
    const { toast, setToast } = usePosts();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [toast, setToast]);

    if (!toast) return null;

    return (
        <div className={`toast toast-${toast.type} show`}>{toast.message}</div>
    );
};

export default Toast;
