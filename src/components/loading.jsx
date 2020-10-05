import React from 'react';
import '../styles/loading.scss';
import loading from '../images/loading.svg';

const Loading = () => {
    return(
       <div className="loading-box">
           <img src={loading} />
       </div>
    )
}

export default Loading;