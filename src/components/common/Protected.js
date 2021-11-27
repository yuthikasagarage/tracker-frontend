import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  children,
  signedIn,
  redirectPath = "/signin",
  ...rest
}) {
  console.log(signedIn)
  return (
    <Route
      {...rest}
      render={function ({ location, ...rest }) {
        return signedIn ? (
          React.cloneElement(children, rest)
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
