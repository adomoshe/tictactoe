import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './logout.css';

export default function Logout(): JSX.Element {
  const { logout } = useAuth0();

  return (
    <div className="logout">
      <button
        type="button"
        className="logout"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
}
