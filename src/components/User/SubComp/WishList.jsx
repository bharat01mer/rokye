import { useGetFavListMutation } from "../../../../redux/slices/property"
import { Card } from "../../resuable"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const WishList = ({ list, id }) => {
    const [run, data] = useGetFavListMutation()
    const state = useSelector((state) => state.util)

    useEffect(() => {
        run(id)
    }, [state])
    if (!list || !data) {
        return null
    }


    return (
        <div className="rokye__user-dashboard__wishlist">
            <div className="title">
                <h1>My Wishlist</h1>
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
                                img={item.images[0]?.data}
                                id={item._id}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default WishList