import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from "../../src/components"
import { PropertyDetail as Detail } from '../../src/components'
import {  useGetPropertyByIdQuery } from '../../redux/slices/property'
import { Loader } from '../../src/components/resuable'

const PropertyDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const {data:cardDetail,isFetching,error}=useGetPropertyByIdQuery(id)
    if (isFetching) {
        return <Loader />
    }
    return (
        <Layout title={cardDetail ? `${cardDetail?.data?.bedroom}BHK ${cardDetail?.data?.propType} for rent` : "Error"} description={cardDetail && cardDetail.description}>
            {
                cardDetail && (
                    <Detail cardDetail={cardDetail?.data} id={id} />
                )
            }
        </Layout>
    )
}

export default PropertyDetail