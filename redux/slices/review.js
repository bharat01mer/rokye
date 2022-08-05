import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const produrl=process.env.NODE_ENV==="production" ?"https://rokye.herokuapp.com/review" :"http://localhost:4000/review"

export const reviewApi=createApi({
    reducerPath:"review",
    baseQuery:fetchBaseQuery({
        baseUrl:produrl,
        prepareHeaders:(headers,{getState})=>{
            const token=getState().util?.user?.data?.tokem

            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        getAllReview: builder.query({
            query:({id,filter})=>`${produrl}?page=${id}&filter=${filter}`
        }),
        createReview: builder.mutation({
            query:(data)=>({
                url:"/",
                method:"POST",
                body:data
            })
        }),
        deleteReview: builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE"
            })
        })
    })
})

export const {useGetAllReviewQuery,useCreateReviewMutation,useDeleteReviewMutation}=reviewApi