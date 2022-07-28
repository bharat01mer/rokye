
import {TextField} from "@mui/material"
import { useState } from "react"
import {AiOutlineContacts} from "react-icons/ai"

const Contact = () => {
    const [showOption, setShowOption] = useState({ id: null, show: false })
    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <AiOutlineContacts   size={40} />
                <h1>Basic Information</h1>
            </div>
            <div className="content">
                <div className="item">
                    <TextField variant="outlined" label="First Name" fullWidth />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Last Name" fullWidth />
                </div>
                <div className="item">
                    <TextField variant="outlined"  label="Phone Number" fullWidth type={"number"}  />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Email" fullWidth type={"email"} />
                </div>
            </div>
        </div>
    )
}

export default Contact