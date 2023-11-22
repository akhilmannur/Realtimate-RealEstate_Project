import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserDetails: (state, action) => {
      state.currentuser = {
        ...state.currentuser,
        rest: {
          ...state.currentuser?.rest, 
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          name: action.payload.name,

        },
      };
      state.loading = false;
      state.error = null;
    },
    
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserAvatar: (state, action) => {
      state.currentuser = {
        ...state.currentuser,
        rest: {
          ...state.currentuser.rest,
          avatar: action.payload, 
        },
      };
      state.loading = false;
      state.error = null;
    },
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserAvatar,
  updateUserDetails,
  updateUserFailure,
  updateUserStart
} = userSlice.actions;
export default userSlice.reducer;
