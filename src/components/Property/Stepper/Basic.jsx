import { TextField } from "@mui/material"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Choose from "./Choose"
import { propertyDataNew } from "../../../../utils/data"

import { AiOutlineInfoCircle } from "react-icons/ai"

const Basic = () => {
    const [showOption, setShowOption] = useState({ id: null, show: false })
    const { register,formState:{errors} } = useFormContext()


    const contentItem = [
        {
            id: 0,
            title: "Category",
            arr: propertyDataNew.category,
            name:"category"
        },
        {
            id: 1,
            title: "Property Type",
            arr: propertyDataNew.propertyType,
            name:"propType"
        },
        {
            id: 2,
            title: "Bedrooms",
            arr: propertyDataNew.bedRoom,
            name:"bedroom"
        },
        {
            id: 3,
            title: "Bathrooms",
            arr: propertyDataNew.bike,
            name:"bathroom"
        },
        {
            id: 4,
            title: "Bike Parking",
            arr: propertyDataNew.bike,
            name:"bikeParking"
        },
        {
            id: 5,
            title: "Car Parking",
            arr: propertyDataNew.car,
            name:"carParking"
        },
    ]

    
    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <AiOutlineInfoCircle size={30} />
                <h1>Basic Information</h1>
            </div>
            <div className="content">
                {
                    contentItem.map((item) => (
                        <div className="item" key={item.name}>
                            <Choose title={item.title} optionItem={item.arr}  showOption={showOption} setShowOption={setShowOption} id={item.id} name={item.name}  />
                            {
                                errors[item.name] && <p style={{color:"red"}}>Please fill the above field</p> 
                            }
                        </div>
                    ))
                }
                <div className="item">
                    <TextField variant="outlined" label="Carpet Area(sq-ft only)" type={"number"} fullWidth {...register("carpetArea", { required: true })} />
                    {
                        errors.carpetArea && <p style={{color:"red"}}>Please fill the above field</p> 
                    }
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Built-In Area(sq-ft only)" type={"number"} fullWidth {...register("superArea", { required: true })} />
                    {
                        errors.superArea && <p style={{color:"red"}}>Please fill the above field</p> 
                    }
                </div>
            </div>
        </div>
    )
}

export default Basic