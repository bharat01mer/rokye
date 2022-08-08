import Card from '../../resuable/Card'
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion"

import { cardData } from '../../../../utils/data';

import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

import { Navigation } from "swiper"

const Recently = ({data}) => {
    const breakpoints = {
        850: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1250: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1550:{
            slidesPerView: 4,
            spaceBetween: 10,
        }
    }
    console.log({data})
    return (
        <div className="rokye__home-recent">
            <div className="rokye__home-recent__title">
                <h1>Recently Added</h1>
                <p>Rokye Group is commited to helping its client to react their goals</p>
            </div>
            <div className="rokye__home-recent__detail">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={40}
                    modules={[Navigation]}
                    navigation={{ nextEl: ".next__btn", prevEl: ".prev__btn" }}
                    loop
                    breakpoints={breakpoints}
                    pagination={{
                        clickable: true,
                    }}
                    // centeredSlides={true}
                    className="mySwiper"
                >
                    {data?.data?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Card title={`${item.bedroom}BHK ${item.propType} for rent`} bath={item.bathroom} bed={item.bedroom} city={item.city} place={item.society} price={item.rentDetail.monthly} img={item.images[0]?.data ? item.images[0]?.data : "https://res.cloudinary.com/dykwfe4cr/image/upload/v1659513375/Trailers/vvdylxopbl0ozuy8m85d.jpg"   } id={item._id} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="rokye__home-recent__navigate">
                <motion.div className="prev__btn" whileTap={{ x: -30 }}>
                    <BsArrowLeft size={50} />
                </motion.div>
                <motion.div className="next__btn" whileTap={{ x: 30 }}>
                    <BsArrowRight size={100} />
                </motion.div>
            </div>
        </div>
    )
}

export default Recently