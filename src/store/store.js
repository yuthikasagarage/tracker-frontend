import { configureStore } from '@reduxjs/toolkit'
import trackerReducer from './trackerSlice'
import authReducer from './AuthSlice'


export const store = configureStore({
    reducer: {
        tracker: trackerReducer,
        auth: authReducer        
    },
    devTools: true,
      
})