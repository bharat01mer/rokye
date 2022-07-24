import { motion } from "framer-motion"
import Link from "next/link"

const Message = () => {
    return (
        <div className="rokye__home-message">
            <div className="info">
                <h1>Are you a home owner?</h1>
                <p>Fill the Contact Form and Get Listed</p>
            </div>
            <Link passHref href={"/contact"}>
            <motion.div className="contact" whileTap={{scale:0.96}}>
                <p>Contact Us</p>
            </motion.div>
            </Link>
        </div>
    )
}

export default Message