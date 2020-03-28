import { appendLine } from "../util";

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

function gaussianRandom(start: number, end: number) {
  return Math.floor(start + gaussianRand() * (end - start + 1));
}

export default function drawStrata(
  width: number,
  height: number,
  canvasContext: any
): void {
  const step = 5;
  let direction1 = 180;
  let direction2 = 180;
  let x1 = Math.random() * width;
  let x2 = Math.random() * width;

  for (let y = 5; y < height; y += step) {
    direction1 = gaussianRandom(direction1 - 20, direction1 + 20);
    direction2 = gaussianRandom(direction2 - 20, direction2 + 20);

    if (direction1 === 180) {
      x1 = x1;
    }
    if (direction1 > 180) {
      x1 -= Math.tan(degreesToRadians(direction1 - 180)) * step;
    }
    if (direction1 < 180) {
      x1 += Math.tan(degreesToRadians(90 - (direction1 - 90))) * step;
    }

    if (direction2 === 180) {
      x2 = x2;
    }
    if (direction2 > 180) {
      x2 -= Math.tan(degreesToRadians(direction2 - 180)) * step;
    }
    if (direction2 < 180) {
      x2 += Math.tan(degreesToRadians(90 - (direction2 - 90))) * step;
    }

    appendLine(canvasContext, [
      [x1, y],
      [x2, y]
    ]);
  }
}
