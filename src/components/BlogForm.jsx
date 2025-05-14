import React, { useState, useEffect } from "react";
import "../styles/BlogForm.css";

const BlogForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(
        initialData || {
            title: "",
            author: "",
            content: "",
        }
    );

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: "", author: "", content: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                required
            />
            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Content"
                required
                rows={7}
            />
            <button type="submit">
                {initialData ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
};

export default BlogForm;
