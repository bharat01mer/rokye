import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { CgMenuRight } from "react-icons/cg"
import { RiCloseLine } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { setwinWidth } from '../../../redux/slices/util'

const Navbar = () => {
  const router = useRouter()
  const headerRef = useRef()
  const { winWidth } = useSelector((state) => state.util)

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

  useEffect(() => {
    dispatch(setwinWidth(window.innerWidth))
    window.onscroll = (() => {
      if (window.pageYOffset >= 66) {
        headerRef.current.classList.add("sticky")
      } else {
        headerRef.current.classList.remove("sticky");
      }
    })
  }, [showMobileNav, winWidth, dispatch])


  return (
    <div className="rokye__navbar" ref={headerRef}>
      <div className="rokye__navbar-logo">
        <h1>Rokye.<span>Realty</span></h1>
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
              <Link passHref href={"/signup"}>
                <div className="register">
                  <h3>Register</h3>
                </div>
              </Link>
            </motion.div>
          )
        }
      </AnimatePresence>
      <div className='rokye__navbar-tab'>
        <Link href={"/"} passHref >
          <motion.h3 whileHover={{ y: -5, color: "#F25C05" }} className={router.pathname === "/" ? "active" : ""}>Home</motion.h3>
        </Link>
        <Link href={"/properties/sell"} passHref>
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