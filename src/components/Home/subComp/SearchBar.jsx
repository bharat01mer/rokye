import React from 'react'
import {motion} from "framer-motion"

import { BsGridFill } from "react-icons/bs"
import { FaWallet } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"


function Desktop(props) {
  return (<div className="rokye__home-searchbar__tab">
    <div className="location item">
      <HiLocationMarker size={props.iconSize} />
      <div className="title">
        <h1>Location</h1>
        <h3>Add Location <IoIosArrowDown size={props.iconSiz2} /> </h3>
      </div>
    </div>
    <div className="divider" />
    <div className="property item">
      <BsGridFill size={props.iconSize} />
      <div className="title">
        <h1>Property Type</h1>
        <h3>Condos <IoIosArrowDown size={props.iconSiz2} /> </h3>
      </div>
    </div>
    <div className="divider" />
    <div className="price item">
      <FaWallet size={props.iconSize} />
      <div className="title">
        <h1>Budget</h1>
        <h3>100000 <IoIosArrowDown size={props.iconSiz2} /> </h3>
      </div>
    </div>
    <div className="gap" />
    <motion.div className="search" whileTap={{scale:0.96}}>
      <AiOutlineSearch size={props.winWidth < 1000 ? 30 : 40} />
    </motion.div>
  </div>);
}


const SearchBar = ({ winWidth }) => {
  const option = ["Mumbai", "Pune", "India"]

  const iconSize = winWidth < 1000 ? 20 : 30
  const iconSiz2 = 20

  return (
    <div className="rokye__home-searchbar">
      {
        winWidth < 840 ? (
          <div className='rokye__home-searchbar__mob'>
            <div className="item">
              
            </div>
          </div>
        ) : (
          <Desktop iconSize={iconSize} iconSiz2={iconSiz2} winWidth={winWidth} />
        )
      }
      
    </div>
  )
}

export default SearchBar