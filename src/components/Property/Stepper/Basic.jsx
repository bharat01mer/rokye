import { TextField } from "@mui/material"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Choose from "./Choose"

import { AiOutlineInfoCircle } from "react-icons/ai"

const category = [
    {
        id: 0,
        title: "For Rent",
        value: "rent"
    },

]

const propertyType = [
    {
        id: 0,
        title: "House",
        value: "house"
    },
    {
        id: 1,
        title: "Appartment",
        value: "appartment"
    },
]

const bedRoom = [
    {
        id: 0,
        title: "1 Bhk",
        value: '1'
    },
    {
        id: 1,
        title: "2 Bhk",
        value: '2'
    },
    {
        id: 2,
        title: "3 Bhk",
        value: '3'
    },
    {
        id: 3,
        title: "3+ Bhk",
        value: "3+"
    },
]
const bike = [
    {
        id: 0,
        title: "1",
        value: '1'
    },
    {
        id: 1,
        title: "2",
        value: '2'
    },
    {
        id: 2,
        title: "3",
        value: '3'
    },
    {
        id: 3,
        title: "3+",
        value: "3+"
    },
]
const car = [
    {
        id: 0,
        title: "1",
        value: '1'
    },
    {
        id: 1,
        title: "2",
        value: '2'
    },
    {
        id: 2,
        title: "3",
        value: '3'
    },
    {
        id: 3,
        title: "3+",
        value: "3+"
    },
]
const Basic = () => {
    const [showOption, setShowOption] = useState({ id: null, show: false })
    const { register,formState:{errors} } = useFormContext()


    const contentItem = [
        {
            id: 0,
            title: "Category",
            arr: category,
            name:"category"
        },
        {
            id: 1,
            title: "Property Type",
            arr: propertyType,
            name:"propType"
        },
        {
            id: 2,
            title: "Bedrooms",
            arr: bedRoom,
            name:"bedroom"
        },
        {
            id: 3,
            title: "Bathrooms",
            arr: bike,
            name:"bathroom"
        },
        {
            id: 4,
            title: "Bike Parking",
            arr: bike,
            name:"bikeParking"
        },
        {
            id: 5,
            title: "Car Parking",
            arr: car,
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
                        <div className="item" >
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
                    <TextField variant="outlined" label="Super Area(sq-ft only)" type={"number"} fullWidth {...register("superArea", { required: true })} />
                    {
                        errors.superArea && <p style={{color:"red"}}>Please fill the above field</p> 
                    }
                </div>
            </div>
        </div>
    )
}

export default Basic