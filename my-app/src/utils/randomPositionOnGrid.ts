interface RandomPostionOnGridArgs {
    gridSize?: number;
    threshold: number;
}


const randomPositionOnGrid = ({ 
    gridSize = 5, threshold, 
}: RandomPostionOnGridArgs) => Math.floor(Math.random() * (threshold / gridSize)) * gridSize;

export default randomPositionOnGrid;