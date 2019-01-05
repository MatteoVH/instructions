import { Point, generateNearbyPoint, appendLine } from "../util";

export default function drawAudio(
  width: number,
  height: number,
  svgContainer: any,
  parameterValue: any
): void {
  const center: Point = [width / 2, height / 2];
  let points: Point[] = [];
  const sounds = parameterValue;
  for (let sound of sounds) {
    for (let y = 0; y < 25; y++) {
      const driftLimit = 0.5 * y * 10;
      const driftedPoint = generateNearbyPoint(
        width,
        height,
        [sound.pan + center[0], sound.frequency],
        {
          posY: driftLimit,
          negY: driftLimit,
          posX: driftLimit,
          negX: driftLimit
        }
      );
      points.push(driftedPoint);
    }
  }
  appendLine(svgContainer, points);
}
