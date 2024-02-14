import { createSlice } from "@reduxjs/toolkit";

import { users } from "../utils/data";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? {},
  // user:{}
  // user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? {},
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      window.localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    logout(state) {
      // state.user = null;
      // localStorage?.removeItem("userInfo");
      state.user = {};
      window.localStorage.removeItem("userInfo"); 
    },
  },
});

export default userSlice.reducer;

export function Login(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login({
      user}));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}
