import { generatePoint, appendLine } from "../util";
import { shuffle } from "d3";

export default function drawFiveCurves(
  width: number,
  height: number,
  canvasContext: any
): void {
  enum LineType {
    Straight,
    Curved
  }

  // assign line order
  const lineOrder = [];

  for (let x = 0; x < 5; x++) {
    lineOrder.push(LineType.Curved);
  }

  for (let x = 0; x < 8; x++) {
    lineOrder.push(LineType.Straight);
  }

  shuffle(lineOrder);

  const firstPoint = generatePoint(width, height);
  let lastPoint = firstPoint;

  for (let x = 0; x < lineOrder.length; x++) {
    const lineType = lineOrder[x];
    const points = [];
    points.push(lastPoint);
    if (lineType === LineType.Straight) {
      while (points.length < 2) {
        points.push(generatePoint(width, height));
      }
    }
    if (lineType === LineType.Curved) {
      while (points.length < 3 || Math.random() > 0.2) {
        points.push(generatePoint(width, height));
      }
    }

    if (x === lineOrder.length - 1) {
      points[points.length - 1] = firstPoint;
    }

    appendLine(canvasContext, points);

    lastPoint = points[points.length - 1];
  }
}
