
import { TextField, InputAdornment, IconButton } from "@mui/material"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import Link from "next/link"
import Image from "next/image"
import { AiOutlineCheckCircle as CheckIcon } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCreateUserMutation, useLoginUserMutation } from "../../../redux/slices/user"

import { RiArrowDownSLine as DownArrow } from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"
import { toast, ToastContainer } from "react-toast"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { userData } from "../../../redux/slices/util"
import { Checkbox } from "@mui/material"


const checkPoints = [
    {
        id: 0,
        title: "Post Free Property Ads"
    },
    {
        id: 1,
        title: "Get quick response"
    },
    {
        id: 2,
        title: "Hassle free process"
    },
]
const optionItem = [
    {
        id: 0,
        name: "Owner",
        value: "owner"
    },
    {
        id: 1,
        name: "Tenant",
        value: "tenant"
    },
]
const Login = ({ isSignUp }) => {
    const dispatch = useDispatch()
    const [checkBox, setCheckBox] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const [optionValue, setOptionValue] = useState({ id: null, name: "" })
    const { handleSubmit, formState: { errors, isValid: IsValid }, setValue, register } = useForm({ mode: "onChange" })
    const [showPass, setShowPass] = useState(false)
    const router = useRouter()

    const [createUser] = useCreateUserMutation()
    const [loginUser] = useLoginUserMutation()



    const onSubmitHandler = async (data) => {

        if (isSignUp) {
            createUser(data).unwrap().then((res) => {
                localStorage.setItem("user", JSON.stringify(res))
                toast.success("Signup Successfull")
                dispatch(userData(res))
                
                if (router.query?.redirect) {
                    router.push(`/${router.query?.redirect}`)
                } else {
                    router.push("/")
                }
            }).catch((err) => {
                console.log({ err })
                toast.error(err?.data ? err?.data?.message : "Error Occurred")
            })

        } else {
            loginUser(data).unwrap().then((res) => {
                localStorage.setItem("user", JSON.stringify(res))
                toast.success("Login Successfull")
                dispatch(userData(res))
                if (router.query?.redirect) {
                    router.push(`/${router.query?.redirect}`)
                } else {
                    router.push("/")
                }
            }).catch(err => {
                toast.error(err?.data ? err?.data?.message : "Error Occurred")
            })
        }
    }


    const optionClickHandler = (value) => {

        setOptionValue({ id: value.id, name: value.name })
        setValue("type", value.value)
        setShowOption(false)
    }


    useEffect(() => {

    }, [dispatch])

    const isValid= !isSignUp ? IsValid :  checkBox && IsValid
    console.log({errors,IsValid,isValid})

    return (
        <div className={`rokye__login ${isSignUp ? "signup" : ""}`} >
            <ToastContainer delay={2000} />
            <div className="rokye__login-left">
                {
                    !isSignUp ? (
                        <Image width={2500} height={2500} objectFit={"contain"} src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/Login-pana_prjzhm.png"} />
                    ) : (

                        <>
                            <div className="points">
                                <div className="points__title">
                                    <h1>Welcome to <br />
                                        No Brokerage property site!</h1>
                                </div>
                                {
                                    checkPoints.map((item) => (
                                        <motion.div className="points__item" key={item.id}>
                                            <CheckIcon color="#f25c05" />
                                            <p>{item.title}</p>
                                        </motion.div>
                                    ))
                                }
                            </div>
                            <div className="animation">
                                <Image width={2500} height={2500} objectFit={"contain"} src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/Sign_up-cuate_tyrhp1.png"} />
                            </div>
                        </>
                    )
                }

            </div>
            <div className="rokye__login-right">
                <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="form__title">
                        {
                            isSignUp ? (
                                <h1>Create your Account</h1>
                            ) : (
                                <h1>Login to Your Account</h1>
                            )
                        }
                    </div>
                    <div className="form__content">
                        {
                            isSignUp && (
                                <>
                                    <div className="choose">
                                        <div className="choose__title" onClick={() => setShowOption(!showOption)} style={{cursor:"pointer"}}>
                                            <p {...register("type", { required: true })}>
                                                {optionValue.id === null ? "I am " : optionValue.name}
                                            </p>
                                            <DownArrow />
                                        </div>

                                        <AnimatePresence>
                                            {
                                                showOption && (
                                                    <motion.div className="choose__option" initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                                        {
                                                            optionItem.map((item) => (
                                                                <motion.div className="item" key={item.id} onClick={() => optionClickHandler(item)} >
                                                                    <p style={{ color: "black", fontSize: "1rem" }} > {item.name}</p>
                                                                </motion.div>
                                                            ))
                                                        }
                                                    </motion.div>
                                                )
                                            }
                                        </AnimatePresence>
                                    </div>
                                    <div className="name item">
                                        <TextField id="outlined-basic" label="Full Name*" variant="outlined" fullWidth style={{ border: "none" }} {...register("name", { required: true })} />
                                        {
                                            errors.name && (
                                                <p> Name Required </p>
                                            )
                                        }
                                    </div>
                                    <div className="phone item">
                                        <TextField id="outlined-basic" label="Phone*" type={"number"} variant="outlined" fullWidth {...register("phone", { required: true, minLength: 10, maxLength: 10 })} />
                                        {
                                            errors.phone?.type === "required" && (
                                                <p> Phone No Required </p>
                                            )
                                        }
                                        {
                                            errors.phone?.type === "minLength" && (
                                                <p> Please Add 10 digit no </p>
                                            )
                                        }
                                        {
                                            errors.phone?.type === "maxLength" && (
                                                <p> Please Add 10 digit no </p>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }

                        <div className="email item">
                            <TextField variant="outlined" type="email" label="Email" fullWidth {...register("email", { required: true })} />
                            {
                                errors.email && (
                                    <p> Email Required </p>
                                )
                            }
                        </div>
                        <div className="password item">
                            <TextField variant="outlined" type={showPass ? "text" : "password"} label="Password" fullWidth {...register("password", { required: true, minLength: 8 })} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPass(!showPass)}>
                                            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />
                            {
                                (isSignUp && errors.password )&& (
                                    <p> {errors.password.type = "minLength" ? "Password Length Should be greater than 8" : "Password Required"} </p>
                                )
                            }
                        </div>
                        {
                            isSignUp && (
                                <div className="agree">
                                    <Checkbox color="primary" onChange={() => setCheckBox(!checkBox)} />
                                    <p>I agree to the <Link href={"/terms"}>Terms of use</Link> and <Link href={"/policy"}>Privacy Policy</Link>.</p>
                                </div>
                            )
                        }
                        <motion.button className="form__submit" type="submit" style={{ background: isValid ? "#F25C05" : "#ff9e65", borderColor: isValid ? "#F25C05" : "#ff9e65", cursor: "pointer" }} disabled={isValid ? false : true} whileTap={{ scale: .95 }}>
                            <h2>Submit</h2>
                        </motion.button>
                    </div>

                    <div className="form__switch" >
                        {
                            isSignUp ? (
                                <p>Already Have An Account?  <Link passHref href={`/login`}>
                                    Login
                                </Link>
                                </p>

                            ) : (
                                <p>Don&apos;t Have An Account?  <Link passHref href={`/signup`}>
                                    SignUp
                                </Link>
                                </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login