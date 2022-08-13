import { Card } from "../resuable"
import { useGetAllPropertyQuery } from "../../../redux/slices/property"
import { useRouter } from "next/router"
import Pagination from "./Pagination"

const Properties = () => {
    const router = useRouter()
    const page = router.query?.page || 1

    const { data, isFetching, error, isSuccess, refetch } = useGetAllPropertyQuery({ page, sort: "new", limit: 10 })

    if (!data) {
        return null
    }
    return (
        <div className="admin__content-properties">

            <div className="title">
                <h1>Listed Properties</h1>
                <p>{data.count} Properties</p>
            </div>
            <div className="divider" />
            <div className="content">
                <div className="card">
                    {
                        data?.data?.map((item) => (
                            <div key={item._id}>
                                <Card
                                    title={`${item.bedroom} BHK ${item.propType[0].toUpperCase()}${item.propType.slice(1)} ${item.superArea} sqft`}
                                    furnished={item.furnished}
                                    city={item.city}
                                    place={item.area}
                                    price={item.rentDetail.monthly}
                                    img={item.images[0]?.data ? item.images[0]?.data : "https://res.cloudinary.com/dykwfe4cr/image/upload/v1659513375/Trailers/vvdylxopbl0ozuy8m85d.jpg"}
                                    id={item._id}
                                />
                            </div>
                        ))
                    }
                </div>

                {/* Implement Pagination after intergrating the api */}
                <div className="pagination">
                    <Pagination page={page} propData={data} refetch={refetch} link={"properties"} />
                </div>
            </div>
        </div>
    )
}

export default Properties