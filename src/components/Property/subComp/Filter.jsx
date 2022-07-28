import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { BiFilter, BiMinus, BiRupee } from "react-icons/bi"
import { GoSettings } from "react-icons/go"
import { FaRegTimesCircle } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown as DownArrow } from "react-icons/md"
import { AiOutlineSearch } from "react-icons/ai"
import millify from "millify";
import MinMaxFilter from '../../resuable/MinMaxFilter'

import { premiumFilterdata, propertyData } from '../../../../utils/data'
import Checkbox from '@mui/material/Checkbox'

const Filter = ({ winWidth,setShowMobFilter }) => {
    const [value, setValue] = useState({ min: 0, max: 0 })
    const [showOption, setShowOption] = useState({ id: null, show: false })
    const [showArrow, setShowArrow] = useState({ id: null, show: false })
    const [optionValue, setOptionValue] = useState({ location: null, type: null, bed: null, bath: null, budget: null, furnishing: null, preferred: null, availablity: null, contructionAge: null, floor: null, facing: null, non_veg: null, pet: null })
    const [showPremiumFilter, setShowPremiumFilter] = useState(false)
    const ref = useRef()


    const optionClickHandler = (item, reset = true) => {

        setOptionValue({ ...optionValue, [item.name]: item.value })
        if (reset) setShowOption({ id: null, show: false })
    }

    const itemList = [
        {
            id: 1,
            name: "Location",
            optionValue: optionValue.location,
            data: propertyData.location,
            nameForOptionHandler: "location"
        },
        {
            id: 2,
            name: "Type",
            optionValue: optionValue.type,
            data: propertyData.type,
            nameForOptionHandler: "type"
        },
        {
            id: 3,
            name: "Beds",
            optionValue: optionValue.bed,
            data: propertyData.beds,
            nameForOptionHandler: "bed"
        },
        {
            id: 4,
            name: "Bathroom",
            optionValue: optionValue.bath,
            data: propertyData.bath,
            nameForOptionHandler: "bath"
        },
        {
            id: 5,
            name: "Furnishing",
            optionValue: optionValue.furnishing,
            data: propertyData.furnishing,
            nameForOptionHandler: "furnishing"
        },
        {
            id: 6,
            name: "Tenant Preferred",
            optionValue: optionValue.preferred,
            data: propertyData.tenant,
            nameForOptionHandler: "preferred"
        },
        {
            id: 7,
            name: "Availability",
            optionValue: optionValue.availablity,
            data: propertyData.availability,
            nameForOptionHandler: "availablity"
        },
        {
            id: 8,
            name: "Contruction Age",
            optionValue: optionValue.contructionAge,
            data: propertyData.age,
            nameForOptionHandler: "contructionAge"
        },
    ]

    const premiumItemList = [
        {
            id: 1,
            name: "Floor No",
            optionValue: optionValue.floor,
            data: premiumFilterdata.floor,
            nameForOptionHandler: "floor"
        },
        {
            id: 2,
            name: "Facing",
            optionValue: optionValue.facing,
            data: premiumFilterdata.facing,
            nameForOptionHandler: "facing"
        },
        {
            id: 3,
            name: "Non-Veg",
            optionValue: optionValue.non_veg,
            data: premiumFilterdata.non_veg,
            nameForOptionHandler: "non_veg"
        },
        {
            id: 4,
            name: "Pets",
            optionValue: optionValue.pet,
            data: premiumFilterdata.pet,
            nameForOptionHandler: "pet"
        },
    ]
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (showOption.show && ref.current && !ref.current.contains(e.target)) {
                setShowOption({ show: false, id: null })
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {

            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showOption, optionValue])

    const amenitiesClickHandler = (data) => {
        if (optionValue[data]) {
            delete optionValue[data]
        } else {
            setOptionValue({ ...optionValue, [data]: data })
        }
    }
    const searchClickHandler = () => {
        console.log({ optionValue })
    }
    const modifiedItemList=winWidth < 1100 ? itemList.splice(0,10) : itemList
    console.log({data: premiumFilterdata.amenities})

    
    return (
        <div className="rokye__property-filter" >
            <div className="modal__cancel" onClick={()=>setShowMobFilter(false)}>
                <FaRegTimesCircle size={30} color={"#F25C05"} />
            </div>
            <div className="filter">
                <div className={`filter__item  ${showPremiumFilter ? "" : "active"}`} onClick={() => setShowPremiumFilter(false)}>
                    <BiFilter size={25} />
                    <p>Filter</p>
                </div>
                <div className={`filter__item  ${showPremiumFilter ? "active" : ""}`} onClick={() => setShowPremiumFilter(true)}>
                    <GoSettings size={20} />
                    <p>Premium Filters</p>
                </div>
            </div>
            {
                !showPremiumFilter ? (

                    <div className="lower" ref={ref}>
                        <div className="lower__item" >
                            {(showOption.id === 9 && showOption.show) && (
                                <AnimatePresence>
                                    <MinMaxFilter setModal={setShowOption} setValue={setValue} value={value} optionClickHandler={optionClickHandler} />
                                </AnimatePresence>
                            )}
                            <div className="name" onClick={() => setShowOption({ id: 9, show: showOption.id === 9 ? !showOption.show : true })} onMouseEnter={() => setShowArrow({ id: 9, show: true })} onMouseLeave={() => setShowArrow({ id: null, show: false })}>
                                <h4>Budget</h4>
                                <p className='budget__p'> {value.min === 0 ? "Any Amount" : (
                                    <>
                                        <BiRupee />{millify(value.min)} - <BiRupee />{millify(value.max)}
                                    </>
                                )}  {(showArrow.show && showArrow.id === 9) ? <DownArrow size={20} /> : <BiMinus size={20} />}</p>
                            </div>
                        </div>
                        {
                            modifiedItemList.splice(0, 10).map((item, index) => (
                                <div className="lower__item" key={item.name}>
                                    <div className="name" onClick={() => setShowOption({ id: item.id, show: showOption.id === index + 1 ? !showOption.show : true })} onMouseEnter={() => setShowArrow({ id: item.id, show: true })} onMouseLeave={() => setShowArrow({ id: null, show: false })}>
                                        <h4>{item.name}:</h4>
                                        <p>{item.optionValue ? item.optionValue : "All"} {(showArrow.id === item.id && showArrow.show) ? <DownArrow size={20} /> : <BiMinus size={20} />}
                                        </p>
                                    </div>
                                    <AnimatePresence>

                                        {(showOption.id === item.id && showOption.show) && <motion.div className="option" initial={{
                                            scale: 0,
                                            opacity: 0
                                        }} exit={{
                                            scale: 0,
                                            opacity: 0
                                        }} animate={{
                                            scale: 1,
                                            opacity: 1
                                        }}>
                                            {item.data.map(data =>
                                                <div className="option__item" key={data.value} onClick={() => optionClickHandler({ name: item.nameForOptionHandler, value: data.value })} >
                                                    <p>{data.value}</p>
                                                    <div className="divider" />
                                                </div>)}
                                        </motion.div>}
                                    </AnimatePresence>
                                </div>
                            ))
                        }

                    </div>

                ) : (
                    <div className="preferred" ref={ref}>
                        <div className="preferred__list">
                            {
                                premiumItemList.map((item, index) => (
                                    <div className='lower__item' key={item.name}>
                                        <div className="name" onClick={() => setShowOption({ id: item.id, show: showOption.id === index + 1 ? !showOption.show : true })} onMouseEnter={() => setShowArrow({ id: item.id, show: true })} onMouseLeave={() => setShowArrow({ id: null, show: false })}>
                                            <h4>{item.name}</h4>
                                            <p>{item.optionValue ? item.optionValue : "Any"} {(showArrow.id === item.id && showArrow.show) ? <DownArrow size={20} /> : <BiMinus size={20} />} </p>
                                        </div>

                                        <AnimatePresence>
                                            {(showOption.id === item.id && showOption.show) && <motion.div className="option" initial={{
                                                scale: 0,
                                                opacity: 0
                                            }} exit={{
                                                scale: 0,
                                                opacity: 0
                                            }} animate={{
                                                scale: 1,
                                                opacity: 1
                                            }}>
                                                {item.data.map(data =>
                                                    <div className="option__item" key={data.value} onClick={() => optionClickHandler({ name: item.nameForOptionHandler, value: data.value })} >
                                                        <p>{data.value}</p>
                                                        <div className="divider" />
                                                    </div>)}
                                            </motion.div>}
                                        </AnimatePresence>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="preferred__amenities">
                            <div className="title">
                                <h3>Amenities</h3>
                            </div>
                            <div className="list">
                                {
                                    premiumFilterdata.amenities.map((item) => (
                                        <div className="list__item" key={item.id}>
                                            
                                            <Checkbox aria-label={item.name} defaultChecked={optionValue[item.value] ? true : false} value={item.value} onClick={(e) => amenitiesClickHandler(item.value)} />
                                            <p>{item.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="property__search" >
                <motion.div className="btn" whileTap={{ scale: 0.96 }} onClick={searchClickHandler}>
                    <AiOutlineSearch size={24} />
                    <h3>Search</h3>
                </motion.div>
            </div>
        </div>
    )
}

export default Filter