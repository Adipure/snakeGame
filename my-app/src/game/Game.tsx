import React, { useRef, useState } from "react";
import Canvas  from '../canvas/Canvas';
import draw from "../draw/draw";
import { GameWrapper, Score } from './Game.styles';
import useGameLogic from "./useGameLogic";

interface GameProps {}

export enum GameState {
    RUNNING,
    GAME_OVER,
    PAUSED,
}

const Game: React.FC<GameProps> = ({}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);

    const onGameOver = () => setGameState(GameState.GAME_OVER)
    const { snakeBody, onkeyDownHandler, foodPosition, resetGameState} = useGameLogic({
        cavnasHeight : canvasRef.current?.height,
        canvasWidth : canvasRef.current?.width,
        onGameOver,
        gameState,

    });

    const drawGame = (context: CanvasRenderingContext2D) => {
        draw({context, snakeBody, foodPosition})
    };

    return (
    <GameWrapper tabIndex={0} onKeyDown= {onkeyDownHandler}>
        <Canvas ref={canvasRef} draw={drawGame} />
        {gameState === GameState.GAME_OVER ? (
         <button 
         onClick={() => {
             setGameState(GameState.RUNNING);
             resetGameState();    
        }}
        >
            Play Again
        </button>
        ) : (<button onClick={()=> {
            setGameState(gameState === GameState.RUNNING ? GameState.PAUSED : GameState.RUNNING)
        }}>{gameState === GameState.RUNNING ? 'Pause' : 'Play'}</button>
        )} 
       <Score>{`Your Score : ${(snakeBody.length - 1) * 10}`}</Score> 
    </GameWrapper>
    );
};

export default Game;