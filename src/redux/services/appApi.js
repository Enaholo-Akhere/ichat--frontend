import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//define a service user base url
const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  endpoints: (builder) => ({
    //creating the user
    signupUser: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
    //login the user in
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),

    //log out user
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: '/logout',
        method: 'DELETE',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useSignupUserMutation,
} = appApi;

export default appApi;
