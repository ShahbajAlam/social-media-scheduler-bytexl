import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import "../styles/BlogList.css";

const BlogList = ({ posts, setPosts }) => {
    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const confirmDelete = () => {
        setPosts(posts.filter((post) => post.id !== postToDelete));
        setShowModal(false);
    };

    if (posts.length === 0) {
        return (
            <h2 style={{ textAlign: "center" }}>
                No posts yet, start writing your first blog...
            </h2>
        );
    }

    return (
        <>
            <input
                type="text"
                className="search-box"
                placeholder="Search by title or author..."
                onChange={(e) =>
                    setPosts(
                        posts.filter(
                            (p) =>
                                p.title
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase()) ||
                                p.author
                                    .toLowerCase()
                                    .includes(e.target.value.toLowerCase())
                        )
                    )
                }
            />
            <div className="blog-list">
                {posts.map((post) => (
                    <div className="blog-card" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>
                            <strong>By:</strong> {post.author}
                        </p>
                        <p>{post.content.substring(0, 100)}...</p>
                        <div className="btn-group">
                            <Link to={`/post/${post.id}`}>
                                <button className="read-more">Read More</button>
                            </Link>
                            <div>
                                <Link to={`/edit/${post.id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        setPostToDelete(post.id);
                                        setShowModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this post?"
            />
        </>
    );
};

export default BlogList;
