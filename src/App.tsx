import React from 'react';
import io from 'socket.io-client';
import {
  AppBar, Toolbar, Typography, makeStyles,
} from '@material-ui/core';

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
      <Board socket={socket} />
    </div>
  );
}
