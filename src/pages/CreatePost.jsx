import React from "react";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ setPosts }) => {
    const navigate = useNavigate();

    const handleCreate = (newPost) => {
        setPosts((prev) => [...prev, { ...newPost, id: Date.now() }]);
        navigate("/");
    };

    return <BlogForm onSubmit={handleCreate} />;
};

export default CreatePost;
