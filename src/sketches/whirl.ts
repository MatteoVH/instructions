import {
  Point,
  generateNearbyPoint,
  PolarPoint,
  polarToCartesian,
  appendLine
} from "../util";

export default function drawSpiral(
  width: number,
  height: number,
  svgContainer: any
): void {
  const center: Point = [width / 2, height / 2];
  let points: Point[] = [];
  for (let y = 0; y < height * 100; y++) {
    const p: PolarPoint = {
      magnitude: y / 100,
      rotation: (y / 50) * Math.PI
    };
    const cartesianPoint = polarToCartesian(p, center);
    const driftedPoint = generateNearbyPoint(width, height, cartesianPoint, [
      0.5,
      0.5
    ]);
    points.push(driftedPoint);
  }
  appendLine(svgContainer, points);
}
