import React from "react";
import BlogList from "../components/BlogList";

const BlogHome = ({ posts, setPosts }) => (
    <BlogList posts={posts} setPosts={setPosts} />
);

export default BlogHome;
