import { useState, useEffect } from "react";

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");

                if (!res.ok) {
                    throw new Error(res.statusText || "Failed to fetch posts");
                }

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error, setPosts };
};

export default useFetchPosts;
