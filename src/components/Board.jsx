import React, { useState } from "react";
import { Square } from "./Square";
import '../stylesheets/Board.css';
import { calculateWinner, calculateDraw } from "../logic/board";

export const Board = ()=>{

    const [xIsNext, setXIsNext] = useState(() => {
        const xIsNextStorage = localStorage.getItem('xIsNext')
        return xIsNextStorage ? JSON.parse(xIsNextStorage) 
                       : true
    });

    const [squares, setSquares] = useState(() => {
        const boardStorage = localStorage.getItem('Array')
        return boardStorage ? JSON.parse(boardStorage) 
                     : Array(9).fill(null)
    });

    const handleClick = (num)=>{
        if(squares[num] || calculateWinner(squares)) return;

        const newArray = squares.slice();

        if(xIsNext) newArray[num] = '❌';
        else newArray[num] = '⭕';
        
        setXIsNext(!xIsNext);
        setSquares(newArray);
        
        localStorage.setItem('Array', JSON.stringify(newArray));
        localStorage.setItem('xIsNext', JSON.stringify(xIsNext))
    };

    const handleRestartButton = () => {
        setXIsNext(true);
        setSquares((Array(9).fill(null)));
    }

    const winner = calculateWinner(squares);
    const draw = calculateDraw(squares);
    const endGame = () => {
        let end;
        if(winner)  end = <section className="modalWinner">
                            <span className="modal">
                                <h1> Winner : { winner } </h1>
                                <button  className="restartWinn" onClick={ handleRestartButton }> Restart Game </button>
                            </span>
                           </section>;
        else if(draw) end = <section className="modalWinner">
                                <span className="modal">
                                    <h1> Draw : Well played fellas </h1>
                                    <button  className="restartWinn" onClick={ handleRestartButton }> Restart Game </button>
                                </span>
                            </section>;
        return end
    }

    
    return(
        <section className="board-container">
            <h1 className="gameName"> Tic-Tac-Toe </h1>
            <button className="restart" onClick={ handleRestartButton }> Restart Game </button>
            <div className="end">{ endGame() }</div>
            <div className="board">
                <Square children={squares[0]} onSquareClick={()=> handleClick(0)}/>
                <Square children={squares[1]} onSquareClick={()=> handleClick(1)}/>
                <Square children={squares[2]} onSquareClick={()=> handleClick(2)}/>
                <Square children={squares[3]} onSquareClick={()=> handleClick(3)}/>
                <Square children={squares[4]} onSquareClick={()=> handleClick(4)}/>
                <Square children={squares[5]} onSquareClick={()=> handleClick(5)}/>
                <Square children={squares[6]} onSquareClick={()=> handleClick(6)}/>
                <Square children={squares[7]} onSquareClick={()=> handleClick(7)}/>
                <Square children={squares[8]} onSquareClick={()=> handleClick(8)}/>
            </div>
            <span className="turns"> 
                <span className={ xIsNext ?  'optionX Next' : 'optionX' }> ❌ </span>
                <span className={ xIsNext ?  'optionO' : 'optionO Next' }> ⭕ </span>
            </span>  
        </section>
    )
}



