import { curveBasis, curveBasisClosed } from "d3";
import {
  appendLine,
  generateNearbyPoint,
  generatePoint,
  Line,
  Point,
} from "../util";

export default function drawScratch(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D,
  controlValues: [verticalSpacing: number]
): void {
  const VERTICAL_SPACING = controlValues[0];

  canvasContext.fillStyle = "rgba(100,100,100,1)";

  const lines: Line[] = [];

  //make a starting line
  const startingLine = [];
  for (let x = 0; x < width / 25; x++) {
    startingLine.push(generatePoint(width, height));
  }
  lines.push(startingLine);

  for (let y = 1; y < /*(height - 1) / 50*/ 2; y++) {
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

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const darkness = (i / lines.length) * 255;
    const red = 255 - darkness;
    const green = 255 - darkness;
    const blue = 255 - darkness;
    const color = `rgb(${i * 255}, ${i * 255}, ${i * 255})`;

    if (i === 1) {
      appendLine(canvasContext, line, curveBasisClosed, color, 5);
    } else if (i === 2) {
      appendLine(canvasContext, line, curveBasisClosed, "#B46130", 2);
    } else {
      appendLine(canvasContext, line, curveBasisClosed, color, 1);
    }
  }
  canvasContext.fillStyle = "rgba(100,100,100,1)";
  canvasContext.canvas.style.background = "#156B26";
  canvasContext.canvas.style.background = "#649051";
  canvasContext.canvas.style.background = "#73AB55";
  canvasContext.canvas.style.background = "#5D8063";

  //augie color: #B46130
}
