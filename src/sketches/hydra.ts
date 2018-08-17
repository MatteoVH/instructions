import { Point, Range2D, generateNearbyPoint, appendLine } from "../util";

export default function drawHydraLines(
  width: number,
  height: number,
  svgContainer: any
): void {
  const point: Point = [width - 1, height - 1];
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
  const maxNeg = width / 10;
  const maxPos = width / 10;

  const range: Range2D = {
    posX: height / 100,
    negX: width / 10,
    posY: height / 100,
    negY: height / 10
  };
  const lastPoint: Point = points[points.length - 1];
  points.push(generateNearbyPoint(width, height, lastPoint, range));

  appendLine(svgContainer, points);

  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
}
