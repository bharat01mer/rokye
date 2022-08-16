import React, { useState } from 'react'
import { useRouter } from "next/router"
import { useDeleteReviewMutation, useGetAllReviewQuery } from '../../../redux/slices/review'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import {motion} from "framer-motion"
import Paginate from './Pagination'
import { MdDelete } from 'react-icons/md'
import {toast,ToastContainer} from "react-toast"

const Review = () => {
  const router = useRouter()
  const page = router.query?.page || 1

  const { data, isFetching, error, refetch } = useGetAllReviewQuery({ id: page, filter: "new" })
  const [deleteFunc]=useDeleteReviewMutation()


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

  if(!data){
    return null
  }

  const deleteReviewHandler = (id) => {
    deleteFunc(id).unwrap().then(() => {
      refetch()
      toast.success("Post Deleted")
    }).catch((err) => {
      toast.error("Error Occured,Try Again")
    })
  }

  return (
    <div className="admin__content-review">
      <ToastContainer delay={2000} />
      <div className="title">
        <h1>All User Reviews</h1>
        <p>{data.count} contact</p>
      </div>
      <div className="divider" />
      <div className="content">
        <div className="review">
          {
            data?.data?.map((item) => (
              <div className="review__item" key={item.id}>
                <div className="upper">
                  <div className="upper__info">
                    {
                      
                    }
                    <FaUserCircle size={40} />

                    <div className="info">
                      <h2>{item.name}</h2>
                      {
                        userRatingStar(item.rating)
                      }
                    </div>

                  </div>
                  <p>{item.date.slice(0, 10)}</p>
                </div>
                <div className="lower">
                  <p>{item.comment}</p>


                  <motion.div className="remove" onClick={() => deleteReviewHandler(item._id)} >
                    <MdDelete size={30} color="red" />
                  </motion.div>

                </div>

              </div>
            ))
          }
        </div>
        <div className="pagination">
          <Paginate refetch={refetch} propData={data} page={page} link={"review"} />
        </div>
      </div>
    </div>
  )
}

export default Review