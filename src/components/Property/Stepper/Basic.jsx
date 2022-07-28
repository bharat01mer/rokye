import { TextField } from "@mui/material"
import { useState } from "react"
import Choose from "./Choose"

import {AiOutlineInfoCircle} from "react-icons/ai"

const category = [
    {
        id: 0,
        title: "For Rent",
        value: "rent"
    },

]

const propertyType = [
    {
        id: 0,
        title: "House",
        value: "house"
    },
    {
        id: 1,
        title: "Appartment",
        value: "Appartment"
    },
]

const bedRoom = [
    {
        id: 0,
        title: "1 Bhk",
        value: '1'
    },
    {
        id: 1,
        title: "2 Bhk",
        value: '2'
    },
    {
        id: 2,
        title: "3 Bhk",
        value: '3'
    },
    {
        id: 3,
        title: "3+ Bhk",
        value: "3+"
    },
]
const bike = [
    {
        id: 0,
        title: "1",
        value: '1'
    },
    {
        id: 1,
        title: "2",
        value: '2'
    },
    {
        id: 2,
        title: "3",
        value: '3'
    },
    {
        id: 3,
        title: "3+",
        value: "3+"
    },
]
const car = [
    {
        id: 0,
        title: "1",
        value: '1'
    },
    {
        id: 1,
        title: "2",
        value: '2'
    },
    {
        id: 2,
        title: "3",
        value: '3'
    },
    {
        id: 3,
        title: "3+",
        value: "3+"
    },
]
const Basic = () => {
    const [showOption, setShowOption] = useState({ id: null, show: false })
    return (
        <div className="form__basic">
            <div className="form__basic-title">
                <AiOutlineInfoCircle size={30} />
                <h1>Basic Information</h1>
            </div>
            <div className="content">

                <div className="item" onClick={() => setShowOption({ id: 1, show: showOption.show ? false : true })}>
                    <Choose title={"Category"} optionItem={category} showOption={showOption} setShowOption={setShowOption} id={1} />
                </div>
                <div className="item" onClick={() => setShowOption({ id: 2, show: showOption.show ? false : true })}>
                    <Choose title={"Property Type"} optionItem={propertyType} showOption={showOption} setShowOption={setShowOption} id={2} />
                </div>
                <div className="item" onClick={() => setShowOption({ id: 3, show: showOption.show ? false : true })}>
                    <Choose title={"Bedrooms"} optionItem={bedRoom} showOption={showOption} setShowOption={setShowOption} id={3} />
                </div>
                <div className="item" onClick={() => setShowOption({ id: 4, show: showOption.show ? false : true })}>
                    <Choose title={"Bedrooms"} optionItem={bike} showOption={showOption} setShowOption={setShowOption} id={4} />
                </div>
                <div className="item" onClick={() => setShowOption({ id: 5, show: showOption.show ? false : true })}>
                    <Choose title={"Bike Parking"} optionItem={bike} showOption={showOption} setShowOption={setShowOption} id={5} />
                </div>
                <div className="item" onClick={() => setShowOption({ id: 6, show: showOption.show ? false : true })}>
                    <Choose title={"Car Parking"} optionItem={car} showOption={showOption} setShowOption={setShowOption} id={6} />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Carpet Area(sq-ft only)" fullWidth />
                </div>
                <div className="item">
                    <TextField variant="outlined" label="Super Area(sq-ft only)" fullWidth />
                </div>
            </div>
        </div>
    )
}

export default Basic