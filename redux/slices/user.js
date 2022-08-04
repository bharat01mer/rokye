import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const produrl="https://rokye.herokuapp.com/property" 
const devUrl="http://localhost:4000/property"

export const userApi=createApi({
    reducerPath:"user",
    baseQuery: fetchBaseQuery({
        baseUrl:produrl
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