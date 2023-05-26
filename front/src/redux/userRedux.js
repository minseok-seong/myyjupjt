import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    userNum: "",
    uId: "",
    userimg: "",
  },

  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.userNum = action.payload.userNum;
      state.uId = action.payload._id;
    },
    logout: (state) => {
      state.username = "";
      state.userNum = "";
      state.uId = "";
      state.userimg = "";
    },
    adduserimg: (state, action) => {
      state.userimg = action.payload.userimg;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, adduserimg } = userSlice.actions;

export default userSlice.reducer;
