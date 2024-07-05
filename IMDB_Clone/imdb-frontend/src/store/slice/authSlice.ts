import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/auth"
import { getUserFromToken } from "../../Utils/tokenUtils"

export interface AuthState {
  user: User | null
}

export const initialState: AuthState = {
  user: getUserFromToken(),
}

export const loginSlice = createSlice({
  initialState,
  name: "authStatus",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { setUser, logout } = loginSlice.actions
export default loginSlice.reducer