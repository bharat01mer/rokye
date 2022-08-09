import React, { useEffect } from 'react'
import { Home, Layout } from '../src/components'
import { useGetAllPropertyQuery } from '../redux/slices/property'

const Index = () => {
  const {data,isFetching}=useGetAllPropertyQuery({page:1,sort:"new",limit:8})

  if(isFetching){
    return null
  }
  return (
    <Layout title={"Home"} description={"Homepage of Royke Realty"}>
      <Home data={data} />
    </Layout>
  )
}

export default Index