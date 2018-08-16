import { Point, appendLine } from "../util";

export default function drawFollow(
  width: number,
  height: number,
  svgContainer: any
): void {
  let points: Point[] = [];

  // initialize straight line points
  for (let y = 0; y < height; y++) {
    points.push([1, y]);
  }

  appendLine(svgContainer, points);

  for (let i = 1; i < width - 2; i++) {
    points = points.map(
      ([x, y]): Point => {
        const drift = Math.random() * 0.05 + 0.95;
        return [x + drift, y + Math.random() * 0.2 - 0.1];
      }
    );

    appendLine(svgContainer, points);
  }
}
