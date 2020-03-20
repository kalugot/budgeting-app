import React from "react";
import MiniListGroup from '../MiniListGroup/MiniListGroup'

const ListGroup = props => {

  let listGroup = props.miniList.map((eachLocalItem) => {
    console.log(eachLocalItem);
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
          <div className="col-4">
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
          <div className="col-8">
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
