import { Point } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class Rays extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#rays")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawRays(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="rays" className="artboard" />;
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

type Drift = {
  x: number;
  y: number;
};

export function drawRays(
  width: number,
  height: number,
  svgContainer: any
): void {
  let points: Point[] = [];

  // initialize straight line points
  for (let y = 0; y < height; y++) {
    points.push([1, y]);
  }

  appendLine(svgContainer, points);

  for (let i = 1; i < width - 2; i++) {
    points = points.map(
      ([x, y], iteration): Point => {
        let drift: Drift = {
          x: Math.random() * 0.05 + 0.95,
          y: Math.random() * 0.2 - 0.1
        };
        drift.x += iteration * 0.01;
        drift.y += iteration * 0.01;
        return [x + drift.x, y + drift.y];
      }
    );

    appendLine(svgContainer, points);
  }
}
