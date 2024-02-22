
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string,
  username: String,
  email: String,
  password: String,
}

interface UsersArray extends Array<UserState> { }
interface Users {
  objUsers: UsersArray,
}

const initialState: Users = {
  objUsers: [
    { id: '1', username: 'Usuario1', email: 'usuario1@email.com', password: "1234" },
    { id: '2', username: 'Usuario2', email: 'usuario2@email.com', password: "1234" },
    { id: '3', username: 'Usuario3', email: 'usuario3@email.com', password: "1234" },
  ]
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      state.objUsers = [...state.objUsers, action.payload];
    }
  }
})

export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;

