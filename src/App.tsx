import { useState, useEffect } from 'react';
import type { CellValue, CurrentPlayerValue, WinnerValue } from './types';
import { checkWinner } from './utils/helpers';

const boardDefaultState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const scoreDefaultState = {
  player1: 0,
  player2: 0,
};

type BoardCellProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: CellValue;
};

function BoardCell({ value, ...props }: BoardCellProps) {
  return (
    <div
      className="border border-black w-full h-full flex items-center justify-center"
      {...props}
    >
      {value === null ? '' : value === 1 ? 'X' : '0'}
    </div>
  );
}

function GameBoard({
  handleSetWinner,
  handleSetCurrentPlayer,
  currentPlayer,
  handleSetScore,
}: {
  handleSetWinner: React.Dispatch<React.SetStateAction<WinnerValue>>;
  handleSetCurrentPlayer: React.Dispatch<
    React.SetStateAction<CurrentPlayerValue>
  >;
  currentPlayer: CurrentPlayerValue;
  handleSetScore: React.Dispatch<
    React.SetStateAction<{ player1: number; player2: number }>
  >;
}) {
  const [board, setBoard] = useState<CellValue[][]>(boardDefaultState);

  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      handleSetWinner(result);
      if (result === 1) {
        handleSetScore((prev) => {
          return {
            ...prev,
            player1: prev.player1 + 1,
          };
        });
      }
      if (result === 2) {
        handleSetScore((prev) => {
          return {
            ...prev,
            player2: prev.player2 + 1,
          };
        });
      }
      setFinish(true);
    }
  }, [board]);

  function handleCellClick(rowIndex: number, colIndex: number) {
    if (board[rowIndex][colIndex] !== null || finish) return;
    const newBoard: CellValue[][] = JSON.parse(JSON.stringify(board));
    currentPlayer === 1
      ? (newBoard[rowIndex][colIndex] = 1)
      : (newBoard[rowIndex][colIndex] = 2);

    handleSetCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setBoard(newBoard);
  }

  return (
    <>
      <div
        className={`grid grid-cols-3 grid-rows-3 w-[300px] h-[300px] ${
          finish ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <BoardCell value={board[0][0]} onClick={() => handleCellClick(0, 0)} />
        <BoardCell value={board[1][0]} onClick={() => handleCellClick(1, 0)} />
        <BoardCell value={board[2][0]} onClick={() => handleCellClick(2, 0)} />

        <BoardCell value={board[0][1]} onClick={() => handleCellClick(0, 1)} />
        <BoardCell value={board[1][1]} onClick={() => handleCellClick(1, 1)} />
        <BoardCell value={board[2][1]} onClick={() => handleCellClick(2, 1)} />

        <BoardCell value={board[0][2]} onClick={() => handleCellClick(0, 2)} />
        <BoardCell value={board[1][2]} onClick={() => handleCellClick(1, 2)} />
        <BoardCell value={board[2][2]} onClick={() => handleCellClick(2, 2)} />
      </div>
      {finish && (
        <div className="flex gap-3 mt-2 w-full">
          <button
            className="px-3 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 flex-1"
            onClick={() => {
              setBoard(boardDefaultState);
              handleSetWinner(null);
              setFinish(false);
              handleSetScore(scoreDefaultState);
              handleSetCurrentPlayer(1);
            }}
          >
            Reset Score
          </button>
          <button
            className="px-3 py-2 bg-green-600 text-white font-semibold hover:bg-green-700 flex-1"
            onClick={() => {
              setBoard(boardDefaultState);
              handleSetWinner(null);
              setFinish(false);
              handleSetCurrentPlayer(1);
            }}
          >
            Next Game
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  const [score, setScore] = useState<{ player1: number; player2: number }>(
    scoreDefaultState
  );
  const [winner, setWinner] = useState<WinnerValue>(null);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayerValue>(1);

  return (
    <main className="h-screen w-screen flex pt-10 justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Tic-Tac-Toe</h1>
        <div className="flex text-lg justify-center items-center  font-semibold gap-1 my-2">
          <p className="p-2 bg-purple-600 text-white">
            Player One [{score.player1}]{' '}
          </p>{' '}
          -
          <p className="p-2 bg-cyan-600 text-white">
            {' '}
            [{score.player2}] Player Two
          </p>
        </div>
        <div className="mb-1">
          {winner === null && (
            <p
              className={`font-semibold ${
                currentPlayer === 1 ? 'text-purple-600' : 'text-cyan-600'
              }`}
            >
              Player {currentPlayer === 1 ? 'One' : 'Two'} turn!
            </p>
          )}
          {winner === 3 ? (
            <p className="font-semibold text-blue-600">The game is draw!</p>
          ) : null}
          {winner === 1 || winner === 2 ? (
            <p className="font-semibold text-green-600">
              Player {winner === 1 ? 'One' : 'Two'} Win!
            </p>
          ) : null}
        </div>
        <GameBoard
          handleSetWinner={setWinner}
          handleSetCurrentPlayer={setCurrentPlayer}
          handleSetScore={setScore}
          currentPlayer={currentPlayer}
        />
        <p className="mt-5 italic text-gray-400">@agus_bw</p>
      </div>
    </main>
  );
}

export default App;
