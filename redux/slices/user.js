import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const produrl =
  process.env.NODE_ENV === "production"
    ? "https://rokye.herokuapp.com/user/"
    : "http://localhost:4000/user/";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: produrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().util?.user?.data?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    addFavorite: builder.mutation({
      query: ({ id, data }) => ({
        url: `/favorite/${id}`,
        method: "PATCH",
        body: { data },
      }),
    }),
    updateUserData: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllUser: builder.query({
      query: (page) => ({
        url: `/all?page=${page}`,
      }),
    }),
    deleteUser: builder.mutation({
        query:(id)=>({
            url:`/${id}`,
            method:"DELETE"
        })
    })
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useAddFavoriteMutation,
  useUpdateUserDataMutation,
  useGetAllUserQuery,
  useDeleteUserMutation
} = userApi;
