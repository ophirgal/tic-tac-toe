import { useState } from 'react';
import style from './App.module.css';

function App() {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']]
  );
  const [turn, setTurn] = useState<string>('X');

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const { row, col } = e.currentTarget.dataset;
    if (row && col) {
      const [rowNum, colNum] = [Number(row), Number(col)];
      const newBoard = [...board];
      newBoard[rowNum][colNum] = turn === 'X' ? 'X' : 'O';
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
    }
  }

  return (
    <main className={style.main}>
      <table className={style.table}>
        <tbody>
          {
            board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {
                    row.map((col, colIndex) => {
                      return (
                        <td
                          key={`${rowIndex}-${colIndex}`}
                          onClick={handleClick}
                          data-row={rowIndex}
                          data-col={colIndex}
                        >
                          {col}
                        </td>
                      )
                    })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </main>
  );
}

export default App;
