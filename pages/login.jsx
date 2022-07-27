import React from 'react'
import { Layout, Login } from "../src/components"

const login = () => {
    return (
        <Layout title={"Login"} description={"Login"}>
            <Login />
        </Layout>
    )
}

export default login