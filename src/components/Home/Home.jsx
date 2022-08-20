import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import "swiper/css/navigation"

// const Intro=dynamic(()=>import("./subComp/Intro"))
const Choose=dynamic(()=>import("./subComp/Choose"))
const Message=dynamic(()=>import("./subComp/Message"))
// const Recently=dynamic(()=>import("./subComp/Recently"),{ssr:false})
const Review=dynamic(()=>import("./subComp/Review"),{ssr:false})
import SearchBar from './subComp/SearchBar'
import Intro from "./subComp/Intro"
import Recently from "./subComp/Recently"

const Home = () => {
  const state=useSelector((state)=>state)
  
  return (
    <div className='rokye__home'>
      <Intro winWidth={state.util.winWidth} />
      {/* <SearchBar winWidth={state.util.winWidth} /> */}
      <Recently  />
      <Choose />
      <Review />
      <Message />
    </div>
  )
}

export default Home