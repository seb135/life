import "./Game.css"
import {useState, useEffect} from 'react';

const Game = (props) => {
    const [squareSize, setSquareSize] = useState(100);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(1200);

    const [squares, setSquares] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(1000);
    

    useEffect(() => {
        setBlankBoard();
    },[]);

    const setBlankBoard = () => {
        let board = [];
        const columns= width / squareSize;
        const rows = height / squareSize;

        for(let y = 0; y < rows; y++){
            board[y] = [];
            for(let x = 0; x < columns; x++){
                board[y][x] = false;
            }
        }
        console.log(columns);
        setSquares(board);
    }

    const handleClick = () => {
        let list = [...squares];
        list[2][4] = true
        
        
        setSquares(list);
        console.log(list);
    }

    return (
        <>
        <button onClick={handleClick}>Start</button>
        <button onClick={setBlankBoard}>Reset</button>
        <div className="grid" style={{gridTemplateColumns: `repeat(auto-fill, ${squareSize}px)`}}>
            {squares.map
                (
                    (row, index) => 
                    { return (<div className="column" key={index+100}>{index+100}{row.map
                        ((item,indexRow) => {
                            if(!item){
                                return (
                                    <div key={`${index},${indexRow}`} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`}}>{index},{indexRow}</div>
                                )
                            } else { 
                                return ( 
                                    <div key={`${index},${indexRow}`} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`, backgroundColor: 'white'}}>{index},{indexRow}</div>) 
                            }
                        }
                        )}</div>
                    )}
                )
            }
        </div>
        </>
    )
}

export default Game;