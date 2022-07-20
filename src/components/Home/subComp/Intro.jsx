import React from 'react'
import Image from 'next/image'
import {motion} from "framer-motion"

const Intro = ({winWidth}) => {

    return (
        <div className="rokye__home-intro">
            <div className="outer">
                <div className="detail">
                    {winWidth < 1000 ? (
                        <h1>Find Real Estate That Suits You.</h1>
                        )
                     : (
                         <h1>Find Real Estate <br /> That Suits You.</h1>
                     )
                    }
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, molestias laboriosam delectus eaque error dolorem inventore! Accusamus in fuga corporis neque esse perspiciatis vel.</p>

                    <div className="detail__btn">
                        <h3>Get Started</h3>
                    </div>
                </div>
                <div className="img">
                    {/* <Image src={"/back1.png"} width={1000} height={700} objectFit="contain" /> */}
                    <motion.img src="back1.png" alt="" width={"100%"}  />
                </div>
            </div>
        </div>
    )
}

export default Intro