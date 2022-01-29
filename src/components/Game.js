import "./Game.css"
import {useState, useEffect} from 'react';

const Game = (props) => {
    const [squareSize, setSquareSize] = useState(5);
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(1200);

    const [squares, setSquares] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [interval, setInterval] = useState(1000);
    

    useEffect(() => {
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
        setSquares(board)

    },[]);

    return (
        <div className="grid" style={{gridTemplateColumns: `repeat(auto-fill, ${squareSize}px)`}}>
            {squares.map
                (
                    (row, index) => 
                    { return (<div className="row">{row.map
                        ((item,index) => <div key={index} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`}}></div>
                        )}</div>
                    )}
                )
            }
        </div>
    )
}

export default Game;