import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { children, signedIn, ...rest } = props;
  const redirectPath = "/signin";
  return (
    <Route
      {...rest}
      render={function ({ location, ...rest }) {
        return signedIn ? (
            
            {...children}
            
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
