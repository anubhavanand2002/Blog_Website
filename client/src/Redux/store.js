import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from './Features/authSlice';
import { userSlice } from "./Features/userSlice";

export default configureStore({
    reducer:{
        user: userSlice.reducer,
        auth:authSlice.reducer
    }
});