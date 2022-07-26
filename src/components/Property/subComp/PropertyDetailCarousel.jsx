import React, { useState } from 'react'
import { Navigation } from 'swiper'; 
import { carouselData } from '../../../../utils/data';
import Image from 'next/image';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { motion, AnimatePresence } from 'framer-motion';
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react";


const PropertyDetailCarousel = () => {
    const [showNav, setShowNav] = useState(false)
    return (
        <div className="carousel__slider">
            <Swiper className="mySwiper" modules={[Navigation]} navigation={{prevEl:".navigation__prev",nextEl:".navigation__next",enabled:true}}  loop>
                {carouselData.map((item) => (
                    <SwiperSlide >
                        <Image src={item.img} width={1400} height={740} alt={"img"} objectFit="cover" onMouseOver={() => setShowNav(true)} onMouseOut={() => setShowNav(false)} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <AnimatePresence>

                {
                    showNav && (
                        <div className="navigation" onMouseOver={() => setShowNav(true)}>
                            <motion.div className="navigation__prev" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: .7 }} whileTap={{scale:1.2}}>
                                <AiOutlineArrowLeft size={50} />
                            </motion.div>
                            <motion.div className="navigation__next" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: .7 }} whileTap={{scale:1.2}}>
                                <AiOutlineArrowRight size={50} />
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default PropertyDetailCarousel