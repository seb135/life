import "./Game.css"
import {useState, useEffect} from 'react';

const Game = (props) => {
    const [squareSize, setSquareSize] = useState(10);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(1200);

    const [squares, setSquares] = useState([]);
    const [isRunning, setIsRunning] = useState(false); 

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
        setIsRunning(false);
        setSquares(board);
    }

    const handleStart = () => {
        setIsRunning(true);
        let list = [...squares];
        let randomColumnNumber = Math.floor(Math.random()*list.length)
        let randomColumn = list[randomColumnNumber];
        let randomRowNumber = Math.floor(Math.random()*randomColumn.length)
        list[randomColumnNumber][randomRowNumber] = true;
        list[randomColumnNumber+1][randomRowNumber] = true;
        list[randomColumnNumber+2][randomRowNumber] = true;
        setSquares(list);
    }

    const gameProgression = () => {
        setSquares((prevState)=>{
        const newList = JSON.parse(JSON.stringify(prevState));;
        for(let x = 1; x < prevState.length - 1; x++){
            for (let y = 1; y < prevState[x].length - 1; y++){
                
                let count = 0;
                
                if(prevState[x][y] === true){
                    console.log("true: "+ x,y)
                    for(let i = x-1; i < x+2; i++){
                        for(let z = y-1; z < y+2; z++){
                            if(prevState[i][z] === true){
                                count += 1;            
                            }
                        }
                    } 
                    if(count - 1 < 2 || count-1 > 3 ){
                            newList[x][y] = false;          
                    } 
                    count = 0;
                }
                if(prevState[x][y] === false){
                    for(let m = x-1; m < x+2; m++){
                        for(let n = y-1; n < y+2; n++){
                            if(prevState[m][n] === true){
                                count += 1;        
                            }
                        }
                    } 
                    if(count === 3){
                            newList[x][y] = true;
                    }  
                    
                    count = 0;
                }
            }
        }
        return [...newList]})
    };
    let run = null;
    const runGame = ()=> {run = setInterval(()=>gameProgression(), 100);}
    const stopGame = () => {
    clearInterval(()=> run);
    }  

    return (
        <>
        <button onClick={handleStart}>Start</button>
        <button onClick={setBlankBoard}>Reset</button>
        <button onClick={runGame}>Run</button>
        <button onClick={stopGame()}>stop</button>
        {isRunning && "isRunning"}
        <div className="grid" style={{gridTemplateColumns: `repeat(auto-fill, ${squareSize}px)`}}>
            {squares.map
                (
                    (column, index) => 
                    { return (<div className="column" key={index+100}>{column.map
                        ((item,indexRow) => {
                            if(!item){
                                return (
                                    <div key={`${index},${indexRow}`} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`}}></div>
                                )
                            } else { 
                                return ( 
                                    <div key={`${index},${indexRow}`} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`, backgroundColor: 'white'}}></div>) 
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