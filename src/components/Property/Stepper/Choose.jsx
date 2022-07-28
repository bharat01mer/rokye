import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { MdOutlineKeyboardArrowDown as DownArrow } from "react-icons/md"

const Choose = ({ title, optionItem, showOption, setShowOption, id }) => {
    const overFlowBox = optionItem.length > 4 ? true : false

    return (
        <div className="form__choose" >
            <div className="title">
                <h4>{title}</h4>
                <DownArrow size={20} />
            </div>
            <AnimatePresence>
                {
                    (showOption.id === id && showOption.show) && (
                        <motion.div className={`option ${overFlowBox ? "overflow" : ""}`}   initial={{scale:0,opacity:0}} exit={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}>
                            {
                                optionItem.map((item) => (
                                    <div className="option__item" key={item.id}>
                                        <h4>{item.title}</h4>
                                    </div>
                                ))
                            }
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default Choose