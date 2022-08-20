import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from "react-icons/ai"


const Intro = () => {
    return (
        <div className="rokye__home-intro">
            <div className="rokye__home-intro__detail">
                <div className="title">
                    <h1>Welcome to</h1>
                    <h1>No brokerage property site</h1>
                </div>
                <div className="detail">
                    <h2>No brokerage, No advance payment and <br /> all the listings are physically verified.</h2>
                </div>
                <Link href={"/properties"} passHref >
                    <div className="search">
                        <div className="btn">

                            <AiOutlineSearch size={26} />
                            <h3>Search Home</h3>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="rokye__home-intro__image">
                <div className="blob"></div>
                <Image src={"/home.png"} width={700} height={600} objectFit="contain" loading="eager" />
            </div>
        </div>
    )
}

export default Intro