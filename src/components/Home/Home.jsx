import React from 'react'
import { useSelector } from 'react-redux'
import Intro from './subComp/Intro'

const Home = () => {
  const state=useSelector((state)=>state)
  return (
    <div className='rokye__home'>
      <Intro winWidth={state.util.winWidth} />
    </div>
  )
}

export default Home