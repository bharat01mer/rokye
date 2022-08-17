import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Preloader = () => {
    return (
        <div className="rokye__preloader">
            <div className="animation">
                <Triangle
                    height="150"
                    width="150"
                    color="#f25c05"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        </div>
    )
}

export default Preloader