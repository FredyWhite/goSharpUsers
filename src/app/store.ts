import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import loginSlice from "../features/login/loginSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        login: loginSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;