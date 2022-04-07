import { Dir } from "fs";
import React, { useState } from "react"
import useInterval from "../utils/useInterval";

export interface Position {
    x: number;
    y: number;
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

const MOVEMENT_SPEED = 100;

const useGameLogic= () => {
    const [direction, setDirection] = useState<Direction>();

  const [snakeBody, setSnakeBody] = useState<Position[]>([
{
    x:0,
    y:0,
},
]);
const onkeyDownHandler = (event : React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
        case 'KeyS' :
            setDirection(Direction.DOWN)
            break;
        case 'KeyW' :
            setDirection(Direction.UP)
            break;
        case 'KeyD' :
            setDirection(Direction.RIGHT)
            break;
        case 'KeyA' :
            setDirection(Direction.LEFT)    
            break;         
    }
}

const moveSnake = () => {};


useInterval(moveSnake, MOVEMENT_SPEED);

return {
    snakeBody,
    onkeyDownHandler,
};
};

export default useGameLogic;