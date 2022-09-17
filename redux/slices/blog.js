import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const produrl =
  process.env.NODE_ENV === "production"
    ? "https://api.rokye.com/blog/"
    : "http://localhost:4000/blog/";

export const blogApi=createApi({
    reducerPath:"blog",
    baseQuery:fetchBaseQuery({
        baseUrl:produrl,
        prepareHeaders:(headers,{getState})=>{
            const token=getState().util?.user.token

            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        createBlog:builder.mutation({
            query:(data)=>({
                url:"/",
                method:"POST",
                body:data
            })
        }),
        getALLBlog: builder.query({
            query:()=>"/"
        }),
        getBlogById: builder.query({
            query:(id)=>({
                url:`/${id}`
            })
        })
        
    })
})


export const {useCreateBlogMutation,useGetALLBlogQuery,useGetBlogByIdQuery}=blogApi