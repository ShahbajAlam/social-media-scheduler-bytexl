import { useEffect } from "react";
import { usePosts } from "../contexts/PostContext";

const Toast = () => {
    const { toast, setToast } = usePosts();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => {
            console.log("setTimeout is cleared after 3 seconds");
            clearTimeout(timeout);
        };
    }, [setToast]);

    return (
        <div className={`toast toast-${toast.type} show`}>{toast.message}</div>
    );
};

export default Toast;
