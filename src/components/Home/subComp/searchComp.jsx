import { motion, AnimatePresence } from "framer-motion"
import TextField from '@mui/material/TextField'
import { BsGridFill } from "react-icons/bs"
import { BiRupee } from "react-icons/bi"
import { FaWallet } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"
import millify from "millify"
import { searchQuery } from "../../../../redux/slices/util"

import { budgetData, optionData } from '../../../../utils/data'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

export default function Desktop(props) {
    const [showMenu, setShowMenu] = useState({ id: null, show: false })
    const dispatch=useDispatch()
    const [budgetFilter, setBudgetFilter] = useState({ id: 1, show: true })
    const ref = useRef()
    const router=useRouter()

    const [optionValue, setOptionValue] = useState({ city: null, propType: null, bedroom: null, bathroom: null, min: 0, max: 0, furnished: null, availablity: null, age: null, flatNo: null, facing: null, nonVeg: null, pet: null, amenity: [] })

    const menuVariant = {
        initial: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: .5
            }
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: .5
            }
        },
    }


    useEffect(() => {



    }, [optionValue,dispatch])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (budgetFilter.show && ref.current && !ref.current.contains(e.target)) {
                setShowMenu({ show: false })
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [budgetFilter])


    const optionClickHandler = (item, reset = true, budget = false) => {
        setOptionValue({ ...optionValue, [item.name]: item.value })
        if (reset) setShowMenu({ id: null, show: false })
        if (budget && item.name === "min") {
            setBudgetFilter({ id: 2, show: true })
        } else if (item.name === "max") {

            setShowMenu({ id: null, show: false })
        }
    }

    const onSearchHandler=()=>{
        dispatch(searchQuery(optionValue))
        router.push(`/properties?redirect=true`,"/properties")
    }
    return (
        <div className="rokye__home-searchbar__tab" ref={ref}>
            <div className="location item">
                <HiLocationMarker size={props.iconSize} />
                <div className="title" >
                    <div className="outer" onClick={() => setShowMenu({ id: 1, show: showMenu.id === 1 ? !showMenu.show : true })}>
                        <h1>Location</h1>
                        <h3 style={{ textTransform: "capitalize" }}>{optionValue.city ?? "Select"} <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>
                        {
                            showMenu.id === 1 && showMenu.show && (
                                <motion.div className={`menu ${optionData.location.length > 4 ? "fixed" : ""}`} variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    {optionData.location.map((item) => (
                                        <div className="menu__item" key={item.id} onClick={() => optionClickHandler({ name: "city", value: item.value })}>
                                            <h3>{item.title}</h3>
                                        </div>
                                    ))}
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
            <div className="divider" />
            <div className="property item">
                <BsGridFill size={props.iconSize} />
                <div className="title">
                    <div className="outer" onClick={() => setShowMenu({ id: 2, show: showMenu.id === 2 ? !showMenu.show : true })}>
                        <h1>Property Type</h1>
                        <h3 style={{ textTransform: "capitalize" }}>{optionValue.propType ?? "Select"} <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>

                        {
                            showMenu.id === 2 && showMenu.show && (
                                <motion.div className={`menu ${optionData.propertyType.length > 4 ? "fixed" : ""}`} variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    {optionData.propertyType.map((item) => (
                                        <div className="menu__item" key={item.id} onClick={() => optionClickHandler({ name: "propType", value: item.value })}>
                                            <h3>{item.title}</h3>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="divider" />

            <div className="price item" >
                <FaWallet size={props.iconSize} />
                <div className="title" >
                    <div className="outer" onClick={() => setShowMenu({ id: 3, show: showMenu.id === 3 ? !showMenu.show : true })}>
                        <h1>Budget</h1>
                        <h3>{optionValue.min === 0 ? "Select" : (
                            <>
                                <BiRupee />{millify(optionValue.min)} - <BiRupee />{millify(optionValue.max)}
                            </>
                        )} <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>

                        {
                            showMenu.id === 3 && showMenu.show && (
                                <motion.div className="menu budget" variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    <div className="min" style={{ marginRight: ".5rem" }}>
                                        <TextField id="outlined-basic" label="Min" defaultValue={optionValue.min ?? ""} variant="outlined" onFocus={() => setBudgetFilter({ id: 1, show: true })} style={{ marginBottom: 10 }} />
                                        {
                                            budgetFilter.id === 1 && budgetFilter.show &&
                                            budgetData.min.map((item) => (
                                                <>
                                                    <div className="menu__item" key={item.id} onClick={() => optionClickHandler({ name: "min", value: item.data }, false, true)}>
                                                        <h3>{item.price}</h3>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="max">
                                        <TextField id="outlined-basic" label="Max" defaultValue={optionValue.max ?? ""} variant="outlined" onFocus={() => setBudgetFilter({ id: 2, show: true })} style={{ marginBottom: 10 }} />
                                        {
                                            budgetFilter.id === 2 && budgetFilter.show &&
                                            budgetData.max.map((item) => (
                                                <>
                                                    <div className="menu__item" key={item.id} onClick={() => optionClickHandler({ name: "max", value: item.data }, false, true)}>
                                                        <h3>{item.price}</h3>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
            <div className="gap" />
            <motion.div className="search" whileTap={{ scale: 0.96 }} onClick={onSearchHandler}>
                <AiOutlineSearch size={30} />
                {
                    props.winWidth < 840 && (
                        <h2>Search</h2>
                    )
                }
            </motion.div>
        </div>);
}