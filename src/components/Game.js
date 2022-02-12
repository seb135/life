import "./Game.css"
import {useState, useEffect, useRef} from 'react';

const Game = (props) => {
    const [squareSize] = useState(10);
    const [width] = useState(450);
    const [height] = useState(1200);
    const [myInterval, setMyInterval] = useState(null);

    const [squares, setSquares] = useState([]);
    const [isRunning, setIsRunning] = useState(false); 

    
    useEffect(() => {
        setBlankBoard();
    },[]);

    const setBlankBoard = () => {
        clearInterval(myInterval);
        console.log("reset");
        let board = [];
        const columns= width / squareSize;
        const rows = height / squareSize;

        for(let y = 0; y < rows; y++){
            board[y] = [];
            for(let x = 0; x < columns; x++){
                
                board[y][x] = false;
            }
        }
        setSquares(board);
    }

    const setPattern = () => {
        let list = JSON.parse(JSON.stringify(squares));
        for(let x = 0; x < list.length ; x++){
            for(let y = 0; y < squares[x].length; y++){
                if(Math.random() > 0.85){
                    list[x][y] = true;
                } else {
                    list[x][y] = false;
                }
            }
        }
        
        setSquares(list);
    }

    const gameProgression = () => {
        
        setSquares((prevState)=>{
        const newList = JSON.parse(JSON.stringify(prevState));;
        for(let x = 0; x < prevState.length; x++){
            for (let y = 0; y < prevState[x].length; y++){
                
                let count = 0;
                
                if(prevState[x][y] === true){
                    for(let i = x-1; i < x+2; i++){
                        for(let z = y-1; z < y+2; z++){
                            if(i >= 0 && i< prevState.length && z >= 0 && z < prevState[x].length ){
                                if(prevState[i][z] === true){
                                    count += 1;            
                                }
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
                            if(m >= 0 && m< prevState.length && n >= 0 && n < prevState[x].length ){
                                if(prevState[m][n] === true){
                                    count += 1;        
                                }
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
    
    const runGame = ()=> {
        console.log("run");
        let run = setInterval(()=>gameProgression(), 100);
        setMyInterval(run);
    }
    
    const stopGame = () => {
    clearInterval(myInterval);
    console.log("stop");
    }  

    const randomBgColor = () => {
    var x = Math.floor(Math.random() * 200);
    var y = Math.floor(Math.random() * 200);
    var z = Math.floor(Math.random() * 200);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor
    }

    return (
        <>
        <button onClick={setPattern}>Pattern</button>
        <button onClick={setBlankBoard}>Reset</button>
        <button onClick={() => runGame()}>Run</button>
        <button onClick={() => stopGame()}>stop</button>
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
                                    <div key={`${index},${indexRow}`} className="square" style={{width: `${squareSize}px`, height: `${squareSize}px`, backgroundColor: `${randomBgColor()}`}}></div>) 
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