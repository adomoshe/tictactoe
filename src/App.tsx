import React from 'react';
import io from 'socket.io-client';

import Login from './components/Login';
import Logout from './components/Logout';

// eslint-disable-next-line no-unused-vars
const socket = io('localhost:3002');

export default function App() {
  return (
    <div className="app">
      <Login />
      <Logout />
    </div>
  );
}
