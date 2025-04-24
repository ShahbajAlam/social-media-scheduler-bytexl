import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";

const App = () => {
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scheduledPosts, setScheduledPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                setLoading(true);
                const res = await fetch("/api/posts");
                const data = await res.json();
                setScheduledPosts(data);
            } catch (err) {
                setToast({
                    message: err.message,
                    type: "error",
                });
            } finally {
                setLoading(false);
            }
        }
        getPosts();
    }, []);

    const addPost = async (post) => {
        try {
            setLoading(true);
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });
            if (!res.ok) {
                setToast({
                    message: res.statusText,
                    type: "error",
                });
                return;
            }
            const data = await res.json();

            setScheduledPosts([...scheduledPosts, data.post]);
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

    const deletePost = async (postId) => {
        try {
            setLoading(true);
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

            setScheduledPosts(scheduledPosts.filter((p) => p._id !== postId));
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
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="header">
                <h1>Social Media Scheduler</h1>
                <p>Plan and schedule your social media content in one place</p>
            </div>
            <div className="content-container">
                <PostForm onSubmit={addPost} />
                {loading ? (
                    <div className="loading"></div>
                ) : (
                    <PostList posts={scheduledPosts} onDelete={deletePost} />
                )}
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default App;
