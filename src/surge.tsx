import { Point } from "./randomLines";
import { generateNearbyPoint } from "./randomLines";
import * as d3 from "d3";
import * as React from "react";

export default class Surge extends React.Component<
  { width: number; height: number },
  {}
> {
  componentDidMount() {
    const linesContainer: any = d3
      .select("#surge")
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
    drawSurge(this.props.width, this.props.height, linesContainer);
  }

  render() {
    return <div id="surge" className="artboard" />;
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

export function drawSurge(
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
      ([x, y]): Point => {
        const driftMod = Math.pow(i * 0.000005, 0.85);
        return generateNearbyPoint(
          width,
          height,
          [x + 1, y],
          [driftMod, driftMod]
        );
      }
    );

    appendLine(svgContainer, points);
  }
}
