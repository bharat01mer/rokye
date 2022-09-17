import { TextField } from "@mui/material"
import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useGetALLBlogQuery } from "../../../redux/slices/blog"
import { MdDelete } from "react-icons/md"
import Image from "next/image"

const Blog = () => {
  const [search, setSearch] = useState("")
  const { data } = useGetALLBlogQuery()

  if(true){
    return null
  }
  return (
    <div className="admin__content-blog">
      <div className="title">
        <h1>All Blog List</h1>
        <motion.div className="add" whileTap={{ scale: .97 }}>
          <h3>Create Blog</h3>
        </motion.div>
      </div>
      <div className="divider"></div>
      <div className="search">
        <div className="search__field">
          <TextField id="outlined-basic" label="Search" variant="standard" onChange={(e) => setSearch(e.target.value.toLowerCase())} type={"search"} fullWidth />
        </div>
      </div>
      <div className="content">
        {
          data?.data.map((item,index) => (
            <div className="content__item" key={item._id}>
              {console.log(item.img)}
              <div className="left">
                <div className="left__no">
                  <p>{index+1}</p>
                </div>
                <div className="left__img">
                  <Image src={item.img} width={200} height={100} objectFit="cover" />
                </div>
              </div>
              <div className="right">

              </div>
            </div>   
          ))
        }
      </div>
    </div>
  )
}

export default Blog