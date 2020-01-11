import { Point, appendLine, generatePoint } from "../util";

export default function drawConnected(
  width: number,
  height: number,
  canvasContext: any
) {
  const points: Point[] = [];
  for (let x = 0; x < (width + height) / 70; x++) {
    points.push(generatePoint(width, height));
  }
  for (const point1 of points) {
    for (const point2 of points) {
      appendLine(canvasContext, [point1, point2]);
    }
  }
}
