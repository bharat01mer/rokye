import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { MdOutlineKeyboardArrowDown as DownArrow } from "react-icons/md"
import { useFormContext } from 'react-hook-form'
import { BiMinus } from 'react-icons/bi'
import { useState } from 'react'

const Choose = ({ title, optionItem, showOption, setShowOption, id, name }) => {
    const overFlowBox = optionItem.length > 4 ? true : false
    const { register, setValue, getValues } = useFormContext()
    const [choosedOption, setChoosedOption] = useState(getValues(name))
    const [showArrow, setShowArrow] = useState({ id: null, show: false })

    const optionHanlder = (value, title) => {
        setValue(name, value)
        setShowOption({ id: null, show: false })
        setChoosedOption(title)
    }
    
    return (
        <div className="form__choose" >
            <div className="title" {...register(name, { required: true })} onClick={() => setShowOption({ id: id === showOption.id ? null : id, show: id === showOption.id ? false : true })} onMouseEnter={() => setShowArrow({ id: id, show: true })} onMouseLeave={() => setShowArrow({ id: null, show: false })}>
                <h4> {title}</h4>
                <div className="title__item">
                    {
                        choosedOption && (
                            <p>{ choosedOption}</p>
                        )
                    }
                    { (showArrow.id===id && showArrow.show ) ? 
                        <DownArrow size={20} /> : (
                            <BiMinus size={20} />
                        )
                    }
                </div>
            </div>
            <AnimatePresence>
                {
                    (showOption.id === id && showOption.show) && (
                        <motion.div className={`option ${overFlowBox ? "overflow" : ""}`} initial={{ scale: 0, opacity: 0 }} exit={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            {
                                optionItem.map((item) => (
                                    <div className="option__item" key={item.id} onClick={() => optionHanlder(item.value, item.title)}>
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