import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";

const EditPost = ({ posts, setPosts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id.toString() === id);

    const handleUpdate = (updatedPost) => {
        const updatedList = posts.map((p) =>
            p.id.toString() === id ? { ...p, ...updatedPost } : p
        );
        setPosts(updatedList);
        navigate("/");
    };

    return post ? (
        <BlogForm onSubmit={handleUpdate} initialData={post} />
    ) : (
        <p>Post not found</p>
    );
};

export default EditPost;
