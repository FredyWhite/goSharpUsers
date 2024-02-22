import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
}

export const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  email: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.email = action.payload.email
      state.username = action.payload.username
    },
    loginOut: (state) => {
      state.isLoggedIn = false
      state.email = null
      state.username = null
    }

  }
})

export const { loginUser, loginOut } = loginSlice.actions;
export default loginSlice.reducer;
