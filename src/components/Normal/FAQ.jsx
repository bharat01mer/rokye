import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import Image from 'next/image'

import { questions } from '../../../utils/data'

const FAQComp = () => {
    const [showAns, setShowAns] = useState({ id: null, show: false })
    const [showQues, setShowQues] = useState("owner")
    return (
        <>
            <div className="rokye__faq-img">
                <Image src={"https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1596&q=80"} objectFit="cover" width={2000} height={1000} />
            </div>
            <div className="rokye__faq">
                <div className="rokye__faq-title">
                    <h1>Frequently Asked Questions</h1>
                </div>
                <div className="rokye__faq-tab">
                    <div className={`item ${showQues === "owner" && "active"}`} onClick={() => setShowQues("owner")}>
                        <h3>For Owner</h3>
                    </div>
                    <div className={`item ${showQues === "tenant" && "active"}`} onClick={() => setShowQues("tenant")}>
                        <h3>For Tenant</h3>
                    </div>
                    <div className={`item ${showQues === "referral" && "active"}`} onClick={() => setShowQues("referral")}>
                        <h3>For Referrals</h3>
                    </div>
                </div>
                <div className="rokye__faq-content">

                    {
                        questions[showQues].map((item) => (

                            <div className="item" key={item.id}>
                                <div className="item__upper" onClick={() => setShowAns({ id: showAns.id === item.id ? null : item.id, show: showAns.id === item.id ? false : true })}>
                                    <div className="quest">
                                        <div className="circle" />
                                        <h2>{item.quest}</h2>
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
        </>
    )
}

export default FAQComp