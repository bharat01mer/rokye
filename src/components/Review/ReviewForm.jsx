import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { GiCancel } from "react-icons/gi"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import ReactStars from "react-rating-stars-component";
import { useCreateReviewMutation } from '../../../redux/slices/review'
import { toast, ToastContainer } from 'react-toast'


const ReviewForm = ({ setClose, name, email, id, refetch }) => {
    
    const { register, formState: { errors, isValid }, handleSubmit, setValue } = useForm({ mode: "onChange", defaultValues: { email, name } })
    const [createReview, info] = useCreateReviewMutation()

   const ratingHandler=(value)=>{
    setValue("rating",value)
   }

    const onSubmitHandler = async (data) => {

        await createReview({ ...data, createdBy: id }).then(() => {
            refetch()
            toast.success("Review Submitted")
            setClose(false)
        }).catch((err) => {
            toast.error("Error Occured,try Again")

        })

    }


    return (
        <div className="rokye__reviewForm">
            <ToastContainer delay={2000} />
            <form className='form' onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="cancel" onClick={() => setClose(false)}>
                    <GiCancel size={35} color="#f25c05" />
                </div>
                <h1>Leave a Review</h1>
                <div className="item name">
                    <TextField variant='outlined' fullWidth label="Name" disabled value={name} {...register("name")} />
                </div>
                <div className="item email">
                    <TextField variant='outlined' fullWidth label="Email" disabled value={email} {...register("email")} />
                </div>
                <div className="item rating">
                    <div className="rating__title">
                        <p {...register("rating", { required: true })} >Choose Rating:</p>

                        <div className="star">
                            <ReactStars
                                count={5}
                                onChange={ratingHandler}
                                size={30}
                                activeColor="#f25c05"
                            />,
                        </div>
                    </div>


                </div>
                <div className="item review" >
                    <TextField variant='outlined' fullWidth label="Your Review" multiline rows={5} {...register("comment", { required: true })} />

                </div>
                <motion.button className="submit" type="submit" whileTap={{ scale: .95 }}>
                    <h3>Submit a review</h3>
                </motion.button>
            </form>
        </div>
    )
}

export default ReviewForm