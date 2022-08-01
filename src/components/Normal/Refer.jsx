import React, { useState } from 'react'
import { ReferAnimation } from "../../../illustration"
import { ContactForm } from "../resuable"
import { useSelector } from 'react-redux'
import {BiRupee} from "react-icons/bi"

const workingItem = [
    {
        id: 0,
        title: "Refer Owners/Tenants",
        desc: "Refer anyone who are owners or Tenants for residential property to us."
    },
    {
        id: 1,
        title: "We contact them",
        desc: "Our relationship manager will contact them and verify their details."
    },
    {
        id: 2,
        title: "They took subscription",
        desc: "We will immediately start helping them to rent out residential property."
    },
    {
        id: 3,
        title: "You get paid",
        desc: "Once they successfully use our services, you will get paid ₹250 by UPI."
    },
]

const Refer = () => {
    const [showAns, setShowAns] = useState({ id: null, show: false })
    const { winWidth } = useSelector((state) => state.util)
    return (
        <div className="rokye__refer">
            {
                winWidth < 2000 && (
                    <div className="title">
                        <h1>Refer &#38; Earn <BiRupee />250</h1>
                    </div>
                )
            }
            <div className="upper">
                <div className="rokye__refer-animation">
                    <ReferAnimation />
                </div>
                <div className="rokye__refer-form">
                    <ContactForm referral={true} />
                </div>
            </div>
            <div className="lower">
                <div className="rokye__refer-work">
                    <div className="title">
                        <h1>How it works</h1>
                    </div>
                    <div className="content">
                        {
                            workingItem.map((item) => (
                                <div className="content__item" key={item.id}>
                                    <h2>{item.id + 1}</h2>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Refer