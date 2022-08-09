import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { AiOutlineMenu } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"

const barItem = [
    {
        id: 0,
        name: "Users",
        link: "",
        home: "/admin"
    },
    {
        id: 1,
        name: "Properties",
        link: "properties"
    },
    {
        id: 2,
        name: "Contact",
        link: "contact"
    },
    {
        id: 3,
        name: "Reviews",
        link: "review"
    },
]
const Layout = ({ children }) => {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const query = router.pathname.slice(7)
    const [winWidth, setWinWidth] = useState(0)

    const { user } = useSelector(state => state.util)
    
    const isAdmin = user?.data?.data?.type === "admin";
    
    
    useEffect(() => {
        setWinWidth(window.innerWidth)
    }, [])
    
    if (!isAdmin) {
        router.push("/")
        return <div className='outer__shell__login' > <h1>Access Denied</h1><p style={{ textAlign: "center" }}>Redirecting to Homepage</p> </div>
    }


    return (
        <>
            <div className="admin__sidebar">
                <div className="title">
                    <h1>Admin Dashboard</h1>
                </div>
                {
                    winWidth > 730 && (

                        <div className="content">
                            {
                                barItem.map((item) => (
                                    <Link passHref href={`/admin/${item.link}`} key={item.name} >
                                        <div className={`item ${item.link === query ? "active" : ""}`} >
                                            <h3>{item.name}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
                {
                    winWidth < 730 && (
                        <div className='menu' onClick={() => setShowMenu(item => !item)}>
                            {
                                showMenu ? (
                                    <FaTimes size={30} />
                                ) : (

                                    <AiOutlineMenu size={30} />
                                )
                            }
                        </div>
                    )
                }
                {
                    showMenu && (

                        <div className="mobcontent">
                            {
                                barItem.map((item) => (
                                    <Link passHref href={`/admin/${item.link}`} key={item.name} >
                                        <div className={`item ${item.link === query ? "active" : ""}`} >
                                            <h3>{item.name}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }


            </div>
            <div className="admin__content">
                {children}
            </div>
        </>
    )
}

export default Layout