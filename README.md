## Refactoring the Social Media Scheduler App Using Custom Hooks

### 🛠 Project Context

Originally, the Social Media Scheduler app was built with:

-   State management (`useState`) directly inside `App.jsx`
-   API calls (`fetch`) inside `useEffect` or inside button handlers.
-   Delete and add operations tightly coupled with the main component logic.
-   Loading states global or not isolated properly.

This approach worked for a small-scale project, but as the app grew:

-   The `App.jsx` file became larger and harder to read.
-   Reusing logic between different parts became difficult.
-   Error handling was duplicated.
-   Managing per-action loading states (e.g., deleting a single post) was messy.

<hr>

### 🎯 What We Changed

We refactored the app by introducing three custom hooks:

| Hook              | Purpose                        | Location               |
| ----------------- | ------------------------------ | ---------------------- |
| **useFetchPosts** | Fetch scheduled posts from API | hooks/useFetchPosts.js |
| **useAddPost**    | Add a new post via API         | hooks/useAddPost.js    |
| **useDeletePost** | Delete a specific post via API | hooks/useDeletePost.js |

<hr>

### ✨ Detailed Changes and Why

#### 1. **Fetching Posts: `useFetchPosts`**

#### What Was Before:

-   In `App.jsx`, there was a `useEffect` making a `fetch('/api/posts')` call.
-   `useState` for posts was directly tied to App logic.
-   No separate error handling logic for fetch failures.

#### What We Did:

-   Moved the fetching logic into a **dedicated hook** called `useFetchPosts`.
-   Hook now manages `posts`, `loading`, and `error` internally.
-   Returned `setPosts` so that posts list can still be updated (e.g., after adding or deleting).

#### Why:

-   **Cleaner App.jsx** — removed fetch clutter.
-   **Better reusability** — if another page needed posts, `useFetchPosts` could be reused directly.
-   **Centralized error handling** for fetching posts.

<hr>

### 2. **Adding a Post: `useAddPost`**

#### What Was Before:

-   The `addPost` function was in `App.jsx`.
-   Inside it, `fetch('/api/posts', POST)` was written inline.
-   After adding, updating `scheduledPosts` was handled directly inside the same function.

#### What We Did:

-   Extracted `addPost` into `useAddPost(setPosts, setToast)`.
-   The hook handles:
    -   Making the POST request.
    -   Updating the posts list.
    -   Triggering appropriate toasts for success and failure.

#### Why:

-   **Separation of responsibilities** — App.jsx only calls `addPost(post)` without worrying about fetch details.
-   **Consistency** — All API interactions now handle errors and success messages uniformly.
-   **Future extensibility** — Easy to add retries, validations, etc., inside the hook without touching App logic.

<hr>

### 3. **Deleting a Post: `useDeletePost`**

#### What Was Before:

-   `deletePost` was a direct async function inside `App.jsx`.
-   There was no per-post loading.

#### What We Did:

-   Created `useDeletePost(setPosts, setToast)`.
-   Inside `useDeletePost`:
    -   Introduced `deletingPostId` to track **which** post is being deleted.
    -   Only that post's button shows a loading spinner.
    -   On success, the post is removed from local posts list and toast is shown.

#### Why:

-   **Per-post UX improvement** — user sees spinner only on the post being deleted.
-   **Simplified App logic** — no more managing `deletingPostId` manually inside App.jsx.
-   **Error-safe deletion** — if API fails, appropriate message is shown without app breaking.
