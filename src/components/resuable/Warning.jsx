import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Warning = () => {
    return (
        <div className="rokye__warning">
            <div className="rokye__warning-modal">
                <Image src={"https://res.cloudinary.com/dburijwvn/image/upload/v1663403226/Mobile_login-amico_qpcjsr.png"} width={400} height={400} objectFit="contain" />
                <h3>Please Register to add your property</h3>
                <Link href={"/signup?redirect=properties/create"}>
                    <motion.div className="register" whileTap={{ scale: .97 }}>
                        <h3>Register</h3>
                    </motion.div>
                </Link>
                <p style={{textAlign:"center",marginTop:".5rem"}}>Already have an account? - <Link href={"/login?redirect=properties/create"}><span>Login</span></Link></p>
            </div>
        </div>
    )
}

export default Warning