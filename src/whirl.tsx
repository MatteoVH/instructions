import { Point, generatePoint } from "./randomLines";
import { generateNearbyPoint } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";
import { svg } from "d3";

export default class Whirl extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#whirl")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawWhirl(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="whirl" className="artboard" />;
  }
}

function appendLine(svgContainer: any, data: Point[]) {
  const lineGenerator = d3.line();

  svgContainer
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

type PolarPoint = {
  magnitude: number;
  rotation: number;
};

function polarToCartesian(
  { magnitude, rotation }: PolarPoint,
  reference: Point
): Point {
  return [
    reference[0] + magnitude * Math.cos(rotation),
    reference[1] + magnitude * Math.sin(rotation)
  ];
}

function appendSpiral(
  width: number,
  height: number,
  svgContainer: any,
  center: Point
) {
  let points: Point[] = [];
  for (let y = 0; y < height * 50; y++) {
    const p: PolarPoint = { magnitude: y / 100, rotation: (y / 50) * Math.PI };
    points.push(polarToCartesian(p, center));
  }
  appendLine(svgContainer, points);
}

export function drawWhirl(
  width: number,
  height: number,
  svgContainer: any
): void {
  for (let x = 0; x < 10; x++) {
    appendSpiral(width, height, svgContainer, generatePoint(width, height));
  }
}
