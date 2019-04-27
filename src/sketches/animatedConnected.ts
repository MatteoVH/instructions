import { Point, appendLine, generatePoint, generateNearbyPoint } from "../util";

export default function drawAnimatedConnected(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D
) {
  const points = [];
  for (let x = 0; x < (width + height) / 50; x++) {
    points.push(generatePoint(width, height));
  }
  drawAnimatedConnectedImpl(width, height, canvasContext, points);
}

function drawAnimatedConnectedImpl(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D,
  points: Point[]
) {
  const newPoints = points.map(point => {
    const newPoint = generateNearbyPoint(width, height, point, {
      posY: 2,
      negY: 2,
      posX: 2,
      negX: 2
    });
    return newPoint;
  });

  for (const point1 of newPoints) {
    for (const point2 of newPoints) {
      appendLine(canvasContext, [point1, point2]);
    }
  }

  requestAnimationFrame(() => {
    canvasContext.clearRect(0, 0, width, height);
    drawAnimatedConnectedImpl(width, height, canvasContext, newPoints);
  });
}
