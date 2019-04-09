import { Point, generatePoint, appendLine } from "../util";

export default function drawBugPath(
  width: number,
  height: number,
  canvasContext: any
): void {
  // setup a list of points
  const points: Point[] = [];

  // do something 10 times
  for (let x = 0; x < 10; x++) {
    // add a random point to the list
    points.push(generatePoint(width, height));
  }

  appendLine(canvasContext, points);
}
