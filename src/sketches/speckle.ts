import { Point, generatePoint, appendLine } from "../util";

export default function drawSpeckle(
  width: number,
  height: number,
  canvasContext: any
): void {
  for (let i = 0; i < (width + height) / 25; i++) {
    let points: Point[] = [];
    for (let j = 0; j < 5; j++) {
      points.push(generatePoint(width, height));
    }
    appendLine(canvasContext, points);
  }
}
