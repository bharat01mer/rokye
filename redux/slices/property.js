import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url=process.env.NODE_ENV==="production" ?"https://rokye.herokuapp.com/property" :"http://localhost:4000/property"

export const propertyApi=createApi({
    reducerPath:"property",
    baseQuery:fetchBaseQuery({
        baseUrl:url,
        prepareHeaders:(headers,{getState})=>{
            
            const token=getState().util.user.data.token

            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        createProperty: builder.mutation({
            query:(data)=>({
                url:"/",
                method:"POST",
                body:data
            })
        }),
        getAllProperty:builder.query({
            query:()=>"/"
        }),
        getPropertyById: builder.query({
            query:(id)=>`/${id}`
        }),
        updatePropertyById: builder.mutation({
            query:({id,data})=>({
                url:`/${id}`,
                method:"PATCH",
                body:data
            })
        }),
        addImageInPropertyById: builder.mutation({
            query:({id,data})=>  ({
                url:`/image/${id}`,
                method:"PATCH",
                body:{data},
            })
        }),
        deletePropertyById: builder.mutation({
            query:({id,userId})=>({
                url:`/${id}`,
                method:"DELETE",
                body:userId
            })
        }),
        getFavList: builder.mutation({
            query:(id)=>({
                url:`/fav/${id}`,
                method:"GET"
            })
        }),
    })
})


export const {useCreatePropertyMutation,useAddImageInPropertyByIdMutation,useGetAllPropertyQuery,useGetPropertyByIdQuery,useGetFavListMutation}=propertyApi



