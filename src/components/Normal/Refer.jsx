import React, { useState } from 'react'
import { ReferAnimation } from "../../../illustration"
import { ContactForm } from "../resuable"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { questions } from '../../../utils/data'
import { useSelector } from 'react-redux'

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
                        <h1>Refer &#38; Earn 250</h1>

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
                                <div className="content__item">
                                    <h2>{item.id + 1}</h2>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="rokye__refer-faq">
                    <img src={"/refer.jpg"} objectFit="contain" />
                    <div className="outer">
                        <div className="content">
                            <div className="content__title">
                                <h1>Frequently asked questions</h1>
                            </div>
                            <div className="content__box">
                                {
                                    questions.referral.map((item) => (
                                        <div className="item" key={item.id}>
                                            <div className="item__upper" onClick={() => setShowAns({ id: showAns.id === item.id ? null : item.id, show: showAns.id === item.id ? false : true })}>
                                                <div className="quest">
                                                    <div className="circle" />
                                                    <h3>{item.quest}</h3>
                                                </div>
                                                <div className="show">
                                                    {
                                                        (showAns.id === item.id && showAns.show) ? (
                                                            <AiOutlineMinus size={25} />
                                                        ) : (
                                                            <AiOutlinePlus size={25} />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="divider" />
                                            <div className={`item__ans ${showAns.id === item.id && showAns.show ? "active" : ""}`} >
                                                <p>{item.ans}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Refer