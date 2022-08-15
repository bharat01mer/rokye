import {motion} from "framer-motion"
import {FaTimesCircle} from "react-icons/fa"

const Edit = ({img,handler,setModal}) => {
  return (
    <div className="rokye__user-edit">
        <div className="inner">
            <div className="close" onClick={()=>setModal(false)}>
                <FaTimesCircle size={30} />
            </div>
            <div className="rokye__user-edit__preview">
                <img src={img} alt="img"   />
            </div>
            <motion.div className="rokye__user-edit__submit" whileTap={{scale:0.97}} onClick={handler}>
                <h2>Upload</h2>
            </motion.div>
        </div>
    </div>
  )
}

export default Edit