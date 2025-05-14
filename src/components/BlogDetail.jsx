import { useParams, Link } from "react-router-dom";
import "../styles/BlogDetail.css";

const BlogDetail = ({ posts }) => {
    const { id } = useParams();
    const post = posts.find((p) => p.id.toString() === id);

    return post ? (
        <div className="blog-detail">
            <h2>{post.title}</h2>
            <p>
                <em>By {post.author}</em>
            </p>
            <p>{post.content}</p>
            <Link to={`/edit/${post.id}`}>
                <button className="edit-btn">Edit Post</button>
            </Link>
        </div>
    ) : (
        <p>Post not found</p>
    );
};

export default BlogDetail;
