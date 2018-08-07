import { Point, generatePoint } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class DriftLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#drift-lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawDriftLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="drift-lines" className="artboard"/>;
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

export function drawDriftLines(
  width: number,
  height: number,
  svgContainer: any
): void {
  let points: Point[] = [];

  // initialize straight line points
  for (let y = 0; y < height; y++) {
    points.push([0, y]);
  }

  appendLine(svgContainer, points);

  for (let i = 0; i < width - 2; i++) {
    points = points.map(
      ([x, y]): Point => {
        const drift = Math.random() + 0.5;
        return [x + drift, y];
      }
    );

    appendLine(svgContainer, points);
  }
}
