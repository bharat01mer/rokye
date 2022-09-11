import { Layout,Blog } from "../../src/components"
import axios from 'axios'

const produrl =
  process.env.NODE_ENV === "production"
    ? "https://api.rokye.com/blog/"
    : "http://localhost:4000/blog/";

const Index = ({data}) => {
  return (
    <Layout title={"Blog"} description={"Blog Pages"}>
      <Blog data={data} />
    </Layout>
  )
}

export async function getServerSideProps(){
  const {data}=await axios.get(produrl)

  
  return {
      props:{data}
  }
}

export default Index