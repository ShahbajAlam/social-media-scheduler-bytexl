import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
