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

export function drawFollowLines(
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
        const drift = Math.random() * 0.05 + 0.95;
        return [x + drift, y + Math.random() * 0.2 - 0.1];
      }
    );

    appendLine(svgContainer, points);
  }
}
