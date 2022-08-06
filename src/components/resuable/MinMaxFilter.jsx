import React, {  useState } from 'react'
import TextField from '@mui/material/TextField'
import { budgetData } from '../../../utils/data'
import { motion, AnimatePresence } from 'framer-motion'



const MinMaxFilter = ({ setModal, value, setValue,optionClickHandler }) => {
    const [showMenu, setShowMenu] = useState({ id: 1, show: true })
    const addAmountInMaxIfLessThanMin=50000


    const itemValueHandler = (num,name) => {
        if (showMenu.id === 1) {
            setValue({ ...value, min: num })
            setShowMenu({ id: 2, show: true })
            optionClickHandler({name:name,value:num},false)
        }
        else if (showMenu.id === 2) {
            setValue({ ...value, max: (num < value.min || num===value.min ) ? value.min + addAmountInMaxIfLessThanMin : num })
            setShowMenu({ id: null, show: false })
            setModal({ show: false })
            optionClickHandler({name:name,value: num < value.min ? value.min + addAmountInMaxIfLessThanMin : num},false)
        }
    }



    return (
        <AnimatePresence>
            <motion.div className="budget__option"
                initial={{
                    scale: 0,
                    opacity: 0
                }} 
                exit={{
                    scale: 0,
                    opacity: 0
                }} 
                animate={{
                    scale: 1,
                    opacity: 1
                }}>
                <div className="filter">
                    <TextField id="outlined-basic" label="Min" value={value.min} variant="outlined" style={{ marginBottom: 10 }} onFocus={() => setShowMenu({ id: 1, show: true })} onChange={(e) => setValue({ ...value, min: e.target.value })} />
                    <TextField id="outlined-basic" label="Max" value={value.max} variant="outlined" style={{ marginBottom: 10, marginLeft: 20 }} onFocus={() => setShowMenu({ id: 2, show: true })} onChange={(e) => setValue({ ...value, max: e.target.value })} />
                </div>
                <div className="budget__option-container">
                    {
                        (showMenu.id === 1 && showMenu.show) && (
                            <div className="left">
                                {budgetData.min.map((item) => (
                                    <div className="left__item" key={item.id} onClick={() => itemValueHandler(item.data,"min")}>
                                        <p>{item.price}</p>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    {
                        (showMenu.id === 2 && showMenu.show) && (
                            <div className="right">
                                {budgetData.max.map((item) => (
                                    <div className="right__item" onClick={() => itemValueHandler(item.data,"max")} key={item.id}>
                                        <p>{item.price}</p>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default MinMaxFilter