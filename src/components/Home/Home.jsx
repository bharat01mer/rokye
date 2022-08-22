import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import "swiper/css/navigation"
import { ScrollTo } from '../resuable'


const Choose=dynamic(()=>import("./subComp/Choose"))
const Message=dynamic(()=>import("./subComp/Message"))

const Review=dynamic(()=>import("./subComp/Review"),{ssr:false})

import Intro from "./subComp/Intro"
import Recently from "./subComp/Recently"
import Intro2 from './subComp/Intro2'

const Home = () => {
  const {winWidth}=useSelector((state)=>state.util)
  
  return (
    <div className='rokye__home'>
      <ScrollTo />
      {
        winWidth< 1280 ? (
          <Intro winWidth={winWidth} /> 

        ): (
          <Intro2 />
        )
      }
      <Recently  />
      <Choose />
      <Review />
      <Message />
    </div>
  )
}

export default Home