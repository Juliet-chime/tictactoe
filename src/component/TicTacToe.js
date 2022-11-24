import React, { useEffect, useState } from "react";
import { patterns } from "./pattern";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkWin();
    checkIfTie();
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      alert(
        `Game finished! ${result.winner === "no one won" ? "" : "Winner"}:${
          result.winner
        }`
      );
      setBoard(Array(9).fill(""));
      setPlayer("X");
    }
  }, [result]);

  const playGame = (num) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === num && val === "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    patterns.forEach((pattern) => {
      const firstplayer = board[pattern[0]];
      if (firstplayer === "") return;
      console.log(firstplayer);
      let foundWinningPattern = true;
      pattern.forEach((idx) => {
        if (board[idx] !== firstplayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "no one won", state: "Tie" });
    }
  };

  return (
    <div className="container">
      <div className="tic-tac-container">
        {[...Array(9)].map((_, idx) => {
          return (
            <div className="tic-tac" onClick={() => playGame(idx)}>
              {board[idx]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicTacToe;
