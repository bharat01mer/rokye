import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

export default function ContactModal({setShowModal}) {
    return (
        <div className="contact__modal">
            <motion.div className="contact__modal-item" initial={{
                scale: 0,
                opacity: 0
            }} exit={{
                scale: 0,
                opacity: 0
            }} animate={{
                scale: 1,
                opacity: 1
            }}>
                <ContactForm showCancel={true} setShowModal={setShowModal} />
            </motion.div>
        </div>
    );
}