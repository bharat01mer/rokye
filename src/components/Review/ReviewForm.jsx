import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { AiOutlineDown, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { GiCancel } from "react-icons/gi"

const ratingOption = [
    {
        id: 0,
        value: 1,
        marked:false
    },
    {
        id: 1,
        value: 2,
        marked:false
    },
    {
        id: 2,
        value: 3,
        marked:false
    },
    {
        id: 3,
        value: 4,
        marked:false
    },
    {
        id: 4,
        value: 5,
        marked:false
    },

]

const ReviewForm = ({setClose}) => {
    const [ratingOpt, setRatingOpt] = useState(ratingOption)

    function starMark(value){
        for(let i=0;i<value;i++){
            if(i<5){
                setRatingOpt((item)=>[...ratingOpt,ratingOpt[i].marked=true])
            }
            console.log(i)
        }
    }
    function starUnMark(value){
        
    }
    
    return (
        <div className="rokye__reviewForm">
            <form className='form'>
                <div className="cancel" onClick={()=>setClose(false)}>
                    <GiCancel size={35} color="#f25c05" />
                </div>
                <h1>Leave a Review</h1>
                <div className="item name">
                    <TextField variant='outlined' fullWidth label="Name" disabled value={"Jhon Doe"} />
                </div>
                <div className="item email">
                    <TextField variant='outlined' fullWidth label="Email" disabled value={"jhondoe@gmail.com"} />
                </div>
                <div className="item rating">
                    <div className="rating__title">
                        <p>Choose Rating:</p>
                        
                        <div className="star">
                            {
                                ratingOpt.map((item)=> item.marked  ? (
                                    <AiFillStar size={20} color="#f25c05" onClick={()=>starUnMark(item.value)} />

                                )  : (item.value<=5 && (
                                    <AiOutlineStar size={20} onClick={()=>starMark(item.value)} color="#f25c05" />
                                )))
                            }
                        </div>
                    </div>

                </div>
                <div className="item review">
                    <TextField variant='outlined' fullWidth label="Your Review" multiline rows={5} />
                </div>
                <div className="submit">
                    <h3>Submit a review</h3>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm