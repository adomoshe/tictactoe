import React, { useCallback, useState, useEffect } from 'react';
// import Alert from '@material-ui/lab/Alert';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useAuth0 } from '@auth0/auth0-react';

import './board.css';

interface IBoardProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export default function Board(props: IBoardProps) {
  const { socket } = props;
  const { user } = useAuth0();

  interface IBoard {
    [row: string]: { [number: string]: null | 'O' | 'X' };
  }

  const [stateBoard, setStateBoard] = useState<IBoard>({
    x: { 1: null, 2: null, 3: null },
    y: { 1: null, 2: null, 3: null },
    z: { 1: null, 2: null, 3: null },
  });
  const [stateSign, setStateSign] = useState<null | 'X' | 'O'>(null);

  useEffect(() => {
    socket.emit('joined', { id: user?.sub });
  }, []);

  // const [stateError, setStateError] = useState('');

  const selectSpace = useCallback(
    (row: 'x' | 'y' | 'z', number: '1' | '2' | '3') => {
      // if (board[id] !== null) {
      //   setStateError('You lost');
      // }
      setStateBoard((board) => ({
        ...board,
        [row]: { ...board[row], [number]: stateSign },
      }));
      socket.emit('play:space', `[${row}][${number}]`);
      console.log(`[${row}][${number}]`);
    },
    [],
  );

  socket.on('play:receive', (move) => console.log('receive', move));
  socket.on('join:response', (config: { sign: 'O' | 'X' }) => {
    console.log(config);
    setStateSign(config.sign);
  });
  return (
    <>
      {/* {stateError ? (
        <Alert variant="filled" className="error-alert" severity="error">
          {stateError}
        </Alert>
      ) : null} */}
      <div className="board">
        {Object.entries(stateBoard).map(([row, items]) => (
          <div className="row" key={row}>
            {Object.entries(items).map(([item, value]) => (
              <button
                key={item}
                type="button"
                className="square"
                disabled={value !== null}
                onClick={() => selectSpace(row as 'x' | 'y' | 'z', item as '1' | '2' | '3')}
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
