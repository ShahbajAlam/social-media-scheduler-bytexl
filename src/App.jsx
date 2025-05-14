import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogHome from "./pages/BlogHome";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import BlogDetail from "./components/BlogDetail";
import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<BlogHome posts={posts} setPosts={setPosts} />}
                />
                <Route
                    path="/create"
                    element={<CreatePost setPosts={setPosts} />}
                />
                <Route
                    path="/post/:id"
                    element={<BlogDetail posts={posts} setPosts={setPosts} />}
                />
                <Route
                    path="/edit/:id"
                    element={<EditPost posts={posts} setPosts={setPosts} />}
                />
            </Routes>
        </>
    );
}

export default App;
