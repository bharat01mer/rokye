import { BiUserCircle } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { useGetAllUserQuery, useDeleteUserMutation } from "../../../redux/slices/user"
import Paginate from "./Pagination"
import { toast, ToastContainer } from "react-toast"
import TextField from "@mui/material/TextField"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useState } from "react"

const User = () => {
    const [deleteUserById] = useDeleteUserMutation()
    const [search, setSearch] = useState(null)
    const router = useRouter()
    const page = router.query?.page || 1
    const { data, refetch } = useGetAllUserQuery(page)

    useEffect(() => {
        refetch()
    }, [])
    
    useEffect(()=>{

    },[search])

    if (!data) {
        return null
    }

    const deleteUser = async (id) => {
        await deleteUserById(id).then(() => {
            toast.success("User Deleted")
        })
        refetch()
    }

    const filterData= search ? data.data.filter((item)=>item.phone.toString().includes(search) || item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search) ) : data?.data


    return (
        <div className="admin__content-user">
            <ToastContainer delay={2000} />
            <div className="title">
                <h1>Users Account</h1>
                <p>{data.count} Users</p>
            </div>
            <div className="divider" />
            <div className="search">
                <div className="search__field">
                    <TextField id="outlined-basic" label="Search" variant="standard" onChange={(e)=>setSearch(e.target.value.toLowerCase())} type={"search"} />
                </div>
            </div>
            <div className="content">
                {
                    filterData.map((item, i) => (
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
                                        </div>
                                        <div className="lower">
                                            <p>{item.phone}</p>
                                            <p>{item.email}</p>
                                            <p>{item.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                item.type !== "admin" && (
                                    <div className="delete" onClick={() => deleteUser(item._id)}>
                                        <MdDelete size={30} color="red" cursor={"pointer"} />
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