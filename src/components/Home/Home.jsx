import React from 'react'
import { useSelector } from 'react-redux'
import {Intro, SearchBar,Choose} from './subComp'


const Home = () => {
  const state=useSelector((state)=>state)
  return (
    <div className='rokye__home'>
      <Intro winWidth={state.util.winWidth} />
      <SearchBar winWidth={state.util.winWidth} />
      <Choose />
    </div>
  )
}

export default Home