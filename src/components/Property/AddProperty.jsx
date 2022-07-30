import { Stepper, Basic, Location, Detail, Upload, Contact } from "./Stepper"
import { useState } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"

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

    const nextClickHandler = (data) => {    
        
        if (activeStep === totalStep) {
            console.log(data)
        }else if(activeStep===3 && imageArray.length===0){
            methods.setError("images",{type:"required"})
        }else {
            localStorage.setItem("propertyData",JSON.stringify(data))
            setActiveStep(item => item + 1)
        }

    }
    
    
    
    return (
        <div className="rokye__add-property">
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
                            <button className="stepper__btn-prev" type="button" style={{ visibility: activeStep === 0 ? "hidden" : "visible" }} onClick={() => setActiveStep(activeStep-1)}>
                                <h2>Prev</h2>
                            </button>
                            <button className="stepper__btn-next"  type="submit"  >
                                <h2>{ activeStep===totalStep ? "Submit":"Next"}</h2>
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
            {/* <pre>{JSON.stringify(methods.watch(),null,2)}</pre> */}
        </div >
    )
}

export default AddProperty