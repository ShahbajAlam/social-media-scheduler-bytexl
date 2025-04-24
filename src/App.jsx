import React, { useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";
import { Route, Routes } from "react-router-dom";
import DetailedPost from "./components/DetailedPost";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./redux/postSlice";

const App = () => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);
    const { loading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

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
                                <PostForm />
                                {loading ? (
                                    <div className="loading" />
                                ) : (
                                    <PostList />
                                )}
                            </div>
                            {toast && <Toast />}
                        </>
                    }
                />
                <Route path="/post/:id" element={<DetailedPost />} />
            </Routes>
        </div>
    );
};

export default App;
