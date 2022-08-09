import React from 'react'

import { ReviewAdmin} from '../../src/components'
import Layout from '../../src/components/admin/Layout'

const Admin = () => {
    return (
        <div className='admin'>
            <Layout >
                <ReviewAdmin />
            </Layout>
        </div>
    )
}

export default Admin