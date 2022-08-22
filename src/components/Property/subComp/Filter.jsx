import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { BiFilter, BiMinus, BiRupee } from "react-icons/bi"
import { GoSettings } from "react-icons/go"
import { FaRegTimesCircle } from "react-icons/fa"
import { MdOutlineKeyboardArrowDown as DownArrow } from "react-icons/md"
import { AiOutlineSearch } from "react-icons/ai"
import millify from "millify";
import MinMaxFilter from '../../resuable/MinMaxFilter'

import { premiumFilterdata, propertyDataNew } from '../../../../utils/data'
import Checkbox from '@mui/material/Checkbox'

const Filter = ({ winWidth, setShowMobFilter, setOptionValue, optionValue, run,isModal=false }) => {
    const [value, setValue] = useState({ min: 0, max: 0 })
    const [showOption, setShowOption] = useState({ id: null, show: false })
    const [showArrow, setShowArrow] = useState({ id: null, show: false })

    const [showPremiumFilter, setShowPremiumFilter] = useState(false)
    const ref = useRef()


    const optionClickHandler = (item, reset = true) => {
        if (item.value === "all") {
            setOptionValue({ ...optionValue, [item.name]: null })
        } else {
            setOptionValue({ ...optionValue, [item.name]: item.value })
        }

        if (reset) setShowOption({ id: null, show: false })
        

    }

    const itemList = [
        {
            id: 1,
            name: "Location",
            optionValue: optionValue.city,
            data: propertyDataNew.location,
            nameForOptionHandler: "city"
        },
        {
            id: 2,
            name: "Type",
            optionValue: optionValue.propType,
            data: propertyDataNew.propertyType,
            nameForOptionHandler: "propType"
        },
        {
            id: 3,
            name: "Beds",
            optionValue: optionValue.bedroom,
            data: propertyDataNew.bedRoom,
            nameForOptionHandler: "bedroom"
        },
        {
            id: 4,
            name: "Bathroom",
            optionValue: optionValue.bathroom,
            data: propertyDataNew.bathroom,
            nameForOptionHandler: "bathroom"
        },
        {
            id: 5,
            name: "Furnishing",
            optionValue: optionValue.furnished,
            data: propertyDataNew.furnishing,
            nameForOptionHandler: "furnished"
        },
        {
            id: 6,
            name: "Tenant preferred",
            optionValue: optionValue.tenant,
            data: propertyDataNew.family,
            nameForOptionHandler: "tenant"
        },
        {
            id: 7,
            name: "Availability",
            optionValue: optionValue.availability,
            data: propertyDataNew.availability,
            nameForOptionHandler: "availability"
        },
        {
            id: 8,
            name: "Contruction age",
            optionValue: optionValue.age,
            data: propertyDataNew.age,
            nameForOptionHandler: "age"
        },
    ]

    const premiumItemList = [
        {
            id: 1,
            name: "Floor no",
            optionValue: optionValue.floor,
            data: propertyDataNew.floorno,
            nameForOptionHandler: "floor"
        },
        {
            id: 2,
            name: "Facing",
            optionValue: optionValue.facing,
            data: propertyDataNew.facing,
            nameForOptionHandler: "facing"
        },
        {
            id: 3,
            name: "Non-Veg",
            optionValue: optionValue.nonVeg,
            data: propertyDataNew.nonVeg,
            nameForOptionHandler: "nonVeg"
        },
        {
            id: 4,
            name: "Pets",
            optionValue: optionValue.pet,
            data: propertyDataNew.pets,
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
        const isExist = optionValue.amenity.includes(data)
        if (isExist) {
            let amenity = optionValue.amenity.filter(item => item !== data)
            setOptionValue({ ...optionValue, amenity })
        } else {
            setOptionValue({ ...optionValue, amenity: [...optionValue.amenity, data] })
        }
    }
    const searchClickHandler = () => {
        run(optionValue)
        if(isModal) setShowMobFilter(false)
    }
    const modifiedItemList = winWidth < 1100 ? itemList.splice(0, 10) : itemList

    const isAmenityElemExist = (value) => {
        const isExist = optionValue.amenity.find((d) => d === value)

        if (isExist) {
            return true
        } else {
            return false
        }
    }

    function getTitle(arr, value) {
        const title = arr.find((item) => item.value === value)        
        return title?.title
    }    

    


    return (
        <div className="rokye__property-filter" >
            <div className="modal__cancel" onClick={() => setShowMobFilter(false)}>
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
                                <p className='budget__p'> {value.min === 0 ? "choose" : (
                                    <>
                                        <BiRupee />{millify(value.min)} - <BiRupee />{millify(value.max)}
                                    </>
                                )}  {(showArrow.show && showArrow.id === 9) ? <DownArrow size={20} /> : <BiMinus size={20} />}</p>
                            </div>
                        </div>
                        {
                            modifiedItemList.map((item, index) => (
                                <div className="lower__item" key={item.name}>
                                    <div className="name" onClick={() => setShowOption({ id: item.id, show: showOption.id === index + 1 ? !showOption.show : true })} onMouseEnter={() => setShowArrow({ id: item.id, show: true })} onMouseLeave={() => setShowArrow({ id: null, show: false })}>
                                        <h4>{item.name}:</h4>
                                        <p>{item.optionValue ? getTitle(item.data,item.optionValue) : "choose"} {(showArrow.id === item.id && showArrow.show) ? <DownArrow size={20} /> : <BiMinus size={20} />}
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
                                                <div className="option__item" key={data.value} onClick={() => optionClickHandler({ name: item.nameForOptionHandler, value: data.value }, data.title)} >
                                                    <p>{data.title}</p>
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
                                            <p>{item.optionValue ? getTitle(item.data,item.optionValue) : "choose"} {(showArrow.id === item.id && showArrow.show) ? <DownArrow size={20} /> : <BiMinus size={20} />} </p>
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
                                                        <p>{data.title}</p>
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
                                            <Checkbox aria-label={item.name} defaultChecked={isAmenityElemExist(item.value)} value={item.value} onClick={(e) => amenitiesClickHandler(item.value)} />
                                            <p>{item.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            {/* <div className="property__search" >
                <motion.div className="btn" whileTap={{ scale: 0.96 }} onClick={searchClickHandler}>
                    <AiOutlineSearch size={24} />
                    <h3>Search</h3>
                </motion.div>
            </div> */}
        </div>
    )
}

export default Filter