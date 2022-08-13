import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { FiInstagram, FiMail } from "react-icons/fi"
import { FaTimesCircle } from "react-icons/fa"
import { RiArrowDownSLine as DownArrow } from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"
import { TextField, Checkbox } from "@mui/material"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { useAddContactMutation } from "../../../redux/slices/contact"
import { ToastContainer,toast } from "react-toast"


const ContactForm = ({ showCancel, setShowModal, referral = false }) => {
    const [showOption, setShowOption] = useState(false)
    const [optionValue, setOptionValue] = useState({ id: null, name: "" })
    const { handleSubmit, formState, setValue, register } = useForm({ mode: "onChange" })
    const [checkBox, setCheckBox] = useState(false)
    const [addContact]=useAddContactMutation()

    const socialLinks = [
        {
            id: 0,
            link: "facebook.com/rokyerealty",
            icon: <FaFacebookF size={20} />
        },
        {
            id: 1,
            link: "instagram.com/rokyerealty",
            icon: <FiInstagram size={20} />
        },
        {
            id: 3,
            link: "twitter.com/rokyerealty",
            icon: <FaTwitter size={20} />
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

    const optionClickHandler = (value) => {
        setOptionValue({ id: value.id, name: value.name })
        setValue("type", value.value)
        setShowOption(false)
    }
    const onSubmithandler = async(data) => {
        await addContact(data).then(()=>{
            toast.success("Message Sent")
        }).catch(()=>{
            toast.error("Try Again")
        })
    }
    useEffect(() => {

    }, [optionValue])


    const isValid = (formState.isValid && checkBox && optionValue.id !== null) ? true : false


    return (
        <form className="rokye__form" onSubmit={handleSubmit(onSubmithandler)}>
            <ToastContainer delay={2000} />
            <div className="rokye__form-header">
                {
                    showCancel && (
                        <div className="cancel" onClick={() => setShowModal(false)}>
                            <FaTimesCircle size={30} color={"#F25C05"} />
                        </div>
                    )
                }
                <div className="title">
                    <h2>Rokye <span>Realty</span></h2>
                    <div className="social">
                        {
                            socialLinks.map((item) => (
                                <motion.a href={`https://${item.link}`} key={item.id} target="__blank" rel="noreferrer" whileTap={{ scale: 0.96 }}>
                                    <motion.div className="social__item" >
                                        {item.icon}
                                    </motion.div>
                                </motion.a>
                            ))
                        }
                    </div>
                </div>
                <div className="mail">
                    <FiMail size={15} />
                    <a href="mailto:sales@rokye.com">sales@rokye.com</a>
                </div>
            </div>
            <div className="divider" />
            <div className="rokye__form-content">
                {
                    !referral && (
                        <div className="choose">
                            <div className="choose__title" onClick={() => setShowOption(!showOption)} >
                                <p>
                                    {optionValue.id === null ? "I am" : optionValue.name}
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
                                                        <p>{item.name}</p>
                                                    </motion.div>
                                                ))
                                            }
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    )
                }
                {
                    referral ? (
                        <>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Your Name*" variant="outlined" fullWidth style={{ border: "none" }} {...register("referrarName", { required: true })} />
                            </div>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Your Number*" type={"number"} variant="outlined" fullWidth {...register("referrarPhone", { required: true, pattern: `^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$` })} />
                            </div>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Referral Name*" variant="outlined" fullWidth style={{ border: "none" }} {...register("referralName", { required: true })} />
                            </div>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Referral Number*" type={"number"} variant="outlined" fullWidth {...register("referralPhone", { required: true, pattern: `^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$` })} />
                            </div>
                        </>

                    ) : (
                        <>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Full Name*" variant="outlined" fullWidth style={{ border: "none" }} {...register("name", { required: true })} />
                            </div>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Phone*" type={"number"} variant="outlined" fullWidth {...register("phone", { required: true, pattern: `^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$` })} />
                            </div>
                            <div className="rokye__form-content__item">
                                <TextField id="outlined-basic" label="Email*" type={"email"} variant="outlined" fullWidth {...register("email", { required: true })} />
                            </div>
                        </>
                    )
                }
                <div className="rokye__form-content__item">
                    <TextField id="outlined-basic" label="Mesage(optional)" variant="outlined" multiline rows={4} fullWidth {...register("message")} />
                </div>
                <div className="agree">
                    <Checkbox color="primary" onChange={() => setCheckBox(!checkBox)} />
                    <p>I agree to the <Link href={"/term"}>Terms of use</Link> and <Link href={"/policy"}>Privacy Policy</Link>.</p>
                </div>
                <motion.button className="submit" whileTap={{ scale: 0.97 }} type="submit" style={{ background: isValid ? "#F25C05" : "#ff9e65" }}>
                    <h3>Send Request</h3>
                </motion.button>
            </div>
        </form>
    )
}

export default ContactForm