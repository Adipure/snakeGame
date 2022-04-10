import React, { useEffect, useState } from "react"
import { SEGMENT_SIZE } from "../draw/draw";
import randomPositionOnGrid from "../utils/randomPositionOnGrid";
import useInterval from "../utils/useInterval";
import { GameState } from "./Game";
import createSnakeMovement, { willSnakeHitTheFood, hasSnakeEatenItself } from "./movement";

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

interface UseGameLogicArgs {
    canvasWidth?: number;
    cavnasHeight?: number;
    onGameOver : () => void;
    gameState : GameState;
}

const useGameLogic = ({ cavnasHeight, canvasWidth , onGameOver, gameState}: UseGameLogicArgs) => {
    const [direction, setDirection] = useState<Direction | undefined>();
    const [snakeBody, setSnakeBody] = useState<Position[]>([
        {
            x: 0,
            y: 0,
        },
    ]);

    const resetGameState = () => {

        setDirection(undefined);
        setFoodPostion({
            x: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: canvasWidth!,
            }),
            y: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: cavnasHeight!,
            })
        });
        setSnakeBody([
            {
                x: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasWidth!,
                }),
                y: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: cavnasHeight!,
                }),
            },
        ]);
    }

    const [foodPosition, setFoodPostion] = useState<Position | undefined>();

    const snakeHeadPosition = snakeBody[snakeBody.length - 1];
    const { moveDown, moveUp, moveLeft, moveRight } = createSnakeMovement();

    useEffect(() => {
        if (!cavnasHeight || !canvasWidth) {
            return;
        }
        setFoodPostion({
            x: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: canvasWidth,
            }),
            y: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: cavnasHeight,
            })
        });
        setSnakeBody([
            {
                x: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: canvasWidth,
                }),
                y: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: cavnasHeight,
                }),
            },
        ]);
    }, [cavnasHeight, canvasWidth])

    const onkeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case 'KeyS':
                if (direction !== Direction.UP) {
                    setDirection(Direction.DOWN)
                }
                break;
            case 'KeyW':
                if (direction !== Direction.DOWN) {
                    setDirection(Direction.UP)
                }
                break;
            case 'KeyD':
                if (direction !== Direction.LEFT) {
                    setDirection(Direction.RIGHT)
                }
                break;
            case 'KeyA':
                if (direction !== Direction.RIGHT) {
                    setDirection(Direction.LEFT)
                }
                break;
        }
    }

    const moveSnake = () => {
        let snakeBodyAfterMovement: Position[] | undefined;
        switch (direction) {
            case Direction.UP:
                if (snakeHeadPosition.y > 0) {
                    snakeBodyAfterMovement = moveUp(snakeBody);
                } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
                    setDirection(Direction.LEFT)
                } else {
                    setDirection(Direction.RIGHT)
                }
                break;
            case Direction.DOWN:
                if (cavnasHeight && snakeHeadPosition.y < cavnasHeight - SEGMENT_SIZE) {

                    snakeBodyAfterMovement = moveDown(snakeBody);
                } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
                    setDirection(Direction.LEFT);
                } else {
                    setDirection(Direction.RIGHT);
                }
                break;
            case Direction.LEFT:
                if (snakeHeadPosition.x > 0) {

                    snakeBodyAfterMovement = moveLeft(snakeBody);
                } else if (cavnasHeight && snakeHeadPosition.y < cavnasHeight / 2) {
                    setDirection(Direction.DOWN);
                } else {
                    setDirection(Direction.UP)
                }
                break;
            case Direction.RIGHT:
                if (canvasWidth && snakeHeadPosition.x < canvasWidth - SEGMENT_SIZE) {

                    snakeBodyAfterMovement = moveRight(snakeBody);
                }
                else if (cavnasHeight && snakeHeadPosition.y < cavnasHeight / 2) {
                    setDirection(Direction.DOWN)
                } else {
                    setDirection(Direction.UP)
                }
                break;
        }

    // snake eat itself (die)
    if(snakeBodyAfterMovement){
        const isGameOver = hasSnakeEatenItself(snakeBodyAfterMovement);
        if(isGameOver){
          onGameOver();
        }
    }    
        if(
            direction !== undefined 
            && foodPosition && 
            willSnakeHitTheFood({
            foodPosition,
            snakeHeadPosition,
            direction,
        })
        ) 
        {
            setSnakeBody([
                ...snakeBodyAfterMovement!,
                {x:foodPosition.x, y: foodPosition.y}
            ]);
            setFoodPostion({
                x: randomPositionOnGrid({threshold: canvasWidth!}),
                y: randomPositionOnGrid({threshold: cavnasHeight!})
            })

        }else if (snakeBodyAfterMovement) {
            setSnakeBody(snakeBodyAfterMovement);
        }
    }

    useInterval(moveSnake, MOVEMENT_SPEED);

    return {
        snakeBody,
        onkeyDownHandler,
        foodPosition,
        resetGameState,
    };
};

export default useGameLogic;