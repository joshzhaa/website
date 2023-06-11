import { useState } from 'react';
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
  const board = Array.from(Array(width * height).keys())
  return (
    <div className="board-row">
      {board.map(i => <Square piece={pieces[i]} key={i} />)}
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
