import React, { useEffect } from 'react'
import { Pagination, Box, PaginationItem } from '@mui/material'
import { useRouter } from 'next/router'



const Paginate = ({ page, propData, refetch }) => {

    const router = useRouter()

    useEffect(() => {

    }, [page, propData])

    const handlerOnChange = (e, value) => {
        refetch()
        router.push(`/reviews?page=${value}`, undefined, { shallow: true })
    }
    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"} >
            <Pagination

                count={Number(propData?.numberOfPages)}
                page={Number(page)}
                variant="outlined"
                onChange={handlerOnChange}
            />
        </Box>
    )
}

export default Paginate