import { useState } from "react"
import Image from "next/image"
import { BiRupee } from "react-icons/bi"
import { AiOutlineCheck } from "react-icons/ai"
import { ownerPoints, tenantPoints } from "../../../utils/data"
import ContactForm from "../resuable/ContactForm"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import {ContactModal, ScrollTo} from "../resuable"


const Plans = () => {
    const { winWidth } = useSelector((state) => state.util)
    const [showModal, setShowModal] = useState(false)
    const workItem = [
        {
            id: 0,
            title: "Owners: Add your property details or make an enquiry",
            desc: "Our relationship manager will contact you to verify your details and visit your property if you are interested to avail our services."
        },
        {
            id: 1,
            title: "Tenants: Make an enquiry by submiting your details",
            desc: "Our relationship manager will contact you to know your requirements and will start showing you properties if you are interested to avail our services."
        },
        {
            id: 2,
            title: "Payment option: No Advance Payment",
            desc: "We do not charge anything in advance to our customers, once you are happy with your search and decide to rent out any property showed by us you will make a payment before we make a rent agreement and hand over keys to you."
        },
    ]
    return (
        <>
        <ScrollTo />
            <div className="rokye__plan">
                <div className="upper">

                    <div className="rokye__plan-info">
                        <div className="title">
                            <h1>Fill your details and we will get back to you</h1>
                        </div>
                        <div className="content">
                            <div className="content__owner">
                                {/* <Image src={"/landlord.png"} width={130} height={130} objectFit="cover" /> */}
                                <div className="detail">
                                    <div className="detail__title">
                                        <h1>Owner Plans</h1>
                                    </div>
                                    <div className="detail__price">
                                        <BiRupee size={35} />
                                        <h1>9999 <span>Inc. Gst</span> </h1>
                                    </div>
                                    <div className="detail__point">
                                        {
                                            ownerPoints.map((item) => (
                                                <div className="item" key={item.id}>
                                                    <AiOutlineCheck size={20} />
                                                    <p>{item.value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="content__tenant">
                                {/* <Image src={"/tenant.png"} width={130} height={130} objectFit="cover" /> */}
                                <div className="detail">
                                    <div className="detail__title">
                                        <h1>Tenant Plans</h1>
                                    </div>
                                    <div className="detail__price">
                                        <BiRupee size={35} />
                                        <h1>6999 <span>Inc. Gst</span> </h1>
                                    </div>
                                    <div className="detail__point">
                                        {
                                            tenantPoints.map((item) => (
                                                <div className="item" key={item.id}>
                                                    <AiOutlineCheck />
                                                    <p>{item.value}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="rokye__plan-contact">
                        {
                            winWidth < 1500 ? (
                                <div className="contact__btn">
                                    <motion.div className="btn" whileTap={{ scale: .95 }} onClick={()=>setShowModal(true)}>
                                        <h2>Fill Details</h2>
                                    </motion.div>
                                </div>
                            ) : (
                                <ContactForm />
                            )
                        }
                    </div>
                </div>
                <div className="lower">
                    <div className="rokye__plan-work">
                        <div className="title">
                            <h1>How assisted plans work</h1>
                        </div>
                        <div className="content">
                            {
                                workItem.map((item) => (
                                    <div className="content__item" key={item.id}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                showModal && (
                    <ContactModal setShowModal={setShowModal} />
                )
            }
        </>
    )
}

export default Plans