import React from 'react'

import { UserAdmin as User} from '../../src/components'
import Layout from '../../src/components/admin/Layout'

const Admin = () => {
    return (
        <div className='admin'>
            <Layout >
                <User />
            </Layout>
        </div>
    )
}

export default Admin