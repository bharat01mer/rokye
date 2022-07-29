
import { ContactAnimation } from '../../../illustration'
import { ContactForm } from '../resuable'
import { GoMail } from "react-icons/go"
import { FaFacebookF, FaTwitter } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"

const Contact = () => {
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
        <div className="rokye__contact">
            <div className="title">
                <h1>Contact Us <span>:-</span></h1>
            </div>
            <div className="upper">
                <div className="rokye__contact-animate">
                    <ContactAnimation />
                </div>
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
    )
}

export default Contact