
import { useEffect, useState } from 'react'
import { Filter, Properties } from './subComp'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from "react-redux"
import { useGetAllPropertyWithFilterMutation } from "../../../redux/slices/property"
import { useRouter } from "next/router"
import { ScrollTo } from '../resuable'

const Property = () => {
    const { winWidth, search } = useSelector((state => state.util))
    const [showMobFilter, setShowMobFilter] = useState(false)
    const [sortValue, setSortValue] = useState("new")
    const router = useRouter()
    const page = router.query?.page || 1
    const [optionValue, setOptionValue] = useState({ city: null, propType: null, bedroom: null, bathroom: null, min: null, max: null, furnished: null, availablity: null, age: null, flatNo: null, facing: null, nonVeg: null, pet: null, amenity: [] })


    const isRedirected = router.query.redirect === "true" ? true : false

    const [run, info] = useGetAllPropertyWithFilterMutation()

    console.log({ router })
    useEffect(() => {
        if (!isRedirected) {
            run({ page, sort: sortValue, limit: 8, data: optionValue })
        }
    }, [page, sortValue])

    useEffect(() => {
        if (isRedirected) {
            run({ page, sort: sortValue, limit: 8, data: search })
        }
    }, [])

    
    useEffect(()=>{
        run({ page, sort: sortValue, limit: 8, data: optionValue })

    },[optionValue])
    
    const filterClickHanlder = (data) => {
        
        run({ page, sort: sortValue, limit: 8, data: optionValue, data })
    }


    return (
        <>
            <ScrollTo />
            <div className="rokye__property">

                {
                    winWidth > 1000 && (
                        <Filter setShowMobFilter={setShowMobFilter} winWidth={winWidth} optionValue={optionValue} setOptionValue={setOptionValue} run={filterClickHanlder} />
                    )
                }

                <Properties setShowMobFilter={setShowMobFilter} data={info.data} error={info.isError} isLoading={info.isLoading} setSortValue={setSortValue} sortValue={sortValue} page={page} optionValue={optionValue} />
            </div>
            <AnimatePresence>
                {
                    showMobFilter &&
                    (
                        <motion.div className="filter__modal" initial={{
                            scale: 0,
                            opacity: 0
                        }} exit={{
                            scale: 0,
                            opacity: 0
                        }} animate={{
                            scale: 1,
                            opacity: 1
                        }}>
                            <Filter setShowMobFilter={setShowMobFilter} winWidth={winWidth} optionValue={optionValue} setOptionValue={setOptionValue} run={filterClickHanlder} isModal={true} />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Property