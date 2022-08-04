import { TbArrowsSort as SortIcon, TbVector, TbCircleCheck } from "react-icons/tb"
import { RiArrowDropDownLine as DownArrow, RiFilter3Line } from "react-icons/ri"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "../../resuable"
import { cardData } from "../../../../utils/data"
import { Pagination } from "@mui/material"
import {useGetAllPropertyQuery} from "../../../../redux/slices/property"

const Properties = ({ setShowMobFilter }) => {
    const [showSortOption, setShowSortOption] = useState(false)
    const {data,isFetching,error,isSuccess}=useGetAllPropertyQuery()

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

    const sortClickHandler=(data)=>{
        
        setShowSortOption(false)
    }
    if(isFetching || !data){
        return <h1>Waiting..</h1>
    }

    console.log({error,data})
    
    
    return (
        <div className='rokye__property-grid'>
            <div className="rokye__property-grid__title">
                <div className="title">
                    <h1>Property for Rent</h1>
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
                                                <div className="option__item" key={item.value} onClick={()=>sortClickHandler(item.value)}>
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
                        <p>{data?.count} results</p>
                    </div>
                </div>
            </div>
            <div className="rokye__property-grid__content">
                <div className="card">
                    {
                        data.data.map((item) => (
                            <div key={item.id}>
                                {console.log(item)}
                                <Card title={`${item.bedroom}BHK ${item.propType} for rent`} bath={item.bathroom} bed={item.bedroom} city={item.city} place={item.society} price={item.rentDetail.monthly} img={item.images[0].data} id={item._id} />
                            </div>
                        ))
                    }
                </div>
                
                {/* Implement Pagination after intergrating the api */}
                {/* <div className="pagination">
                    <Pagination />
                </div> */}
            </div>
        </div>
    )
}

export default Properties
