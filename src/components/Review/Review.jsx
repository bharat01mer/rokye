import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { AiOutlineStar, AiOutlineDown, AiFillStar } from "react-icons/ai"
import { TbArrowsSort } from "react-icons/tb"
import { FiInstagram, FiEdit, FiMail } from "react-icons/fi"
import { FaFacebookF, FaTwitter, FaUserCircle } from "react-icons/fa"
import { BiMessageDetail } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import ProgressBar from './ProgressBar'
import { ContactModal } from "../resuable"
import { useGetAllReviewQuery } from '../../../redux/slices/review'
import { useRouter } from 'next/router'
import ReviewForm from './ReviewForm'
import Paginate from './Pagination'
import { useSelector } from 'react-redux'
import { useDeleteReviewMutation } from '../../../redux/slices/review'
import {ToastContainer,toast} from 'react-toast'

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
    const [reviewStar, setReviewStar] = useState({ one: 80, two: 90, three: 50, four: 30, five: 20 })
    const [showSortingOption, setShowSortingOption] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)
    const [showReviewForm, setshowReviewForm] = useState(false)
    const router = useRouter()
    const page = router.query?.page || 1
    const [filterVal, setFilterVal] = useState("new")

    const { data, isFetching, error, refetch } = useGetAllReviewQuery({ id: page, filter: filterVal })
    const { user } = useSelector(state => state.util)

    const [deleteFunc,deleteInfo]=useDeleteReviewMutation()

    useEffect(() => {

    }, [page, data, filterVal, user])

    const starItem = [
        {
            id: 0,
            value: data?.percentages.one,
        },
        {
            id: 1,
            value: data?.percentages.two,
        },
        {
            id: 2,
            value: data?.percentages.three,
        },
        {
            id: 3,
            value: reviewStar.four,
            value: data?.percentages.four,
        },
        {
            id: 4,
            value: data?.percentages.five,
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
    if (!data) {
        return null
    }



    const sortClickHandler = (value) => {
        setFilterVal(value)
        setShowSortingOption(false)
    }

    function averageStar() {
        const avg = Math.round(data.average)

        switch (avg) {
            case 1:
                return (
                    <AiFillStar />

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
                return <AiFillStar />
        }
    }

    const deleteReviewHandler=async(id)=>{
        await deleteFunc(id).then(()=>{
            refetch()
            toast.success("Post Deleted")
        }).catch((err)=>{
            toast("Error Occured,Try Again")
        })
    }
    return (
        <>
            <div className="rokye__review">
                <ToastContainer delay={2000} />
                <div className="rokye__review-profile">
                    <div className="intro">
                        {/* <Image src={"/logo.png"} width={150} height={75} objectFit={"contain"} /> */}
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
                        <div className="title">
                            <h1>Review({data?.count})</h1>
                            <div className="rating">
                                {averageStar()}
                            </div>
                        </div>
                        {
                            starItem.map((item) => (
                                <div className="progress__bar" key={item.id}>
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
                                <div className="option__title" onClick={() => setShowSortingOption((item) => !item)}>
                                    <p>{filterVal}</p>
                                    <AiOutlineDown />
                                </div>
                                {
                                    showSortingOption && (
                                        <motion.div className="option__content" initial={{ opacity: 0, scale: 0 }} exit={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>

                                            {
                                                optionItem.map((item) => (
                                                    <div className="item" key={item.id} onClick={() => sortClickHandler(item.value)} >
                                                        <p>{item.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </motion.div>
                                    )
                                }
                            </div>
                        </div>
                        {
                            user && (
                                <motion.div className="add__content" whileTap={{ scale: .97 }} onClick={() => setshowReviewForm(true)}>
                                    <FiEdit size={20} />
                                    <p>Add Review</p>
                                </motion.div>
                            )
                        }
                    </div>
                    <div className="review">
                        {
                            data?.data?.map((item) => (
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
                                        <p>{item.date.slice(0, 10)}</p>
                                    </div>
                                    <div className="lower">
                                        <p>{item.comment}</p>
                                        {
                                            (user && item?.createdBy?.toString()===user?.data?.data?._id?.toString())  && (
                                                <motion.div className="remove" onClick={()=>deleteReviewHandler(item._id)} >
                                                    <MdDelete size={30} color="red" />
                                                </motion.div>
                                            )
                                        }
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <Paginate refetch={refetch} propData={data} page={page} />
                    </div>
                </div>
            </div>
            {
                showContactForm && (
                    <ContactModal setShowModal={setShowContactForm} />
                )
            }
            {
                showReviewForm && (
                    <ReviewForm setClose={setshowReviewForm} name={user?.data?.data?.name} email={user?.data?.data?.email} refetch={refetch} id={user?.data?.data?._id} />
                )
            }
        </>
    )
}

export default Review