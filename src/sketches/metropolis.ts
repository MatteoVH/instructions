import { appendLine } from "../util";

export default function drawMetropolis(
  width: number,
  height: number,
  canvasContext: any
): void {
  enum Orientation {
    HORIZONTAL,
    VERTICAL
  }

  for (let x = 0; x < (height * width) / 1000; x++) {
    const orientation =
      Math.random() > 0.5 ? Orientation.HORIZONTAL : Orientation.VERTICAL;

    if (orientation === Orientation.HORIZONTAL) {
      const y = Math.random() * height;
      appendLine(canvasContext, [
        [Math.random() * width, y],
        [Math.random() * width, y]
      ]);
    } else {
      const x = Math.random() * width;
      appendLine(canvasContext, [
        [x, Math.random() * height],
        [x, Math.random() * height]
      ]);
    }
  }
}
