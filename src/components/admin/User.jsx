import { BiUserCircle } from "react-icons/bi"
import { TiDelete } from "react-icons/ti"
import { useGetAllUserQuery, useDeleteUserMutation } from "../../../redux/slices/user"
import Paginate from "./Pagination"
import {toast,ToastContainer} from "react-toast"
import { useEffect } from "react"
import {useRouter} from "next/router"

const User = () => {
    const [deleteUserById] = useDeleteUserMutation()
    const router=useRouter()
    const page=router.query?.page || 1
    const { data, isFetching, refetch } = useGetAllUserQuery(page)

    useEffect(()=>{
        refetch()
    },[])

    if (!data) {
        return null
    }

    const deleteUser = async(id) => {
        await deleteUserById(id).then(()=>{
            toast.success("User Deleted")
        })
        refetch()
    }

    console.log({ data })
    return (
        <div className="admin__content-user">
            <ToastContainer delay={2000} />
            <div className="title">
                <h1>Users Account</h1>
                <p>{data.count} Users</p>
            </div>
            <div className="divider" />
            <div className="content">
                {
                    data?.data?.map((item, i) => (
                        <div className="item" key={item.email}>
                            <div className="left">
                                <div className="item__no">
                                    <h3>{i + 1}</h3>
                                </div>
                                <div className="item__detail">
                                    <BiUserCircle size={45} />
                                    <div className="info">
                                        <div className="upper">
                                            <h2>{item.name}</h2>
                                            <p>{item.type}</p>
                                        </div>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                item.type !== "admin" && (
                                    <div className="delete" onClick={() => deleteUser(item._id)}>
                                        <TiDelete size={35} color="red" />
                                    </div>

                                )
                            }
                        </div>
                    ))
                }
            </div>
            <div className="pagination">
                <Paginate refetch={refetch} propData={data} page={page} link={""} />
            </div>
        </div>
    )
}

export default User