import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <div className="rokye__loader">
            <div className="item">
                <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486046/Meditation-bro_k9gdcc.png"} width={500} height={500} objectFit={"contain"} />
                <h2>Wait, While Loading...</h2>
            </div>
        </div>
    )
}

export default Loader