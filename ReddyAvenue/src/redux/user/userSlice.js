import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInfailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            
        },
        deleteUserStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteUserSuccess:(state)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=null;
        },
        deleteUserFailure :(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signoutSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        }

    },
});

export const {signInStart,signInSuccess,signInfailure,updateFailure,updateSuccess,updateStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess}=userSlice.actions;

export default userSlice.reducer;
