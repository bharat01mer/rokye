import axios from "axios";
import {Layout,BlogDetail as Blog} from "../../src/components"

const produrl =
  process.env.NODE_ENV === "production"
    ? "https://api.rokye.com/blog/"
    : "http://localhost:4000/blog/";

const BlogDetail = ({data}) => {
    
    return (
        <Layout title={data?.data?.title} description={data?.data?.content}>
            <Blog data={data?.data}  />
        </Layout>
    )
}

export async function getServerSideProps(context){
    const {id}=context.query
    const {data}=await axios.get(`${produrl}/${id}`)

    return {
        props:{data}
    }
}

export default BlogDetail