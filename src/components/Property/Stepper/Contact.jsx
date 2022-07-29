
import {TextField} from "@mui/material"
import { useFormContext } from "react-hook-form"
import {AiOutlineContacts} from "react-icons/ai"

const Contact = () => {
    const {register}=useFormContext()
    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <AiOutlineContacts   size={40} />
                <h1>Basic Information</h1>
            </div>
            <div className="content">
                <div className="item">
                    <TextField variant="outlined" label="First Name"   fullWidth  {...register("firstName",{required:true})} />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Last Name" fullWidth {...register("lastName",{required:true})} />
                </div>
                <div className="item">
                    <TextField variant="outlined"  label="Phone Number" fullWidth type={"number"} {...register("phone",{required:true})}   />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Email" fullWidth type={"email"} {...register("email",{required:true})}  />
                </div>
            </div>
        </div>
    )
}

export default Contact