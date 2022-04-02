import React from "react";

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> &
{ draw: (context: CanvasRenderingContext2D) => void;

}

const Canvas: React.FC<CanvasProps> = ({draw,...props}) => {
    return ();
}
 
export default Canvas