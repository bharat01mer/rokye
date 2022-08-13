import React, { useState, useEffect } from 'react'
import { ContactForm, ContactModal } from '../resuable'
import { ImLocation } from "react-icons/im"
import millify from 'millify'

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FcCalendar } from "react-icons/fc"
import { BiRupee } from "react-icons/bi"
import { BsHash } from "react-icons/bs"
import { TbCheckbox } from "react-icons/tb"
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import dynamic from "next/dynamic"
import { useAddFavoriteMutation } from '../../../redux/slices/user'
import { useDispatch } from "react-redux"
import { updateUserData } from '../../../redux/slices/util'
import { propertyDataNew } from '../../../utils/data'

const Carousel = dynamic(() => import("./subComp/PropertyDetailCarousel"))


const PropertyDetail = ({ cardDetail }) => {
  const { winWidth, user } = useSelector((state) => state.util)
  const [showModal, setShowModal] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const dispatch = useDispatch()
  const [addFavoriteProp] = useAddFavoriteMutation()


  const [favorite, setFavorite] = useState(false)
  useEffect(() => {
    if (user) {
      const isFavorite = user.data?.favoriteProp.find((item) => item.id === cardDetail?._id)

      console.log({isFavorite})
      if (isFavorite !== undefined || isFavorite) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    }

  }, [dispatch, user, favorite, cardDetail])


  if (!cardDetail) {
    return null
  }

  const propertyDetail = {
    left: [
      {
        id: 0,
        name: "Rent",
        value: cardDetail.rentDetail.monthly,
        price: true
      },
      {
        id: 1,
        name: "Deposit",
        value: cardDetail.rentDetail.securityAmount,
        price: true
      },
      {
        id: 2,
        name: "Maintenance",
        value: cardDetail.rentDetail.maintenance,
        price: true
      },
      {
        id: 3,
        name: "Property Type",
        value: getTitle(cardDetail.propType,"propertyType")
      },
      {
        id: 4,
        name: "Bathrooms",
        value: cardDetail.bathroom
      },
      {
        id: 5,
        name: "Balconies",
        value: cardDetail.bedroom
      },
      {
        id: 6,
        name: "Furnished Status",
        value: getTitle( cardDetail.furnished,"furnishing")
      },
      {
        id: 7,
        name: "Parking Places",
        value: cardDetail.carParking
      },
      {
        id: 8,
        name: "Availability",
        value: getTitle( cardDetail.availability,"availability")
      },
      {
        id: 9,
        name: "Floor",
        value: getTitle(cardDetail.floor,"floorno")
      },
    ],
    right: [
      {
        id: 0,
        name: "Property Age",
        value: getTitle(cardDetail.age,"age")
      },
      {
        id: 1,
        name: "Carpet area",
        value: `${cardDetail.carpetArea} sq.ft`,
        
      },
      {
        id: 2,
        name: "Super area",
        value: `${cardDetail.superArea} sqft`,
        
      },
      {
        id: 3,
        name: "Flat no",
        value: cardDetail.flatNo
      },
      {
        id: 4,
        name: "Total floors",
        value: cardDetail.totalFloor
      },
      {
        id: 5,
        name: "Tenant preferred",
        value: getTitle(cardDetail.tenant,"family")
      },
      {
        id: 6,
        name: "Facing",
        value: "South",
        value: getTitle(cardDetail.facing,"facing")
      },
      {
        id: 7,
        name: "Non-veg",
        value: "Not allowed",
        value: getTitle(cardDetail.nonVeg,"nonVeg")
      },
      {
        id: 8,
        name: "Pets",
        value: "Not allowed",
        value: getTitle(cardDetail.pet,"pets")
      },
    ],
  }

  const addFavoritePropHandler = async () => {
    const id = user.data._id

    try {
      console.log({ id, data: cardDetail._id})
      await addFavoriteProp({ id, data: cardDetail._id }).then((res) => {
        dispatch(updateUserData(res.data.data))
      })

    } catch (error) {
      console.log({ error })
    }
  }

  function getTitle(value,name){
    const title=propertyDataNew[name].find((item)=>item.value===value)
    return title?.title
  }
  return (
    <>
      <div className="rokye__property-detail">
        <div className="rokye__property-detail__prop">
          <div className="title">
            <div className="headline">
              <h1>{`${cardDetail?.bedroom}BHK ${cardDetail?.propType} for rent`}</h1>
              {
                user && (
                  <div className="like" onClick={addFavoritePropHandler}>
                    {
                      favorite ? <AiFillHeart color='red' size={24} /> : <AiOutlineHeart size={24} />
                    }
                  </div>
                )
              }
            </div>
            <div className="title__info">
              <div className="location">
                <ImLocation />
                <p>{cardDetail?.society},{cardDetail?.city}</p>
              </div>
              <div className="date">
                <FcCalendar size={20} />
                <p>{cardDetail.date.slice(0, 10)}</p>
              </div>
              <div className="number">
                <BsHash size={20} color={"#f25c05"} />
                <p>{cardDetail._id?.match(/\d+/g)}</p>
              </div>
            </div>
          </div>
          <div className="carousel">
            <Carousel data={cardDetail.images} />
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
                        <p>{item.name}</p>
                        {
                          item?.numstring ? (
                            <>
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
                winWidth < 850 && (
                  <motion.div className="more" onClick={() => setShowMore(!showMore)}>
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
                cardDetail.amenity.map((item) => (
                  <div className="item" key={item}>
                    <TbCheckbox size={20} color={"#035941"} />
                    <p style={{ textTransform: "capitalize" }}>{item}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="desc">
            <div className="desc__title">
              <h1>Description</h1>
            </div>
            <p>{cardDetail.description}</p>
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
            <ContactModal setShowModal={setShowModal}></ContactModal>
          )
        }
      </AnimatePresence>
    </>
  )
}

export default PropertyDetail