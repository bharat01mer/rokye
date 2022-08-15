import { BsImages } from "react-icons/bs"
import { Alert, AlertTitle } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { MdCancel } from "react-icons/md"

import Image from "next/image"

const Upload = ({ imageArray, setImageArray }) => {
    const { register, resetField,formState:{errors} } = useFormContext()


    const onHandleChange = (e) => {

        if (e.target.files.length > 0 && e.target.files.length === 1) {
            setImageArray([...imageArray, ...e.target.files])
        } else {
            setImageArray([...imageArray, ...e.target.files])
        }
    }

    useEffect(() => {

    }, [imageArray])
    const removeImageFromArray = (id) => {
        setImageArray([...imageArray.slice(0, id), ...imageArray.slice(id + 1, imageArray.length)])
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

            <div className="form__upload-preview">
                {
                    imageArray.length !== 0 && imageArray.map((item, i) => (
                        <>
                            <div className="item" key={item.name}>
                                <div className="remove" onClick={() => removeImageFromArray(i)} type="button"><MdCancel size={30} /></div>
                                <Image src={URL.createObjectURL(item)} alt="img" style={{ width: "100%" }} width={300} height={200} objectFit="contain" />
                            </div>

                        </>
                    ))
                }
            </div>
            {
                errors.images && (
                    <p style={{textAlign:"start",color:"red",fontSize:".9rem",width:"100%"}}>Image is Required</p>
                )
            }
        </div>
    )
}

export default Upload