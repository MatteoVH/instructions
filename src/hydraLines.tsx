import {
  Point,
  Range2D,
  generateNearbyPoint,
  generatePoint
} from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class HydraLines extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#hydra-lines")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawHydraLines(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="hydra-lines" className="artboard" />;
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

function drawHydraLines(
  width: number,
  height: number,
  svgContainer: any
): void {
  const point: Point = [width - 1, height - 1];
  drawHydraLinesImpl(width, height, svgContainer, [point], 1);
}

function drawHydraLinesImpl(
  width: number,
  height: number,
  svgContainer: any,
  points: Point[],
  depth: number
) {
  if (depth > 15) return;

  const range: Range2D = [100, 100];
  const lastPoint: Point = points[points.length - 1];
  points.push(generateNearbyPoint(width, height, lastPoint, range));
  appendLine(svgContainer, points);

  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
  drawHydraLinesImpl(width, height, svgContainer, [].concat(points), depth + 1);
}
