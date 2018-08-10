import * as d3 from "d3";
import * as React from "react";
export type Point = [number, number];

export type LineData = [Point, Point];

export default class RandomLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="lines" className="artboard" />;
  }
}

export function appendLine(svgContainer: any, data: LineData) {
  const lineGenerator = d3.line();

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
  xMod -= 1.5 * maxNegRun;

  let yMod = Math.random() * (maxPosClimb + maxNegClimb);
  yMod -= 1.5 * maxNegClimb;

  return [startingPoint[0] + xMod, startingPoint[1] + yMod];
}

function generateLineData(width: number, height: number): LineData {
  return [generatePoint(width, height), generatePoint(width, height)];
}

export function drawLines(width: number, height: number, svgContainer: any) {
  for (let x = 0; x < 100; x++) {
    appendLine(svgContainer, generateLineData(width, height));
  }
}
