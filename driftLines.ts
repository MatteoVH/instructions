import { Point, generatePoint } from "./lines";
import { line } from "d3";

function appendLine(svgContainer: any, data: Point[]) {
  const lineGenerator = line();

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
