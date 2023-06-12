import { useState } from 'react';
import * as chess from './pkg/chess_rules_bg';
import './App.css';

// Square's key is its 1D index
function Square({ piece } : { piece: number }) {
  return (
    <button className="square">
      {String.fromCharCode(piece)}
    </button>
  );
}

// Board represents an m x n board with an m * n length array
function Board({
  width,
  height,
  pieces,
} : {
  width: number,
  height: number,
  pieces: number[],
}) {
  function vectorToIndex(vector: [number, number]) {
    return width * vector[0] + vector[1];
  }
  function indexToVector(index: number) {
    return [Math.floor(index / width), index % width];
  }
  function showBoard() {
    function showRow(y: number) {
      let row = [];
      for (let x = 0; x < width; x++) {
        row.push(<Square piece={chess.piece(x, y)} key={vectorToIndex([x, y])} />);
      }
      return (
        <div className="board-row">
          {row}
        </div>
      );
    }
    let board = [];
    for (let y = height - 1; y > 0; y--) {
      board.push(showRow(y));
    }
    return board;
  }
  return (
    <div className="board-row">
      {showBoard()}
    </div>
  );
}

let init: number[] = []
for (let i = 0; i < 8 * 8; i += 1) {
  init.push('A'.charCodeAt(0) + (i % 26));
}

function Game() {
  const [boardState, setBoardState] = useState(init);
  const [history, setHistory] = useState([]);
  return <Board width={8} height={8} pieces={boardState} />
}

export default Game;
