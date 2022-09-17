import Image from 'next/image'
import Link from 'next/link'

const Blog = ({ data }) => {

    return (
        <div className="rokye__blog">
            <div className="rokye__blog-title">
                <h1>Our Blogs</h1>
                <div className="line" />
            </div>

            <div className="rokye__blog-content">

                {
                    data?.data?.map((item) => (
                        <Link href={`/blog/${item._id}`}  key={item._id}>
                            <div className="card" key={item._id}>
                                <Image src={item?.img} width={400} height={200} objectFit="cover" />
                                <div className="card__detail">
                                    <div className="upper">
                                        <p className="date">June 30,2021</p>  <div className="divider"></div> <p>{item?.type}</p>

                                    </div>
                                    <h2 className="title">{item?.title}</h2>
                                    <div className="content">
                                        <p>{item.content.slice(0, 200)}</p>
                                        <div className="more">
                                            <p>
                                                Read More
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}



export default Blog