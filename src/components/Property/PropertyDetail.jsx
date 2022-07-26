import React, { useState } from 'react'
import { ContactForm } from '../resuable'
import { ImLocation } from "react-icons/im"
import millify from 'millify'
import { propertyDetail } from '../../../utils/data'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FcCalendar } from "react-icons/fc"
import { BiRupee } from "react-icons/bi"
import { TbCheckbox } from "react-icons/tb"
import { motion, AnimatePresence } from 'framer-motion'
import { premiumFilterdata } from '../../../utils/data'
import { useSelector } from 'react-redux'
import dynamic from "next/dynamic"

const Carousel = dynamic(() => import("./subComp/PropertyDetailCarousel"))


const PropertyDetail = ({ cardDetail }) => {
  const { winWidth } = useSelector((state) => state.util)
  const [showModal, setShowModal] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [showMore, setShowMore] = useState(false)



  return (
    <>
      <div className="rokye__property-detail">
        <div className="rokye__property-detail__prop">
          <div className="title">
            <div className="headline">
              <h1>{cardDetail?.title}</h1>

              <div className="like" onClick={() => setFavorite(!favorite)}>
                {
                  favorite ? <AiFillHeart color='red' size={24} /> : <AiOutlineHeart size={24} />
                }
              </div>
            </div>
            <div className="title__info">
              <div className="location">
                <ImLocation />
                <p>{cardDetail?.place},{cardDetail?.city}</p>
              </div>
              <div className="date">
                <FcCalendar size={20} />
                <p>29th May,2020</p>
              </div>
            </div>
          </div>
          <div className="carousel">
            <Carousel />
          </div>

          <div className="desc">
            <div className="desc__title">
              <h1>Description</h1>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi quod placeat explicabo sequi enim quaerat voluptatem maxime, quia ipsum impedit et, autem eveniet saepe ex unde mollitia culpa consectetur! </p>
            <p>Ex mollitia, explicabo sed neque quidem voluptatum, corporis perspiciatis laboriosam eligendi harum odio rerum possimus obcaecati, quasi molestiae repellat excepturi delectus nulla velit dolor itaque enim ad alias fuga. Odit!</p>
          </div>
          <div className="detail">
            <div className="detail__title">
              <h1>Property Detail</h1>
            </div>
            <div className="detail__content">
              <div className="item">

                {propertyDetail.left.map((item) => (
                  <div className="tag" key={item.id}>
                    <p>{item.name}</p>
                    {
                      item?.price ? (
                        <p> <BiRupee /> {millify(item.value)}</p>

                      ) : (
                        <p>{item.value}</p>

                      )
                    }
                  </div>
                ))}
              </div>

              {
                (winWidth > 850 || showMore) && (
                  <div className="item">

                    {propertyDetail.right.map((item) => (

                      <div className="tag" key={item.id}>
                        <p>{item.name}:</p>
                        {
                          item?.numstring ? (
                            <>
                              {console.log(item?.value?.split(" "))}
                              <p>{millify(parseInt(item?.value?.split(" ")[0]))} {item?.value?.split(" ")[1]} </p>
                            </>

                          ) : (

                            <p>{item.value}</p>
                          )
                        }
                      </div>
                    ))}
                  </div>

                )
              }
              {
                winWidth < 850  && (
                  <motion.div className="more" onClick={()=>setShowMore(!showMore)}>
                    {
                      showMore ? (
                        <p>Less</p>
                      ) : (
                        <p>More</p>
                      )
                    }
                    <div className="bar"></div>
                  </motion.div>
                )
              }
            </div>


          </div>

          <div className="amenity">
            <div className="amenity__title">
              <h1>Amenities</h1>
            </div>
            <div className="amenity__content">
              {
                premiumFilterdata.amenities.slice(0, 9).map((item) => (
                  <div className="item" key={item.id}>
                    <TbCheckbox size={20} color={"#035941"} />
                    <p>{item.name}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="rokye__property-detail__contact">
          {
            winWidth > 1450 ? (

              <ContactForm />
            ) : (
              <motion.div className="contact__btn" whileTap={{ scale: .97 }} onClick={() => setShowModal(true)}>
                <h3>For Inquiry</h3>
              </motion.div>
            )
          }
        </div>
      </div>
      <AnimatePresence>

        {
          showModal && (
            <div className="contact__modal">
              <motion.div className="contact__modal-item" initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <ContactForm showCancel={true} setShowModal={setShowModal} />
              </motion.div>
            </div>
          )
        }
      </AnimatePresence>
    </>
  )
}

export default PropertyDetail