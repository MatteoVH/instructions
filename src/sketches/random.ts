import { Point, appendLine, generatePoint } from "../util";

function generateLineData(width: number, height: number): Point[] {
  return [generatePoint(width, height), generatePoint(width, height)];
}

export default function drawRandom(
  width: number,
  height: number,
  svgContainer: any
) {
  for (let x = 0; x < 100; x++) {
    appendLine(svgContainer, generateLineData(width, height));
  }
}
