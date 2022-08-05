import { Card } from "../../resuable"
import { useGetUserListingMutation } from "../../../../redux/slices/property"
import {useSelector} from "react-redux"
import { useEffect } from "react"

const Listing = ({ id }) => {
    const [run,data]=useGetUserListingMutation()
    const state=useSelector((state)=>state.util)

    useEffect(()=>{
        if(id){
            run(id)
        }
    },[state])

    return (
        <div className="rokye__user-dashboard__listing">
            <div className="title">
                <h1>My Listing</h1>
            </div>
            <div className="content">
                {
                    data?.data?.data?.map((item) => (
                        <div key={item._id}>
                            <Card id={item._id} city={item.city} place={item.society} img={item.images[0].data} bath={item.bathroom} bed={item.bathroom} price={item.rentDetail.monthly} title={`${item?.bedroom}BHK ${item?.propType} for rent`} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Listing