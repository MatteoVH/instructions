import { Point, appendLine, generatePoint } from "../util";

export default function drawConnected(
  width: number,
  height: number,
  canvasContext: any
) {
  const points: Point[] = [];
  for (let x = 0; x < (width + height) / 50; x++) {
    points.push(generatePoint(width, height));
  }
  for (let x = 0; x < points.length; x++) {
    const point1 = points[x];
    for (let y = x; y < points.length; y++) {
      const point2 = points[y];
      appendLine(canvasContext, [point1, point2]);
    }
  }
}
