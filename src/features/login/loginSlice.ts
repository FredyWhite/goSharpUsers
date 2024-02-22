import AsyncStorage from "@react-native-async-storage/async-storage";
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

const setLoginData = (action: PayloadAction<UserState> | undefined) => {
  AsyncStorage.setItem('login', JSON.stringify({
    isLoggedIn: action ? action.payload.isLoggedIn : false,
    username: action ? action.payload.email : null,
    email: action ? action.payload.username : null,
  }))
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.email = action.payload.email
      state.username = action.payload.username
      setLoginData(action)
    },
    loginOut: (state) => {
      state.isLoggedIn = false
      state.email = null
      state.username = null
      setLoginData(undefined)
    }

  }
})

export const { loginUser, loginOut } = loginSlice.actions;
export default loginSlice.reducer;
