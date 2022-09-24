import { TextField } from "@mui/material"
import { useState } from "react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useDeleteBlogMutation, useGetALLBlogQuery } from "../../../redux/slices/blog"
import { MdDelete } from "react-icons/md"
import Image from "next/image"
import { ToastContainer,toast } from "react-toast"

import BlogModal from "./BlogModal"

const Blog = () => {
  const [search, setSearch] = useState("")
  const { data,refetch } = useGetALLBlogQuery()
  
  const [deleteBlog]=useDeleteBlogMutation()

  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{

  },[data])

  const deleteBlogHandler=(id)=>{
    deleteBlog(id) 
    toast.success("Blog Deleted")
    refetch()
  }

  const filterData= search ?( data?.data?.filter((item)=>item.title.toLowerCase().includes(search)) || data?.data?.filter((item)=>item.author.name.toLowerCase().includes(search))  ) : data?.data
  return (
    <div className="admin__content-blog">
      <ToastContainer delay={2000} position="top-right" />
      <div className="title">
        <h1>All Blog List</h1>
        <motion.div className="add" whileTap={{ scale: .97 }} onClick={()=>setShowModal(true)}>
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
          filterData?.map((item, index) => (
            <div className="content__item" key={item._id}>

              <div className="left">
                <div className="left__no">
                  <p>{index + 1}</p>
                </div>
                <div className="left__img">
                  <Image src={item.img} width={150} height={75} objectFit="cover" />
                </div>
                <div className="left__detail">
                  <h2>{item.title}</h2>
                  <div className="date">
                    <p>{item.author?.name ? item.author?.name : "Jhon Doe"}</p>
                    <p>{item?.date?.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="right__delete" onClick={()=>deleteBlogHandler(item._id)} style={{cursor:"pointer"}}>
                  <MdDelete size={30} color="red" />
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {
        showModal && (
          <BlogModal setShowModal={setShowModal} toast={toast} refetch={refetch} />
        )
      }
    </div>
  )
}

export default Blog