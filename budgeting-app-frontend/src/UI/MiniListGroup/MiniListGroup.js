import React from 'react'

const MiniListGroup = (props) => {
    return (
        <div className="list-group list-group-flush">
            <div className="list-group-item">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-xs-6">{props.category}</div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-xs-6">{props.content}</div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-xs-12">{props.amount}</div>
                </div>
            </div>
        </div>
    )
}

export default MiniListGroup;
