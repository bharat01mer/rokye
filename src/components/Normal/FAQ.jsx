import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

import { questions } from '../../../utils/data'
import { ScrollTo } from '../resuable'

const FAQComp = () => {
    const [showAns, setShowAns] = useState({ id: null, show: false })
    const [showQues, setShowQues] = useState("owner")
    return (
        <>
        <ScrollTo />
            <div className="rokye__faq-img">
            </div>
            <div className="rokye__faq" style={{marginTop:"3rem"}}>
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
                                                <AiOutlineMinus size={25} cursor="pointer" />
                                            ) : (
                                                <AiOutlinePlus size={25} cursor="pointer" />
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