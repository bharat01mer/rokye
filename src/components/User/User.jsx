import { BiLogOut } from "react-icons/bi"
import { BsViewList } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai"
import { useState } from "react"
import Perosnal from "./SubComp/Perosnal"
import Listing from "./SubComp/Listing"
import WishList from "./SubComp/WishList"
import { useDispatch } from "react-redux"
import { FaEdit } from "react-icons/fa"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { logout } from "../../../redux/slices/util"
import { useRouter } from "next/router"
import Edit from "./SubComp/Edit"
import { useUpdateUserDataMutation } from "../../../redux/slices/user"
import {ToastContainer,toast} from "react-toast"
import { updateUserData } from "../../../redux/slices/util"
import axios from "axios"

const tabItem = [
    {
        id: 0,
        title: "Personal Info",
        icon: <AiOutlineUser />
    },
    {
        id: 1,
        title: "My Listing",
        icon: <BsViewList />
    },
    {
        id: 2,
        title: "Wishlist",
        icon: <AiOutlineHeart />
    },
]

const User = ({ user }) => {
    const [profileImg, setProfileImg] = useState()
    const [showPreview, setShowPreview] = useState(false)
    const [activetab, setActivetab] = useState(0)
    const dispatch = useDispatch()
    const [updateUser] = useUpdateUserDataMutation()

    const router = useRouter()

    const userData = user ? user.data : []

    const returnTab = (tab) => {
        switch (tab) {
            case 0:
                return <Perosnal userData={userData} />
            case 1:
                return <Listing id={userData._id} />
            case 2:
                return <WishList list={user?.data?.favoriteProp} id={userData._id} />
            default:
                return <Perosnal />
        }
    }

    useEffect(() => {

    }, [user, dispatch])

    useEffect(() => {

    }, [profileImg,showPreview])

    if (!user) {
        router.push("/login")
        return null
    }

    const logoutHandler = () => {
        dispatch(logout())
        router.push("/login")
    }

    const onChangeImageHandler = (e) => {
        setProfileImg(e.target.files[0])
        setShowPreview(true)
    }

    const imageUploadHandler = async () => {

        const file = new FormData()
        file.append('file', profileImg)
        file.append("upload_preset", "all_image")

        axios.post("https://api.cloudinary.com/v1_1/dburijwvn/image/upload", file).then((res) => {
            updateUser({ id: userData._id, data:{ img:res.data.secure_url} }).unwrap().then((data)=>{
                dispatch(updateUserData(data.data))
                toast.success("Profile Image Uploaed")
                setShowPreview(false)
            }).catch((err)=>{
                toast.error("Error Occured,Try Again")
                console.log({err})
            })
            
        }).catch((err) => {
            console.log({err})
            toast.error("Error Occured,Try Again")
        })
    }

    
    return (
        <>
        <ToastContainer delay={2000} />
            <div className="rokye__user">
                <div className="rokye__user-title">
                    <div className="info">
                        <div className="info__icon">
                            {
                                userData.img ? (
                                    <label className="img">
                                        <input type="file" id="profimg" accept="image/*" onChange={(e) => onChangeImageHandler(e)} />
                                        <img src={userData.img} alt="" />
                                        <div className="edit">
                                            <FaEdit size={20} />
                                        </div>
                                    </label>
                                ) : (
                                    <label className="no__img" htmlFor="profimg">
                                        <input type="file" id="profimg" accept="image/*" onChange={(e) => onChangeImageHandler(e)} />

                                        <FaUserCircle size={55} color="gray" />
                                        <div className="edit">
                                            <FaEdit size={20} />
                                        </div>
                                    </label>
                                )
                            }
                        </div>
                        <div className="info__desc">
                            <h1>{userData.name}</h1>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <motion.div className="logout" whileTap={{ scale: .97 }} onClick={logoutHandler}>
                        <BiLogOut size={25} />
                        <h3>Logout</h3>
                    </motion.div>
                </div>
                <div className="rokye__user-dashboard">

                    <div className="tab">
                        {
                            tabItem.map((item) => (
                                <div className={`item ${item.id === activetab && "active"} `} key={item.id} onClick={() => setActivetab(item.id)}>
                                    {item.icon}
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="container">
                        {returnTab(activetab)}
                    </div>
                </div>
            </div>
            {
                showPreview && (
                    <Edit img={URL.createObjectURL(profileImg)} setModal={setShowPreview} handler={imageUploadHandler} />
                )
            }
        </>

    )
}

export default User

