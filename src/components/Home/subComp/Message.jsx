import { motion } from "framer-motion"
import Link from "next/link"

const Message = () => {
    return (
        <div className="cover__message">
            <div className="rokye__home-message">
                <div className="info">
                    <h1>Are you a home owner?</h1>
                    <p style={{color:"#000"}}>Fill the contact form and get listed</p>
                </div>
                <Link passHref href={"/contact"}>
                    <motion.div className="contact" whileTap={{ scale: 0.96 }}>
                        <p>Contact Us</p>
                    </motion.div>
                </Link>
            </div>
        </div>
    )
}

export default Message