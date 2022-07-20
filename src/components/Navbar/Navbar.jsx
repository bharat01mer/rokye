import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { CgMenuRight } from "react-icons/cg"
import { RiCloseLine } from "react-icons/ri"
import { useSelector, useDispatch } from 'react-redux'
import { setwinWidth } from '../../../redux/slices/util'

const Navbar = () => {
  const router = useRouter()

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
      name: "Properties",
      link: "properties",
    },
    {
      name: "About Us",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact",
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
  }, [showMobileNav, winWidth, dispatch])


  return (
    <div className="rokye__navbar">
      <div className="rokye__navbar-logo">
        <h1>Rokye.<span>Realty</span></h1>
      </div>
      {/* <div className="rokye__navbar-nav">
        {navLinks.map((item) => (
          <Link className='item' href={`/${item.link}`} key={item.link}>
            <motion.div className={`item ${isActivePage(item) ? "active" : ""} `} whileHover={{ y: -5, color: "#F25C05" }}>
              <h3>{item.name}</h3>
              {isActivePage(item) && (
                <motion.div className='item__indicator' initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", duration: 1 }}></motion.div>
              )}
            </motion.div>
          </Link>
        ))}
      </div> */}
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
              <div className="register">
                <h3>Register</h3>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
      <div className='rokye__navbar-tab'>
        <Link href={"/"} passHref >
          <motion.h3 whileHover={{ y: -5, color: "#F25C05" }} className={router.pathname==="/" ? "active" : "" }>Home</motion.h3>
        </Link>
        <Link href={"/properties/sell"} passHref>
          <motion.h3 whileHover={{ y: -5, color: "#F25C05" }} className={isActivePage("properties/sell") ? "active" : ""}>Sell A Property</motion.h3>
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