import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const ScrollTo = () => {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        })
    }, [])
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <AnimatePresence>
            {
                isVisible && (

                    <motion.div className="rokye__scroll" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                        <FaArrowAltCircleUp color='#f25c05' size={50} onClick={scrollToTop} />
                    </motion.div>
                )
            }

        </AnimatePresence>
    )
}

export default ScrollTo