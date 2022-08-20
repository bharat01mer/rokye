import Image from 'next/image'
import React from 'react'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useChechUserMutation, useResetPassMutation } from '../../../redux/slices/user'
import { toast, ToastContainer } from "react-toast"
import { motion } from "framer-motion"
import { useRouter } from 'next/router'
import decode from "jwt-decode"

const Recover = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [verify] = useChechUserMutation()
    const [resetPass]=useResetPassMutation()
    const router = useRouter()
    
    const onSubmitHandler = (data) => {
        verify(data).unwrap().then(() => {
            toast.success("Check Your email for reset link")
        }).catch((err) => {
            if (err.status === 401) {
                toast.error("No User Exist with this Email")
            } else {
                toast.error("Error Occured")
            }
        })
    }
    const isReset = router.query?.reset === "true" ? true : false
    const decodedData = isReset && decode(router.query?.token)

    const passResetHandler=(data)=>{
        resetPass({password:data.password,email:decodedData.email,token:router.query?.token}).unwrap().then(()=>{
            toast.success("Password Reset complete")
            router.push("/login")
        }).catch((err)=>{
            console.log({err})
            toast.error("Error Occured")
        })
    }

    
    return (
        <form className="rokye__recover" onSubmit={handleSubmit( isReset ? passResetHandler :onSubmitHandler)}>
            <ToastContainer delay={5000} />
            <div className="rokye__recover-img">
                <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660912842/Forgot_password-amico_lhmvey.png"} width={800} height={800} objectFit={"contain"} loading="eager" />
            </div>
            <div className="rokye__recover-content">
                <div className="form">
                    <div className="title">
                        <h1> {isReset ? "Change Password" : "Password Recovery"}</h1>
                        {
                            isReset && (
                                <p style={{ textAlign: "center" }}>{decodedData?.email}</p>
                            )
                        }
                    </div>
                    <div className="email">
                        {isReset ? (
                            <>
                                <TextField variant="outlined" type="password" label="Password" fullWidth {...register("password", { required: true, minLength: 8 })} />
                                {
                                    errors?.password?.type === "minLength" && (
                                        <p style={{ textAlign: "start",color:"red",fontSize:".8rem" }}>Password length should be greater than 8</p>
                                    )
                                }
                            </>
                        ) : (
                            <TextField variant="outlined" type="email" label="Email" fullWidth {...register("email", { required: true })} />
                        )
                        }
                    </div>

                    <motion.button type='submit' className='submit' whileTap={{ scale: .97 }}>
                        <h2>Submit</h2>
                    </motion.button>
                </div>
            </div>
        </form>
    )
}

export default Recover