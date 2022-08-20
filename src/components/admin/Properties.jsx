import { useDeletePropertyByIdMutation, useGetAllPropertyQuery } from "../../../redux/slices/property"

import { useRouter } from "next/router"
import Pagination from "./Pagination"
import { MdDelete } from "react-icons/md"
import { FiExternalLink } from 'react-icons/fi'
import { toast,ToastContainer } from "react-toast"
import Image from "next/image"

const Properties = () => {
    const router = useRouter()
    const page = router.query?.page || 1

    const { data, refetch } = useGetAllPropertyQuery({ page, sort: "new", limit: 10 })
    const [run]=useDeletePropertyByIdMutation()
    

    if (!data) {
        return null
    }

    const deletePropertyHandler=async(id)=>{
        await run(id).unwrap().then(()=>{
            toast.success("Property Deleted")
            refetch()
        }).catch((err)=>{
            toast.error("Error Occured")
        })
    }

    return (
        <div className="admin__content-properties">
            <ToastContainer delay={2000} />
            <div className="title">
                <h1>Listed Properties</h1>
                <p>{data.count} Properties</p>
            </div>
            <div className="divider" />
            <div className="content">
                <div className="card">
                    {
                        data?.data?.map((item, index) => (
                            <div key={item._id} className="card__list">
                                <div className="detail">
                                    <div className="detail__no">
                                        <h2>{index + 1}</h2>
                                    </div>
                                    <div className="img">
                                        <Image src={item.images[0]?.data ? item.images[0]?.data : "https://res.cloudinary.com/dykwfe4cr/image/upload/v1659513375/Trailers/vvdylxopbl0ozuy8m85d.jpg"} width={100} height={100} objectFit="contain" />
                                    </div>
                                    <div className="detail__info">
                                        <div className="upper">
                                            <a href={`/properties/${item._id}`} target="__blank" rel="noreferrer">
                                            <h3>{`${item.bedroom} BHK ${item.propType[0].toUpperCase()}${item.propType.slice(1)} ${item.superArea} sqft`} <FiExternalLink color={"blue"} /> </h3>
                                            </a>
                                        </div>
                                        <div className="lower">
                                            <p>{item.firstName} {item.lastName}</p>
                                            <p>{item.phone}</p>
                                            <p>{item.email}</p>
                                            <p>{item.date.slice(0, 10)}</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="delete" onClick={()=>deletePropertyHandler(item._id)}>
                                    <MdDelete size={25} color={"white"} />
                                </div>
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