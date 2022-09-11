import Image from 'next/image'


const Payment = () => {
    return (
        <div className="rokye__user-dashboard__payment">
            <div className="title">
                <h1>Pay Using UPI</h1>
            </div>
            <div className="content">
                <div className="img">
                    {/* <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1662876227/UPI_dcnvry.jpg"} width={300} height={300} objectFit={"contain"}  /> */}
                    <img src="https://res.cloudinary.com/dburijwvn/image/upload/v1662876227/UPI_dcnvry.jpg" alt=""  />
                </div>
            </div>
        </div>
    )
}

export default Payment