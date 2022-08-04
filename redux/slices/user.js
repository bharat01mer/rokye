import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url=process.env.NODE_ENV==="production"? "https://rokye.herokuapp.com/user" :"http://localhost:4000/user"

export const userApi=createApi({
    reducerPath:"user",
    baseQuery: fetchBaseQuery({
        baseUrl:url
    }),
    endpoints:(builder)=>({
        createUser: builder.mutation({
            query:(data)=>({
                url:"/signup",
                method:"POST",
                body:data
            })
        }),
        loginUser: builder.mutation({
            query:(data)=>({
                url:"/login",
                method:"POST",
                body: data
            })
        }),
        addFavorite: builder.mutation({
            query:({id,data})=>({
                url:`/favorite/${id}`,
                method:"PATCH",
                body:{data}
            })
        }),
        updateUserData: builder.mutation({
            query:({id,data})=>({
                url:`/${id}`,
                method:"PATCH",
                body:data
            })
        })
    })
})


export const {useCreateUserMutation,useLoginUserMutation,useAddFavoriteMutation,useUpdateUserDataMutation}=userApi