import React from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"
import { motion } from 'framer-motion'

const Footer = () => {
  const rentalLinks = [
    {
      id: 0,
      name: "Our Plans",
      link: "plans"
    },
    {
      id: 1,
      name: "Refer & Earn",
      link: "refer",
    },
    {
      id: 2,
      name: "Reviews",
      link: "review",
    },
  ]

  const aboutLink = [
    {
      id: 0,
      name: "Contact Us",
      link: "contact"
    },
    {
      id: 1,
      name: "About Us",
      link: "about"
    },
    {
      id: 2,
      name: "FAQs",
      link: "faq"
    },
  ]

  const socialLinks = [
    {
      id: 0,
      link: "facebook.com",
      icon: <FaFacebookF />
    },
    {
      id: 1,
      link: "instagram.com",
      icon: <FiInstagram />
    },
    {
      id: 3,
      link: "twitter.com",
      icon: <FaTwitter />
    },
  ]
  return (
    <footer className="rokye__footer">
      <div className="outer">
        <div className="rokye__footer-intro">
          <h1>Rokye.<span>Realty</span></h1>
          <p>Consulate Of Japan Bunglow, M L Dahanukar <br /> Marg, Cumballa Hill</p>
        </div>
        <div className="rokye__footer-links">
          <h1>Rental Options</h1>
          <div className="links">
            {rentalLinks.map((item) => (
              <Link key={item.name} href={`/${item.link}`}>
                <motion.p whileTap={{x:10}}>{item.name}</motion.p>
              </Link>
            ))}
          </div>
        </div>
        <div className="rokye__footer-about">
          <h1>About</h1>
          <div className="links">
            {aboutLink.map((item) => (
              <Link key={item.name} href={`/${item.link}`} >
                <motion.p whileTap={{x:10}}>{item.name}</motion.p>
              </Link>
            ))}
          </div>
        </div>
        <div className="rokye__footer-address">
          <h1>Address</h1>
          <p>Email: - info@rokye.com</p>

          <div className="social">
            {
              socialLinks.map((item) => (
                <motion.a href={`https://${item.link}`} key={item.id} target="__blank" rel="noreferrer" whileTap={{scale:0.96}}>
                  <motion.div className="social__item" >
                    {item.icon}
                  </motion.div>
                </motion.a>
              ))
            }
          </div>
        </div>
      </div>
      <div className="rokye__footer-info">
        <p>&#169;Rokye Realty. All rights reserved</p>
        <div className="dot" />
        <p>Terms & Conditions</p>
        <div className="dot" />
        <p>Privacy Policy</p>
      </div>
    </footer>
  )
}

export default Footer