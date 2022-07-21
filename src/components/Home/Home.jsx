import React from 'react'
import { useSelector } from 'react-redux'
import {Intro, SearchBar,Choose,Recently} from './subComp'


const Home = () => {
  const state=useSelector((state)=>state)
  
  return (
    <div className='rokye__home'>
      <Intro winWidth={state.util.winWidth} />
      <SearchBar winWidth={state.util.winWidth} />
      <Choose />
      {/* <Recently /> */}
    </div>
  )
}

export default Home