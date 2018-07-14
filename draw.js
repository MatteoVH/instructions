import { line } from "d3";

const root = d3.select("#vis");
const chart = root
  .append("canvas")
  .attr("width", 500)
  .attr("height", 500);

var context = chart.node().getContext("2d");

const myLine = line([[0, 0], [1, 1]]);
