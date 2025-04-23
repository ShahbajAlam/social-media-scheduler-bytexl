## Key Changes

1.  ### **Routing with `react-router-dom`**

    -   Introduced `react-router-dom` for seamless navigation.
    -   Defined two main routes:

        -   `/` – Displays the PostForm and PostList components.
        -   `/post/:id` – Shows the detailed view of a selected post using the new `DetailedPost` component.

2.  ### **New Component: `DetailedPost`**

    -   Displays full details of a selected post, including title, content, image, platforms, scheduled time, and post ID.
    -   Uses `useParams` to extract the post ID from the route.
    -   Includes a “Go Back” button using `useNavigate` for user-friendly navigation.

3.  ### **Clickable Post Navigation**

    -   In `PostList`, each post now includes a "compass" icon button.
    -   Clicking the button navigates to the post’s detail page via `<NavLink to={`/post/${post.\_id}`}>`.
