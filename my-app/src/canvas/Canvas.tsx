import React from "react";
import * as S from './Canvas.styles';

type CanvasProps = React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>, 
    HTMLCanvasElement
> & { 
    draw: (context: CanvasRenderingContext2D) => void;
}

const Canvas: React.FC<CanvasProps> = ({draw,...props}) => {
    return (<S.Canvas />);
}
 
export default Canvas;