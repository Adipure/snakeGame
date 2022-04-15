import React, { useRef, useState } from "react";
import Canvas from '../canvas/Canvas';
import draw from "../draw/draw";
import { GameWrapper } from './Game.styles';
import useGameLogic from "./useGameLogic";

interface GameProps { }

export enum GameState {
    RUNNING,
    GAME_OVER,
}

const Game: React.FC<GameProps> = ({ }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<GameState>(GameState.RUNNING);

    const onGameOver = () => setGameState(GameState.GAME_OVER)
    const { snakeBody, onkeyDownHandler, foodPosition, resetGameState } = useGameLogic({
        cavnasHeight: canvasRef.current?.height,
        canvasWidth: canvasRef.current?.width,
        onGameOver,
        gameState,
    });

    const drawGame = (context: CanvasRenderingContext2D) => {
        draw({ context, snakeBody, foodPosition })
    };

    return (
        <GameWrapper tabIndex={0} onKeyDown={onkeyDownHandler}>
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
            ) : (<button>Pause</button>
            )}
        </GameWrapper>
    );
};

export default Game;