import React from 'react'
import { TextField } from '@mui/material'
import { GiCancel } from "react-icons/gi"
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import {  useSelector } from 'react-redux'
import { useCreateBlogMutation } from '../../../redux/slices/blog'


const BlogModal = ({ setShowModal, toast,refetch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [image, setImage] = useState()
    const [showImageError, setShowImageError] = useState(false)

    const [createBlog] = useCreateBlogMutation()
    const { user } = useSelector(state => state.util)

    const onClickHandler = (data) => {
        if (!image) {
            setShowImageError(true)
        } else {
            setShowImageError(false)
            const file = new FormData()
            file.append('file', image)
            file.append("upload_preset", "all_image")

            console.log({ data: { ...data, image } })
            axios.post("https://api.cloudinary.com/v1_1/dburijwvn/image/upload", file).then((res) => {
                createBlog({ ...data, img: res.data.secure_url, author: { id: user?.data?._id, name: user?.data?.name } })
                toast.success("Blog Created")
                setShowModal(false)
                refetch()
            }).catch((err) => {
                console.log({ err })
                toast.error("Error Occured")
            })

        }
    }

    console.log({ errors, showImageError })
    return (
        <div className="rokye__admin-blog__modal">

            <div className="modal">
                <div className="modal__cancel" onClick={() => setShowModal(false)}>
                    <GiCancel size={30} color="red" />
                </div>
                <div className="title">
                    <h1>Create Blog</h1>
                </div>
                <form className="form" onSubmit={handleSubmit(onClickHandler)}>
                    <div className="form__item form__title">
                        <TextField variant="outlined" type="text" label="Title" fullWidth {...register("title", { required: true })} />
                        {
                            errors.content && (
                                <p className="error">
                                    Field Required
                                </p>
                            )
                        }
                    </div>
                    <div className="form__item type">
                        <TextField variant="outlined" type="text" label="Type" fullWidth {...register("type", { required: true })} />
                        {
                            errors.content && (
                                <p className="error">
                                    Field Required
                                </p>
                            )
                        }
                    </div>
                    <div className="form__item img">
                        <div className="upper">

                            <h3>Add Image:</h3>
                            <input type="file" name='image' id='img' accept={"image/*"} onChange={(e) => setImage(e.target.files[0])} />
                            <label htmlFor="img" typeof="button" >
                                choose
                            </label>
                        </div>

                        <div className="lower">

                            {
                                showImageError && (
                                    <p className="error">
                                        Image Required
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <div className="form__item content">
                        <TextField
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={4}
                            fullWidth
                            {...register("content", { required: true })}
                        />
                        {
                            errors.content && (
                                <p className="error">
                                    Field Required
                                </p>
                            )
                        }
                    </div>
                    <motion.button className="submit" whileTap={{ scale: .97 }} type="submit">
                        <h3>Submit</h3>
                    </motion.button>
                </form>
            </div>
        </div>
    )
}

export default BlogModal