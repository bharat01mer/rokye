import { AiOutlineSearch ,AiOutlinePlus} from "react-icons/ai"
import Link from "next/link"

const About = () => {
    return (
        <div className="rokye__about">
            <div className="intro">
                <div className="intro__img">
                    <img src={"https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"} objectFit={"contain"} />
                </div>
                <div className="intro__content">
                    <h1>About Us</h1>
                    <p>We believe that renting a home should be straight-forward and enjoyable, not time-consuming, complicated or stressful. Rent a home without paying any brokerage and you can avail our services without any advance payment, We believe in service first and pay later policy.</p>
                    <Link href={"/properties"} passHref >
                        <div className="btn">
                            <AiOutlineSearch />
                            <h3>Search Home</h3>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="verification">
                <div className="verification__content">
                    <h1>Verification</h1>
                    <p>We are the first company to introduce the concept of extra layer of background verification: we do verify all the basic details of tenants and make sure that your journey of renting a home will most straight-forward and enjoyable.</p>
                    <Link href={"/properties/create"} passHref >
                        <div className="btn">
                            <AiOutlinePlus />
                            <h3>Add Property</h3>
                        </div>
                    </Link>
                </div>
                <div className="verification__img">
                    <img src="https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
            </div>
            <div className="search">
                <div className="search__img">
                    <img src="https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="" />
                </div>
                <div className="search__content">
                    <h1>Personalized search</h1>
                    <p>We are the first company to introduce the concept of having all the listings physically verified: we take extra layer of quality check and have accureate details of home condition, society, locality and all the other important features that tenants desire.</p>
                    <Link href={"/properties"} passHref >
                        <div className="btn">
                            <AiOutlineSearch />
                            <h3>Search Home</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About