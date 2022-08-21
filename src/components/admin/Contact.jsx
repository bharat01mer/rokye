import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useDeleteContactMutation, useGetAllContactQuery } from '../../../redux/slices/contact'
import { ToastContainer, toast } from 'react-toast'
import { useRouter } from 'next/router'
import TextField  from '@mui/material/TextField'
import Pagination from './Pagination'

const Contact = () => {
  const router = useRouter()
  const page = router.query?.page || 1
  const { data, refetch } = useGetAllContactQuery(page)
  const [winWidth, setWinWidth] = useState(0)
  const [search, setSearch] = useState(null)


  useEffect(() => {
    setWinWidth(window.innerWidth)
  }, [])
  useEffect(() => {

  }, [search])

  const [deleteCont] = useDeleteContactMutation()
  const ReadMore = ({ children }) => {
    const text = children
    const [readMore, setReadMore] = useState(false)

    const toggleReadMore = () => {
      setReadMore(!readMore)
    }

    function shorten(str, maxLen, separator = ' ') {
      if (str.length <= maxLen) return str;
      return str.substr(0, str.lastIndexOf(separator, maxLen));
    }

    
    return (
      <p>
        {!readMore ? shorten(text, winWidth < 730 ? 100 : 250) : text}

        {
          text.length > 250 && (
            <span className='read' onClick={toggleReadMore}>
              {readMore ? "less" : "more"}
            </span>
          )
        }
      </p>
    )
  }

  if (!data) {
    return null
  }
  
  const deleteContact = async (id) => {
    await deleteCont(id).then(() => {
      toast.success("Contact Deleted")
      refetch()
    }).catch((err) => {
      toast.error("Contact Deleted")
    })
    
  }
  const mobWidth = winWidth < 730 ? true : false

  const filterData = search ? data.data.filter((item) => item.phone.toString().includes(search) || item.name.includes(search) || item.email.includes(search) || item.type.includes(search) ) : data?.data
  return (
    <>
      <ToastContainer delay={2000} />
      <div className="admin__content-contact">
        <div className="title">
          <h1>Contact Information</h1>
          <p>{data.count} Contacts</p>
        </div>
        <div className="divider" />
        <div className="search">
          <div className="search__field">
            <TextField id="outlined-basic" label="Search" variant="standard" onChange={(e) => setSearch(e.target.value.toLowerCase())} type={"search"} fullWidth />
          </div>
        </div>
        <div className="content">
          {
            filterData.map((item) => (

              <div className="item" key={item._id}>
                <div className="left">
                  <div className="item__icon">
                    <FaUserCircle size={winWidth ? 40 : 50} />
                  </div>
                  <div className="item__detail">
                    <div className="upper">
                      <h1>{item.name}</h1>
                      <p>{item.date.slice(0, 10)}</p>
                    </div>
                    <div className="item__info">
                      <p>{item.phone}</p>
                      <p>{item.email}</p>
                      <p>{item.type}</p>
                    </div>
                    <div className="message">
                      <ReadMore>
                        {item.message}
                      </ReadMore>
                    </div>
                  </div>
                </div>

                <div className="item__delete" onClick={() => deleteContact(item._id)} style={{ cursor: "pointer" }}>
                  <MdDeleteOutline size={mobWidth ? 20 : 30} />
                </div>
              </div>
            ))
          }
        </div>
        <div className="pagination">
          <Pagination page={page} propData={data} refetch={refetch} link={"contact"} />
        </div>
      </div>
    </>
  )
}

export default Contact