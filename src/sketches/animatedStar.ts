import {
  Point,
  generateNearbyPoint,
  PolarPoint,
  polarToCartesian,
  appendLine
} from "../util";

export default function drawAnimatedStar(
  width: number,
  height: number,
  canvasContext: any,
  parameterValue: number = 4
): void {
  const center: Point = [width / 2, height / 2];
  let points: Point[] = [];
  for (let y = 0; y < height * 17; y++) {
    const unfilteredMagnitude = Math.pow(y * 4, 1.6) / 50000;
    const p: PolarPoint = {
      magnitude:
        (Math.sin((y / parameterValue) * Math.PI) + 2) * unfilteredMagnitude,
      rotation: (y / 20) * Math.PI
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
  appendLine(canvasContext, points);

  requestAnimationFrame(() => {
    canvasContext.clearRect(0, 0, width, height);
    drawAnimatedStar(width, height, canvasContext, parameterValue + 0.001);
  });
}
