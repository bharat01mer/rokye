import React from 'react'

import { ContactAdmin} from '../../src/components'
import Layout from '../../src/components/admin/Layout'

const Admin = () => {
    return (
        <div className='admin'>
            <Layout >
                <ContactAdmin />
            </Layout>
        </div>
    )
}

export default Admin