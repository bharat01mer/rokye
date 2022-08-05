import React from 'react'
import {Layout,User} from "../src/components"
import {useSelector} from "react-redux"
import { useRouter } from 'next/router'

const Setting = () => {
  const {user}=useSelector((state)=>state.util)
  const router=useRouter()

  if(!user){
    router.push("/login")
    return null
  }
  return (
    <Layout title={"Account"}>
        <User user={user} />
    </Layout>
  )
}

export default Setting