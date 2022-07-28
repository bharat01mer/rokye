import { Stepper, Basic, Location, Detail, Upload, Contact } from "./Stepper"
import { useState } from "react"

const AddProperty = () => {
    const [activeStep, setActiveStep] = useState(0)
    const totalStep = 4

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

    const nextClickHandler=()=>{
        setActiveStep(item=>item+1)
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
                <div className="form">
                    {showForm(activeStep)}
                </div>
                <div className="stepper__btn">
                    <div className="stepper__btn-prev" style={{visibility:activeStep===0 ? "hidden" :"visible"}} onClick={()=>setActiveStep(item=>item-1)}>
                        <h2>Prev</h2>
                    </div>
                    <div className="stepper__btn-next" onClick={nextClickHandler}>
                        <h2>Next</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperty