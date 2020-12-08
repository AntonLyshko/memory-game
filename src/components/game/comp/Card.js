import React from 'react';


const Card = ({ handleClick, id, img }) => {


    return (
        <div onClick={(e) => handleClick(e, id)} className='card-item' data-id={id}>
            <div className="front">
            </div>
            <div className="back">
                <img src={img} alt='' />
            </div>
        </div>
    );
}

export default Card;
