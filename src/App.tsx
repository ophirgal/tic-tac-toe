import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']]
  );
  const [turn, setTurn] = useState<string>('X');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const { row, col } = e.currentTarget.dataset;
    if (row && col) {
      const [rowNum, colNum] = [Number(row), Number(col)];
      const newBoard = [...board];
      if (newBoard[rowNum][colNum]) return; // avoid replacing existing value

      newBoard[rowNum][colNum] = turn === 'X' ? 'X' : 'O';
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
    }
  }

  const handleGameOver = (winner: string) => {
    setIsGameOver(true);
    setWinner(winner);
    setResults([...results, winner]);
  };

  const handlePlayAgainClick = () => {
    setBoard([['', '', ''], ['', '', ''], ['', '', '']])
    setWinner('')
    setTurn('X')
    setIsGameOver(false);
  }

  return (
    <section className="app">
      <aside className='details'>
        <h1>Turn: {turn}</h1>
      </aside>
      <main>
        <section>
          <h1 className='title'>Tic Tac Toe!</h1>
        </section>
        <section>
          <Board onGameOver={handleGameOver} onCellClick={handleCellClick} board={board} disabled={isGameOver} />
        </section>
        <section>
          <h1>{isGameOver && `Game Over: ${winner ? winner + ' wins' : "It's a Draw"}!`}</h1>
          <button onClick={handlePlayAgainClick} style={{ visibility: isGameOver ? 'visible' : 'hidden' }}><h2>Play Again</h2></button>
        </section>
      </main>
      <aside className='results'>
        <section>
          <h2>Results</h2>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>Game #</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index + result}>
                  <td>{index + 1}</td>
                  <td>{result ? result : 'Draw'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <p>
          <span>X's Win Total: {results.filter(p => p === 'X').length}</span>
          <span>O's Win Total: {results.filter(p => p === 'O').length}</span>
          <span>Draw Total: {results.filter(p => p === '').length}</span>
        </p>
      </aside>
    </section>
  );
}

export default App;
