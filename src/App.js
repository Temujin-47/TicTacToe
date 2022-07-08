import React, { useEffect, useState } from 'react';
import SquareComponent from "./SquareComponent";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const clearState = ["", "", "", "", "", "", "", "", "", ""];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [gameState, updateGameState] = useState(clearState)
  const [isXChance, updateIsXChance] = useState(false)
  const [open, setOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [opendraw, setOpendraw] = useState(false);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // console.log('Class: App, Function: checkWinner ==', gameState[0], gameState[1], gameState[2]);
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    return null;
  }
  const onUserClicked = (index) => {
    let strings = Array.from(gameState);
    if (strings[index]) {
      return;
    }

    strings[index] = isXChance ? "X" : "0";
    updateIsXChance(!isXChance)
    updateGameState(strings)
  }

  const clearGame = () => {
    updateGameState(clearState)
  }
  useEffect(() => {
    let winner = checkWinner();
    if (winner) {

      setWon(true);
      setOpen(true);
      // alert(`Ta da ! ${winner} won the Game !`)
    } else {
      let count = 0;
      for (let i = 0; i < 9; i++) {
        if (gameState[i] === "X" || gameState[i] === "0") {
          count++;

        }
        if (count === 9) {
          let winner = checkWinner();
          if (!winner) {
            console.log("draw");
            setDrawn(true);
            setOpendraw(true);

          }
        }
      }

    }

  }, [gameState])



  return (
    <div className="app-header">
      {won ? (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            clearGame();
          }}
        >
          <Box sx={style}>

            <h1>{`${checkWinner()} won the Game !`}</h1>

          </Box>

        </Modal>
      ) : null}

      {drawn ? (
        <Modal
          open={opendraw}
          onClose={() => {
            setOpendraw(false);
            clearGame();
          }}
        >
          <Box sx={style}>

            <h1>Game Drawn.</h1>

          </Box>

        </Modal>
      ) : null}

      <p className="heading-text">React Tic Tac Toe </p>
      <div className="row jc-center">
        <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(0)} state={gameState[0]} />
        <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(1)} state={gameState[1]} />
        <SquareComponent className="b-bottom" onClick={() => onUserClicked(2)} state={gameState[2]} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(3)} state={gameState[3]} />
        <SquareComponent className="b-bottom-right" onClick={() => onUserClicked(4)} state={gameState[4]} />
        <SquareComponent className="b-bottom" onClick={() => onUserClicked(5)} state={gameState[5]} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-right" onClick={() => onUserClicked(6)} state={gameState[6]} />
        <SquareComponent className="b-right" onClick={() => onUserClicked(7)} state={gameState[7]} />
        <SquareComponent onClick={() => onUserClicked(8)} state={gameState[8]} />
      </div>
      <button className="clear-button" onClick={clearGame}>Clear Game</button>
    </div>
  );
}

export default App;