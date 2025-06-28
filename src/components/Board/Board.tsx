import React, { useCallback, useEffect, useState } from 'react'
import './board.css'

export default function Board() {
    const [board, setBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']]
    );
    const [turn, setTurn] = useState<string>('X');
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');

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

    const handlePlayAgainClick = () => {
        setBoard([['', '', ''], ['', '', ''], ['', '', '']])
        setWinner('')
        setTurn('X')
        setIsFinished(false);
    }

    const determineWinner = () => {
        /*
            for every configuration (row, column, or diagonal) in the board, check if the three values are the same, if so return the value, otherwise return an empty string.
         */
        const configurations = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[2][0], board[1][1], board[0][2]],
        ];

        for (const config of configurations) {
            if (config[0] && config[0] === config[1] && config[0] === config[2]) {
                return config[0];
            }
        }

        return '';
    }

    const isBoardFull = (board: string[][]) => {
        for (const row of board) {
            for (const col of row) {
                if (!col) return false;
            }
        }

        return true;
    }

    // useEffect for updating game state based on board updates
    useEffect(() => {
        const winnerValue = determineWinner()
        if (winnerValue) {
            setWinner(winnerValue);
            setIsFinished(true);
            return
        }

        if (isBoardFull(board)) {
            setIsFinished(true);
        }
    }, [board])


    return (
        <section className="board">
            <table className={isFinished ? 'disabled' : ''}>
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
                                                    onClick={handleCellClick}
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
            {/* TODO -- move the two elements below to the parent component (requires refactoring state to lift state up to the parent) */}
            <h1>{isFinished && `Game is finished: ${winner ? winner + ' wins' : "It's a Draw"}!`}</h1>
            <button onClick={handlePlayAgainClick} style={{ visibility: isFinished ? 'visible' : 'hidden' }}>Play Again</button>
        </section>
    )
}
