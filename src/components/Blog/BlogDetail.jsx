import Image from 'next/image'
import React from 'react'
import { FcCalendar } from "react-icons/fc"
import { BiUserCircle } from "react-icons/bi"
import { useSelector } from 'react-redux'

const BlogDetail = ({ data }) => {
    const { date, type, content,author } = data
    const { winWidth } = useSelector(state => state.util)
    return (
        <div className="rokye__blog-detail">
            <div className="img">
                {/* <img src={data?.img} alt="" /> */}
                <Image src={data?.img} width={  2500 } height={ winWidth < 800 ? 1500 :1000} objectFit="cover" />
            </div>
            <div className="detail">
                <div className="detail__date item">
                    <FcCalendar size={20} />
                    <p>{date?.slice(0, 10)}</p>
                </div>
                <div className="detail__author item">
                    <BiUserCircle size={25} />
                    <p>{author?.name}</p>
                </div>
                <div className="detail__genre item">
                    <p>#{type}</p>
                </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: content}}>
                
            </div>
        </div>
    )
}

export default BlogDetail