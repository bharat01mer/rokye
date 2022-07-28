import {BsImages} from "react-icons/bs"
import { Alert,AlertTitle } from "@mui/material"

const Upload = () => {
  return (
    <div className="form__upload">
        <div className="form__upload-title">
            <BsImages size={30} />
            <h1>Photos</h1>
        </div>
        <div className="form__upload-content">
            <div className="warning">
            <Alert severity="warning" >
                <AlertTitle>Warning</AlertTitle>
                The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first
            </Alert>
            </div>
            <div className="upload__btn">
                <label htmlFor="image" >
                    <BsImages size={25} />
                    <p>Upload Image</p>
                </label>
                <input type="file" name="image" id="image" />
            </div>
        </div>
    </div>
  )
}

export default Upload