import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { AiOutlineStar, AiOutlineDown, AiFillStar } from "react-icons/ai"
import { TbArrowsSort } from "react-icons/tb"
import { FiInstagram, FiEdit, FiMail } from "react-icons/fi"
import { FaFacebookF, FaTwitter, FaUserCircle } from "react-icons/fa"
import { BiMessageDetail } from "react-icons/bi"
import ProgressBar from './ProgressBar'
import { reviewData } from '../../../utils/data'
import { ContactModal } from "../resuable"
import ReviewForm from './ReviewForm'


const socialLinks = [
    {
        id: 0,
        link: "facebook.com/rokyerealty",
        icon: <FaFacebookF />
    },
    {
        id: 1,
        link: "instagram.com/rokyerealty",
        icon: <FiInstagram />
    },
    {
        id: 3,
        link: "twitter.com/rokyerealty",
        icon: <FaTwitter />
    },
]
const Review = () => {
    const [reviewStar, setreviewStar] = useState({ one: 80, two: 90, three: 50, four: 30, five: 0 })
    const [showSortingOption, setShowSortingOption] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)
    const [showReviewForm, setshowReviewForm] = useState(false)

    const starItem = [
        {
            id: 0,
            value: reviewStar.one,
        },
        {
            id: 1,
            value: reviewStar.two,
        },
        {
            id: 2,
            value: reviewStar.three,
        },
        {
            id: 3,
            value: reviewStar.four,
        },
        {
            id: 5,
            value: reviewStar.five,
        },
    ]

    const optionItem = [
        {
            id: 0,
            name: "Newest",
            value: "new"
        },
        {
            id: 1,
            name: "Oldest",
            value: "old"
        },
        {
            id: 2,
            name: "High Rating",
            value: "high"
        },
        {
            id: 3,
            name: "Low Rating",
            value: "low"
        },
    ]


    const userRatingStar = (value) => {
        switch (value) {
            case 1:
                return (
                    <>
                        <AiFillStar />
                    </>
                )

            case 2:
                return (
                    <>
                        <AiFillStar />
                        <AiFillStar />
                    </>
                )

            case 3:
                return (
                    <>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </>
                )
            case 4:
                return (
                    <>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </>
                )
            case 5:
                return (
                    <>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                    </>
                )

            default:
                <AiFillStar />
        }
    }
    return (
        <>
            <div className="rokye__review">
                <div className="rokye__review-profile">
                    <div className="intro">
                        <Image src={"/logo.png"} width={150} height={75} objectFit={"contain"} />
                        <h1>Rokye Realty</h1>
                        <p>Online Property Listing Company</p>
                    </div>
                    <div className="divider" />
                    <p className='desc'> Rokye is a online real-estate platform that makes it possible to rent a residential property without paying any brokerage and you can avail our services without any advance payment, We believe in service first and pay later policy.</p>
                    <div className="detail">
                        <div className="detail__mail">
                            <FiMail />
                            <a href="mailto:sales@rokye.com">sales@rokye.com</a>
                        </div>
                        <div className="detail__social">
                            {
                                socialLinks.map((item) => (
                                    <a href={`https://${item.link}`} className="item" key={item.id}>
                                        {item.icon}
                                    </a>
                                ))
                            }
                        </div>
                        <motion.div className="detail__contact" whileTap={{ scale: .97 }} onClick={() => setShowContactForm(true)}>
                            <BiMessageDetail />
                            <h3>Contact Us</h3>
                        </motion.div>
                    </div>
                </div>
                <div className="rokye__review-content">
                    <div className="progress">
                        <h1>Review(3)</h1>
                        {
                            starItem.map((item) => (
                                <div className="progress__bar" key={item.value}>
                                    <p>
                                        {item.id + 1} <AiOutlineStar />
                                    </p>
                                    <ProgressBar value={item.value} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="add">
                        <div className="add__sort">
                            <p>
                                <TbArrowsSort />
                                Sort by:
                            </p>
                            <div className="option">
                                <div className="option__title" onClick={()=>setShowSortingOption((item)=>!item)}>
                                    <p>Choose</p>
                                    <AiOutlineDown />
                                </div>
                                {
                                    showSortingOption && (
                                        <motion.div className="option__content" initial={{ opacity: 0, scale: 0 }} exit={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>

                                            {
                                                optionItem.map((item) => (
                                                    <div className="item" key={item.id}>
                                                        <p>{item.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </motion.div>
                                    )
                                }
                            </div>
                        </div>
                        <motion.div className="add__content" whileTap={{ scale: .97 }} onClick={()=>setshowReviewForm(true)}>
                            <FiEdit size={20} />
                            <p>Add Review</p>
                        </motion.div>
                    </div>
                    <div className="review">
                        {
                            reviewData.map((item) => (
                                <div className="review__item" key={item.id}>
                                    <div className="upper">
                                        <div className="upper__info">
                                            <FaUserCircle size={40} />

                                            <div className="info">
                                                <h2>{item.name}</h2>
                                                {
                                                    userRatingStar(item.rating)
                                                }
                                            </div>

                                        </div>
                                        <p>{item.date}</p>
                                    </div>
                                    <div className="lower">
                                        <p>{item.review}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="pagination">

                </div> */}
                </div>
            </div>
            {
                showContactForm && (
                    <ContactModal setShowModal={setShowContactForm} />
                )
            }
            {
                showReviewForm && (
                    <ReviewForm setClose={setshowReviewForm} />
                )
            }
        </>
    )
}

export default Review