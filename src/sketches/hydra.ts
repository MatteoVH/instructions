import { Point, Range2D, generateNearbyPoint, appendLine } from "../util";

export default function drawHydraLines(
  width: number,
  height: number,
  svgContainer: any
): void {
  const point: Point = [width - 1, height - 1];
  console.log(point);
  drawHydraLinesImpl(width, height, svgContainer, [point], 1);
}

function drawHydraLinesImpl(
  width: number,
  height: number,
  svgContainer: any,
  points: Point[],
  depth: number
) {
  if (depth > 15) return;

  const range: Range2D = [100, 100];
  const lastPoint: Point = points[points.length - 1];
  points.push(generateNearbyPoint(width, height, lastPoint, range));
  appendLine(svgContainer, points);

  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
}
