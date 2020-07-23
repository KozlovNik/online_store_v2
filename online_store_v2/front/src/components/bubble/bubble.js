import React from 'react';

import './bubble.css';

const Bubble = ({ id, callback }) => {
    return (
        <div className="bubble" onClick={() =>{callback(id)}}></div>
    )
}

export default Bubble;
