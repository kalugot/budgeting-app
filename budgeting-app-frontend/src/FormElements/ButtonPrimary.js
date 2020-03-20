import React from 'react'

const ButtonPrimary = (props) => {
    return (
        <button 
            className="btn btn-primary"
            type={props.type}
            style={props.style}
            onClick= {props.action}>    
            {props.title}
        </button>
    )
}

export default ButtonPrimary;
