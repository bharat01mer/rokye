import React from 'react'
import Layout from '../src/components/layout'

import dynamic from 'next/dynamic'

const Home= dynamic(()=> import("../src/components/Home/Home"))

const Index = () => {
  return (
    <Layout title={"Home"} description={"Homepage of Royke Realty"}>
      <Home  />
    </Layout>
  )
}

export default Index