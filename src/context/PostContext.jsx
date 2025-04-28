import { createContext, useContext, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import useAddPost from "../hooks/useAddPost";
import useDeletePost from "../hooks/useDeletePost";

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [toast, setToast] = useState(null);
    const { posts, loading: loadingAtFetch, error, setPosts } = useFetchPosts();
    const { addPost, loading: loadingAtAdd } = useAddPost(setPosts, setToast);
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

const usePosts = () => {
    const context = useContext(PostContext);
    if (!context)
        throw new Error(
            "Maybe you are trying to access context outside of its provider...😟"
        );
    return context;
};

export { PostProvider, usePosts };
