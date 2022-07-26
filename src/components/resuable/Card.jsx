import Image from 'next/image'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowRight, BsSuitHeartFill, BsSuitHeart } from "react-icons/bs"
import { TiDelete } from 'react-icons/ti'
import { motion } from "framer-motion"
import Link from "next/link"
import milify from "millify"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'
import { useAddFavoriteMutation } from '../../../redux/slices/user'
import { updateUserData } from '../../../redux/slices/util'
import { useDeletePropertyByIdMutation } from '../../../redux/slices/property'
import { ToastContainer, toast } from 'react-toast'

const Card = ({ img, title, price, city, place, id, furnished, useFavorite = true, useDelete = false, refetch }) => {
  const [favorite, setfavorite] = useState(true)
  const { user } = useSelector((state) => state.util)
  const [addFavoriteProp] = useAddFavoriteMutation()
  const [deletePropbyId] = useDeletePropertyByIdMutation()
  const dispatch = useDispatch()

  const addFavoritePropHandler = async () => {
    const userid = user.data._id

    try {
      await addFavoriteProp({ id: userid, data: id }).then((res) => {
        dispatch(updateUserData(res.data.data))
      })

    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    if (user) {

      const isFavorite = user?.data?.favoriteProp.find((item) => item.id === id)


      if (isFavorite !== undefined || isFavorite) {
        setfavorite(true)
      } else {
        setfavorite(false)
      }
    }

  }, [dispatch, user, favorite])

  const deleteProp = async () => {
    await deletePropbyId(id).then(() => {
      toast.success("Property Deleted")
      refetch()
    }).catch((err) => {
      toast.error("Error Occured")
    })
  }

  return (
    <div className="rokye__card">
      <ToastContainer delay={2000} />
      <Link passHref href={`/properties/${id}`} >
        <div className="rokye__card-img">
          <Image src={img ?? "https://res.cloudinary.com/dburijwvn/image/upload/v1660821827/No_image_available_zbwqpo.jpg"} width={1900} height={1080} objectFit="cover" />
        </div>
      </Link>
      {
        useFavorite && user && (

          <div className="favorite" onClick={addFavoritePropHandler}>
            {
              !favorite ? (
                <motion.div whileTap={{ scale: 0.90 }}>
                  <Tooltip title="Add to Shortlist" placement='top-start'>
                    <IconButton>
                      <BsSuitHeart size={30} />
                    </IconButton>
                  </Tooltip>
                </motion.div>
              )
                : (
                  <motion.div whileTap={{ scale: 0.90 }}>
                    <Tooltip title="Remove to Shortlist" placement='top-start'>
                      <IconButton>
                        <BsSuitHeartFill size={30} />
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                )
            }
          </div>
        )
      }
      {
        useDelete && (
          <div className="favorite" onClick={deleteProp}>
            <TiDelete size={40} color="red" />
          </div>
        )
      }

      <Link passHref href={`/properties/${id}`} >

        <div className="rokye__card-detail">
          {/* <h2>{title}</h2> */}
          <h3>{title}</h3>
          <div className="additional">
            <div className="additional__price">
              <Image src={"/rupee.png"} width={20} height={20} />
              {/* <p> <span>{milify(price)}</span>/month </p> */}
              <p><span>{price}</span></p>
            </div>
            <div className="additional__info">
              <p style={{ textTransform: "capitalize" }}>{furnished}</p>
            </div>
          </div>

        </div>
      </Link>
      <div className="info">
        <div className="info__city">
          <p style={{ textTransform: "capitalize" }}>{place}, {city}</p>
        </div>
        <Link passHref href={`/properties/${id}`}>
          <div className="info__redirect">
            <motion.div className="redirect" whileTap={{ x: 20 }}>
              <BsArrowRight size={40} />
            </motion.div>
          </div>
        </Link>
      </div>
    </div>

  )
}

export default Card