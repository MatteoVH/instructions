import { line, curveCatmullRom, CurveFactoryLineOnly, Line } from "d3-shape";

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

export function appendLine(
  svgContainer: any,
  data: Point[],
  curveFactory: CurveFactoryLineOnly = curveCatmullRom.alpha(0.5)
) {
  const lineGenerator = line().curve(curveFactory);
  svgContainer
    .append("path")
    .attr("d", lineGenerator.curve(curveFactory)(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

export function generatePoint(width: number, height: number): Point {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return [x, y];
}

export type Range2D = {
  posY: number;
  negY: number;
  posX: number;
  negX: number;
};

export function generateNearbyPoint(
  width: number,
  height: number,
  startingPoint: Point,
  { posY, negY, posX, negX }: Range2D
): Point {
  const maxPosRun =
    startingPoint[0] + posX > width ? width - startingPoint[0] : posX;
  const maxNegRun = startingPoint[0] - negX < 0 ? startingPoint[0] : negX;
  const maxPosClimb =
    startingPoint[1] + posY > height ? height - startingPoint[1] : posY;
  const maxNegClimb = startingPoint[1] - negY < 0 ? startingPoint[1] : negY;

  let xMod = Math.random() * (maxPosRun + maxNegRun);
  xMod -= maxNegRun;

  let yMod = Math.random() * (maxPosClimb + maxNegClimb);
  yMod -= maxNegClimb;

  return [startingPoint[0] + xMod, startingPoint[1] + yMod];
}
