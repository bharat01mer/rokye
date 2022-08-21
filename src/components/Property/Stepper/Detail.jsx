import { useState } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { Checkbox, TextField } from "@mui/material"
import Choose from "./Choose"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { propertyDataNew } from "../../../../utils/data"

const Detail = () => {
    const { register, setValue, getValues, formState: { errors } } = useFormContext()
    const [amenitiesArray] = useState( getValues("amenity") ? getValues("amenity") : [])
    const chooseContent = [
        {
            id: 0,
            title: "Floor No",
            arr:propertyDataNew.floorno,
            name: "floor"
        },
        {
            id: 1,
            title: "Total Floor",
            arr:propertyDataNew.totalFloor,
            name: "totalFloor"
        },
        {
            id: 2,
            title: "Facing",
            arr:propertyDataNew.facing,
            name: "facing"
        },
        {
            id: 3,
            title: "Balconies",
            arr:propertyDataNew.balconies,
            "name": "balconies"
        },
        {
            id: 4,
            title: "Furnished Status",
            arr:propertyDataNew.furnishing,
            name: "furnished"
        },
        {
            id: 5,
            title: "Age of construction",
            arr:propertyDataNew.age,
            name: "age"
        },
        {
            id: 6,
            title: "Availability",
            arr:propertyDataNew.availability,
            name: "availability",
        },
        {
            id: 7,
            title: "Tenant preferred",
            arr:propertyDataNew.family,
            name: "tenant"
        },
        {
            id: 8,
            title: "Non-Veg",
            arr:propertyDataNew.nonVeg,
            name: "nonVeg"
        },
        {
            id: 9,
            title: "Pets",
            arr:propertyDataNew.pets,
            name: "pet"
        },
    ]

    const [showOption, setShowOption] = useState({ id: null, show: false })


    useEffect(() => {

    }, [amenitiesArray, showOption])
    

    const amenitiesHandler = (data) => {

        if (amenitiesArray.includes(data)) {
            const index = amenitiesArray.indexOf(data)
            amenitiesArray.splice(index, 1)
        } else {
            amenitiesArray.push(data)
        }
        setValue("amenity", amenitiesArray)
    }

    function checkAmenityElem(data){
        if(amenitiesArray.includes(data)){
            return true;
        }else{
            return false;
        }
    }
    return (
        <div className="form__complex">
            <div className="form__complex-title">
                <AiOutlineInfoCircle size={30} />
                <h1>Property Details</h1>
            </div>
            <div className="content">
                <div className="content__choose">
                    {
                        chooseContent.map((item) => (
                            <div className="item" key={item.id} onClick={() => setShowOption({ id: item.id === showOption.id ? null : item.id, show: item.id === showOption.id ? false : true })}>
                                <Choose id={item.id} optionItem={item.arr} title={item.title} setShowOption={setShowOption} showOption={showOption} name={item.name} />
                                {
                                    errors[item.name] && <p style={{ color: "red" }}>Please fill the above field</p>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="content__amenity">
                    <div className="amenity__title">
                        <h1>Amenity</h1>
                    </div>
                    <div className="amenity__content">
                        {
                            propertyDataNew.amenities.map((item) => (
                                <div className="amenity__content-item" key={item.id}>
                                    <Checkbox aria-label={item.title} defaultChecked={checkAmenityElem(item.value)} onChange={() => amenitiesHandler(item.value)} />
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }

                    </div>
                    {
                        amenitiesArray === [] && <p style={{ color: "red" }}>Please Select atleast one</p>
                    }
                </div>

                <div className="content__desc">
                    <div className="content__desc-title">
                        <h1>Description</h1>
                    </div>
                    <TextField
                        fullWidth
                        {...register("description", { required: true })}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={5}
                    />
                    {
                        errors.description && <p className="error" style={{ color: "red" }}>Please fill the above field</p>
                    }
                </div>

                <div className="content__rent">
                    <div className="content__rent-title">
                        <h1>Rent Details</h1>
                    </div>
                    <div className="content__rent-content">
                        <div className="item">
                            <TextField variant="outlined" type={"number"} label="Monthly rent" fullWidth {...register("rentDetail.monthly", { required: true })} />
                            {
                                errors?.rentDetail?.monthly && <p className="error" style={{ color: "red" }}>Please fill the above field</p>
                            }
                        </div>
                        <div className="item">
                            <TextField variant="outlined" type={"number"} label="Security amount" fullWidth {...register("rentDetail.securityAmount", { required: true })} />
                            {
                                errors?.rentDetail?.securityAmount && <p className="error" style={{ color: "red" }}>Please fill the above field</p>
                            }

                        </div>
                        <div className="item">
                            <TextField variant="outlined" type={"number"} label="Maintenance charges" fullWidth {...register("rentDetail.maintenance", { required: true })} />
                            {
                                errors.rentDetail?.maintenance && <p className="error" style={{ color: "red" }}>Please fill the above field</p>
                            }
                        </div>
                        <div className="item" onClick={() => setShowOption({ id: 10, show: showOption.show ? false : true })}>
                            <Choose id={10} optionItem={propertyDataNew.perInfo} title={"Per"} setShowOption={setShowOption} showOption={showOption} name={"rentDetail.per"} />
                            {
                                errors.rentDetail?.per && <p className="error" style={{ color: "red" }}>Please fill the above field</p>
                            }
                        </div>
                    </div>
                </div>

                {/* <button onClick={onClickHandler}>Click Me</button> */}
            </div>
        </div>
    )
}

export default Detail