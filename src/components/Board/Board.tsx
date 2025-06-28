import React, { useCallback, useEffect, useState } from 'react'
import './board.css'
import { on } from 'events'

interface BoardProps {
    onCellClick: (e: React.MouseEvent<HTMLTableCellElement>) => void
    onGameOver: (winner: string) => void
    board: string[][]
    disabled?: boolean
}

export default function Board({ onCellClick, onGameOver, board, disabled }: BoardProps) {
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
        if (winnerValue || isBoardFull(board)) {
            onGameOver(winnerValue);
        }
    }, [board])


    return (
        <section className="board">
            <table className={disabled ? 'disabled' : ''}>
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
                                                    onMouseDown={onCellClick}
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
        </section>
    )
}
