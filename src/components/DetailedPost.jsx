import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailedPost = ({ posts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((p) => p._id === id);

    if (!post) {
        return (
            <div className="post-details-container">
                <h2 className="error-text">Post not found</h2>
                <button className="back-button" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="post-details-container">
            <h2 className="post-title">{post.title}</h2>

            <p className="post-content">{post.content}</p>

            {post.image && (
                <div className="post-image-container">
                    <img
                        src={post.image}
                        alt="Post Visual"
                        className="post-image"
                    />
                </div>
            )}

            <div className="post-platforms">
                <h4>Platforms:</h4>
                <ul>
                    {post.platforms.map((platform, index) => (
                        <li key={index}>{platform}</li>
                    ))}
                </ul>
            </div>

            <div className="post-meta">
                <p>
                    <strong>Scheduled For:</strong>{" "}
                    {new Date(post.scheduledFor).toLocaleString()}
                </p>
                <p>
                    <strong>Post ID:</strong> {post._id}
                </p>
            </div>

            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default DetailedPost;
