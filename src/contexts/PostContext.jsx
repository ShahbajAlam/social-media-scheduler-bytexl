import { createContext, useContext, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import useAddPost from "../hooks/useAddPost";
import useDeletePost from "../hooks/useDeletePost";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    // Use custom hook to fetch posts
    const { posts, loading: loadingAtFetch, error, setPosts } = useFetchPosts();

    // Use custom hook to add post
    const { addPost, loading: loadingAtAdd } = useAddPost(setPosts, setToast);

    // Use custom hook to delete post
    const { deletePost, loading: loadingAtDelete } = useDeletePost(
        posts,
        setPosts,
        setToast
    );

    return (
        <PostContext.Provider
            value={{
                posts,
                loadingAtFetch,
                error,
                toast,
                setToast,
                addPost,
                loadingAtAdd,
                deletePost,
                loadingAtDelete,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error("usePosts must be used within PostProvider");
    return context;
};
