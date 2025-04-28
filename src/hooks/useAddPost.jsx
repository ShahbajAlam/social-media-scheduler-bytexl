import { useState } from "react";

const useAddPost = (setPosts, setToast) => {
    const [loading, setLoading] = useState(false);

    const addPost = async (post) => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            if (!res.ok) {
                setToast({
                    message: res.statusText || "Failed to add post",
                    type: "error",
                });
                return;
            }

            const data = await res.json();

            setPosts((prevPosts) => [data.post, ...prevPosts]);
            setToast({
                message: "Post scheduled successfully!",
                type: "success",
            });
        } catch (err) {
            setToast({
                message: err.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    return { addPost, loading };
};

export default useAddPost;
