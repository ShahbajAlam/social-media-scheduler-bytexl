import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";
import { Route, Routes } from "react-router-dom";
import DetailedPost from "./components/DetailedPost";

const App = () => {
    const [toast, setToast] = useState(null);
    const [scheduledPosts, setScheduledPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setScheduledPosts(data));
    }, []);

    const addPost = async (post) => {
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
        }
    };

    const deletePost = async (postId) => {
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
        }
    };

    return (
        <div className="min-h-screen">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="header">
                                <h1>Social Media Scheduler</h1>
                                <p>
                                    Plan and schedule your social media content
                                    in one place
                                </p>
                            </div>
                            <div className="content-container">
                                <PostForm onSubmit={addPost} />
                                <PostList
                                    posts={scheduledPosts}
                                    onDelete={deletePost}
                                />
                            </div>
                            {toast && (
                                <Toast
                                    message={toast.message}
                                    type={toast.type}
                                    onClose={() => setToast(null)}
                                />
                            )}
                        </>
                    }
                />
                <Route
                    path="/post/:id"
                    element={<DetailedPost posts={scheduledPosts} />}
                />
            </Routes>
        </div>
    );
};

export default App;
