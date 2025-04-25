import React from "react";

export default function PostList() {
    return (
        <div className="posts-container">
            <h2>Scheduled Posts</h2>
            <div className="posts-list-container">
                <div id="postsList" className="posts-list"></div>
                <div id="emptyPostsMessage" className="empty-posts-message">
                    No posts scheduled. Create your first post!
                </div>
            </div>
        </div>
    );
}
