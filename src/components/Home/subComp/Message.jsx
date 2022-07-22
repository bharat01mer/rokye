import { motion } from "framer-motion"

const Message = () => {
    return (
        <div className="rokye__home-message">
            <div className="info">
                <h1>Are You a Home Owner</h1>
                <p>Fill the Contact Form and Get Listed</p>
            </div>
            <motion.div className="contact" whileTap={{scale:0.96}}>
                <p>Contact Us</p>
            </motion.div>
        </div>
    )
}

export default Message