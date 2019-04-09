import { Point, appendLine } from "../util";

export default function drawDrift(
  width: number,
  height: number,
  canvasContext: any
): void {
  let points: Point[] = [];

  // initialize straight line points
  for (let y = 0; y < height; y += 3) {
    points.push([0, y]);
  }

  appendLine(canvasContext, points);

  for (let i = 0; i < width - 2; i += 3) {
    points = points.map(
      ([x, y]): Point => {
        const drift = Math.random() * 2 + 2.5;
        return [x + drift, y];
      }
    );

    appendLine(canvasContext, points);
  }
}
