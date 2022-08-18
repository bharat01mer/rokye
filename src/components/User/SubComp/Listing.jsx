import { Card } from "../../resuable"
import { useGetUserListingMutation } from "../../../../redux/slices/property"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Listing = ({ id }) => {
    const [run, data] = useGetUserListingMutation()
    const state = useSelector((state) => state.util)

    useEffect(() => {
        if (id) {
            run(id)
        }
    }, [state])

    return (
        <div className="rokye__user-dashboard__listing">
            <div className="title">
                <h1>My Listing</h1>
            </div>
            <div className="content">
                {
                    data?.data?.data?.map((item) => (
                        <div key={item._id}>
                            <Card
                                title={`${item.bedroom} BHK ${item.propType[0].toUpperCase()}${item.propType.slice(1)} ${item.superArea} sqft`}
                                furnished={item.furnished}
                                city={item.city}
                                place={item.area}
                                price={item.rentDetail.monthly}
                                img={item.images[0]?.data }
                                id={item._id}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Listing