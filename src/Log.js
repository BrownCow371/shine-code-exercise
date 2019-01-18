import React from 'react'

const Log = ({images}) => {

    // sort by clickCount in descending order
    let sortedImages = Object.values(images).sort((imageA, imageB) => (imageB.clickCount - imageA.clickCount))
    return (
        <>
            <h3>Log of Clicks in Desc. Order</h3>
            <ul>
                {sortedImages.map((image, i)=>{
                return <li key={i}>{image.alt}:  {image.clickCount}</li>
                })}
            </ul>
        </>
    )
}

export default Log;