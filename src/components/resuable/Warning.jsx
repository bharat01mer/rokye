import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Warning = () => {
    return (
        <div className="rokye__warning">
            <div className="rokye__warning-modal">
                <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1663403226/Mobile_login-amico_qpcjsr.png"} width={400} height={400} objectFit="contain" />
                <h3>Please Login to add your property</h3>
                <Link href={"/login?redirect=properties/create"}>
                    <motion.div className="register" whileTap={{ scale: .97 }}>
                        <h3>Login</h3>
                    </motion.div>
                </Link>
                <p>Don't have account,  <Link href={"/signup?redirect=properties/create"}><span>Register</span></Link></p>
            </div>
        </div>
    )
}

export default Warning