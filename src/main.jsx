import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";
import { PostProvider } from "./contexts/PostContext.jsx";

createRoot(document.getElementById("root")).render(
    <PostProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PostProvider>
);
