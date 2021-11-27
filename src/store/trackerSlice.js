import { createSlice } from '@reduxjs/toolkit'
import { createRecord, updateRecord, deleteRecord, getUserRecords } from '../api/trackerApi'
const initialState = {
   
        records: [],
        lastCreate: null,
        lastUpdate: null,
        lastDelete: null,
    
}

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  extraReducers: (builder) => {    
    builder.addCase(getUserRecords.fulfilled, (state, action) => {
        state.records = action.payload;
    })
    builder.addCase(createRecord.fulfilled, (state, action) => {
        state.lastCreate = action.payload
    })
    builder.addCase(updateRecord.fulfilled, (state, action) => {
        state.lastUpdate = action.payload
    })
    builder.addCase(deleteRecord.fulfilled, (state, action) => {
        state.lastDelete = action.payload
    })
      
  },
  
})

// Action creators are generated for each case reducer function
export const trackerActions = trackerSlice.actions

export default trackerSlice.reducer