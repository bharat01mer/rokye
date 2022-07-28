import { TextField } from "@mui/material"
import { useState } from "react"


import { MdLocationPin } from "react-icons/md"


const Location = () => {
    const [showOption, setShowOption] = useState({ id: null, show: false })
    const TextFieldItem = [
        {
            id: 0,
            label: "House or Flat number",
            name: "house"
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
            name: "pincode"
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
                            <TextField variant="outlined" label={item.label} fullWidth />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Location