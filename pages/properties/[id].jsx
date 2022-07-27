import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from "../../src/components"
import { cardData } from '../../utils/data'
import {PropertyDetail as Detail} from '../../src/components'

const PropertyDetail = () => {
    const router=useRouter()
    const {id}=router.query
    
    const cardDetail=cardData.find((item)=>item.id===parseInt(id))
    
    
    return (
        <Layout title={cardDetail?.title}>
            <Detail cardDetail={cardDetail} />
        </Layout>
    )
}

export default PropertyDetail