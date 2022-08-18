import { FiEdit } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useUpdateUserDataMutation } from "../../../../redux/slices/user"
import { useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import {motion} from "framer-motion"
import { updateUserData } from "../../../../redux/slices/util"

const Perosnal = ({ userData }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" })
    const [openEdit, setOpenEdit] = useState({ id: null})
    const [updateUser]=useUpdateUserDataMutation()
    const dispatch=useDispatch()
    const state=useSelector((state)=>state.util)

    const itemArr = [
        {
            id: 0,
            title: "Full Name",
            value: userData.name,
            formName: "name"
        },
        {
            id: 1,
            title: "Phone No",
            value: userData.phone,
            formName: "phone"
        },
        {
            id: 2,
            title: "Email",
            value: userData.email,
            formName: "email"
        },
        {
            id: 3,
            title: "Password",
            value: "*********",
            formName: "password",
            type: "password"
        },
    ]

    const onSubmitHandler = async(data) => {
        try {
            
            await updateUser({id:userData._id,data}).then((res)=>{
                dispatch(updateUserData(res.data.data))
            })
            
        } catch (error) {
            console.log({error})   
        }
    }

    useEffect(()=>{

    },[userData,dispatch,state])
    
    return (
        <div className="rokye__user-dashboard__personal">
            <div className="title">
                <h1>Perosnal Information</h1>
            </div>
            <form className="content" onSubmit={handleSubmit(onSubmitHandler)}>
                {
                    itemArr.map((item) => (
                        <>
                            <div className="content__item" key={item.id}>
                                <div className="upper">
                                    <div className="comp">
                                        <h2>{item.title}</h2>
                                        <p>{item.value}</p>
                                    </div>
                                    <div className="edit" onClick={() => setOpenEdit({ id:item.id===openEdit.id ? null : item.id })}>
                                        <FiEdit cursor={"pointer"} />
                                    </div>
                                </div>
                                {
                                    openEdit.id === item.id && (
                                        <div className={`content__input`}>
                                            <input type={item.type ? item.type : "text"} placeholder={item.title} defaultValue={item.type ? null : item.value} {...register(item.formName)} />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    ))
                }
                <motion.button className="content__submit" type="submit" whileTap={{scale:.97}} >
                    <h2>Submit</h2>
                </motion.button>
            </form>
        </div>
    )
}

export default Perosnal