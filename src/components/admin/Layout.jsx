import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { AiOutlineMenu } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import Head from 'next/head'

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
    {
        id: 4,
        name: "Blog",
        link: "blog"
    },
    {
        id: 5,
        name: "Create",
        link: "add"
    },
]
const Layout = ({ children, title }) => {
    const router = useRouter()
    const [showMenu, setShowMenu] = useState(false)
    const query = router.pathname.slice(7)
    const [winWidth, setWinWidth] = useState(0)

    const { user } = useSelector(state => state.util)

    const isAdmin = user?.data?.type === "admin" || user?.data?.type === "subadmin";

    const isSuperAdmin = user?.data.email === "jignesg190@gmail.com" || user?.data.email === "info@rokye.com"

    useEffect(() => {
        setWinWidth(window.innerWidth)
        if (!isAdmin) {
            router.push("/")
        }
    }, [])

    

    return isAdmin && (
        <>
            <Head>
                <title>{title ? `${title} - Admin` : 'Admin'}</title>
            </Head>
            <div className="admin__sidebar">
                <div className="title">
                    <h1>Admin Dashboard</h1>
                </div>
                {
                    winWidth > 730 && (

                        <div className="content">
                            {
                                barItem.map((item) => item.id !== 5 ? (
                                    <Link passHref href={`/admin/${item.link}`} key={item.name} >
                                        <div className={`item ${item.link === query ? "active" : ""}`} style={{ cursor: "pointer" }}>
                                            <h3>{item.name}</h3>
                                        </div>
                                    </Link>
                                ) : isSuperAdmin && (
                                    <Link passHref href={`/admin/${item.link}`} key={item.name} >
                                        <div className={`item ${item.link === query ? "active" : ""}`} style={{ cursor: "pointer" }}>
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