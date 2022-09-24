
import { TextField } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { AiOutlineContacts } from "react-icons/ai"
import { useSelector } from "react-redux"

const Contact = () => {
    const { register, formState: { errors } } = useFormContext()
    const {user}=useSelector(state=>state.util)

    
    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <AiOutlineContacts size={40} />
                <h1>Basic Information</h1>
            </div>
            <div className="content">
                <div className="item">
                    <TextField variant="outlined" label="Full Name" fullWidth  {...register("firstName", { required: true })} value={user?.data?.name} disabled />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Phone Number" fullWidth type={"number"} {...register("phone", { required: true, minLength: 10, maxLength: 10 })} value={user?.data?.phone} disabled />
                    {
                        errors.phone?.type === "minLength" && (
                            <p style={{fontSize:".8rem",color:"red"}}> Please Add 10 digit no </p>
                        )
                    }
                    {
                        errors.phone?.type === "maxLength" && (
                            <p style={{fontSize:".8rem",color:"red"}}> Please Add 10 digit no </p>
                        )
                    }
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Email" fullWidth type={"email"} {...register("email", { required: true })} value={user?.data?.email} disabled />
                </div>
            </div>
        </div>
    )
}

export default Contact