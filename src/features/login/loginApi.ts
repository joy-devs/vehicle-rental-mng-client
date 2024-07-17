import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";


export interface logInUser {
  username: string;
  password: string;
}

export interface registerUser {
  fullName: string;
  password?: string;
  username: string;
  contactPhone: string;
  address: string;
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/login",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, logInUser>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),

    registerUser: builder.mutation<User, registerUser>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),

    logout: builder.mutation<null, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export default loginApi;
