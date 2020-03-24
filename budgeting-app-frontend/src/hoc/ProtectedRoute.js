import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let localProps = { ...rest };
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
