import * as d3 from "d3";
export type Point = [number, number];

export type LineData = [Point, Point];

export function appendLine(svgContainer: any, data: LineData) {
  const lineGenerator = d3.line();

  svgContainer
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none");
}

export function generatePoint(width: number, height: number): Point {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return [x, y];
}

function generateLineData(width: number, height: number): LineData {
  return [generatePoint(width, height), generatePoint(width, height)];
}

export function drawLines(width: number, height: number, svgContainer: any) {
  for (let x = 0; x < 100; x++) {
    appendLine(svgContainer, generateLineData(width, height));
  }
}
