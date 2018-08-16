import { Point, generatePoint, appendLine } from "../util";

export default function drawDense(
  width: number,
  height: number,
  svgContainer: any
): void {
  for (let x = 0; x < 100; x++) {
    const points: Point[] = [];
    const firstPoint = generatePoint(width, height);
    points.push(firstPoint);
    for (let i = 0; i < 100; i++) {
      points.push(generatePoint(width, height));
    }
    points.push(firstPoint);
    appendLine(svgContainer, points);
  }
}
