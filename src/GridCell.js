import React from 'react'

    const GridCell =({sortedImages, handleClick, images}) => {
       
        return (
            sortedImages.map((id) => (
            <div key={id}><img src={images[id].source} alt={images[id].alt} data-id={id} onClick={handleClick}/></div>
          )))
    }
export default GridCell;