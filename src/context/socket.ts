import React from 'react';
import io from 'socket.io-client';

const socket = io('localhost:3002');
export const SocketContext = React.createContext(socket);

export default socket;
