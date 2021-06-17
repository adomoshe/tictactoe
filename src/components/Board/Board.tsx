import React, {
  useCallback, useState, useEffect, useContext,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { SocketContext } from '../../context/socket';

import './board.css';

type IRow = 'x' | 'y' | 'z';
type INumber = '1' | '2' | '3';

export default function Board() {
  const socket = useContext(SocketContext);
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
    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off('joined');
    };
  }, [socket]);

  const setBoard = useCallback((row: IRow, number: INumber) => {
    setStateBoard((board) => ({
      ...board,
      [row]: { ...board[row], [number]: stateSign },
    }));
  }, []);

  const selectSpace = useCallback((row: IRow, number: INumber) => {
    setBoard(row, number);
    socket.emit('play:space', `${row}|${number}`);
  }, []);

  socket.on('play:receive', (move) => {
    setBoard(move.split('|')[0], move.split('|')[1]);
  });

  socket.on('join:response', (config: { sign: 'O' | 'X' }) => {
    setStateSign(config.sign);
  });

  return (
    <div className="board">
      {Object.entries(stateBoard).map(([row, items]) => (
        <div className="row" key={row}>
          {Object.entries(items).map(([item, value]) => (
            <button
              key={item}
              type="button"
              className="square"
              disabled={value !== null}
              onClick={() => selectSpace(row as IRow, item as INumber)}
            >
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
