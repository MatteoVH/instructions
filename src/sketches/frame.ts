import { Point, generatePoint, appendLine, generateNearbyPoint } from "../util";

export default function drawFrame(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D
): void {
  // setup a list of points
  const grid: Point[][] = [];

  for (let x = 10; x < width - 15; x += 10) {
    const column: Point[] = [];
    for (let y = 10; y < height - 15; y += 10) {
      column.push(
        generateNearbyPoint(width, height, [x, y], {
          posY: 5,
          negY: 5,
          posX: 5,
          negX: 5
        })
      );
    }
    grid.push(column);
  }

  // connect each column
  for (let columnIndex = 0; columnIndex < grid.length - 1; columnIndex++) {
    const curColumn = grid[columnIndex];
    const nextColumn = grid[columnIndex + 1];

    for (let rowIndex = 0; rowIndex < curColumn.length; rowIndex++) {
      appendLine(canvasContext, [curColumn[rowIndex], nextColumn[rowIndex]]);
    }
  }

  // connect each row
  for (let rowIndex = 0; rowIndex < grid[0].length - 1; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
      appendLine(canvasContext, [
        grid[columnIndex][rowIndex],
        grid[columnIndex][rowIndex + 1]
      ]);
    }
  }
}
