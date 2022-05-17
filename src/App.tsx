import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(new Player(Colors.WHITE));
    }, []);

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE
            ? new Player(Colors.BLACK)
            : new Player(Colors.WHITE))
    }

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart} />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title='White figures'
                    figures={board.lostWhiteFigures}
                />
                <LostFigures
                    title='Black figures'
                    figures={board.lostBlackFigures}
                />
            </div>
        </div>
    );
}

export default App;
