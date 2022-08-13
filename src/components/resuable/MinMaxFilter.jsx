import React, {  useState } from 'react'
import TextField from '@mui/material/TextField'
import { budgetData } from '../../../utils/data'
import { motion, AnimatePresence } from 'framer-motion'



const MinMaxFilter = ({ setModal, value, setValue,optionClickHandler }) => {
    const [showMenu, setShowMenu] = useState({ id: 1, show: true })
    const addAmountInMaxIfLessThanMin=50000


    const itemValueHandler = (num,name) => {
        if (showMenu.id === 1) {
            setValue({ ...value, min: parseInt(num) })
            setShowMenu({ id: 2, show: true })
            optionClickHandler({name:name,value:num},false)
        }
        else if (showMenu.id === 2) {
            setValue({ ...value, max: parseInt((num < value.min || num===value.min ) ? value.min + addAmountInMaxIfLessThanMin : num )})
            setShowMenu({ id: null, show: false })
            setModal({ show: false })
            optionClickHandler({name:name,value: num < value.min ? value.min + addAmountInMaxIfLessThanMin : num},false)
        }
    }
    
    const onChangeHandler=(num,name)=>{
        
        if(name==="max"){
            
            setValue({ ...value, max: parseInt((num < value.min || num===value.min ) ? value.min + addAmountInMaxIfLessThanMin : num )})
            optionClickHandler({name:name,value: num < value.min ? value.min + addAmountInMaxIfLessThanMin : num},false)
        }else if(name==="min"){
            setValue({ ...value, min: parseInt(num) })
            optionClickHandler({name:name,value:num},false)
        }
    }

    console.log({showMenu})



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
                    <TextField id="outlined-basic" label="Min" type={"number"} defaultValue={value.min} variant="outlined" style={{ marginBottom: 10 }} onFocus={() => setShowMenu({ id: 1, show: true })} onChange={(e) => onChangeHandler(e.target.value,"min")} />
                    <TextField id="outlined-basic" label="Max" type={"number"} defaultValue={value.max} variant="outlined" style={{ marginBottom: 10, marginLeft: 20 }} onFocus={() => setShowMenu({ id: 2, show: true })} onChange={(e) => onChangeHandler(e.target.value,"max")} />
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