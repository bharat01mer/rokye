import { TextField } from "@mui/material"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useCreateSubAdminMutation } from "../../../redux/slices/user"
import { ToastContainer, toast } from "react-toast"

const Add = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onChange" })
    const [create] = useCreateSubAdminMutation()
    const onHandleSubmit = (data) => {
        create(data).unwrap().then((res) => {
            toast.success("SubAdmin Created")
        }).catch((err) => {
            console.log({ err })
            if (err.status === 409) {
                toast.error(err.data.message)
            } else {
                toast.error("Error Occured")
            }
        })
    }
    return (
        <div className="admin__content-create">
            <ToastContainer delay={3000} />
            <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="title">
                    <h2>Create SubAdmin</h2>
                </div>

                <div className="item">
                    <TextField variant="outlined" type="text" label="Name" fullWidth {...register("name", { required: true })} />
                </div>
                <div className="item">
                    <TextField variant="outlined" type="number" label="Phone" fullWidth {...register("phone", { required: true, minLength: 10, maxLength:10 })} />
                    {
                        errors.phone?.type === "minLength" && (
                            <p style={{ textAlign: "start", color: "red", fontSize: ".8rem" }}> Please Add 10 digit no </p>
                        )
                    }
                    {
                        errors.phone?.type === "maxLength" && (
                            <p  style={{ textAlign: "start", color: "red", fontSize: ".8rem" }}> Please Add 10 digit no </p>
                        )
                    }
                </div>
                <div className="item">
                    <TextField variant="outlined" type="Email" label="Email" fullWidth {...register("email", { required: true })} />
                </div>
                <div className="item">
                    <TextField variant="outlined" type="password" label="Password" fullWidth {...register("password", { required: true, minLength: 8 })} />
                    {
                        errors?.password?.type === "minLength" && (
                            <p style={{ textAlign: "start", color: "red", fontSize: ".8rem" }}>Password length should be greater than 8</p>
                        )
                    }
                </div>
                <motion.button className="submit" whileTap={{ scale: .97 }}>
                    <h2>Submit</h2>
                </motion.button>
            </form>
        </div>
    )
}

export default Add