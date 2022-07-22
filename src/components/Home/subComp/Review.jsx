import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { motion } from "framer-motion";
import { Navigation } from "swiper"
import { reviewCard } from "../../../../utils/data";

const ReviewCard = ({ img, desc, name, position,className }) => {
    return (
        <div className={`review__card ${className}`}>
            <div className="review__card-img">
                <Image src={img} width={120} height={120} objectFit="cover" />
                <div className="comma">
                    <Image src={"/comma.png"} width={20} height={20} objectFit="cover" />
                </div>
            </div>
            <div className="review__card-detail">
                <p>"{desc}"</p>

                <div className="person">
                    <h3>{name}</h3>
                    <p>{position}</p>
                </div>
            </div>
        </div>
    )
}

const Review = () => {
    const breakpoints={
        700:{
            slidesPerView:2,
            spaceBetween:100
        },
        1300:{
            slidesPerView:3
        }
    }
    return (
        <div className="rokye__home-review">
            <div className="rokye__home-review__title">
                <h1>Review</h1>
                <p>Rokye Group is commited to helping its client to react their goals</p>
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
                        reviewCard.map((item) => (
                            <SwiperSlide key={item.id}>
                                {({ isActive }) => (
                                    <ReviewCard  img={item.img} name={item.name} className={isActive ? "active" : ""} desc={item.desc} position={item.postion} />
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