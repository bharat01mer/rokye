import React from 'react'
import Layout from '../../src/components/admin/Layout'
import {BlogAdmin} from "../../src/components"

const Blog = () => {
    return (
        <Layout title={"Blog"}>
            <BlogAdmin />
        </Layout>
    )
}

export default Blog