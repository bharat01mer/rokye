import Image from 'next/image';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';


const PropertyDetailCarousel = ({ data }) => {
    return (
        <div className="carousel__slider">
            <Swiper className="mySwiper" slidesPerView={1}
                spaceBetween={40}
                centeredSlides
                loop
                modules={[Navigation]}
                navigation={{ nextEl: ".navigation__next", prevEl: ".navigation__prev" }}
                pagination={{
                    clickable: true,
                }}>
                {data.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Image src={item.data ?? "https://www.aepint.nl/wp-content/uploads/2014/12/No_image_available.jpg"} width={1400} height={740} alt={"img"} objectFit="cover" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="navigation" >
                <div className="navigation__prev" >
                    <AiOutlineArrowLeft size={50} />
                </div>
                <div className="navigation__next" >
                    <AiOutlineArrowRight size={50} />
                </div>
            </div>
        </div>
    )
}

export default PropertyDetailCarousel