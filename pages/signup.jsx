import React from 'react'
import { Layout, Login } from "../src/components"

const SignUp = () => {
    return (
        <Layout title={"Login"} description={"Login"}>
            <Login isSignUp={true} />
        </Layout>
    )
}

export default SignUp