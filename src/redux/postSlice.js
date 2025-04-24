import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    return data;
});

export const addNewPost = createAsyncThunk(
    "posts/add",
    async (post, { rejectWithValue }) => {
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        });

        if (!res.ok) return rejectWithValue(res.statusText);
        const data = await res.json();
        return data.post;
    }
);

export const deletePostById = createAsyncThunk(
    "posts/delete",
    async (postId, { rejectWithValue }) => {
        const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
        if (!res.ok) return rejectWithValue(res.statusText);
        await res.json();
        return postId;
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add Post
            .addCase(addNewPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(addNewPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete Post
            .addCase(deletePostById.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePostById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((p) => p._id !== action.payload);
            })
            .addCase(deletePostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer;
