import { createSlice } from "@reduxjs/toolkit";
import {
	loginUserCognito,
	SignOutUserCognito,
	SignUpUserCognito,
	getUser,
} from "../api/authApi";
const initialState = {
	user: false,
	signUpStatus: null,
	fetching: false,
	error: null,
};

export const authSlice = createSlice({
	name: "auth/login",
	initialState,
	reducers: {
		clearSignUpStatus: (state) => {
			state.signUpStatus = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.signUpStatus = null;
			state.fetching = false;
		});
		builder.addCase(getUser.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.fetching = false;
			state.error = '';
		});

		builder.addCase(loginUserCognito.fulfilled, (state, action) => {
			state.user = action.payload;
			state.signUpStatus = null;
			state.fetching = false;
		});
		builder.addCase(loginUserCognito.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(loginUserCognito.rejected, (state, action) => {	
			state.fetching = false;
			state.error = action.error.message.substring(0, action.error.message.indexOf(':'));
		});

		builder.addCase(SignOutUserCognito.fulfilled, (state, action) => {
			state.user = false;
			state.fetching = false;
		});
		builder.addCase(SignOutUserCognito.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(SignOutUserCognito.rejected, (state, action) => {
			state.fetching = false;
			state.error =  action.error.message.substring(0, action.error.message.indexOf(':'));
		});

		builder.addCase(SignUpUserCognito.fulfilled, (state, action) => {
			state.signUpStatus = action.payload;
			state.fetching = false;
		});
		builder.addCase(SignUpUserCognito.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(SignUpUserCognito.rejected, (state, action) => {
			state.fetching = false;
			state.error =  action.error.message.substring(0, action.error.message.indexOf(':'));
		});
	},
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
