import React from "react";
import Canvas  from '../canvas/Canvas';

interface GameProps {}

const Game: React.FC<GameProps> = ({}) => {

    const draw = (context: CanvasRenderingContext2D) => {};

    return <Canvas draw={draw} />;
}

export default Game;