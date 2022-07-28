import { useState } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { Checkbox, TextField } from "@mui/material"
import Choose from "./Choose"


const floorno = [
    {
        id: 0,
        title: "Basement",
        value: "base"
    },
    {
        id: 1,
        title: "Ground",
        value: "ground"
    },
    {
        id: 2,
        title: "1",
        value: "1"
    },
    {
        id: 3,
        title: "2",
        value: "2"
    },
    {
        id: 4,
        title: "3",
        value: "3"
    },
    {
        id: 1,
        title: "3+",
        value: "3+"
    },
]

const totalFloor = [
    {
        id: 0,
        title: "1",
        value: "1",
    },
    {
        id: 1,
        title: "2",
        value: "2",
    },
    {
        id: 2,
        title: "3",
        value: "3",
    },
    {
        id: 3,
        title: "4",
        value: "4",
    },
    {
        id: 4,
        title: "5",
        value: "5",
    },
    {
        id: 5,
        title: "6",
        value: "6",
    },
    {
        id: 6,
        title: "6",
        value: "6",
    },
    {
        id: 7,
        title: "7",
        value: "7",
    },
    {
        id: 8,
        title: "8",
        value: "8",
    },
    {
        id: 9,
        title: "9",
        value: "9",
    },
]

const facing = [
    {
        id: 0,
        title: "East",
        value: "east"
    },
    {
        id: 1,
        title: "West",
        value: "west"
    },
    {
        id: 2,
        title: "North",
        value: "north"
    },
    {
        id: 3,
        title: "South",
        value: "south"
    },
    {
        id: 4,
        title: "North-East",
        value: "North-East",
    },
    {
        id: 5,
        title: "North-West",
        value: "north-west"
    },
    {
        id: 6,
        title: "South-East",
        value: "south-east"
    },
    {
        id: 7,
        title: "South-West",
        value: "south-west"
    },
]

const balconies = [
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
        value: '3+'
    },
]

const furnishing = [
    {
        id: 0,
        tilte: "Furnished",
        value: "furnished"
    },
    {
        id: 1,
        title: "Semi-Furnished",
        value: "semifurnished"
    },
    {

        id: 3,
        title: "Unfurnished",
        value: "unfurnished"
    },
]

const age = [
    {
        id: 0,
        title: "Newly",
        value: "new"
    },
    {
        id: 1,
        title: "<5 years old",
        value: "-5"
    },
    {
        id: 2,
        title: "5+ years old",
        value: "5+"
    },
    {
        id: 3,
        title: "5-10 years old",
        value: "10"
    },
    {
        id: 4,
        title: "10+ years old",
        value: "10+"
    },
]

const availability = [
    {
        id: 0,
        title: "Immediately",
        value: "0",

    },
    {
        id: 1,
        title: "Within 15 days",
        value: "15"
    },
    {
        id: 2,
        title: "Within 30 days",
        value: "30"
    },
]


const family = [
    {
        id: 0,
        title: "Bachelor"
    },
    {
        id: 1,
        title: "Family"
    },
]

const nonVeg = [
    {
        id: 0,
        title: "Allowed",
        value: "allowed"
    },
    {
        id: 1,
        title: "Not Allowed",
        value: "notallowed"
    },
]
const pets = [
    {
        id: 0,
        title: "Allowed",
        value: "allowed"
    },
    {
        id: 1,
        title: "Not Allowed",
        value: "notallowed"
    },
]

const amenities = [
    {
        id: 0,
        title: "Lift",
        value: "lift"
    },
    {
        id: 1,
        title: "Gas Pipeline",
        value: "gas"
    },
    {
        id: 2,
        title: "24x7 Water supply",
        value: "water"
    },
    {
        id: 3,
        title: "24x7 Security",
        value: "security"
    },
    {
        id: 4,
        title: "Car Parking",
        value: "parking"
    },
    {
        id: 5,
        title: "Visitort Parking",
        value: "visitor"
    },
    {
        id: 6,
        title: "Children's play area",
        value: "playarea"
    },
    {
        id: 7,
        title: "Landscape garden",
        value: "garden"
    },
    {
        id: 8,
        title: "Air conditioning",
        value: "ac"
    },
    {
        id: 9,
        title: "CCTV",
        value: "cctv"
    },
    {
        id: 10,
        title: "Fire safety",
        value: "firesafety"
    },
    {
        id: 11,
        title: "Internet services",
        value: "internet"
    },
    {
        id: 12,
        title: "Gym",
        value: "gym"
    },
    {
        id: 13,
        title: "Club House",
        value: "clubhouse"
    },
    {
        id: 14,
        title: "Swimming pool",
        value: "pool"
    },
    {
        id: 15,
        title: "House keeping",
        value: "housekeeping"
    },
    {
        id: 16,
        title: "Power backup",
        value: "powerbackup"
    },
    {
        id: 17,
        title: "Sewage treatment plant",
        value: "sewage"
    },
    {
        id: 18,
        title: "Rain water harvesting",
        value: "rainharvesting"
    },
    {
        id: 19,
        title: "Shopping center",
        value: "shopingcenter"
    },
    {
        id: 20,
        title: "Park",
        value: "park"
    },
]

const perInfo=[
    {
        id:0,
        title:"Monthly",
        value:"month"
    },
    {
        id:1,
        title:"Quaterly",
        value:"quaterly"
    },
    {
        id:0,
        title:"Yearly",
        value:"year"
    },
    {
        id:0,
        title:"One Time",
        value:"once"
    },
]


const Detail = () => {
    const chooseContent = [
        {
            id: 0,
            title: "Floor No",
            arr: floorno
        },
        {
            id: 1,
            title: "Total Floor",
            arr: totalFloor
        },
        {
            id: 2,
            title: "Facing",
            arr: facing
        },
        {
            id: 3,
            title: "Balconies",
            arr: balconies
        },
        {
            id: 4,
            title: "Furnished Status",
            arr: furnishing
        },
        {
            id: 5,
            title: "Age of construction",
            arr: age
        },
        {
            id: 6,
            title: "Availability",
            arr: availability
        },
        {
            id: 7,
            title: "Tenants preferred",
            arr: family
        },
        {
            id: 8,
            title: "Non-Veg",
            arr: nonVeg
        },
        {
            id: 9,
            title: "Pets",
            arr: pets
        },
    ]

    const [showOption, setShowOption] = useState({ id: null, show: false })
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
                            <div className="item" key={item.id} onClick={() => setShowOption({ id: item.id, show: item.id === showOption.id ? false : true })}>
                                <Choose id={item.id} optionItem={item.arr} title={item.title} setShowOption={setShowOption} showOption={showOption} />
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
                            amenities.map((item) => (
                                <div className="amenity__content-item" key={item.id}>
                                    <Checkbox aria-label={item.title} />
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="content__desc">
                    <div className="content__desc-title">
                        <h1>Description</h1>
                    </div>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={5}
                    />
                </div>

                <div className="content__rent">
                    <div className="content__rent-title">
                        <h1>Rent Details</h1>
                    </div>
                    <div className="content__rent-content">
                        <div className="item">
                            <TextField variant="outlined" label="Monthly rent" fullWidth />
                        </div>
                        <div className="item">
                            <TextField variant="outlined" label="Security amount" fullWidth />
                        </div>
                        <div className="item">
                            <TextField variant="outlined" label="Maintenance charges" fullWidth />
                        </div>
                        <div className="item" onClick={() => setShowOption({ id: 10, show: showOption.show ? false : true })}>
                            <Choose id={10} optionItem={perInfo} title={"Per"} setShowOption={setShowOption} showOption={showOption} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail