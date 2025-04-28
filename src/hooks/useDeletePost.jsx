import { useState } from "react";

export default function useDeletePost(posts, setPosts, setToast) {
    const [loading, setLoading] = useState({
        flag: false,
        id: null,
    });

    const deletePost = async (postId) => {
        setLoading({
            flag: true,
            id: postId,
        });
        try {
            const res = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                setToast({
                    message: res.statusText,
                    type: "error",
                });
                return;
            }
            await res.json();
            setPosts(posts.filter((p) => p._id !== postId));
            setToast({
                message: "Post deleted successfully!",
                type: "success",
            });
        } catch (err) {
            setToast({
                message: err.message,
                type: "error",
            });
        } finally {
            setLoading({
                flag: false,
                id: null,
            });
        }
    };

    return { deletePost, loading };
}
