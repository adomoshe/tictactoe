import React from 'react';
import io from 'socket.io-client';
import {
  AppBar, Toolbar, Typography, makeStyles,
} from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import AuthenticationAction from './components/AuthenticationAction';
import Board from './components/Board';

// eslint-disable-next-line no-unused-vars
const socket = io('localhost:3002');

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
    <div className="app">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tic Tac Toe
          </Typography>
          <AuthenticationAction />
        </Toolbar>
      </AppBar>
      {isAuthenticated ? <Board socket={socket} /> : null}
    </div>
  );
}
