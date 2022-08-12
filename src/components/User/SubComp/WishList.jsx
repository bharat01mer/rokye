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
                            <Card id={item._id} city={item.city} place={item.society} img={item.images[0]?.data ? item.images[0]?.data : "https://res.cloudinary.com/dykwfe4cr/image/upload/v1659513375/Trailers/vvdylxopbl0ozuy8m85d.jpg"  } bath={item.bathroom} bed={item.bathroom} price={item.rentDetail.monthly} title={`${item?.bedroom}BHK ${item?.propType} for rent`} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default WishList