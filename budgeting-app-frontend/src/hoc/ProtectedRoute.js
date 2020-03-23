import React from "react";
import { Route } from "react-router-dom";
import Error404 from "../404/Error404";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let localProps = { ...rest };
//   console.log(localProps);
  let routeComponent = null;

  if (localProps.isAuthenticated) {
    routeComponent = (
      <Route
        {...rest}
        render={props => {
          return <Component {...props} email={localProps.email}/>;
        }}
      />
    );
  }else{
      routeComponent = null;
  }

  return <div>
      {routeComponent}
  </div>;
};

export default ProtectedRoute;
