import { appendLine, Point, generatePoint } from "../util";

export default function drawArpeggio(
  width: number,
  height: number,
  canvasContext: CanvasRenderingContext2D
): void {
  const arpeggioHeight = 40;
  const arpeggioWidth = 40;

  for (let x = 0; x < (width * height) / 5000; x++) {
    const arpeggioOrigin: Point = generatePoint(width, height);
    while (
      arpeggioOrigin[0] + arpeggioWidth > 0 &&
      arpeggioOrigin[1] + arpeggioHeight > 0
    ) {
      appendLine(canvasContext, [
        [arpeggioOrigin[0], arpeggioOrigin[1]],
        [arpeggioOrigin[0] + arpeggioWidth, arpeggioOrigin[1] + arpeggioHeight],
      ]);

      arpeggioOrigin[0] = arpeggioOrigin[0] + arpeggioWidth / 5;
      arpeggioOrigin[1] = arpeggioOrigin[1] - arpeggioHeight / 5;
    }
  }

  for (let x = 0; x < (width * height) / 5000; x++) {
    const arpeggioOrigin: Point = generatePoint(width, height);
    while (
      arpeggioOrigin[0] + arpeggioWidth > 0 &&
      arpeggioOrigin[1] + arpeggioHeight > 0
    ) {
      appendLine(canvasContext, [
        [arpeggioOrigin[0], arpeggioOrigin[1]],
        [arpeggioOrigin[0] + arpeggioWidth, arpeggioOrigin[1] - arpeggioHeight],
      ]);

      arpeggioOrigin[0] = arpeggioOrigin[0] - arpeggioWidth / 5;
      arpeggioOrigin[1] = arpeggioOrigin[1] - arpeggioHeight / 5;
    }
  }
}
