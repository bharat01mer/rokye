
import Image from 'next/image'
import { ContactForm, ScrollTo } from '../resuable'
import { GoMail } from "react-icons/go"
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"
import { useSelector } from 'react-redux'

const Contact = () => {
    const { winWidth } = useSelector(state => state.util)
    const connectItem = [
        {
            id: 0,
            title: "Drop us an email",
            item: "sales@rokye.com",
            link: "mailto:sales@rokye.com",
            icon: <GoMail />
        },
        {
            id: 1,
            title: "Follow Us",
            item: "@rokyerealty",
            link: "https://www.facebook.com/rokyerealty",
            icon: <FaFacebookF />
        },
        {
            id: 2,
            title: "Follow Us",
            item: "@rokyerealty",
            link: "https://www.instagram.com/rokyerealty",
            icon: <FiInstagram />
        },
        {
            id: 3,
            title: "Follow Us",
            item: "@rokyerealty",
            link: "https://www.twitter.com/rokyerealty",
            icon: <FaTwitter />
        },
    ]
    return (
        <>
            <ScrollTo />
            <div className="rokye__contact">

                <div className="upper">
                    {
                        winWidth > 600 && (
                            <div className="rokye__contact-animate">
                                <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1660486047/Contact_us-pana_zipvkl.png"} width={2500} height={2500} objectFit="contain" />
                            </div>
                        )
                    }
                    <div className="rokye__contact-form">
                        <ContactForm />
                    </div>
                </div>
                <div className="lower">
                    {
                        connectItem.map((item) => (
                            <a href={item.link} key={item.id} rel="norefferer" target="__blank" >
                                <div className="item">
                                    <div className="item__icon">
                                        {item.icon}
                                    </div>
                                    <p>{item.title}</p>
                                    <h2>{item.item}</h2>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Contact