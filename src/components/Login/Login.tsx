import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './login.css';

export default function Login(): JSX.Element {
  const {
    loginWithRedirect, user, isAuthenticated, isLoading,
  } = useAuth0();
  console.log(user, isAuthenticated, isLoading);
  return (
    <div className="login">
      <button
        type="button"
        className="login-button"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
}
