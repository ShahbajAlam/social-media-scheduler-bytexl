import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        toast: toastReducer,
    },
});
