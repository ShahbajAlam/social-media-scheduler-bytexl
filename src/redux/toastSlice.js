import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: null,
    reducers: {
        setToast: (_, action) => action.payload,
        clearToast: () => null,
    },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
