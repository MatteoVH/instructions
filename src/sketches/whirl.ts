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
      magnitude: Math.pow(y, 1.6) / 50000,
      rotation: (y / 50) * Math.PI
    };
    const cartesianPoint = polarToCartesian(p, center);
    const driftedPoint = generateNearbyPoint(width, height, cartesianPoint, {
      posY: (0.5 * y) / 1000,
      negY: (0.5 * y) / 1000,
      posX: (0.5 * y) / 1000,
      negX: (0.5 * y) / 1000
    });
    points.push(driftedPoint);
  }
  appendLine(svgContainer, points);
}
