
import { useState } from 'react'
import { Filter, Properties } from './subComp'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from "react-redux"

const Property = () => {
    const { winWidth } = useSelector((state => state.util))
    const [showMobFilter, setShowMobFilter] = useState(false)

    return (
        <>
            <div className="rokye__property">

                {
                    winWidth > 1000 && (
                        <Filter winWidth={winWidth} />
                    )
                }
                <Properties setShowMobFilter={setShowMobFilter} />
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
                            <Filter setShowMobFilter={setShowMobFilter} winWidth={winWidth} />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Property