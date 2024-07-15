import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export interface LUser {
    username: string;
    password: string;
}
 
export const loginApi = createApi({
    reducerPath: "loginAPI",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/auth'}),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LUser,Partial<LUser>>({
            query: (user)=>({
                url:'login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: user
            })
        }),
        logout: builder.mutation<LUser, Partial<LUser>>({
            query: (user) => ({
                url: 'logout',
                method: 'POST',
                body: user
            })
        })
 
    })
})
 
export const { useLoginUserMutation} = loginApi