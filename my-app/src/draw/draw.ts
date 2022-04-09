import { Position } from '../game/useGameLogic';

interface DrawArgs {
    context: CanvasRenderingContext2D;
    snakeBody : Position[];
    foodPosition?: Position;
}

export const SEGMENT_SIZE = 5;

const draw = ({ context, snakeBody, foodPosition}: DrawArgs)  => {
    if(foodPosition){
        context.fillStyle = 'rgb(0, 200, 0)'
        context.fillRect(foodPosition?.x, foodPosition?.y, SEGMENT_SIZE, SEGMENT_SIZE);
    }
    context.fillStyle = 'rgb(200, 0, 0)';
    snakeBody.forEach(segment => 
        context.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)  
    );
};      

export default draw;