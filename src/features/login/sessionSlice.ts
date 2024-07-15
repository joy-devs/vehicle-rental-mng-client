import { createSlice } from "@reduxjs/toolkit";
 
export interface TSess {
    token: string |null;
    user: null | any;
}
 
const initialState:TSess = {
    token:null,
    user: null
}
 
const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        logSession: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logoutSession: (state) => {
            state.token = null;
            state.user = null
        }
    }
})
 
export const { logSession, logoutSession } = sessionSlice.actions
export default sessionSlice.reducer