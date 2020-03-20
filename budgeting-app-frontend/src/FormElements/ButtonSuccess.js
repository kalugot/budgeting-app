import React from 'react'

const ButtonSuccess = (props) => {
    return (
        <button 
            className="btn btn-success"
            type={props.type}
            style={props.style}
            onClick= {props.action}>    
            {props.title}
        </button>
    )
}

export default ButtonSuccess;
