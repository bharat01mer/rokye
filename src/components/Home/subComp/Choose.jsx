import React from 'react'
import { FiUserX } from "react-icons/fi"
import { CgFileDocument } from "react-icons/cg"
import { ImCancelCircle } from "react-icons/im"
import {motion} from "framer-motion"

const Choose = () => {
    const items = [
        {
            id: 0,
            title: "No Brokerage",
            desc: 'Let us connect home owners and tenants directly to save time and thousands in a brokerage.',
            icon: <FiUserX size={45}  color={"#035941"}  />
        },
        {
            id: 1,
            title: "No Advance Payment",
            desc: 'Avail our no advance payment service - use our service first and pay us later.',
            icon: <ImCancelCircle size={45} color={"#035941"}  />
        },
        {
            id: 2,
            title: "Rental Agreement",
            desc: 'We will assist you in creating rental agreement as well to make it hassle free and easy.',
            icon: <CgFileDocument size={45} color={"#035941"} />
        },
    ]


    const parentVariant={
        intial:{
            opacity:0 
        },
        animate:{
            opacity:1,
            transition:{
                staggerChildren: 1
            }
        }
    }

    const childVariant={
        intial:{
            opacity:0,
            x:100,
            y:100,
        },
        animate:{
            opacity:1,
            x:0,
            y:0,
            transition:{
                duration:2
            }
        },
    }
    return (
        <div className="rokye__home-choose">
            <div className="rokye__home-choose__title">
                <h1>Why Choose us</h1>
                <p>Rokye Group is commited to helping its client to react their goals</p>
            </div>
            <motion.div className="rokye__home-choose__detail" variants={parentVariant} initial="intial" whileInView={"animate"} viewport={{once:true}}>
                {
                    items.map((data) => (
                        <motion.div className="item" variants={childVariant} >
                            {data.icon}
                            <div className="detail">
                                <h2>{data.title}</h2>
                                <p>{data.desc}</p>
                            </div>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default Choose