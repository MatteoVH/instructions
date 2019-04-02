import { Point, PolarPoint, polarToCartesian, appendLine } from "../util";

export default function drawTangent(
  width: number,
  height: number,
  svgContainer: any
) {
  const centers: [Point, number][] = [
    [[0, height / 2], width * 2],
    [[width, height / 2], width * 2],
    [[width / 2, height / 2], width * 2]
  ];
  for (let [center, maxRadius] of centers) {
    drawConcentricCircles(center, maxRadius, svgContainer);
  }
}

function drawConcentricCircles(
  center: Point,
  maxRadius: number,
  svgContainer: any
) {
  // let divisions = 1;
  // let remainder = maxRadius;
  // while (remainder > 2) {
  //   remainder /= 2;
  //   divisions *= 2;
  // }
  console.log(center);
  let interval = maxRadius / 4;
  while (interval > 32) {
    interval /= 2;
  }
  for (let x = interval; x <= maxRadius; x += interval) {
    drawCircle(center, x, svgContainer);
  }
}

function drawCircle(center: Point, radius: number, svgContainer: any) {
  const points: Point[] = [];
  const renderPoints = 75;
  for (let x = 0; x < renderPoints; x++) {
    const p: PolarPoint = {
      magnitude: radius,
      rotation: (x / renderPoints) * Math.PI * 2
    };
    points.push(polarToCartesian(p, center));
  }
  points.push(points[0]);
  appendLine(svgContainer, points);
}
