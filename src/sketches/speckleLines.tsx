import { Point, generatePoint } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class SpeckleLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#speckle-lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawSpeckleLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="speckle-lines" className="artboard" />;
  }
}

function appendLine(svgContainer: any, data: Point[]) {
  const lineGenerator = d3.line().curve(d3.curveCatmullRom.alpha(0.5));;

  svgContainer
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

function drawSpeckleLines(
  width: number,
  height: number,
  svgContainer: any
): void {
  for (let i = 0; i < 500; i++) {
    let points : Point[] = [];
    for (let j = 0; j < 5; j++) {
      points.push(generatePoint(width, height));
    }
    appendLine(svgContainer, points);
  }
}
