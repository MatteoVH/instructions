import { Point, appendLine, generatePoint } from "./randomLines";
import * as React from "react";
import * as d3 from "d3";

export default class ConnectedLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#connected-lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawConnectedLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="connected-lines" className="artboard" />;
  }
}

export function drawConnectedLines(
  width: number,
  height: number,
  svgContainer: any
) {
  const points: Point[] = [];
  for (let x = 0; x < 50; x++) {
    points.push(generatePoint(width, height));
  }

  for (let x = 0; x < points.length; x++) {
    const point1 = points[x];
    for (let y = x; y < points.length; y++) {
      const point2 = points[y];
      appendLine(svgContainer, [point1, point2]);
    }
  }
}
