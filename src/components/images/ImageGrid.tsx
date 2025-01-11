import React, { useState, useEffect, useCallback } from 'react';
import ImageContainer from './ImageContainer';

// Type definitions
interface ImageFrame {
  id: number;
  width: number;
  height: number;
  color: string;
}

interface GridProps {
  gridWidth: number;
  emptySquareProbability: number;
}

// Generate a random color
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a random frame size that fits within the grid width
const generateRandomFrame = (remainingWidth: number): ImageFrame => {
  const width = Math.min(remainingWidth, Math.floor(50 + Math.random() * 100));
  const height = Math.floor(50 + Math.random() * 100);
  return {
    id: Math.random(),
    width,
    height,
    color: randomColor(),
  };
};

// Heuristic function placeholder
const heuristicScore = (placement: ImageFrame, gridWidth: number) => {
  console.log(placement, gridWidth)
  return Math.random(); // Placeholder for more complex scoring
};

const Grid: React.FC<GridProps> = ({ gridWidth, emptySquareProbability }) => {
  const [grid, setGrid] = useState<ImageFrame[][]>([]);
  const [nextImages, setNextImages] = useState<ImageFrame[]>([]);

  // Monte Carlo Tree Search function placeholder
  const monteCarloSearch = (
    availableFrames: ImageFrame[],
    remainingWidth: number
  ): ImageFrame => {
    const evaluatedFrames = availableFrames.map((frame) => {
      const score = heuristicScore(frame, remainingWidth);
      return { frame, score };
    });

    // Sort by score and pick the highest-scoring frame
    evaluatedFrames.sort((a, b) => b.score - a.score);
    return evaluatedFrames[0].frame;
  };

  // Place next image
  const placeNextImage = useCallback(() => {
    if (nextImages.length === 0) return;

    const currentRow = grid[grid.length - 1] || [];
    const remainingWidth =
      gridWidth - currentRow.reduce((sum, img) => sum + img.width, 0);

    if (Math.random() < emptySquareProbability) {
      setGrid((prevGrid) => [...prevGrid, currentRow]);
      return;
    }

    const nextImage = monteCarloSearch(nextImages.slice(0, 5), remainingWidth);

    // If it doesn't fit in the current row, create a new row
    if (nextImage.width > remainingWidth) {
      setGrid((prevGrid) => [...prevGrid, currentRow, [nextImage]]);
    } else {
      const updatedRow = [...currentRow, nextImage];
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[newGrid.length - 1] = updatedRow;
        return newGrid;
      });
    }

    // Generate a new set of next images
    setNextImages((prev) => {
      const remainingImages = prev.filter((img) => img.id !== nextImage.id);
      while (remainingImages.length < 5) {
        remainingImages.push(generateRandomFrame(gridWidth));
      }
      return remainingImages;
    });
  }, [grid, nextImages, gridWidth, emptySquareProbability]);

  // Initialize grid and images
  useEffect(() => {
    const initialImages = Array.from({ length: 5 }, () =>
      generateRandomFrame(gridWidth)
    );
    setNextImages(initialImages);
    setGrid([[]]);
  }, [gridWidth]);

  // Automatically place images at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      placeNextImage();
    }, 200);
    return () => clearInterval(interval);
  }, [placeNextImage]);

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div className="grid-row" key={rowIndex}>
          {row.map((image) => (
            <div
              key={image.id}
              className="grid-item"
              style={{
                width: `${image.width}px`,
                height: `${image.height}px`,
              }}
            >
              <ImageContainer imageUrl={`https://picsum.photos/500?project=2&random=${1}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// const App = () => {
//   return (
//     <div className="App">
//       <h1>Endless Grid Generator</h1>
//       <Grid gridWidth={800} emptySquareProbability={0.1} />
//     </div>
//   );
// };

export default Grid;
