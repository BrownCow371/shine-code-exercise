import React from 'react'

const Log = ({images}) => {

    // copy props and sort by clickCount in descending order
    let sortedImages = [...images].sort((imageA, imageB) => (imageB.clickCount - imageA.clickCount))

    return (
        <>
        <h3>Log of Clicks in Desc. Order</h3>
        <ul>
            {sortedImages.map((image)=>{
               return <li key={image.id}>{image.id}:  {image.clickCount}</li>
            })}
        </ul>
        </>
    )
}

export default Log;