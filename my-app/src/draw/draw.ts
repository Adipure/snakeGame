import { Position } from '../game/useGameLogic';
interface DrawArgs {
    context: CanvasRenderingContext2D;
    snakeBody : Position[];
}

const SNAKE_SIZE = 5;

const draw = ({ context, snakeBody}: DrawArgs)  => {

    context.fillStyle = 'rgb(200, 0, 0)';
    snakeBody.forEach(segment => 
        context.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE))
};

export default draw;