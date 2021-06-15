import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import './authentication.css';

export default function Login(): JSX.Element {
  const {
    loginWithRedirect, logout, user, isAuthenticated, isLoading,
  } = useAuth0();

  console.log(user, isAuthenticated, isLoading);

  return isAuthenticated ? (
    <Button
      color="inherit"
      disabled={isLoading}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  ) : (
    <Button
      color="inherit"
      disabled={isLoading}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
}
