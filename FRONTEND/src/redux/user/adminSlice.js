import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentadmin: null,
    errorr: null,
    loadingg: false,
  };
  

  const adminSlice= createSlice({
        name:"admin",
        initialState,
        reducers:{
            adminSignInStart: (state) => {
                state.loadingg = true;
              },
              adminSignInSuccess: (state, action) => {
                state.currentadmin = action.payload;
                state.loadingg = false;
                state.errorr = null;
              },
              adminSignInFailure: (state, action) => {
                state.errorr = action.payload;
                state.loadingg = false;
              },
              signOutAdminSuccess: (state) => {
                state.currentadmin = null;  
                state.loadingg = false;
                state.errorr = null;
               
              },
              signOutAdminFailure: (state, action) => {
                state.errorr = action.payload;
                state.loadingg = false;
              },
        }
  })


  export const {
    adminSignInStart,
    adminSignInSuccess,
    adminSignInFailure,
    signOutAdminFailure,
    signOutAdminSuccess
  }=adminSlice.actions

  export default adminSlice.reducer;