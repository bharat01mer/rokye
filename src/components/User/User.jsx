import { BiLogOut } from "react-icons/bi"
import { BsViewList } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai"
import { useState } from "react"
import Perosnal from "./SubComp/Perosnal"
import Listing from "./SubComp/Listing"
import WishList from "./SubComp/WishList"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {motion} from "framer-motion"
import { logout } from "../../../redux/slices/util"
import { useRouter } from "next/router"

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

const User = ({user}) => {
    const [activetab, setActivetab] = useState(0)
    const dispatch=useDispatch()
    
    const router=useRouter()

    const userData=user ? user.data : []

    const returnTab=(tab)=>{
        switch (tab) {
            case 0:
                return <Perosnal userData={userData} />
            case 1:
                return <Listing id={userData._id}  />
            case 2:
                return <WishList list={user?.data?.favoriteProp} id={userData._id}  />
            default:
                return <Perosnal />
        }
    }

    useEffect(()=>{

    },[user,dispatch])

    if(!user){
        router.push("/login")
        return null
    }

    const logoutHandler=()=>{
        dispatch(logout())
        router.push("/login")
    }
    
    
    return (
        <div className="rokye__user">
            <div className="rokye__user-title">
                <div className="info">
                    <div className="info__icon">
                        <FaUserCircle size={45} color="#f25c05" />
                    </div>
                    <div className="info__desc">
                        <h1>{userData.name}</h1>
                        <p>{userData.email}</p>
                    </div>
                </div>
                <motion.div className="logout" whileTap={{scale:.97}} onClick={logoutHandler}>  
                    <BiLogOut size={25} />
                    <h3>Logout</h3>
                </motion.div>
            </div>
            <div className="rokye__user-dashboard">
                
                <div className="tab">
                    {
                        tabItem.map((item) => (
                            <div className={`item ${item.id===activetab && "active"} `} key={item.id} onClick={()=>setActivetab(item.id)}>
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
    )
}

export default User

