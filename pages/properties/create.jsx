import React from 'react'
import {Layout,AddProperty} from "../../src/components"
import { useRouter } from 'next/router'
import {useSelector} from "react-redux"

const Create = () => {
  const {user}=useSelector((state)=>state.util)
  const router=useRouter()

  if(!user){
    router.push(`/login?redirect=properties/create`)
    return null
  }
  
  return (
    <Layout title={"Add Property"} description={"Adding New Property"}>
        <AddProperty />
    </Layout>
  )
}

export default Create