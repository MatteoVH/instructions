import { Point, generateNearbyPoint, appendLine } from "../util";

export default function drawSurge(
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
        const driftMod = Math.pow(i * 0.000005, 0.85);
        return generateNearbyPoint(
          width,
          height,
          [x + 1, y],
          [driftMod, driftMod]
        );
      }
    );

    appendLine(svgContainer, points);
  }
}
