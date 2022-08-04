import { Stepper, Basic, Location, Detail, Upload, Contact } from "./Stepper"
import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { useSelector } from "react-redux"
import { useCreatePropertyMutation, useAddImageInPropertyByIdMutation } from "../../../redux/slices/property"
import { ToastContainer, toast } from "react-toast"
import axios from "axios"
import { useRouter } from "next/router"

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


    const totalStep = 4
    const methods = useForm({
        defaultValues: initialState, mode: "onChange"
    })
    const router=useRouter()

    const { user } = useSelector((state) => state.util)

    const [createProperty, propData] = useCreatePropertyMutation()
    const [addImageInProp] = useAddImageInPropertyByIdMutation()

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
        imageArray.map((item,i) => {

            file.append('file', item)
            file.append("upload_preset", "trailer")

            axios.post("https://api.cloudinary.com/v1_1/dykwfe4cr/image/upload", file).then((res) => {
                addImageInProp({ id: id, data: res.data.secure_url })

                if(i===imageArray.length-1){
                    toast.success("Property Uploaded")
                    router.push(`/properties/${id}`)
                }
            }).catch((err) => {
                toast.error("Upload Failed, Try Again")
            })
        })
    }

    const nextClickHandler = async (data) => {
        if (activeStep === totalStep) {
            try {
                await createProperty({ ...data, createdBy: user.data.data._id }).then(async (res) => {
                    imageUpload(res.data.data._id)
                })
                
            } catch (error) {
                toast.error("Error Occured")
            }
        } else if (activeStep === 3 && imageArray.length === 0) {
            methods.setError("images", { type: "required" })
        } else {
            localStorage.setItem("propertyData", JSON.stringify(data))
            setActiveStep(item => item + 1)
        }
    }

    return (
        <div className="rokye__add-property">
            <ToastContainer delay={3000} />
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
                            <button className="stepper__btn-next" type="submit"  >
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