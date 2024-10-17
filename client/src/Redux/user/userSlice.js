import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  clan:null,
  page:1,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.page = 1;
    },
    loginFailure: (state) => {
        state.loading = false;
    },
    logoutStart:(state) =>{
      state.loading = true;
    },
    logoutSuccess:(state) =>{
      state.currentUser = null,
      state.loading = false;
    },
    logoutFailure:(state) =>{
      state.loading = false;
    },
    clanjoin:(state,action) =>{
      state.clan = action.payload;
    },
    clanleave:(state) =>{
      state.clan = null;
    },
    pageChange:(state,action) =>{
      state.page = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart,loginSuccess,loginFailure,logoutStart,logoutSuccess,logoutFailure,clanjoin,clanleave,pageChange } = userSlice.actions

export default userSlice.reducer