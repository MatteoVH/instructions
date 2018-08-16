import { Point, appendLine } from "../util";

export default function drawDrift(
  width: number,
  height: number,
  svgContainer: any
): void {
  let points: Point[] = [];

  // initialize straight line points
  for (let y = 0; y < height; y++) {
    points.push([0, y]);
  }

  appendLine(svgContainer, points);

  for (let i = 0; i < width - 2; i++) {
    points = points.map(
      ([x, y]): Point => {
        const drift = Math.random() + 0.5;
        return [x + drift, y];
      }
    );

    appendLine(svgContainer, points);
  }
}