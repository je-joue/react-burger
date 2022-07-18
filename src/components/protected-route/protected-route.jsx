import React from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const { user } = useSelector(store => store.auth);
  const { isAuth } = useSelector(store => store.auth);

  // if (!isAuth) {
  //   return ( <p className="text text_type_main-medium">Загружаем данные...</p>
  //   )
  // };

  if (!isAuth) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
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
  };

}

export default ProtectedRoute;
