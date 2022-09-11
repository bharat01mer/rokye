import Image from 'next/image'
import React from 'react'

const Payment = () => {
    return (
        <div className="rokye__user-dashboard__payment">
            <div className="title">
                <h1>Pay Using UPI</h1>
            </div>
            <div className="content">
                <div className="img">
                    <Image src={"/qrcode.jpeg"} width={300} height={300} objectFit={"contain"} />
                </div>
            </div>
        </div>
    )
}

export default Payment