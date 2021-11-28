import { createSlice } from "@reduxjs/toolkit";
import {
	createRecord,
	updateRecord,
	deleteRecord,
	getUserRecords,
} from "../api/trackerApi";
const initialState = {
	records: [],
	lastCreate: null,
	lastUpdate: null,
	lastDelete: null,
	fetching: false,
	error: null,
};

export const trackerSlice = createSlice({
	name: "tracker",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getUserRecords.fulfilled, (state, action) => {
			state.records = action.payload;
			state.fetching = false;
		});
		builder.addCase(getUserRecords.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(getUserRecords.rejected, (state, action) => {
			state.fetching = false;
			state.error = action.error;
		});

		builder.addCase(createRecord.fulfilled, (state, action) => {
			state.lastCreate = action.payload;
			state.fetching = false;
		});
		builder.addCase(createRecord.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(createRecord.rejected, (state, action) => {
			state.fetching = false;
			state.error = action.error;
		});

		builder.addCase(updateRecord.fulfilled, (state, action) => {
			state.lastUpdate = action.payload;
			state.fetching = false;
		});
		builder.addCase(updateRecord.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(updateRecord.rejected, (state, action) => {
			state.fetching = false;
			state.error = action.error;
		});

		builder.addCase(deleteRecord.fulfilled, (state, action) => {
			state.lastDelete = action.payload;
			state.fetching = false;
		});
		builder.addCase(deleteRecord.pending, (state, action) => {
			state.fetching = true;
		});
		builder.addCase(deleteRecord.rejected, (state, action) => {
			state.fetching = false;
			state.error = action.error;
		});
	},
});

// Action creators are generated for each case reducer function
export const trackerActions = trackerSlice.actions;

export default trackerSlice.reducer;
