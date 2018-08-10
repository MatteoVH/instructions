import { Point, generatePoint } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class DenseLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#dense-lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawDenseLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="dense-lines" className="artboard" />;
  }
}

function appendLine(svgContainer: any, data: Point[]) {
  const lineGenerator = d3.line().curve(d3.curveCatmullRom.alpha(0.5));

  svgContainer
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

function drawDenseLines(width: number, height: number, svgContainer: any): void {
  for (let x = 0; x < 100; x++) {
    const points: Point[] = [];
    const firstPoint = generatePoint(width, height);
    points.push(firstPoint);
    for (let i = 0; i < 100; i++) {
      points.push(generatePoint(width, height));
    }
    points.push(firstPoint);
    appendLine(svgContainer, points);
  }
}
