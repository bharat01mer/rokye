import Card from '../../resuable/Card'
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion"
import Link from 'next/link';
import Head from "next/head"

import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { Navigation } from "swiper"
import { useGetAllPropertyQuery } from '../../../../redux/slices/property';

const Recently = () => {
    const breakpoints = {
        750: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1250: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1550: {
            slidesPerView: 4,
            spaceBetween: 10,
        }
    }
    const {data}=useGetAllPropertyQuery({page:1,sort:"new",limit:8})


    return (
        <>
            <Head>
                <link rel="preconnect" href={process.env.NODE_ENV==="production" ? "https://api.rokye.com" : "http://locahost:4000" } />
            </Head>
            <div className="rokye__home-recent">
                <div className="rokye__home-recent__title">
                    <h1>Recently Added</h1>
                    <Link passHref href="/properties">
                        <h3>Show More</h3>
                    </Link>
                </div>
                <div className="rokye__home-recent__detail">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={40}
                        modules={[Navigation]}
                        navigation={{ nextEl: ".next__btn", prevEl: ".prev__btn" }}
                        breakpoints={breakpoints}
                        pagination={{
                            clickable: true,
                        }}
                        // centeredSlides={true}
                        className="mySwiper"
                    >
                        {data?.data?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card
                                    title={`${item.bedroom} BHK ${item.propType[0].toUpperCase()}${item.propType.slice(1)} ${item.superArea} sqft`}
                                    furnished={item.furnished}
                                    city={item.city}
                                    place={item.area}
                                    price={item.rentDetail.monthly}
                                    img={item.images[0]?.data}
                                    id={item._id}
                                />
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
        </>
    )
}

export default Recently