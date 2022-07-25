import { TbArrowsSort as SortIcon, TbVector, TbCircleCheck } from "react-icons/tb"
import { RiArrowDropDownLine as DownArrow, RiFilter3Line } from "react-icons/ri"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "../../resuable"
import { cardData } from "../../../../utils/data"
import { Pagination } from "@mui/material"

const Properties = ({ setShowMobFilter }) => {
    const [showSortOption, setShowSortOption] = useState(false)
    const chooseItem = [
        {
            id: 0,
            name: "Newest",
            value: "new"
        },
        {
            id: 1,
            name: "Low to High",
            value: "low"
        },
        {
            id: 2,
            name: "High to Low",
            value: "high"
        },
    ]
    return (
        <div className='rokye__property-grid'>
            <div className="rokye__property-grid__title">
                <div className="title">
                    <h1>Property for rent</h1>
                    <motion.div className="mob__filter-btn" whileTap={{ scale: .97 }} onClick={() => setShowMobFilter(true)}>
                        <RiFilter3Line size={20} />
                        <p> Filter</p>
                    </motion.div>
                </div>
                <div className="sort">
                    <div className="sort__option">
                        <p>
                            <SortIcon />  <span>Sort by :</span>
                        </p>
                        <div className="title" onClick={() => setShowSortOption(!showSortOption)}>
                            <p>Choose</p>
                            <DownArrow />
                        </div>
                        <AnimatePresence>
                            {
                                showSortOption && (
                                    <motion.div className="option" initial={{
                                        scale: 0,
                                        opacity: 0
                                    }} exit={{
                                        scale: 0,
                                        opacity: 0
                                    }} animate={{
                                        scale: 1,
                                        opacity: 1
                                    }}>
                                        {
                                            chooseItem.map((item) => (
                                                <div className="option__item" key={item.value}>
                                                    <p>{item.name}</p>
                                                </div>
                                            ))
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                    <div className="line" />
                    <div className="result">
                        <TbCircleCheck />
                        <p>8 results</p>
                    </div>
                </div>
            </div>
            <div className="rokye__property-grid__content">
                <div className="card">
                    {
                        cardData.map((item) => (
                            <div key={item.id}>
                                <Card title={item.title} city={item.city} place={item.place} price={item.price} img={item.img} />
                            </div>
                        ))
                    }
                </div>
                {/* <div className="pagination">
                    <Pagination />
                </div> */}
            </div>
        </div>
    )
}

export default Properties