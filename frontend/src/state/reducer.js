import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  testHistory: null,
  darkTheme: true,
};

const userSlice = createSlice({
  name: "user",
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setTestHistory(state, action) {
      state.testHistory = action.payload;
    },
    setTheme(state, action) {
      state.darkTheme = action.payload;
    },
  },
});

export const { setUserData, setTestHistory, setTheme } = userSlice.actions;

export default userSlice.reducer;
