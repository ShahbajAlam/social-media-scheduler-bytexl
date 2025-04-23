import React from "react";
import { NavLink } from "react-router-dom";

const PostList = ({ posts, onDelete }) => {
    if (posts.length === 0) {
        return (
            <div id="emptyPostsMessage" className="empty-posts-message">
                No posts scheduled. Create your first post!
            </div>
        );
    }

    return (
        <div className="posts-container">
            <h2>Scheduled Posts</h2>
            <div className="posts-list-container">
                <div id="postsList" className="posts-list">
                    {posts
                        .sort(
                            (a, b) =>
                                new Date(a.scheduledFor) -
                                new Date(b.scheduledFor)
                        )
                        .map((post) => (
                            <div
                                className="post-card"
                                key={post._id}
                                data-post-id={post._id}
                            >
                                <div className="post-header">
                                    <div className="post-title">
                                        {post.title}
                                    </div>
                                    <div className="post-date">
                                        {new Date(
                                            post.scheduledFor
                                        ).toLocaleString()}
                                    </div>
                                </div>
                                <div className="post-content">
                                    {post.content}
                                </div>

                                <div className="post-platforms">
                                    {post.platforms.map((p) => (
                                        <span className="platform-tag" key={p}>
                                            <i
                                                className={getPlatformIcon(p)}
                                            ></i>{" "}
                                            {getPlatformName(p)}
                                        </span>
                                    ))}
                                </div>
                                <div className="post-actions">
                                    <NavLink
                                        to={`/post/${post._id}`}
                                        className="explore-post-button"
                                    >
                                        <i className="fa-solid fa-compass"></i>
                                    </NavLink>
                                    <button
                                        className="delete-post-button"
                                        onClick={() => onDelete(post._id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

const getPlatformIcon = (platformId) => {
    const icons = {
        twitter: "fab fa-twitter",
        facebook: "fab fa-facebook-f",
        instagram: "fab fa-instagram",
        linkedin: "fab fa-linkedin-in",
    };
    return icons[platformId] || "fas fa-globe";
};

const getPlatformName = (platformId) => {
    const names = {
        twitter: "Twitter/X",
        facebook: "Facebook",
        instagram: "Instagram",
        linkedin: "LinkedIn",
    };
    return names[platformId] || platformId;
};

export default PostList;
