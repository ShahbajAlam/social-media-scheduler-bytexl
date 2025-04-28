import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";
import { Route, Routes } from "react-router-dom";
import DetailedPost from "./components/DetailedPost";
import useFetchPosts from "./hooks/useFetchPosts";
import useAddPost from "./hooks/useAddPost";
import useDeletePost from "./hooks/useDeletePost";

const App = () => {
    const [toast, setToast] = useState(null);
    const { loading: loadingAtFetch, posts, error, setPosts } = useFetchPosts();
    const { addPost, loading: loadingAtAdd } = useAddPost(setPosts, setToast);
    const { deletePost, loading: loadingAtDelete } = useDeletePost(
        posts,
        setPosts,
        setToast
    );

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
                                <PostForm
                                    onSubmit={addPost}
                                    loadingAtAdd={loadingAtAdd}
                                />
                                {loadingAtFetch ? (
                                    <div className="loading"></div>
                                ) : (
                                    <PostList
                                        onDelete={deletePost}
                                        posts={posts}
                                        error={error}
                                        loadingAtDelete={loadingAtDelete}
                                    />
                                )}
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
                    element={<DetailedPost posts={posts} />}
                />
            </Routes>
        </div>
    );
};

export default App;
