import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

const Layout = ({ title, description ,children}) => {
    return (
        <>
            <Head>
                <title>{title ? `${title} - Royke Realty` : 'Rokye Realty'}</title>
                {description && <meta name='description' content={description} />}
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>

    )
}

export default Layout