import React from 'react'
import { useState } from 'react'
import { Filter } from './subComp'


const Property = () => {
    
    

    return (
        <div className="rokye__property">
            <Filter  />
            <div className="rokye__property-list">
                <h1>Property List</h1>
            </div>
        </div>
    )
}

export default Property