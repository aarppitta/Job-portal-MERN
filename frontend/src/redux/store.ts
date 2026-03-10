import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store = configureStore({
    reducer:{ //mention all the slices here
        auth:authSlice
    }
});

export default store;