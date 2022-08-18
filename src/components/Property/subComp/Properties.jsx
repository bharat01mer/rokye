import { TbArrowsSort as SortIcon, TbCircleCheck } from "react-icons/tb"
import { RiArrowDropDownLine as DownArrow, RiFilter3Line } from "react-icons/ri"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "../../resuable"

import Pagination from "./Pagination"

import Image from "next/image"


const Properties = ({ setShowMobFilter, data, page, sortValue, setSortValue, error, isLoading }) => {
    const [showSortOption, setShowSortOption] = useState(false)
    useEffect(() => {

    }, [data])


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

    const sortClickHandler = (data) => {

        setSortValue(data)
        setShowSortOption(false)
    }

    return (
        <div className='rokye__property-grid'>
            <div className="rokye__property-grid__title">
                <div className="title">
                    <h1>Properties for Rent</h1>
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
                            <p>{`${sortValue[0].toUpperCase()}${sortValue.slice(1)}`}</p>
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
                                                <div className="option__item" key={item.value} onClick={() => sortClickHandler(item.value)}>
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

            {
                error && (
                    <div className="error__prop">
                        <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/500_Internal_Server_Error-amico_eaxuem.png"} width={300} height={300} objectFit={"contain"} />
                        <h2>Some error occured, try again</h2>
                    </div>
                )
            }
            {
                isLoading && !error ? (
                    <div className="loading">
                        <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/Meditation-bro_k9gdcc.png"} width={300} height={300} objectFit={"contain"} />
                        <h2>Wait, While Fetching Data</h2>
                    </div>
                ) : (

                    data?.data.length !== 0 ? (

                        <div className="rokye__property-grid__content">
                            <div className="card">
                                {
                                    data?.data?.map((item) => (
                                        <div key={item._id}>
                                            <Card
                                                title={`${item.bedroom} BHK ${item.propType[0].toUpperCase()}${item.propType.slice(1)} ${item.superArea} sqft`}
                                                furnished={item.furnished}
                                                city={item.city}
                                                place={item.area}
                                                price={item.rentDetail.monthly}
                                                img={item.images[0]?.data ? item.images[0]?.data : "https://res.cloudinary.com/dykwfe4cr/image/upload/v1659513375/Trailers/vvdylxopbl0ozuy8m85d.jpg"}
                                                id={item._id}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            {/* Implement Pagination after intergrating the api */}
                            <div className="pagination">
                                <Pagination page={page} propData={data} />
                            </div>
                        </div>
                    ) : (
                        <div className="error">
                            
                            <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/500_Internal_Server_Error-amico_eaxuem.png "} width={300} height={300} objectFit={"contain"} />
                            <h2>Oops! No Data Found</h2>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Properties
