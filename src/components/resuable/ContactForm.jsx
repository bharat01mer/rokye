import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { FiInstagram, FiMail } from "react-icons/fi"
import { FaRegTimesCircle } from "react-icons/fa"
import { RiArrowDownSLine as DownArrow } from "react-icons/ri"
import { motion, AnimatePresence } from "framer-motion"
import { TextField, Checkbox } from "@mui/material"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"


const ContactForm = ({ showCancel,setShowModal }) => {
    const [showOption, setShowOption] = useState(false)
    const [optionValue, setOptionValue] = useState({ id: null, name: "" })
    const { handleSubmit, formState, setValue, register } = useForm({ mode: "onChange" })
    const [checkBox, setCheckBox] = useState(false)

    const socialLinks = [
        {
            id: 0,
            link: "facebook.com",
            icon: <FaFacebookF size={20} />
        },
        {
            id: 1,
            link: "instagram.com",
            icon: <FiInstagram size={20} />
        },
        {
            id: 3,
            link: "twitter.com",
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
        console.log({ value })
        setOptionValue({ id: value.id, name: value.name })
        setValue("type", value.value)
        setShowOption(false)
    }
    const onSubmithandler = (data) => {
        console.log({ data })
    }
    useEffect(() => {

    }, [optionValue])


    const isValid = (formState.isValid && checkBox && optionValue.id !== null) ? true : false
    return (
        <form className="rokye__form" onSubmit={handleSubmit(onSubmithandler)}>

            <div className="rokye__form-header">
                {
                    showCancel && (
                        <div className="cancel" onClick={()=>setShowModal(false)}>
                            <FaRegTimesCircle size={30} color={"#F25C05"}  />
                        </div>
                    )
                }
                <div className="title">
                    <h2>Rokye.<span>Realty</span></h2>
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
                <div className="choose">
                    <div className="choose__title" onClick={() => setShowOption(!showOption)} >
                        <p>
                            {optionValue.id === null ? "Who are you ?" : optionValue.name}
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
                <div className="rokye__form-content__item">
                    <TextField id="outlined-basic" label="Full Name*" variant="outlined" fullWidth style={{ border: "none" }} {...register("name", { required: true })} />
                </div>
                <div className="rokye__form-content__item">
                    <TextField id="outlined-basic" label="Phone*" type={"number"} variant="outlined" fullWidth {...register("phone", { required: true, pattern: `^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$` })} />
                </div>
                <div className="rokye__form-content__item">
                    <TextField id="outlined-basic" label="Email*" type={"email"} variant="outlined" fullWidth {...register("email", { required: true })} />
                </div>
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