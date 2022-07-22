import React from 'react'
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import {Intro, SearchBar,Choose} from './subComp'
import "swiper/css/navigation"

const Recently=dynamic(()=>import("./subComp/Recently"),{ssr:false})
const Review=dynamic(()=>import("./subComp/Review"),{ssr:false})

const Home = () => {
  const state=useSelector((state)=>state)
  
  return (
    <div className='rokye__home'>
      <Intro winWidth={state.util.winWidth} />
      <SearchBar winWidth={state.util.winWidth} />
      <Choose />
      <Recently />
      <Review />
    </div>
  )
}

export default Home