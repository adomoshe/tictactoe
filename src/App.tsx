import React from 'react';
import {
  AppBar, Toolbar, Typography, makeStyles,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import socket, { SocketContext } from './context/socket';
import AuthenticationAction from './components/AuthenticationAction';
import Board from './components/Board';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  const { isAuthenticated } = useAuth0();

  return (
    <SocketContext.Provider value={socket}>
      <div className="app">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tic Tac Toe
            </Typography>
            <AuthenticationAction />
          </Toolbar>
        </AppBar>
        {isAuthenticated ? <Board /> : null}
      </div>
    </SocketContext.Provider>
  );
}
