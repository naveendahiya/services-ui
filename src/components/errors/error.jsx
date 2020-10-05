import React from 'react';
import '../../styles/error.scss';

const Error = (props) => {
    return(
       <div className="error-box">
           <div className="error-msg">{props.code}<br></br>{props.msg}<br></br>Try again later.</div>
       </div>
    )
}

export default Error;