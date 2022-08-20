import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { useState } from "react"
import { SiGooglenearby } from "react-icons/si"

import { MdLocationPin } from "react-icons/md"
import Choose from "./Choose"


const Location = () => {

    const TextFieldItem = [
        {
            id: 0,
            label: "House or Flat number",
            name: "flatNo"
        },
        {
            id: 1,
            label: "Society or Project name",
            name: "society"
        },
        {
            id: 2,
            label: "Area name",
            name: "area"
        },
        {
            id: 3,
            label: "City",
            name: "city"
        },
        {
            id: 4,
            label: "State",
            name: "state"
        },
        {
            id: 5,
            label: "PIN code",
            name: "pinCode"
        },
    ]
    const { register, formState: { errors } } = useFormContext()

    const [showOption, setShowOption] = useState({ id: null, show: false })

    const valueArr = [
        {
            id: 0,
            title: "Within 2 km",
            value: "2km",
        },
        {
            id: 1,
            title: "Within 5 km",
            value: "5km",
        },
        {
            id: 2,
            title: "Within 8 km",
            value: "8km",
        },
        {
            id: 3,
            title: "Within 10 km",
            value: "10km",
        },
        {
            id: 4,
            title: "Over 10+ km",
            value: "10km+",
        },
    ]
    const nearByList = [
        {
            id: 0,
            title: "School",

            name: "nearby.school"
        },
        {
            id: 1,
            title: "Hospital",
            name: "nearby.hospital"
        },
        {
            id: 2,
            title: "Shopping centres",
            name: "nearby.mall"
        },
        {
            id: 3,
            title: "Transportation hubs",
            name: "nearby.transport"
        },
        {
            id: 4,
            title: "Temples",
            name: "nearby.temple"
        },
        {
            id: 5,
            title: "Commercial hubs",
            name: "nearby.comercial"
        },
    ]

    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <MdLocationPin size={30} />
                <h1>Location</h1>
            </div>
            <div className="content">
                {
                    TextFieldItem.map((item) => (
                        <div className="item" key={item.id}>
                            <TextField variant="outlined" label={item.label} fullWidth {...register(item.name, { required: true })} />
                            {
                                errors[item.name] && <p style={{ color: "red" }}>Please fill the above field</p>
                            }
                        </div>
                    ))
                }

            </div>
            <div className="form__basic-title" style={{marginTop:"2rem"}}>
                <SiGooglenearby size={30} />
                <h1>Nearby Location</h1>
            </div>
            <div className="content">

                {
                    nearByList.map((item) => (
                        <div className="item" key={item.id}>
                            
                            <Choose title={item.title} optionItem={valueArr} showOption={showOption} setShowOption={setShowOption} id={item.id} name={item.name} />
                            {
                                errors[item.name] && <p style={{ color: "red" }}>Please fill the above field</p>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Location
