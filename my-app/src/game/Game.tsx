import React, { useRef } from "react";
import Canvas  from '../canvas/Canvas';
import draw from "../draw/draw";
import { GameWrapper } from './Game.styles';
import useGameLogic from "./useGameLogic";

interface GameProps {}

const Game: React.FC<GameProps> = ({}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { snakeBody } = useGameLogic();

    const drawGame = (context: CanvasRenderingContext2D) => {
        draw({context, snakeBody})
    };

    return (
    <GameWrapper>
        <Canvas ref={canvasRef} draw={drawGame} />
    </GameWrapper>
    );
};

export default Game;