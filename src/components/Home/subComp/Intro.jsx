import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { VscHome } from "react-icons/vsc"
import { MdOutlineAutoAwesome } from "react-icons/md"

const Intro = ({ winWidth }) => {
    const url = "https://o.remove.bg/downloads/5489a143-a2ee-4dae-b5eb-8e9bae0f065e/photo-1479839672679-a46483c0e7c8-removebg-preview.png"
    const isResponsiveFrame=winWidth > 1000 || winWidth < 540
    return (
        <div className="rokye__home-intro">
            <div className="text">
                <h1>Find</h1>
                <h1 className='mid'>Your <MdOutlineAutoAwesome size={50} color="#F2BA52" /> </h1>
                <h1>
                    &nbsp;<VscHome color='#F2BA52' size={100} /> Home
                </h1>
            </div>
            {
                isResponsiveFrame  && (
                    <div className="img">
                        <Image src="/blob.png" alt="" width={600} height={600} />
                        <div className="img__inner">
                            <img src={"/banner.png"} alt="" width={600} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Intro