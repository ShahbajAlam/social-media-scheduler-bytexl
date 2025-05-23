## Best Practices and Debugging in real-world React apps

In modern React development, ensuring application performance and maintainability is just as important as building features. This guide provides an overview of the tools and best practices we’ve integrated into our project to support efficient debugging and render optimization. By leveraging React’s built-in features such as `StrictMode`, `useDebugValue`, and the React Profiler, along with careful side effect management, we aim to build robust and scalable applications while maintaining a smooth developer experience. Whether you're onboarding or revisiting optimization techniques, this document serves as a practical reference to keep our codebase clean, performant, and future-ready.

**1. React StrictMode**

**StrictMode** is a React component that helps identify potential issues in an application during development.

Benefits:

-   Detects unsafe lifecycle methods
-   Warns about legacy API usage
-   Helps prepare components for concurrent rendering
-   Double-invokes rendering logic to surface side effects

How to Use:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Note: StrictMode has no impact on production builds.

---

**2. useDebugValue in Custom Hooks**

**useDebugValue** enhances the debugging of custom hooks by labeling internal state values in React Developer Tools.

Example:

```
import { useState, useEffect, useDebugValue } from "react";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch");
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

  useDebugValue(loading ? "Loading..." : `Loaded ${posts.length} posts`);
  return { posts, loading, error, setPosts };
};
```

View it:

-   In the React DevTools → Components → The Component which is calling this custom hook.
-   It appears under the custom hook with a label like: "Loaded 5 posts"

---

**3. React Profiler for Performance Insights**

The React Profiler helps identify unnecessary re-renders and slow components.

Setup:

-   Install React Developer Tools (for Chrome or Firefox)
-   Open DevTools → Profiler tab
-   Click "Record", interact with your app, then "Stop"

What You’ll See:

-   Flamegraphs showing component render times
-   Detailed re-render reasons: state, props, or context
-   Helps spot re-renders with no prop/state changes

---

**4. Cleaning Up Side Effects**

Proper cleanup in useEffect prevents memory leaks and bugs - especially with subscriptions, timers, or async tasks.

Good Practice:

```
useEffect(() => {
    const timeout = setTimeout(() => {
        setToast(null);
    }, 3000);

    return () => {
        console.log("setTimeout is cleared after 3 seconds");
        clearTimeout(timeout);
    };
}, [setToast]);
```

Note: In StrictMode, effects (and their cleanups) are run twice to detect bugs. This helps identify code that behaves incorrectly on re-runs.

---

**5. Summary & Best Practices**

| Tool / Practice   | Purpose                               | Benefit                               |
| ----------------- | ------------------------------------- | ------------------------------------- |
| StrictMode        | Highlight unsafe patterns             | Safer, forward-compatible code        |
| useDebugValue     | Custom hook debugging                 | DevTools visibility of internal state |
| React Profiler    | Visualize re-renders and slow updates | Performance insights                  |
| useEffect Cleanup | Remove timers, subscriptions, etc.    | Prevent memory leaks and race bugs    |
