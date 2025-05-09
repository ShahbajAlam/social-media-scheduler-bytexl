import { createContext, useContext, useState, useEffect } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scheduledPosts, setScheduledPosts] = useState([]);

    // Fetch Posts on Load
    useEffect(() => {
        async function getPosts() {
            try {
                setLoading(true);
                const res = await fetch("/api/posts");
                const data = await res.json();
                setScheduledPosts(data);
            } catch (err) {
                setToast({ message: err.message, type: "error" });
            } finally {
                setLoading(false);
            }
        }
        getPosts();
    }, []);

    // Add New Post
    const addPost = async (post) => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),
            });
            if (!res.ok) {
                setToast({ message: res.statusText, type: "error" });
                return;
            }
            const data = await res.json();
            setScheduledPosts([...scheduledPosts, data.post]);
            setToast({
                message: "Post scheduled successfully!",
                type: "success",
            });
        } catch (err) {
            setToast({ message: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Delete Post
    const deletePost = async (postId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                setToast({ message: res.statusText, type: "error" });
                return;
            }
            await res.json();
            setScheduledPosts(scheduledPosts.filter((p) => p._id !== postId));
            setToast({
                message: "Post deleted successfully!",
                type: "success",
            });
        } catch (err) {
            setToast({ message: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                scheduledPosts,
                loading,
                toast,
                setToast,
                addPost,
                deletePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error("usePosts must be used within PostProvider");
    return context;
};
