import Image from 'next/image'
import React, { useState } from 'react'
import { MdKingBed } from 'react-icons/md'
import { MdBathtub } from "react-icons/md"
import { HiCurrencyRupee } from "react-icons/hi"
import { BsArrowRight, BsSuitHeartFill, BsSuitHeart } from "react-icons/bs"
import { motion } from "framer-motion"

const Card = ({ img, title, price, city, place }) => {
  const [favorite, setfavorite] = useState(true)
  return (
    <div className="rokye__card">
      <div className="rokye__card-img">
        <Image src={img} width={300} height={250} objectFit="cover" />
      </div>
      <div className="favorite">
        {
          !favorite ? (
            <motion.div whileTap={{scale:0.90}}>
              <BsSuitHeart size={30} onClick={() => setfavorite(true)} />
            </motion.div>
          )
            : (
              <motion.div whileTap={{scale:0.90}}>
                <BsSuitHeartFill size={30} onClick={() => setfavorite(false)} />
              </motion.div>
            )
          }
      </div>
      <div className="rokye__card-detail">
        {/* <h2>{title}</h2> */}
        <h3>{title}</h3>
        <div className="additional">
          <div className="additional__info">
            <div className="bed">
              <MdKingBed size={25} />
              <p>2</p>
            </div>
            <div className="bath">
              <MdBathtub size={20} />
              <p>2</p>
            </div>
          </div>
          <div className="additional__price">
            <Image src={"/rupee.png"} width={20} height={20} />
            <p> <span>{price}</span>/month </p>
          </div>
        </div>

      </div>
      <div className="info">
        <div className="info__city">
          <p>{place} in {city}</p>
        </div>
        <div className="info__redirect">
          <BsArrowRight size={40} />
        </div>
      </div>
    </div>
  )
}

export default Card