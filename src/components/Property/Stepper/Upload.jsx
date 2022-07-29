import { BsImages } from "react-icons/bs"
import { Alert, AlertTitle } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useState } from "react"
import { useEffect } from "react"
import { MdCancel } from "react-icons/md"
import axios from "axios"

import Image from "next/image"

const Upload = () => {
    const [imageFile, setimageFile] = useState([])
    const [imagePreview, setimagePreview] = useState([])
    const { register, getValues, resetField, setValue } = useFormContext()


    const onHandleChange = (e) => {

        if (e.target.files.length > 0 && e.target.files.length === 1) {

            setimageFile([...e.target.files])
            setimagePreview([...imagePreview, ...e.target.files])
        } else {

            setimageFile([...e.target.files])
            setimagePreview([...imagePreview, ...e.target.files])
        }
    }

    useEffect(() => {

    }, [imageFile, imagePreview])
    const removeImageFromArray = (id) => {

        setimagePreview([...imagePreview.slice(0, id), ...imagePreview.slice(id + 1, imagePreview.length)])
        resetField("file")
    }




    return (
        <div className="form__upload">
            <div className="form__upload-title">
                <BsImages size={30} />
                <h1>Photos</h1>
            </div>
            <div className="form__upload-content">
                <div className="warning">
                    <Alert severity="warning" >
                        <AlertTitle>Warning</AlertTitle>
                        The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first
                    </Alert>
                </div>
                <div className="upload__btn">
                    <label htmlFor="image" >
                        <BsImages size={25} />
                        <p>Choose Image</p>
                    </label>
                    <input type="file" name="image" id="image" {...register("images")} accept={"image/*"} onChange={(e) => onHandleChange(e)} multiple />
                </div>

            </div>
            {
                imagePreview && imagePreview.map((item, i) => (
                    <>
                        <div className="form__upload-preview">
                            <div className="item" key={item.name}>
                                <div className="remove" onClick={() => removeImageFromArray(i)} type="button"><MdCancel size={30} /></div>
                                <Image src={URL.createObjectURL(item)} alt="" style={{ width: "100%" }} width={300} height={200} objectFit="cover" />
                            </div>

                        </div>
                        <div className="form__upload-submit">
                            <p>Upload Image</p>
                        </div>
                    </>
                ))
            }
        </div>
    )
}

export default Upload