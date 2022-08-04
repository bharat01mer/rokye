import React, { useEffect } from 'react'
import { Pagination,Box ,PaginationItem} from '@mui/material'
import Link from 'next/link'
import { useGetAllPropertyQuery } from '../../../../redux/slices/property'
import { useRouter } from 'next/router'



const Paginate = ({page,propData}) => {
    const {data,isFetching,error}=useGetAllPropertyQuery(page)
    const router=useRouter()
    
    useEffect(()=>{
        
    },[data,page,propData])
    
    const handlerOnChange=(e,value)=>{
        
        router.push(`/properties?page=${value}`,undefined,{shallow:true})
    }
    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"} >
            <Pagination 
                // count={propData?.count}
                count={Number(propData?.numberOfPages)}
                page={Number(page)}
                variant="outlined"
                onChange={handlerOnChange}
             />
        </Box>
    )
}

export default Paginate