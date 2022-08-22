import { Stepper, Basic, Location, Detail, Upload, Contact } from "./Stepper"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useSelector } from "react-redux"
import { useCreatePropertyMutation, useAddImageInPropertyByIdMutation } from "../../../redux/slices/property"
import { ToastContainer, toast } from "react-toast"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

const initialState = {
    category: "",
    propType: "",
    bedroom: "",
    bathroom: "",
    bikeParking: "",
    carParking: "",
    carpetArea: null,
    superArea: null,
    flatNo: null,
    society: "",
    area: "",
    city: "",
    state: "",
    pinCode: null,
    nearby: {
        school: "",
        hospital: "",
        mall: "",
        transport: "",
        temple: "",
        commercial: ""
    },
    totalFloor: null,
    facing: "",
    balconies: null,
    furnished: "",
    age: "",
    availability: "",
    tenant: "",
    nonVeg: "",
    pet: "",
    amenity: [],
    description: "",
    rentDetail: { monthly: null, securityAmount: null, maintenance: null, per: "" },
    images: [],
    firstName: "",
    lastName: "",
    phone: null,
    email: ""
}

const AddProperty = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [imageArray, setImageArray] = useState([])

    const [isImageUploading, setIsImageUploading] = useState(false)

    const totalStep = 4
    const methods = useForm({
        defaultValues: initialState, mode:"onSubmit"
    })

    const router = useRouter()

    const { user } = useSelector((state) => state.util)

    const [createProperty] = useCreatePropertyMutation()
    const [addImageInProp] = useAddImageInPropertyByIdMutation()
    useEffect(()=>{
        if(isImageUploading){
            toast.warn("Wait while uploading images")
        }
    },[isImageUploading])

    useEffect(()=>{
        if(Object.keys(methods.formState.errors).length!==0){
            toast.error("All the fields are required")
        }
        console.log("running")
    })

    console.log({state: methods.formState.errors})
    const showForm = (step) => {
        switch (step) {
            case 0:
                return <Basic />
            case 1:
                return <Location />
            case 2:
                return <Detail />
            case 3:
                return <Upload imageArray={imageArray} setImageArray={setImageArray} />
            case 4:
                return <Contact />
            default:
                return "No Step";
        }
    }


    const imageUpload = (id) => {
        const file = new FormData()

        return new Promise((resolve, reject) => {
            for (let i = 0; i < imageArray.length; i++) {

                file.append('file', imageArray[i])
                file.append("upload_preset", "all_image")

                axios.post("https://api.cloudinary.com/v1_1/dburijwvn/image/upload", file).then((res) => {
                    addImageInProp({ id: id, data: res.data.secure_url })

                    if (i === imageArray.length - 1) {

                        resolve()
                    }
                }).catch((err) => {
                    reject()
                })
            }
        })
    }


    const nextClickHandler = async (data) => {

        if (activeStep === totalStep) {

            createProperty({ ...data, createdBy: user.data._id, city: data?.city.toLowerCase() }).unwrap().then(async (res) => {
                setIsImageUploading(true)
                imageUpload(res.data._id).then(() => {
                    setIsImageUploading(false)
                    router.push(`/properties/${res.data._id}`)
                }).catch((err) => {
                    toast.error("Error")
                    setIsImageUploading(false)
                })
            }).catch((err) => {
                toast.error("Error Occured")
            })


        } else if (activeStep === 3 && imageArray.length === 0) {
            methods.setError("images", { type: "required" })
        } else {
            setActiveStep(item => item + 1)
        }
    }


    return (
        <div className="rokye__add-property">
            <ToastContainer delay={10000} />
            <div className="rokye__add-property__title">
                <h1>Add Your Property</h1>
                <p>Please add home for rent only, brokers are not allowed to add property</p>
            </div>
            <div className="rokye__add-property__content">
                <div className="stepper">
                    <Stepper activeStep={activeStep} />
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(nextClickHandler)}>
                        <div className="form" >
                            {showForm(activeStep)}
                        </div>
                        <div className="stepper__btn">
                            <button className="stepper__btn-prev" type="button" style={{ visibility: activeStep === 0 ? "hidden" : "visible" }} onClick={() => setActiveStep(activeStep - 1)}>
                                <h2>Prev</h2>
                            </button>
                            <button className="stepper__btn-next" type="submit" disabled={isImageUploading} style={{ backgroundColor: isImageUploading && "gray" }}  >
                                <h2>{activeStep === totalStep ? "Submit" : "Next"}</h2>
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div >
    )
}

export default AddProperty