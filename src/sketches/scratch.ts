import { curveBasis } from "d3";
import {
  appendLine,
  generateNearbyPoint,
  generatePoint,
  Line,
  Point,
} from "../util";

const VERTICAL_SPACING = 5;

export default function drawScratch(
  width: number,
  height: number,
  canvasContext: any
): void {
  const lines: Line[] = [];

  //make a starting line
  const startingLine = [];
  for (let x = 0; x < width / 25; x++) {
    startingLine.push(generatePoint(width, height));
  }
  lines.push(startingLine);

  for (let y = 1; y < (height - 1) / 25; y++) {
    const newLine: Line = [];

    for (let x = 0; x < lines[lines.length - 1].length; x++) {
      const [prevX, prevY] = lines.length > 0 ? lines[y - 1][x] : [x * 3, 3];
      const tracerPoint: Point = [prevX, prevY + VERTICAL_SPACING];

      const maxDrift = (width + height) / 100;
      const newPoint = generateNearbyPoint(width, height, tracerPoint, {
        posY: maxDrift,
        negY: maxDrift,
        posX: maxDrift,
        negX: maxDrift,
      });

      newLine.push(newPoint);
    }

    lines.push(newLine);
  }

  for (const line of lines) {
    appendLine(canvasContext, line, curveBasis);
  }
}
