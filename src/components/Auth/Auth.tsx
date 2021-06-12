import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './auth.css';

export default function Auth(): JSX.Element {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="auth">
      <button
        type="button"
        className="login"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
}
