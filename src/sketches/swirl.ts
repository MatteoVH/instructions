import {
  Point,
  generateNearbyPoint,
  PolarPoint,
  polarToCartesian,
  appendLine
} from "../util";

export default function drawSwirl(
  width: number,
  height: number,
  svgContainer: any
): void {
  const center: Point = [width / 2, height / 2];
  let points: Point[] = [];
  for (let y = 0; y < height * 25; y++) {
    const p: PolarPoint = {
      magnitude: Math.pow(y * 4, 1.6) / 50000,
      rotation: (y / 50) * Math.PI
    };
    const cartesianPoint = polarToCartesian(p, center);
    const driftLimit = (0.5 * y) / 1000;
    const driftedPoint = generateNearbyPoint(width, height, cartesianPoint, {
      posY: driftLimit,
      negY: driftLimit,
      posX: driftLimit,
      negX: driftLimit
    });
    points.push(driftedPoint);
  }
  appendLine(svgContainer, points);
}
