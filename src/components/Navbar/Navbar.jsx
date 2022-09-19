import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { CgMenuRight } from "react-icons/cg"
import { RiCloseLine } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { useSelector, useDispatch } from 'react-redux'
import Image from "next/image"
import { BiChevronDown } from "react-icons/bi"
import { setwinWidth, logout } from '../../../redux/slices/util'

const Navbar = () => {
  const router = useRouter()
  const headerRef = useRef()
  const state = useSelector((state) => state.util)
  const { winWidth, user } = state
  const [showMoreOpt, setShowMoreOpt] = useState(false)

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
      name: "About Us",
      link: "about",
    },
    {
      name: "Reviews",
      link: "reviews",
    },
    {
      name: "Blog",
      link: "blog",
    },
    {
      name: "FAQ",
      link: "faq",
    },
  ]

  function isActivePage(item) {
    return router.pathname === `/${item.link}`
  }

  const logoutHandler = () => {
    dispatch(logout())

  }

  useEffect(() => {
    dispatch(setwinWidth(window.innerWidth))
    window.onscroll = (() => {
      if (window.pageYOffset >= 66) {
        headerRef?.current?.classList?.add("sticky")
      } else {
        headerRef?.current?.classList?.remove("sticky");
      }
    })
  }, [showMobileNav, state, dispatch])

  const desktopLink = [
    {
      name: "Home",
      link: ""
    },
    {
      name: "Properties",
      link: "properties"
    },
    {
      name: "Our Plans",
      link: "plans"
    },
    {
      name: "Contact Us",
      link: "contact"
    },
  ]

  const moreOpt = [
    {
      name: "About Us",
      link: "about"
    },
    {
      name: "FAQ",
      link: "faq"
    },
    {
      name: "Blog",
      link: "blog"
    },
    {
      name: "Reviews",
      link: "reviews"
    },
  ]


  return (
    <div className="rokye__navbar" ref={headerRef}>
      <Link passHref href={"/"}>
        <div className="rokye__navbar-logo">
          {/* <Image src={"/logo.png"} width={150} height={50} objectFit="contain" /> */}
          <h1 style={{color:"white"}}>ROKYE</h1>
        </div>
      </Link>
      <AnimatePresence>
        {
          showMobileNav && (
            <motion.div className="rokye__navbar-mobnav" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.5 }} exit={{ scale: 0, opacity: 0 }}>
              {navLinks.map((item, index) => (
                <Link className='item' href={`/${item.link}`} key={item.link}>
                  <motion.div className={`item ${isActivePage(item) ? "active" : ""} `} whileTap={{ x: 5, color: "#F25C05" }}>
                    <h3>{item.name}</h3>
                    {
                      winWidth > 650 ?
                        index !== 0 && index !== 7 && (
                          <div className="divider" />
                        ) : index !== 7 && (
                          <div className="divider" />
                        )
                    }
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
        {
          winWidth > 1200 && (

            <div className="rokye__navbar-desktop" style={{ marginRight: "1rem" }}>
              {
                desktopLink.map((item) => (
                  <Link className='item' href={`/${item.link}`} key={item.link}>

                    <motion.div className={`item ${isActivePage(item) ? "active" : ""} `} whileTap={{ y: -5, color: "#F25C05" }}>
                      <h3>
                        {item.name}
                      </h3>
                    </motion.div>
                  </Link>
                ))
              }
              <div className="more">
                <h3 style={{color:"white"}} onClick={() => setShowMoreOpt(item => !item)}>More <BiChevronDown size={25} /> </h3>

                <AnimatePresence>

                  {
                    showMoreOpt && (
                      <motion.div className="more__content" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.5 }} exit={{ scale: 0, opacity: 0 }}>
                        {
                          moreOpt.map((item) => (

                            <Link className='item' href={`/${item.link}`} key={item.link}>
                              <motion.div className="more__link" whileTap={{ x: 5 }}>
                                <h3>{item.name}</h3>
                              </motion.div>
                            </Link>
                          ))
                        }
                      </motion.div>
                    )
                  }
                </AnimatePresence>
              </div>
            </div>
          )
        }
        {
          user && (
            <Link href={"/setting"} >
              <BiUserCircle size={40} color="#f25c05" cursor={"pointer"} />
            </Link>
          )
        }
        {
          !user && (
            <Link href={"/login"} >
              <div className="login">
                <h3 >Login</h3>
              </div>
            </Link>
          )
        }


        <Link href={"/properties/create"} passHref>
          <motion.div className="sell" whileTap={{ scale: 0.97 }} style={{ cursor: "pointer" }}>
            <AiOutlinePlus size={25} color={"#fff "} />
            <h3 >Add Property</h3>
          </motion.div>
        </Link>
        {
          winWidth < 1200 && (
            showMobileNav ? <RiCloseLine size={35} onClick={() => setShowMobileNav(false)} cursor="pointer" /> : (
              <>
                <CgMenuRight size={35} onClick={() => setShowMobileNav(true)} cursor="pointer" />
              </>
            )
          )

        }
      </div>

    </div>
  )
}

export default Navbar