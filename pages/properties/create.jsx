import React from 'react'
import {Layout,AddProperty} from "../../src/components"
import {useSelector} from "react-redux"
import Warning from '../../src/components/resuable/Warning'

const Create = () => {
  const {user}=useSelector((state)=>state.util)
  
  
  return (
    <Layout title={"Add Property"} description={"Adding New Property"}>
        <AddProperty />
        {
          !user  && (
            <Warning />
          )
        }
    </Layout>
  )
}

export default Create