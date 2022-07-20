import { useRef } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {

  // const location = useLocation();

  const { isAuth } = useSelector(store => store.auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        )
      }
    />
  )
}

export default ProtectedRoute;
