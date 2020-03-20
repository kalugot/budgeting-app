import React from "react";

const AlertWarning = (props) => {
  return (
    <div className="AlertWarning alert alert-danger" role="alert">
      {props.alertWarning}
    </div>
  );
};

export default AlertWarning;
