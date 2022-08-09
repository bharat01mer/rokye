import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const produrl=process.env.NODE_ENV==="production" ?"https://rokye.herokuapp.com/contact" :"http://localhost:4000/contact"

export const contactApi=createApi({
    reducerPath:"contact",
    baseQuery:fetchBaseQuery({
        baseUrl:produrl 
    }),
    endpoints:(builder)=>({
        addContact: builder.mutation({
            query:(data)=>({
                url:"/",
                method:"POST",
                body:data
            })
        }),
        getAllContact: builder.query({
            query: (page)=>`${produrl}?page=${page}`
        }),
        deleteContact: builder.mutation({
            query: (id)=>({
                url:`/${id}`,
                method:"DELETE"
            })
        }),
    })
})


export const {useAddContactMutation,useGetAllContactQuery,useDeleteContactMutation}=contactApi