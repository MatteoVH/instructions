import { Point, appendLine } from "../util";

type Drift = {
  x: number;
  y: number;
};

export default function drawRays(
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
      ([x, y], iteration): Point => {
        let drift: Drift = {
          x: Math.random() * 0.05 + 0.95,
          y: Math.random() * 0.2 - 0.1
        };
        drift.x += iteration * 0.01;
        drift.y += iteration * 0.01;
        return [x + drift.x, y + drift.y];
      }
    );

    appendLine(svgContainer, points);
  }
}
