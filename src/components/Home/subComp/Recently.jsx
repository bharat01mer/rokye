import Card from '../../resuable/Card'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation"

import {BsArrowLeft} from "react-icons/bs"

import {Navigation} from "swiper"

const Recently = () => {
    return (
        <div className="rokye__home-recent">
            <div className="rokye__home-recent__title">
                <h1>Recently Added</h1>
            </div>
            <div className="rokye__home-recent__detail">
                <Swiper
                    slidesPerView={4}
                    modules={[Navigation]}
                    navigation={{nextEl:".next__btn"}}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Card />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="rokye__home-recent__navigate">
                <div className="prev">

                </div>
            </div>
        </div>
    )
}

export default Recently