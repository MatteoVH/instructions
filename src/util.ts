import { line, curveCatmullRom } from "d3-shape";

export type Point = [number, number];

export type PolarPoint = {
  magnitude: number;
  rotation: number;
};

export function polarToCartesian(
  { magnitude, rotation }: PolarPoint,
  reference: Point
): Point {
  return [
    reference[0] + magnitude * Math.cos(rotation),
    reference[1] + magnitude * Math.sin(rotation)
  ];
}

export function appendLine(svgContainer: any, data: Point[]) {
  const lineGenerator = line().curve(curveCatmullRom.alpha(0.5));

  svgContainer
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

export function generatePoint(width: number, height: number): Point {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return [x, y];
}

export type Range2D = [number, number];

export function generateNearbyPoint(
  width: number,
  height: number,
  startingPoint: Point,
  range: Range2D
): Point {
  const maxPosRun =
    startingPoint[0] + range[0] > width ? width - startingPoint[0] : range[0];
  const maxNegRun =
    startingPoint[0] - range[0] < 0 ? startingPoint[0] : range[0];
  const maxPosClimb =
    startingPoint[1] + range[1] > height ? height - startingPoint[1] : range[1];
  const maxNegClimb =
    startingPoint[1] - range[1] < 0 ? startingPoint[1] : range[1];

  let xMod = Math.random() * (maxPosRun + maxNegRun);
  xMod -= maxNegRun;

  let yMod = Math.random() * (maxPosClimb + maxNegClimb);
  yMod -= maxNegClimb;

  return [startingPoint[0] + xMod, startingPoint[1] + yMod];
}
