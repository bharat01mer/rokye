import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { CgMenuRight } from "react-icons/cg"
import { RiCloseLine } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
import { useSelector, useDispatch } from 'react-redux'
import Image from "next/image"
import { setwinWidth, logout } from '../../../redux/slices/util'

const Navbar = () => {
  const router = useRouter()
  const headerRef = useRef()
  const state = useSelector((state) => state.util)
  const { winWidth, user } = state

  const [showMobileNav, setShowMobileNav] = useState(false)

  const dispatch = useDispatch()
  const navLinks = [
    winWidth < 650 &&
    {
      name: "Home",
      link: "",
    },
    {
      name: "Our Plans",
      link: "plans",
    },
    {
      name: "Properties",
      link: "properties",
    },
    {
      name: "Contact Us",
      link: "contact",
    },
    {
      name: "Refer & Earn",
      link: "refer",
    },
    {
      name: "About Us",
      link: "about",
    },
    {
      name: "Reviews",
      link: "reviews",
    },
    {
      name: "FAQ",
      link: "faq",
    },
  ]

  function isActivePage(item) {
    return router.pathname === `/${item.link}`
  }


  console.log({ user })
  const logoutHandler = () => {
    dispatch(logout())
    // router.push("/")
  }

  useEffect(() => {
    dispatch(setwinWidth(window.innerWidth))
    window.onscroll = (() => {
      if (window.pageYOffset >= 66) {
        headerRef.current.classList.add("sticky")
      } else {
        headerRef.current.classList.remove("sticky");
      }
    })
  }, [showMobileNav, state, dispatch])


  return (
    <div className="rokye__navbar" ref={headerRef}>
      <div className="rokye__navbar-logo">
        <Image src={"/logo.png"} width={100} height={60} objectFit="contain" />
      </div>
      <AnimatePresence>
        {
          showMobileNav && (
            <motion.div className="rokye__navbar-mobnav" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.5 }} exit={{ scale: 0, opacity: 0 }}>
              {navLinks.map((item) => (
                <Link className='item' href={`/${item.link}`} key={item.link}>
                  <motion.div className={`item ${isActivePage(item) ? "active" : ""} `} whileTap={{ x: -5, color: "#F25C05" }}>
                    <h3>{item.name}</h3>
                  </motion.div>
                </Link>
              ))}

              {
                (!user || user === undefined) ? (
                  <Link passHref href={"/signup"}>
                    <motion.div className="register" whileTap={{ scale: .97 }}>
                      <h3>Register</h3>
                    </motion.div>
                  </Link>

                ) : (

                  <motion.div className="register" onClick={logoutHandler} whileTap={{ scale: .97 }}>
                    <h3>Logout</h3>
                  </motion.div>
                )
              }
            </motion.div>
          )
        }
      </AnimatePresence>
      <div className='rokye__navbar-tab'>
        <Link href={"/"} passHref >
          <motion.h3 whileHover={{ y: -5, color: "#F25C05" }} className={router.pathname === "/" ? "active" : ""}>Home</motion.h3>
        </Link>
        {
          user && (

            <Link href={"/setting"} passHref >
              <motion.h3 style={{ marginLeft: 30 }} whileHover={{ y: -5, color: "#F25C05" }} className={router.pathname === "/setting" ? "active" : ""}>Account</motion.h3>
            </Link>

          )
        }
        {
          user && (
            <Link href={"/setting"} >
              <BiUserCircle size={40} color="#f25c05" />
            </Link>
          )
        }

        <Link href={"/properties/create"} passHref>
          <motion.div className="sell" whileTap={{ scale: 0.97 }}>
            <AiOutlinePlus size={25} color={"#fff "} />
            <h3 >Add Property</h3>
          </motion.div>
        </Link>
        {
          showMobileNav ? <RiCloseLine size={35} onClick={() => setShowMobileNav(false)} /> : (
            <CgMenuRight size={35} onClick={() => setShowMobileNav(true)} />
          )
        }
      </div>

    </div>
  )
}

export default Navbar