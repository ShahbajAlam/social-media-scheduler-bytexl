## Refactoring Social Media Scheduler App with Context API

### 🛠 Project Context (Before Refactor)

Initially, the project structure was based on **prop drilling**:

-   **State management** (`posts`, `toast`, `loading`, etc.) was handled inside `App.jsx`.
-   **Actions** like `addPost` and `deletePost` were passed down to components (`PostForm`, `PostList`) via props.
-   **Loading states** (`loadingAtAdd`, `loadingAtDelete`, etc.) were passed separately.
-   **Toast** visibility and control were manually passed to `Toast.jsx`.
-   Each component depended heavily on parent props to work correctly.

✅ This worked for a smaller codebase, but introduced challenges:

-   Components became tightly **coupled** with `App.jsx`.
-   **Reusability** across new pages or new features (like edit, bulk delete) was difficult.
-   **Scaling issues**: every new state/action would increase props and complexity.

<hr>

To solve these issues, we migrated the project to use **React Context API** for **global state management**.

### ✨ Key Changes After Refactor

| Area                | Before                                                 | After (Using Context API)                              |
| :------------------ | :----------------------------------------------------- | :----------------------------------------------------- |
| Posts State         | Managed inside App.jsx and passed to PostList          | Managed in PostContext, accessed anywhere via usePosts |
| Add Post            | addPost passed via props to PostForm                   | PostForm calls addPost directly from usePosts          |
| Delete Post         | deletePost passed via props to PostList                | PostList calls deletePost directly from usePosts       |
| Loading States      | loadingAtAdd, loadingAtDelete passed as props          | Available globally in Context                          |
| Toast Notifications | Controlled manually in App.jsx and passed to Toast.jsx | Toast reads toast state directly from Context          |
| Detailed Post View  | Received posts as props                                | Uses usePosts to access posts directly                 |
