import Image from 'next/image'
import React, { useState } from 'react'
import { MdKingBed } from 'react-icons/md'
import { MdBathtub } from "react-icons/md"
import { HiCurrencyRupee } from "react-icons/hi"
import { BsArrowRight,BsSuitHeartFill,BsSuitHeart } from "react-icons/bs"

const Card = () => {
  const [favorite, setfavorite] = useState(false)
  return (
    <div className="rokye__card">
      <div className="rokye__card-img">
        <Image src={"/home.jpg"} width={300} height={250} objectFit="cover" />
        
      </div>
      <div className="favorite">
        {
          !favorite ? 
          <BsSuitHeart size={30} onClick={()=>setfavorite(true)} /> : <BsSuitHeartFill size={30} onClick={()=>setfavorite(false)} />
        }
      </div>
      <div className="rokye__card-detail">
        <h2>2 Bhk House 1400 sqft</h2>
        <div className="additional">
          <div className="additional__info">
            <div className="bed">
              <MdKingBed size={30} />
              <p>2</p>
            </div>
            <div className="bath">
              <MdBathtub size={25} />
              <p>2</p>
            </div>
          </div>
          <div className="additional__price">
            <Image src={"/rupee.png"} width={20} height={20} />
            <p> <span>700</span>/month </p>
          </div>
        </div>

      </div>
      <div className="info">
        <div className="info__city">
          <p>Kandiwali in Mumbai</p>
        </div>
        <div className="info__redirect">
          <BsArrowRight size={40} />
        </div>
      </div>
    </div>
  )
}

export default Card