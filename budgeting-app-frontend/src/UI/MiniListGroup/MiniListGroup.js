import React from 'react'

const MiniListGroup = (props) => {
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item">
                <div className="row">
                    <div className="col-4">{props.category}</div>
                    <div className="col-4">{props.content}</div>
                    <div className="col-4">{props.amount}</div>
                </div>
            </div>
        </div>
    )
}

export default MiniListGroup;
