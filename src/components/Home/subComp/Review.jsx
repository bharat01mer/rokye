import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { Navigation } from "swiper"
import { useGetAllReviewQuery } from "../../../../redux/slices/review";

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


const ReviewCard = ({ img, desc, name, className,rating }) => {
    return (
        <div className={`review__card ${className}`}>
            <div className="review__card-img">
                <Image src={img} width={120} height={120} objectFit="cover" />
                <div className="comma">
                    <Image src={"/comma.png"} width={20} height={20} objectFit="cover" />
                </div>
            </div>
            <div className="review__card-detail">
                <p>&quot;{desc}&quot;</p>

                <div className="person">
                    <h3>{name}</h3>
                    <p className="rating">{userRatingStar(rating)}</p>
                </div>
            </div>
        </div>
    )
}


const Review = () => {
    const { data } = useGetAllReviewQuery({ id: 1, filter: "new" })
    const breakpoints = {
        700: {
            slidesPerView: 2,
            spaceBetween: 100
        },
        1300: {
            slidesPerView: 3
        }
    }

    if (!data) {
        return null
    }
    return (
        <div className="rokye__home-review">
            <div className="rokye__home-review__title">
                <h1>Reviews</h1>
                <p>Let's see what our customers say about us</p>
            </div>
            <div className="rokye__home-review__detail">
                <Swiper
                    slidesPerView={1}
                    breakpoints={breakpoints}
                    spaceBetween={40}
                    centeredSlides
                    loop
                    modules={[Navigation]}
                    navigation={{ nextEl: ".next__btn-review", prevEl: ".prev__btn-review" }}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    {
                        data?.data?.map((item) => (
                            <SwiperSlide key={item._id}>
                                {({ isActive }) => (
                                    <ReviewCard img={item.img} name={item.name} className={isActive ? "active" : ""} desc={item.comment} rating={item.rating} />
                                )}
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="rokye__home-review__navigate">
                <motion.div className="prev__btn-review" whileTap={{ x: -30 }}>
                    <BsArrowLeft size={50} />
                </motion.div>
                <motion.div className="next__btn-review" whileTap={{ x: 30 }}>
                    <BsArrowRight size={100} />
                </motion.div>
            </div>
        </div>
    )
}

export default Review