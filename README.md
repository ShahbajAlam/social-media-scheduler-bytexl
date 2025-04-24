### Key Changes

---

### 1. **API Integration for Fetching Posts**

In the previous version, posts were fetched from `localStorage`. Now, posts are fetched from the API using the `GET /api/posts` endpoint. The component also manages a `loading` state during this process:

```
useEffect(() => {
    async function getPosts() {
        try {
            setLoading(true);
            const res = await fetch("/api/posts");
            const data = await res.json();
            setScheduledPosts(data);
        } catch (err) {
            setToast({ message: err.message, type: "error" });
        } finally {
            setLoading(false);
        }
    }
    getPosts();
}, []);

```

-   Posts are now retrieved from the backend.
-   A loading spinner or visual indicator can be shown while posts are being fetched.

---

### 2. **Adding Posts via API**

Posts are added using the `POST /api/posts` endpoint. The `loading` state is also managed during the post creation process.

```
const addPost = async (post) => {
    try {
        setLoading(true);
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        });
        if (!res.ok) {
            setToast({ message: res.statusText, type: "error" });
            return;
        }
        const data = await res.json();
        setScheduledPosts([...scheduledPosts, data.post]);
        setToast({ message: "Post scheduled successfully!", type: "success" });
    } catch (err) {
        setToast({ message: err.message, type: "error" });
    } finally {
        setLoading(false);
    }
};
```

-   A loading state is triggered during the entire asynchronous operation.
-   On success, the post is appended to the current state.
-   Appropriate success or error toast messages are displayed.

---

### 3. **Deleting Posts via API**

Posts are deleted using the `DELETE /api/posts/:id` endpoint, and the `loading` state is toggled during the process:

```
const deletePost = async (postId) => {
    try {
        setLoading(true);
        const res = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            setToast({ message: res.statusText, type: "error" });
            return;
        }
        await res.json();
        setScheduledPosts(scheduledPosts.filter((p) => p._id !== postId));
        setToast({ message: "Post deleted successfully!", type: "success" });
    } catch (err) {
        setToast({ message: err.message, type: "error" });
    } finally {
        setLoading(false);
    }
};

```

-   The post is removed from the UI only after a successful delete response.
-   During deletion, the app displays a loading indicator.

---

### 4. **Field Update: `post.id` → `post._id`**

To align with the API's response structure, the unique identifier of posts has been updated:

-   All references of `post.id` have been replaced with `post._id`.

This ensures correct post identification when performing actions like view, delete, or update.
