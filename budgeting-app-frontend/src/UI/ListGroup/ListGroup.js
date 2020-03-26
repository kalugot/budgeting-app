import React from "react";
import MiniListGroup from '../MiniListGroup/MiniListGroup'

const ListGroup = props => {

  let listGroup = props.miniList.map((eachLocalItem) => {
    return(
      <MiniListGroup
        key={eachLocalItem} 
        category={props.listData[eachLocalItem].formData.category}
        content={props.listData[eachLocalItem].formData.content}
        amount={props.listData[eachLocalItem].formData.amount}
        />
    );
  });

  return (
    <div className="list-group">
      <div className="list-group-item">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-xs-12">
            <div className="row">
              <div className="col" style={{textAlign: "center"}}>
                <h3>{props.date}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col" style={{textAlign: "center"}}>
                <h6>{props.month + " " + props.year}</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-xs-12">
            <div className="row">
              <div className="col" style={{textAlign: "center"}}>
                {listGroup}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListGroup;
