import { useState } from "react"

export interface Position {
    x: number;
    y: number;
}

const useGameLogic= () => {
  const [snakeBody, setSnakeBody] = useState<Position[]>([
{
    x:0,
    y:0,
},
]);
return {
    snakeBody,
};
};

export default useGameLogic;