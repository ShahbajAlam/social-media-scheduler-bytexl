## Key Changes

### 1. **API Integration for Fetching Posts**

In the previous version, posts were fetched from `localStorage`. Now, posts are fetched from the API using the following code in `useEffect`:

```
useEffect(() => {
	fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setScheduledPosts(data));
}, []);
```

-   This calls the `GET /api/posts` endpoint to retrieve all scheduled posts when the component is first loaded.
-   The fetched data is then saved in the state `scheduledPosts`.

### 2. **Adding Posts via API**

Previously, posts were added to `localStorage`. Now, posts are sent to the API for creation:

```
const  addPost = async (post) => {
	 try {
		 const res = await  fetch("/api/posts",
			 {
				 method: "POST",
				 headers:
					 { "Content-Type": "application/json",
	            },
	            body: JSON.stringify(post),
        });
        if (!res.ok) {
	         setToast({ message: res.statusText, type: "error",
            }); return;
        }
        const data = await res.json();
        setScheduledPosts([...scheduledPosts, data.post]);
        setToast(
	        { message: "Post scheduled successfully!",
	        type: "success",
        });
    } catch (err) {
	     setToast({ message: err.message, type: "error",
        });
    }
};
```

-   The `POST /api/posts` endpoint is used to create a new post.
-   On success, the new post is added to the `scheduledPosts` state and a success toast is displayed.

### 3. **Deleting Posts via API**

Post deletion previously used `localStorage`. Now, posts are deleted via the API:

```
const  deletePost = async (postId) => {
	 try {
		 const res = await  fetch(`/api/posts/${postId}`,
			 { method: "DELETE",
	      });
	      if (!res.ok) {
		      setToast({ message: res.statusText, type: "error",
            }); return;
        }
        await res.json();
        setScheduledPosts(scheduledPosts.filter((p) => p._id !== postId));
        setToast(
	        { message: "Post deleted successfully!",
	        type: "success",
        });
    } catch (err) {
	     setToast({ message: err.message, type: "error",
        });
    }
};
```

-   The `DELETE /api/posts/:id` endpoint is used to delete a post by its ID.
-   The post is removed from the `scheduledPosts` state after a successful deletion.

### 4. **Field Update: `post.id` to `post._id`**

The post ID field has been updated from `id` to `_id` to match the API response format. All references to `post.id` have been replaced with `post._id`.
