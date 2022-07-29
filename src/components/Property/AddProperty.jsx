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
    floorNo: null,
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
    const [activeStep, setActiveStep] = useState(3)
    const totalStep = 4
    const methods = useForm({
        defaultValues: initialState, mode: "all"
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
                return <Upload />
            case 4:
                return <Contact />
            default:
                return "No Step";
        }
    }

    const nextClickHandler = (data) => {
        
        if (activeStep === totalStep) {
            console.log("Show Preview")
        } else {
            localStorage.setItem("propertyData",JSON.stringify(data))
            setActiveStep(item => item + 1)
        }

    }
    const isValid=methods.formState.isValid
    console.log(isValid)
    
    
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
                            <button className="stepper__btn-next"  type="submit" style={{background: methods.formState.isValid ? "#f25c05" : "rgb(255, 158, 101)"}} >
                                <h2>Next</h2>
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