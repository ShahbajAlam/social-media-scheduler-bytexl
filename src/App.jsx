import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Toast from "./components/Toast";
import { Route, Routes } from "react-router-dom";
import DetailedPost from "./components/DetailedPost";
import { usePosts } from "./contexts/PostContext";
import { useEffect } from "react";

const App = () => {
    const { loadingAtFetch, toast } = usePosts();

    useEffect(() => {
        console.log("This will log twice in StrictMode in dev!");
    }, []);

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
                                {loadingAtFetch ? (
                                    <div className="loading"></div>
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
