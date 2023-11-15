import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  error: null,
  loading: false,
  formData: {},
  errors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, action) => {
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
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFormError: (state, action) => {
      const { id, message } = action.payload;
      state.errors = { ...state.errors, [id]: message };
    },
    clearFormErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { signInStart, signInSuccess, signInFailure,setFormData, setFormError, clearFormErrors } = userSlice.actions;
export default userSlice.reducer;
