import React from 'react'
import { FiUserX } from "react-icons/fi"
import { CgFileDocument } from "react-icons/cg"
import { ImCancelCircle } from "react-icons/im"
import { RiFileList2Fill } from "react-icons/ri"
import { motion } from "framer-motion"
import Image from 'next/image'

const Choose = () => {
    const items = [
        {
            id: 0,
            title: "No Brokerage",
            img: "https://res.cloudinary.com/dburijwvn/image/upload/v1663314023/No_Brokerage_bx2i1n.png",
            desc: 'Let us connect home owners and tenants directly to save time and thousands in a brokerage.',
            icon: <FiUserX size={45} color={"#035941"} />
        },
        {
            id: 1,
            title: "No Advance Payment",
            img: "https://res.cloudinary.com/dburijwvn/image/upload/v1663314023/No_Advance_Payment_oeevtg.png",
            desc: 'Avail our no advance payment service - use our service first and pay us later.',
            icon: <ImCancelCircle size={45} color={"#035941"} />
        },
        {
            id: 2,
            title: "Shortlist at home",
            img: "https://res.cloudinary.com/dburijwvn/image/upload/v1663314023/Shortlist_at_home_hfjxks.png",
            desc: 'Wishlist all the properties you like to see and visit once you are ready to make a decision.',
            icon: <RiFileList2Fill size={45} color={"#035941"} />
        },
        {
            id: 3,
            title: "Rental Agreement",
            img: "https://res.cloudinary.com/dburijwvn/image/upload/v1663314023/Rental_Agreement_pzs33z.png",
            desc: 'We will assist you in creating rental agreement as well to make it hassle free and easy.',
            icon: <CgFileDocument size={45} color={"#035941"} />
        },
    ]

    const parentVariant = {
        intial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 1
            }
        }
    }
    return (
        <div className="rokye__home-choose">
            <div className="rokye__home-choose__title">
                <h1>Why Choose us</h1>
                <p style={{color:"#000"}}>Rokye Group is commited to help our clients</p>
            </div>
            <div className="outer">

                <motion.div className="rokye__home-choose__detail" variants={parentVariant} initial="intial" whileInView={"animate"} viewport={{ once: true }}>
                    {
                        items.map((data) => (
                            <motion.div className="item" key={data.title}>
                                <div className={`icon img${data.id}`}>
                                    <Image src={data.img} objectFit="cover" width={300} height={250} alt={data.title} />
                                </div>
                                <div className="detail">
                                    <h2 style={{color:"#000"}}>{data.title}</h2>
                                </div>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Choose