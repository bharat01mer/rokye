import { motion, AnimatePresence } from "framer-motion"
import TextField from '@mui/material/TextField'
import { BsGridFill } from "react-icons/bs"
import { FaWallet } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"

import { budgetData, optionData } from '../../../../utils/data'
import { useEffect, useState, useRef } from 'react'
import {MinMaxFilter} from "../../resuable"

export default function Desktop(props) {
    const [showMenu, setShowMenu] = useState({ id: null, show: false })
    const [budgetFilter, setBudgetFilter] = useState({ id: 1, show: true })
    const ref = useRef()

    const [value, setValue] = useState({ min: 0, max: 0 })

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
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (budgetFilter.show && ref.current && !ref.current.contains(e.target)) {
                setShowMenu({ show: false })
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [budgetFilter])


    const optionClickHandler = (item, reset = true) => {

        setOptionValue({ ...optionValue, [item.name]: item.value })
        if (reset) setShowOption({ id: null, show: false })
    }
    return (
        <div className="rokye__home-searchbar__tab" ref={ref}>
            <div className="location item">
                <HiLocationMarker size={props.iconSize} />
                <div className="title" >
                    <div className="outer" onClick={() => setShowMenu({ id: 1, show: showMenu.id === 1 ? !showMenu.show : true })}>
                        <h1>Location</h1>
                        <h3>Select <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>
                        {
                            showMenu.id === 1 && showMenu.show && (
                                <motion.div className={`menu ${optionData.city.length>4 ? "fixed" : ""}`} variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    {optionData.city.map((item) => (
                                        <div className="menu__item" key={item.id} onClick={() => setShowMenu(false)}>
                                            <h3>{item.name}</h3>
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
                        <h3>Select <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>

                        {
                            showMenu.id === 2 && showMenu.show && (
                                <motion.div className={`menu ${optionData.condos.length>4 ? "fixed" : ""}`} variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    {optionData.condos.map((item) => (
                                        <div className="menu__item" key={item.id} onClick={() => setShowMenu(false)}>
                                            <h3>{item.name}</h3>
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
                        <h3>Select <IoIosArrowDown size={props.iconSiz2} /> </h3>
                    </div>
                    <AnimatePresence>

                        {
                            showMenu.id === 3 && showMenu.show && (
                                <motion.div className="menu budget" variants={menuVariant} animate={"visible"} initial={"initial"} exit={"exit"}>
                                    <div className="min" style={{ marginRight: ".5rem" }}>
                                        <TextField id="outlined-basic" label="Min" variant="outlined" onFocus={() => setBudgetFilter({ id: 1, show: true })} style={{ marginBottom: 10 }} />
                                        {
                                            budgetFilter.id === 1 && budgetFilter.show &&
                                            budgetData.min.map((item) => (
                                                <>
                                                    <div className="menu__item" key={item.id}>
                                                        <h3>{item.price}</h3>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="max">
                                        <TextField id="outlined-basic" label="Max" variant="outlined" onFocus={() => setBudgetFilter({ id: 2, show: true })} style={{ marginBottom: 10 }} />
                                        {
                                            budgetFilter.id === 2 && budgetFilter.show &&
                                            budgetData.max.map((item) => (
                                                <>
                                                    <div className="menu__item" key={item.id}>
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
            <motion.div className="search" whileTap={{ scale: 0.96 }}>
                <AiOutlineSearch size={props.winWidth < 1000 ? 30 : 40} />
                {
                    props.winWidth < 840 && (
                        <h2>Search</h2>
                    )
                }
            </motion.div>
        </div>);
}