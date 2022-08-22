import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineSearch } from "react-icons/ai"

const Intro2 = () => {
  return (
    <div className="rokye__home-intro2">
        <div className="upper">
        <div className="title">
                    <h1>Rent your next dream home with</h1>
                    <h1>us without paying any brokerage</h1>
                </div>
                <div className="detail">
                    <h3 >Zero hassle, Everything’s instant, Loved by everyone.</h3>
                </div>
                <Link href={"/properties"} passHref >
                    <div className="search" style={{justifyContent:"flex-start"}}>
                        <div className="btn">

                            <AiOutlineSearch size={26} />
                            <h3>Search Home</h3>
                        </div>
                    </div>
                </Link>
        </div>
        <div className="lower">
            <img src="https://res.cloudinary.com/dburijwvn/image/upload/v1661176293/Home_gxrsqc.png" alt="" width={"100%"} />
        </div>
    </div>
  )
}

export default Intro2